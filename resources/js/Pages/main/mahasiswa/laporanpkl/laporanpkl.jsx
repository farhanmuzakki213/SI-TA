import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
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
        id_log_book_pkl: '',
        tgl_awal_kegiatan: '',
        tgl_akhir_kegiatan: '',
        dokumen_laporan: '',
    };

    const { props } = usePage();
    const { data_laporanpkl, nextNumber } = props;
    const [laporanpkls, setlaporanpkls] = useState(null);
    const [laporanpklDialog, setlaporanpklDialog] = useState(false);
    const [deletelaporanpklDialog, setDeletelaporanpklDialog] = useState(false);
    const [deletelaporanpklsDialog, setDeletelaporanpklsDialog] = useState(false);
    const [laporanpkl, setlaporanpkl] = useState(emptylaporanpkl);
    const [selectedlaporanpkls, setSelectedlaporanpkls] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef(null);
    const dt = useRef(null);
    // console.log(props.usulanOptions);

    useEffect(() => {
        setlaporanpkls(data_laporanpkl);
        displaySuccessMessage(props.flash?.success);
        displayErrorMessage(props.flash?.error);
    }, [data_laporanpkl, props.flash]);

    const openNew = () => {
        setlaporanpkl(emptylaporanpkl);
        setSubmitted(false);
        setlaporanpklDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setlaporanpklDialog(false);
    };

    const hideDeletelaporanpklDialog = () => {
        setDeletelaporanpklDialog(false);
    };

    const hideDeletelaporanpklsDialog = () => {
        setDeletelaporanpklsDialog(false);
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

        const requiredFieldsForCreate = [
            laporanpkl.tgl_awal_kegiatan,
            laporanpkl.tgl_akhir_kegiatan,
            laporanpkl.dokumen_laporan,
        ];

        const requiredFieldsForUpdate = [
            laporanpkl.tgl_awal_kegiatan,
            laporanpkl.tgl_akhir_kegiatan,
            laporanpkl.dokumen_laporan,
        ];

        const isCreating = !laporanpkl.id_log_book_pkl;
        let isValid = true;

        if (isCreating) {
            isValid = requiredFieldsForCreate.every(field => field);
        } else {
            isValid = requiredFieldsForUpdate.every(field => field);
        }

        if (!isValid) {
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: "Please fill in all required fields.",
                life: 3000,
            });
            console.log(laporanpkl);
            return;
        }

        let _laporanpkl = { ...laporanpkl };

        try {

            if (isCreating) {
                _laporanpkl.id_log_book_pkl = nextNumber;
                await router.post('/logbookmhs/store', _laporanpkl);
            } else {
                await router.put(`/logbookmhs/${laporanpkl.id_log_book_pkl}/update`, _laporanpkl);
            }

            if (isCreating) {
                setlaporanpkls(prevLaporanpkls => [...prevLaporanpkls, _laporanpkl]);
            } else {
                setlaporanpkls(prevLaporanpkls =>
                    prevLaporanpkls.map(d => d.id_log_book_pkl === laporanpkl.id_log_book_pkl ? _laporanpkl : d)
                );
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to save laporanpkl.";
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

    const confirmDeletelaporanpkl = (laporanpkl) => {
        setlaporanpkl(laporanpkl);
        setDeletelaporanpklDialog(true);
    };
    const deletelaporanpkl = async () => {
        try {
            await router.delete(`/logbookmhs/${laporanpkl.id_log_book_pkl}/delete`);
        } catch (error) {
            console.error("Error deleting laporanpkl:", error);
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: "Failed to delete laporanpkl.",
                life: 3000,
            });
        }
        finally {
            setDeletelaporanpklDialog(false);
        }
    };

    const confirmDeleteSelected = () => {
        setDeletelaporanpklsDialog(true);
    };

    const deleteSelectedlaporanpkls = async () => {
        if (!selectedlaporanpkls || selectedlaporanpkls.length === 0) {
            toast.current.show({
                severity: "warn",
                summary: "Warning",
                detail: "No laporanpkls selected for deletion.",
                life: 3000,
            });
            return;
        }

        const selectedIds = selectedlaporanpkls.map(laporanpkl => laporanpkl.id_log_book_pkl);

        try {
            await router.delete('/logbookmhs/destroyMultiple', {
                data: {
                    ids: selectedIds,
                },
            });
        } catch (error) {
            // console.error("Error deleting selected laporanpkls:", error);
            toast.current.show({
                severity: "error",
                summary: "Error",
                detail: "Failed to delete selected laporanpkls.",
                life: 3000,
            });
        } finally {
            setDeletelaporanpklsDialog(false);
            setSelectedlaporanpkls(null);
        }
    };
    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button
                        label="New"
                        icon="pi pi-plus"
                        severity="sucess"
                        className="mr-2"
                        onClick={openNew}
                    />
                    <Button
                        label="Delete"
                        icon="pi pi-trash"
                        severity="danger"
                        onClick={confirmDeleteSelected}
                        disabled={!selectedlaporanpkls || !selectedlaporanpkls.length}
                    />
                </div>
            </React.Fragment>
        );
    };

    const columns = [
        { header: 'ID', field: 'id_log_book_pkl' },
        {
            header: 'Nama laporanpkl',
            field: (laporanpkl) => `"${laporanpkl.nama_laporanpkl}"`
        },
        { header: 'Kode laporanpkl', field: 'pembimbing_id' },
    ];
    const handleImport = (importedData) => {
        setLaporanpkls(prevLaporanpkls => [...prevLaporanpkls, ...importedData]);
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <CSVImportComponent onImport={handleImport} toast={toast} />
                <CSVExportComponent data={laporanpkls} toast={toast} fileName="laporanpkl_data.csv" columns={columns} />
            </React.Fragment>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Laporan PKL</h5>
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
    const deletelaporanpklDialogFooter = (
        <>
            <Button
                label="No"
                icon="pi pi-times"
                text
                onClick={hideDeletelaporanpklDialog}
            />
            <Button label="Yes" icon="pi pi-check" text onClick={deletelaporanpkl} />
        </>
    );
    const deletelaporanpklsDialogFooter = (
        <>
            <Button
                label="No"
                icon="pi pi-times"
                text
                onClick={hideDeletelaporanpklsDialog}
            />
            <Button
                label="Yes"
                icon="pi pi-check"
                text
                onClick={deleteSelectedlaporanpkls}
            />
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
                            left={leftToolbarTemplate}
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
                            confirmDeletelaporanpkl={confirmDeletelaporanpkl}
                        />

                        <LaporanpklForm
                            laporanpklDialog={laporanpklDialog}
                            laporanpkl={laporanpkl}
                            setlaporanpkl={setlaporanpkl}
                            submitted={submitted}
                            laporanpklDialogFooter={laporanpklDialogFooter}
                            hideDialog={hideDialog}
                        />

                        <Dialog
                            visible={deletelaporanpklDialog}
                            style={{ width: "450px" }}
                            header="Confirm"
                            modal
                            footer={deletelaporanpklDialogFooter}
                            onHide={hideDeletelaporanpklDialog}
                        >
                            <div className="flex align-items-center justify-content-center">
                                <i
                                    className="pi pi-exclamation-triangle mr-3"
                                    style={{ fontSize: "2rem" }}
                                />
                                {laporanpkl && (
                                    <span>
                                        Are you sure you want to delete{" "}
                                        <b>{laporanpkl.name}</b>?
                                    </span>
                                )}
                            </div>
                        </Dialog>

                        <Dialog
                            visible={deletelaporanpklsDialog}
                            style={{ width: "450px" }}
                            header="Confirm"
                            modal
                            footer={deletelaporanpklsDialogFooter}
                            onHide={hideDeletelaporanpklsDialog}
                        >
                            <div className="flex align-items-center justify-content-center">
                                <i
                                    className="pi pi-exclamation-triangle mr-3"
                                    style={{ fontSize: "2rem" }}
                                />
                                {laporanpkl && (
                                    <span>
                                        Are you sure you want to delete the
                                        selected laporanpkls?
                                    </span>
                                )}
                            </div>
                        </Dialog>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default laporanpkl;
