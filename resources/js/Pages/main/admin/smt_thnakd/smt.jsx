import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import React, { useEffect, useRef, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import Layout from "@/Layouts/layout/layout.jsx";
import SmtDataTable from './component/SmtDataTable';
import SmtForm from './component/SmtForm';
import CSVExportComponent from '@/Components/CSVExportComponent';
import CSVImportComponent from '@/Components/CSVImportComponent';

const smt = () => {
    let emptysmt_thnakd = {
        id_smt_thnakd: null,
        nama_smt_thnakd: "",
        kode_smt_thnakd: "",
    };

    const { props } = usePage();
    const { data_smt_thnakd, nextNumber } = props;
    const [smt_thnakds, setsmt_thnakds] = useState(null);
    const [smt_thnakdDialog, setsmt_thnakdDialog] = useState(false);
    const [deletesmt_thnakdDialog, setDeletesmt_thnakdDialog] = useState(false);
    const [deletesmt_thnakdsDialog, setDeletesmt_thnakdsDialog] = useState(false);
    const [smt_thnakd, setsmt_thnakd] = useState(emptysmt_thnakd);
    const [selectedsmt_thnakds, setSelectedsmt_thnakds] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef(null);
    const dt = useRef(null);
    // console.log(props)

    useEffect(() => {
        setsmt_thnakds(data_smt_thnakd);
        displaySuccessMessage(props.flash?.success);
        displayErrorMessage(props.flash?.error);
    }, [data_smt_thnakd, props.flash]);

    const openNew = () => {
        setsmt_thnakd(emptysmt_thnakd);
        setSubmitted(false);
        setsmt_thnakdDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setsmt_thnakdDialog(false);
    };

    const hideDeletesmt_thnakdDialog = () => {
        setDeletesmt_thnakdDialog(false);
    };

    const hideDeletesmt_thnakdsDialog = () => {
        setDeletesmt_thnakdsDialog(false);
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

    const savesmt_thnakd = async () => {
        setSubmitted(true);

        const requiredFieldsForCreate = [
            smt_thnakd.nama_smt_thnakd,
            smt_thnakd.kode_smt_thnakd,
            smt_thnakd.status_smt_thnakd,
        ];

        const requiredFieldsForUpdate = [
            smt_thnakd.nama_smt_thnakd,
            smt_thnakd.kode_smt_thnakd,
            smt_thnakd.status_smt_thnakd,
        ];

        const isCreating = !smt_thnakd.id_smt_thnakd;
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
            return;
        }

        let _smt_thnakd = { ...smt_thnakd };

        try {

            if (isCreating) {
                _smt_thnakd.id_smt_thnakd = nextNumber;
                await router.post('/semester/store', _smt_thnakd);
            } else {
                await router.put(`/semester/${smt_thnakd.id_smt_thnakd}/update`, _smt_thnakd);
            }

            if (isCreating) {
                setsmt_thnakds(prevSmt_thnakds => [...prevSmt_thnakds, _smt_thnakd]);
            } else {
                setsmt_thnakds(prevSmt_thnakds =>
                    prevSmt_thnakds.map(d => d.id_smt_thnakd === smt_thnakd.id_smt_thnakd ? _smt_thnakd : d)
                );
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to save smt_thnakd.";
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: errorMessage,
                life: 3000,
            });
        } finally {
            setsmt_thnakd(emptysmt_thnakd);
            setsmt_thnakdDialog(false);
        }
    };

    const editsmt_thnakd = (smt_thnakd) => {
        setsmt_thnakd({ ...smt_thnakd });
        setsmt_thnakdDialog(true);
    };

    const confirmDeletesmt_thnakd = (smt_thnakd) => {
        setsmt_thnakd(smt_thnakd);
        setDeletesmt_thnakdDialog(true);
    };
    const deletesmt_thnakd = async () => {
        try {
            await router.delete(`/semester/${smt_thnakd.id_smt_thnakd}/delete`);
        } catch (error) {
            console.error("Error deleting smt_thnakd:", error);
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: "Failed to delete smt_thnakd.",
                life: 3000,
            });
        }
        finally {
            setDeletesmt_thnakdDialog(false);
        }
    };

    const confirmDeleteSelected = () => {
        setDeletesmt_thnakdsDialog(true);
    };

    const deleteSelectedsmt_thnakds = async () => {
        if (!selectedsmt_thnakds || selectedsmt_thnakds.length === 0) {
            toast.current.show({
                severity: "warn",
                summary: "Warning",
                detail: "No smt_thnakds selected for deletion.",
                life: 3000,
            });
            return;
        }

        const selectedIds = selectedsmt_thnakds.map(smt_thnakd => smt_thnakd.id_smt_thnakd);

        try {
            await router.delete('/semester/destroyMultiple', {
                data: {
                    ids: selectedIds,
                },
            });
        } catch (error) {
            // console.error("Error deleting selected smt_thnakds:", error);
            toast.current.show({
                severity: "error",
                summary: "Error",
                detail: "Failed to delete selected smt_thnakds.",
                life: 3000,
            });
        } finally {
            setDeletesmt_thnakdsDialog(false);
            setSelectedsmt_thnakds(null);
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
                        disabled={!selectedsmt_thnakds || !selectedsmt_thnakds.length}
                    />
                </div>
            </React.Fragment>
        );
    };

    const columns = [
        { header: 'ID', field: 'id_smt_thnakd' },
        { header: 'Kode smt_thnakd', field: 'kode_smt_thnakd' },
        {
            header: 'Nama smt_thnakd',
            field: (smt_thnakd) => `"${smt_thnakd.nama_smt_thnakd}"`
        },
        {
            header: 'Status',
            field: (smt_thnakd) => smt_thnakd.status_smt_thnakd === "1" ? "Aktif" : "Tidak Aktif"
        }
    ];
    const handleImport = (importedData) => {
        setSmt_thnakds(prevSmt_thnakds => [...prevSmt_thnakds, ...importedData]);
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <CSVImportComponent onImport={handleImport} toast={toast} />
                <CSVExportComponent data={smt_thnakds} toast={toast} fileName="smt_thnakd_data.csv" columns={columns} />
            </React.Fragment>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Semester dan Tahun Akademik</h5>
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

    const smt_thnakdDialogFooter = (
        <>
            <Button
                label="Cancel"
                icon="pi pi-times"
                text
                onClick={hideDialog}
            />
            <Button label="Save" icon="pi pi-check" text onClick={savesmt_thnakd} />
        </>
    );
    const deletesmt_thnakdDialogFooter = (
        <>
            <Button
                label="No"
                icon="pi pi-times"
                text
                onClick={hideDeletesmt_thnakdDialog}
            />
            <Button label="Yes" icon="pi pi-check" text onClick={deletesmt_thnakd} />
        </>
    );
    const deletesmt_thnakdsDialogFooter = (
        <>
            <Button
                label="No"
                icon="pi pi-times"
                text
                onClick={hideDeletesmt_thnakdsDialog}
            />
            <Button
                label="Yes"
                icon="pi pi-check"
                text
                onClick={deleteSelectedsmt_thnakds}
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

                        <SmtDataTable
                            dt={dt}
                            smt_thnakds={smt_thnakds}
                            selectedsmt_thnakds={selectedsmt_thnakds}
                            setSelectedsmt_thnakds={setSelectedsmt_thnakds}
                            globalFilter={globalFilter}
                            header={header}
                            editsmt_thnakd={editsmt_thnakd}
                            confirmDeletesmt_thnakd={confirmDeletesmt_thnakd}
                        />

                        <SmtForm
                            smt_thnakdDialog={smt_thnakdDialog}
                            smt_thnakd={smt_thnakd}
                            setsmt_thnakd={setsmt_thnakd}
                            submitted={submitted}
                            smt_thnakdDialogFooter={smt_thnakdDialogFooter}
                            hideDialog={hideDialog}
                        />

                        <Dialog
                            visible={deletesmt_thnakdDialog}
                            style={{ width: "450px" }}
                            header="Confirm"
                            modal
                            footer={deletesmt_thnakdDialogFooter}
                            onHide={hideDeletesmt_thnakdDialog}
                        >
                            <div className="flex align-items-center justify-content-center">
                                <i
                                    className="pi pi-exclamation-triangle mr-3"
                                    style={{ fontSize: "2rem" }}
                                />
                                {smt_thnakd && (
                                    <span>
                                        Are you sure you want to delete{" "}
                                        <b>{smt_thnakd.name}</b>?
                                    </span>
                                )}
                            </div>
                        </Dialog>

                        <Dialog
                            visible={deletesmt_thnakdsDialog}
                            style={{ width: "450px" }}
                            header="Confirm"
                            modal
                            footer={deletesmt_thnakdsDialogFooter}
                            onHide={hideDeletesmt_thnakdsDialog}
                        >
                            <div className="flex align-items-center justify-content-center">
                                <i
                                    className="pi pi-exclamation-triangle mr-3"
                                    style={{ fontSize: "2rem" }}
                                />
                                {smt_thnakd && (
                                    <span>
                                        Are you sure you want to delete the
                                        selected smt_thnakds?
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

export default smt;
