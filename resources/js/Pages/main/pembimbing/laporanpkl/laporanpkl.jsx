import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import React, { useEffect, useRef, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import Layout from "@/Layouts/layout/layout.jsx";
import LaporanpklDataTable from './component/laporanpklDataTable';
import LaporanpklForm from './component/laporanpklForm';
import CSVExportComponent from '@/Components/CSVExportComponent';
import CSVImportComponent from '@/Components/CSVImportComponent';

const laporanpkl = () => {
    let emptylaporanpkl = {
        id_log_book_pkl: null,
        komentar: "",
        status: "",
    };


    const { props } = usePage();
    const { data_laporanpkl} = props;
    const [laporanpkls, setlaporanpkls] = useState(null);
    const [laporanpklDialog, setlaporanpklDialog] = useState(false);
    const [laporanpkl, setlaporanpkl] = useState(emptylaporanpkl);
    const [selectedlaporanpkls, setSelectedlaporanpkls] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        setlaporanpkls(data_laporanpkl);
        displaySuccessMessage(props.flash?.success);
        displayErrorMessage(props.flash?.error);
    }, [data_laporanpkl, props.flash]);

    const hideDialog = () => {
        setSubmitted(false);
        setlaporanpklDialog(false);
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

    const savelaporanpkl = async () => {
        setSubmitted(true);

        const requiredFieldsForUpdate = [
            laporanpkl.id_log_book_pkl,
            laporanpkl.komentar,
            laporanpkl.status
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

        let _laporanpkl = { ...laporanpkl };

        try {
            await router.put(`/laporanpkl/${laporanpkl.id_log_book_pkl}/update`, _laporanpkl);

            setlaporanpkls(prevlaporanpkls =>
                prevlaporanpkls.map(d => d.id_log_book_pkl === laporanpkl.id_log_book_pkl ? _laporanpkl : d)
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
            setlaporanpkl(emptylaporanpkl);
            setlaporanpklDialog(false);
        }
    };

    const editlaporanpkl = (laporanpkl) => {
        setlaporanpkl({ ...laporanpkl });
        setlaporanpklDialog(true);
    };

    const columns = [
        { header: 'ID', field: 'id_log_book_pklpkl' },
        {
            header: 'Name',
            field: (laporanpkl) => `"${laporanpkl.nama_laporanpkl}"`
        },
        { header: 'Nim', field: 'nim_laporanpkl' },
        { header: 'Kelas', field: 'r_kelas.nama_kelas' },
        { header: 'Gender', field: 'gender' },
        {
            header: 'Status',
            field: (laporanpkl) => laporanpkl.status_laporanpkl === "1" ? "Aktif" : "Tidak Aktif"
        }
    ];
    const handleImport = (importedData) => {
        setlaporanpkls(prevlaporanpkls => [...prevlaporanpkls, ...importedData]);
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <CSVImportComponent onImport={handleImport} toast={toast} />
                <CSVExportComponent data={laporanpkls} toast={toast} fileName="Jadwal_Ruangan_data.csv" columns={columns} />
            </React.Fragment>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Persetujuan Laporan PKL</h5>
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

    const laporanpklDialogFooter = (
        <>
            <Button
                label="Cancel"
                icon="pi pi-times"
                text
                onClick={hideDialog}
            />
            <Button label="Save" icon="pi pi-check" text onClick={savelaporanpkl} />
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

                        <LaporanpklDataTable
                            dt={dt}
                            laporanpkls={laporanpkls}
                            selectedlaporanpkls={selectedlaporanpkls}
                            setSelectedlaporanpkls={setSelectedlaporanpkls}
                            globalFilter={globalFilter}
                            header={header}
                            editlaporanpkl={editlaporanpkl}
                        />

                        <LaporanpklForm
                            laporanpklDialog={laporanpklDialog}
                            laporanpkl={laporanpkl}
                            setlaporanpkl={setlaporanpkl}
                            submitted={submitted}
                            laporanpklDialogFooter={laporanpklDialogFooter}
                            hideDialog={hideDialog}
                        />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default laporanpkl;
