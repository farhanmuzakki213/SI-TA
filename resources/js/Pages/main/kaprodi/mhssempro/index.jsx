import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import React, { useEffect, useRef, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import Layout from "@/Layouts/layout/layout.jsx";
import SemproDataTable from './component/semproDataTable';
import SemproForm from './component/semproForm';
import CSVExportComponent from '@/Components/CSVExportComponent';

const index = () => {
    let emptysempro = {
        id_sempro_mhs: null,
        komentar: "",
        status_judul_sempro: "",
        pembimbing_1_id: null,
        pembimbing_2_id: null,
        penguji_id: null,
    };


    const { props } = usePage();
    const { data_sempro, dosenOptions: initialDosenOptions, dosenPembimbingOptions: initialDosenPembimbingOptions} = props;
    const [sempros, setsempros] = useState(null);
    const [dosenOptions, setDosenOptions] = useState([]);
    const [dosenPembimbingOptions, setDosenPembimbingOptions] = useState([]);
    const [semproDialog, setsemproDialog] = useState(false);
    const [sempro, setsempro] = useState(emptysempro);
    const [selectedsempros, setSelectedsempros] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        setDosenOptions(initialDosenOptions);
        setsempros(data_sempro);
        setDosenPembimbingOptions(initialDosenPembimbingOptions);
        displaySuccessMessage(props.flash?.success);
        displayErrorMessage(props.flash?.error);
    }, [data_sempro, props.flash, initialDosenOptions, initialDosenPembimbingOptions]);

    const hideDialog = () => {
        setSubmitted(false);
        setsemproDialog(false);
    };
    console.log(data_sempro);

    const displaySuccessMessage = (successMessage) => {
        if (successMessage !== null) {
            const message = successMessage || "Operation successful";
            toast.current?.show({
                severity: "success",
                summary: "Successful",
                detail: message,
                life: 3000,
            });
        }
    };

    const displayErrorMessage = (errorMessage) => {
        if (errorMessage !== null) {
            const message = errorMessage || "Operation failed";
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: message,
                life: 3000,
            });
        }
    };

    const savesempro = async () => {
        setSubmitted(true);

        const requiredFieldsForUpdate = [
            sempro.id_sempro_mhs,
            sempro.komentar,
            sempro.status_judul_sempro,
        ];
        if(sempro.status_judul_sempro === "3"){
            requiredFieldsForUpdate.push(sempro.pembimbing_1_id, sempro.pembimbing_2_id, sempro.penguji_id);
        }
        const isValid = requiredFieldsForUpdate.every(field => field);


        if (!isValid) {
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: "Please fill in all required fields.",
                life: 3000,
            });
            return;
        }

        let _sempro = { ...sempro };

        try {
            await router.put(`/Kprodi/MhsSempro/Penugasan/${sempro.id_sempro_mhs}/update`, _sempro);

            setsempros(prevsempros =>
                prevsempros.map(d => d.id_sempro_mhs === sempro.id_sempro_mhs ? _sempro : d)
            );
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to update data.";
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: errorMessage,
                life: 3000,
            });
        } finally {
            setsempro(emptysempro);
            setsemproDialog(false);
        }
    };

    const editsempro = (sempro) => {
        setsempro({ ...sempro });
        setsemproDialog(true);
    };

    const columns = [
        { header: 'ID', field: 'id_sempro' },
        {
            header: 'Name',
            field: (sempro) => `"${sempro.nama_sempro}"`
        },
        { header: 'Nim', field: 'nim_sempro' },
        { header: 'Kelas', field: 'r_kelas.nama_kelas' },
        { header: 'Gender', field: 'gender' },
        {
            header: 'Status',
            field: (sempro) => sempro.status_sempro === "1" ? "Aktif" : "Tidak Aktif"
        }
    ];

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <CSVExportComponent data={sempros} toast={toast} fileName="Jadwal_Ruangan_data.csv" columns={columns} />
            </React.Fragment>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Mahasiswa Sempro</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText
                    type="search"
                    value={globalFilter || ''}
                    onInput={(e) => setGlobalFilter(e.target.value || '')}
                    placeholder="Search..."
                />
            </span>
        </div>
    );

    const semproDialogFooter = (
        <>
            <Button
                label="Cancel"
                icon="pi pi-times"
                text
                onClick={hideDialog}
            />
            <Button label="Save" icon="pi pi-check" text onClick={savesempro} />
        </>
    );

    return (
        <Layout>
            <div className="grid crud-demo">
                <div className="col-12">
                    <div className="card">
                        <Toast ref={toast} />
                        <Toolbar
                            className="mb-4"
                            right={rightToolbarTemplate}
                        ></Toolbar>

                        <SemproDataTable
                            dt={dt}
                            sempros={sempros}
                            selectedsempros={selectedsempros}
                            setSelectedsempros={setSelectedsempros}
                            globalFilter={globalFilter}
                            header={header}
                            editsempro={editsempro}
                        />

                        <SemproForm
                            semproDialog={semproDialog}
                            sempro={sempro}
                            setsempro={setsempro}
                            submitted={submitted}
                            semproDialogFooter={semproDialogFooter}
                            hideDialog={hideDialog}
                            dosenOptions={dosenOptions}
                            dosenPembimbingOptions={dosenPembimbingOptions}
                        />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default index;
