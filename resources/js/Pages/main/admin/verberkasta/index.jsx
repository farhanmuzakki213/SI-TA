import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import React, { useEffect, useRef, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import Layout from "@/Layouts/layout/layout.jsx";
import TaDataTable from './component/taDataTable';
import TaForm from './component/taForm';
import CSVExportComponent from '@/Components/CSVExportComponent';

const index = () => {
    let emptyta = {
        id_ta_mhs: null,
        komentar_ta: "",
        status_ver_ta: "",
    };


    const { props } = usePage();
    const { data_ta} = props;
    const [tas, settas] = useState(null);
    const [taDialog, settaDialog] = useState(false);
    const [ta, setta] = useState(emptyta);
    const [selectedtas, setSelectedtas] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        settas(data_ta);
        displaySuccessMessage(props.flash?.success);
        displayErrorMessage(props.flash?.error);
    }, [data_ta, props.flash]);

    const hideDialog = () => {
        setSubmitted(false);
        settaDialog(false);
    };
    console.log(data_ta);

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

    const saveta = async () => {
        setSubmitted(true);

        const requiredFieldsForUpdate = [
            ta.id_ta_mhs,
            ta.komentar_ta,
            ta.status_ver_ta,
        ];
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

        let _ta = { ...ta };

        try {
            await router.put(`/VerifikasiBerkas/TA/${ta.id_ta_mhs}/update`, _ta);

            settas(prevtas =>
                prevtas.map(d => d.id_ta_mhs === ta.id_ta_mhs ? _ta : d)
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
            setta(emptyta);
            settaDialog(false);
        }
    };

    const editta = (ta) => {
        setta({ ...ta });
        settaDialog(true);
    };

    const columns = [
        { header: 'ID', field: 'id_ta_mhs' },
        {
            header: 'Name',
            field: 'nama_mahasiswa'
        },
        { header: 'Nim', field: 'nim_mahasiswa' },
        { header: 'Kelas', field: 'kelas' },
        { header: 'Prodi', field: 'prodi' },
        { header: 'Judul', field: 'judul_ta' },
        { header: 'Gender', field: 'gender' },
        {
            header: 'Status',
            field: (ta) => ta.status_ver_pkl === "1" ? "Ditolak" : ta.status_ver_pkl === "2" ? "Diproses" : ta.status_ver_pkl === "3" ? "Diterima" : "Revisi"
        }
    ];

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <CSVExportComponent data={tas} toast={toast} fileName="Usulan_Sidang_Ta_data.csv" columns={columns} />
            </React.Fragment>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Mahasiswa Ta</h5>
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

    const taDialogFooter = (
        <>
            <Button
                label="Cancel"
                icon="pi pi-times"
                text
                onClick={hideDialog}
            />
            <Button label="Save" icon="pi pi-check" text onClick={saveta} />
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

                        <TaDataTable
                            dt={dt}
                            tas={tas}
                            selectedtas={selectedtas}
                            setSelectedtas={setSelectedtas}
                            globalFilter={globalFilter}
                            header={header}
                            editta={editta}
                        />

                        <TaForm
                            taDialog={taDialog}
                            ta={ta}
                            setta={setta}
                            submitted={submitted}
                            taDialogFooter={taDialogFooter}
                            hideDialog={hideDialog}
                        />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default index;
