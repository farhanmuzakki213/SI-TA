import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import React, { useEffect, useRef, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import Layout from "@/Layouts/layout/layout.jsx";
import UsulansidangpklDataTable from './component/usulansidangpklDataTable';
import UsulansidangpklForm from './component/usulansidangpklForm';
import CSVExportComponent from '@/Components/CSVExportComponent';
import CSVImportComponent from '@/Components/CSVImportComponent';

const usulansidangpkl = () => {
    let emptyusulansidangpkl = {
        id_pkl_mhs: null,
        status_ver_pkl: "",
    };


    const { props } = usePage();
    const { data_pkl_mhs} = props;
    const [usulansidangpkls, setusulansidangpkls] = useState(null);
    const [usulansidangpklDialog, setusulansidangpklDialog] = useState(false);
    const [usulansidangpkl, setusulansidangpkl] = useState(emptyusulansidangpkl);
    const [selectedusulansidangpkls, setSelectedusulansidangpkls] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        setusulansidangpkls(data_pkl_mhs);
        displaySuccessMessage(props.flash?.success);
        displayErrorMessage(props.flash?.error);
    }, [data_pkl_mhs, props.flash]);

    const hideDialog = () => {
        setSubmitted(false);
        setusulansidangpklDialog(false);
    };

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

    const saveusulansidangpkl = async () => {
        setSubmitted(true);

        const requiredFieldsForUpdate = [
            usulansidangpkl.id_pkl_mhs,
            usulansidangpkl.status_ver_pkl
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

        let _usulansidangpkl = { ...usulansidangpkl };

        try {
            await router.put(`/usulansidangpkl/${usulansidangpkl.id_pkl_mhs}/update`, _usulansidangpkl);

            setusulansidangpkls(prevusulansidangpkls =>
                prevusulansidangpkls.map(d => d.id_pkl_mhs === usulansidangpkl.id_pkl_mhs ? _usulansidangpkl : d)
            );

            toast.current?.show({
                severity: "success",
                summary: "Success",
                detail: "Data successfully updated.",
                life: 3000,
            });
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to update data.";
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: errorMessage,
                life: 3000,
            });
        } finally {
            setusulansidangpkl(emptyusulansidangpkl);
            setusulansidangpklDialog(false);
        }
    };

    const editusulansidangpkl = (usulansidangpkl) => {
        setusulansidangpkl({ ...usulansidangpkl });
        setusulansidangpklDialog(true);
    };

    const columns = [
        { header: 'ID', field: 'id_pkl_mhssidangpkl' },
        {
            header: 'Name',
            field: (usulansidangpkl) => `"${usulansidangpkl.nama_usulansidangpkl}"`
        },
        { header: 'Nim', field: 'nim_usulansidangpkl' },
        { header: 'Kelas', field: 'r_kelas.nama_kelas' },
        { header: 'Gender', field: 'gender' },
        {
            header: 'Status',
            field: (usulansidangpkl) => usulansidangpkl.status_usulansidangpkl === "1" ? "Aktif" : "Tidak Aktif"
        }
    ];
    const handleImport = (importedData) => {
        setusulansidangpkls(prevusulansidangpkls => [...prevusulansidangpkls, ...importedData]);
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <CSVImportComponent onImport={handleImport} toast={toast} />
                <CSVExportComponent data={usulansidangpkls} toast={toast} fileName="Jadwal_Ruangan_data.csv" columns={columns} />
            </React.Fragment>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Persetujuan Usulan Sidang PKL</h5>
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

    const usulansidangpklDialogFooter = (
        <>
            <Button
                label="Cancel"
                icon="pi pi-times"
                text
                onClick={hideDialog}
            />
            <Button label="Save" icon="pi pi-check" text onClick={saveusulansidangpkl} />
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

                        <UsulansidangpklDataTable
                            dt={dt}
                            usulansidangpkls={usulansidangpkls}
                            selectedusulansidangpkls={selectedusulansidangpkls}
                            setSelectedusulansidangpkls={setSelectedusulansidangpkls}
                            globalFilter={globalFilter}
                            header={header}
                            editusulansidangpkl={editusulansidangpkl}
                        />

                        <UsulansidangpklForm
                            usulansidangpklDialog={usulansidangpklDialog}
                            usulansidangpkl={usulansidangpkl}
                            setusulansidangpkl={setusulansidangpkl}
                            submitted={submitted}
                            usulansidangpklDialogFooter={usulansidangpklDialogFooter}
                            hideDialog={hideDialog}
                        />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default usulansidangpkl;
