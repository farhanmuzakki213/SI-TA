import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import React, { useEffect, useRef, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import Layout from "@/Layouts/layout/layout.jsx";
import UsulanpklDataTable from './component/usulanpklDataTable';
import UsulanpklForm from './component/usulanpklForm';
import CSVExportComponent from '@/Components/CSVExportComponent';

const index = () => {
    let emptyusulanpkl = {
        id_usulan: null,
        komentar: "",
        status_usulan: "",
        id_pkl_mhs: null,
        pembimbing_id: null,
        penguji_id: null,
    };


    const { props } = usePage();
    const { data_usulanpkl, dosenOptions: initialDosenOptions, dosenPembimbingOptions: initialDosenPembimbingOptions} = props;
    const [usulanpkls, setusulanpkls] = useState(null);
    const [dosenOptions, setDosenOptions] = useState([]);
    const [dosenPembimbingOptions, setDosenPembimbingOptions] = useState([]);
    const [usulanpklDialog, setusulanpklDialog] = useState(false);
    const [usulanpkl, setusulanpkl] = useState(emptyusulanpkl);
    const [selectedusulanpkls, setSelectedusulanpkls] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef(null);
    const dt = useRef(null);

    // console.log("dosenOptions",dosenOptions)
    // console.log("dosenPembimbingOptions",dosenPembimbingOptions)
    useEffect(() => {
        setDosenOptions(initialDosenOptions);
        setDosenPembimbingOptions(initialDosenPembimbingOptions);
        setusulanpkls(data_usulanpkl);
        displaySuccessMessage(props.flash?.success);
        displayErrorMessage(props.flash?.error);
    }, [data_usulanpkl, props.flash, initialDosenOptions, initialDosenPembimbingOptions]);

    const hideDialog = () => {
        setSubmitted(false);
        setusulanpklDialog(false);
    };
    // console.log(data_usulanpkl);

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

    const saveusulanpkl = async () => {
        setSubmitted(true);

        const requiredFieldsForUpdate = [
            usulanpkl.id_usulan,
            usulanpkl.komentar,
            usulanpkl.status_usulan
        ];
        if(usulanpkl.status_usulan === "3"){
            requiredFieldsForUpdate.push(usulanpkl.pembimbing_id, usulanpkl.penguji_id);
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

        let _usulanpkl = { ...usulanpkl };

        try {
            await router.put(`/Kprodi/Mhspkl/Usulan/${usulanpkl.id_usulan}/update`, _usulanpkl);

            setusulanpkls(prevusulanpkls =>
                prevusulanpkls.map(d => d.id_usulan === usulanpkl.id_usulan ? _usulanpkl : d)
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
            setusulanpkl(emptyusulanpkl);
            setusulanpklDialog(false);
        }
    };

    const editusulanpkl = (usulanpkl) => {
        setusulanpkl({ ...usulanpkl });
        setusulanpklDialog(true);
    };

    const columns = [
        { header: 'ID', field: 'id_usulanpkl' },
        {
            header: 'Name',
            field: (usulanpkl) => `"${usulanpkl.nama_usulanpkl}"`
        },
        { header: 'Nim', field: 'nim_usulanpkl' },
        { header: 'Kelas', field: 'r_kelas.nama_kelas' },
        { header: 'Gender', field: 'gender' },
        {
            header: 'Status',
            field: (usulanpkl) => usulanpkl.status_usulanpkl === "1" ? "Aktif" : "Tidak Aktif"
        }
    ];

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <CSVExportComponent data={usulanpkls} toast={toast} fileName="Jadwal_Ruangan_data.csv" columns={columns} />
            </React.Fragment>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Mahasiswa PKL</h5>
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

    const usulanpklDialogFooter = (
        <>
            <Button
                label="Cancel"
                icon="pi pi-times"
                text
                onClick={hideDialog}
            />
            <Button label="Save" icon="pi pi-check" text onClick={saveusulanpkl} />
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

                        <UsulanpklDataTable
                            dt={dt}
                            usulanpkls={usulanpkls}
                            selectedusulanpkls={selectedusulanpkls}
                            setSelectedusulanpkls={setSelectedusulanpkls}
                            globalFilter={globalFilter}
                            header={header}
                            editusulanpkl={editusulanpkl}
                        />

                        <UsulanpklForm
                            usulanpklDialog={usulanpklDialog}
                            usulanpkl={usulanpkl}
                            setusulanpkl={setusulanpkl}
                            submitted={submitted}
                            usulanpklDialogFooter={usulanpklDialogFooter}
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
