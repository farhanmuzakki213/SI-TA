import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import React, { useEffect, useRef, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import Layout from "@/Layouts/layout/layout.jsx";
import SesiDataTable from './component/SesiDataTable';
import SesiForm from './component/SesiForm';
import CSVExportComponent from '@/Components/CSVExportComponent';
import CSVImportComponent from '@/Components/CSVImportComponent';

const sesi = () => {
    let emptysesi = {
        id_sesi: null,
        periode_sesi: "",
    };

    const { props } = usePage();
    const { data_sesi, nextNumber } = props;
    const [sesis, setsesis] = useState(null);
    const [sesiDialog, setsesiDialog] = useState(false);
    const [deletesesiDialog, setDeletesesiDialog] = useState(false);
    const [deletesesisDialog, setDeletesesisDialog] = useState(false);
    const [sesi, setsesi] = useState(emptysesi);
    const [selectedsesis, setSelectedsesis] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef(null);
    const dt = useRef(null);
    // console.log(props)

    useEffect(() => {
        setsesis(data_sesi);
        displaySuccessMessage(props.flash?.success);
        displayErrorMessage(props.flash?.error);
    }, [data_sesi, props.flash]);

    const openNew = () => {
        setsesi(emptysesi);
        setSubmitted(false);
        setsesiDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setsesiDialog(false);
    };

    const hideDeletesesiDialog = () => {
        setDeletesesiDialog(false);
    };

    const hideDeletesesisDialog = () => {
        setDeletesesisDialog(false);
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

    const saveSesi = async () => {
        setSubmitted(true);

        const requiredFieldsForCreate = [
            sesi.periode_sesi,
        ];

        const requiredFieldsForUpdate = [
            sesi.periode_sesi,
        ];

        const isCreating = !sesi.id_sesi;
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

        let _sesi = { ...sesi };

        try {

            if (isCreating) {
                _sesi.id_sesi = nextNumber;
                await router.post('/sesi/store', _sesi);
            } else {
                await router.put(`/sesi/${sesi.id_sesi}/update`, _sesi);
            }

            if (isCreating) {
                setsesis(prevsesis => [...prevsesis, _sesi]);
            } else {
                setsesis(prevSesis =>
                    prevSesis.map(d => d.id_sesi === sesi.id_sesi ? _sesi : d)
                );
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to save sesi.";
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: errorMessage,
                life: 3000,
            });
        } finally {
            setsesi(emptysesi);
            setsesiDialog(false);
        }
    };

    const editsesi = (sesi) => {
        setsesi({ ...sesi });
        setsesiDialog(true);
    };

    const confirmDeletesesi = (sesi) => {
        setsesi(sesi);
        setDeletesesiDialog(true);
    };
    const deletesesi = async () => {
        try {
            await router.delete(`/sesi/${sesi.id_sesi}/delete`);
        } catch (error) {
            console.error("Error deleting sesi:", error);
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: "Failed to delete sesi.",
                life: 3000,
            });
        }
        finally {
            setDeletesesiDialog(false);
        }
    };

    const confirmDeleteSelected = () => {
        setDeletesesisDialog(true);
    };

    const deleteSelectedsesis = async () => {
        if (!selectedsesis || selectedsesis.length === 0) {
            toast.current.show({
                severity: "warn",
                summary: "Warning",
                detail: "No sesis selected for deletion.",
                life: 3000,
            });
            return;
        }

        const selectedIds = selectedsesis.map(sesi => sesi.id_sesi);

        try {
            await router.delete('/sesi/destroyMultiple', {
                data: {
                    ids: selectedIds,
                },
            });
        } catch (error) {
            // console.error("Error deleting selected sesis:", error);
            toast.current.show({
                severity: "error",
                summary: "Error",
                detail: "Failed to delete selected sesis.",
                life: 3000,
            });
        } finally {
            setDeletesesisDialog(false);
            setSelectedsesis(null);
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
                        disabled={!selectedsesis || !selectedsesis.length}
                    />
                </div>
            </React.Fragment>
        );
    };

    const columns = [
        { header: 'ID', field: 'id_sesi' },
        {
            header: 'Nama Sesi',
            field: (sesi) => `"${sesi.periode_sesi}"`
        },
        { header: 'Kode Sesi', field: 'kode_sesi' },
    ];
    const handleImport = (importedData) => {
        setSesis(prevSesis => [...prevSesis, ...importedData]);
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <CSVImportComponent onImport={handleImport} toast={toast} />
                <CSVExportComponent data={sesis} toast={toast} fileName="sesi_data.csv" columns={columns} />
            </React.Fragment>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Sesi</h5>
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

    const sesiDialogFooter = (
        <>
            <Button
                label="Cancel"
                icon="pi pi-times"
                text
                onClick={hideDialog}
            />
            <Button label="Save" icon="pi pi-check" text onClick={saveSesi} />
        </>
    );
    const deletesesiDialogFooter = (
        <>
            <Button
                label="No"
                icon="pi pi-times"
                text
                onClick={hideDeletesesiDialog}
            />
            <Button label="Yes" icon="pi pi-check" text onClick={deletesesi} />
        </>
    );
    const deletesesisDialogFooter = (
        <>
            <Button
                label="No"
                icon="pi pi-times"
                text
                onClick={hideDeletesesisDialog}
            />
            <Button
                label="Yes"
                icon="pi pi-check"
                text
                onClick={deleteSelectedsesis}
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

                        <SesiDataTable
                            dt={dt}
                            sesis={sesis}
                            selectedsesis={selectedsesis}
                            setSelectedsesis={setSelectedsesis}
                            globalFilter={globalFilter}
                            header={header}
                            editsesi={editsesi}
                            confirmDeletesesi={confirmDeletesesi}
                        />

                        <SesiForm
                            sesiDialog={sesiDialog}
                            sesi={sesi}
                            setsesi={setsesi}
                            submitted={submitted}
                            sesiDialogFooter={sesiDialogFooter}
                            hideDialog={hideDialog}
                        />

                        <Dialog
                            visible={deletesesiDialog}
                            style={{ width: "450px" }}
                            header="Confirm"
                            modal
                            footer={deletesesiDialogFooter}
                            onHide={hideDeletesesiDialog}
                        >
                            <div className="flex align-items-center justify-content-center">
                                <i
                                    className="pi pi-exclamation-triangle mr-3"
                                    style={{ fontSize: "2rem" }}
                                />
                                {sesi && (
                                    <span>
                                        Are you sure you want to delete{" "}
                                        <b>{sesi.name}</b>?
                                    </span>
                                )}
                            </div>
                        </Dialog>

                        <Dialog
                            visible={deletesesisDialog}
                            style={{ width: "450px" }}
                            header="Confirm"
                            modal
                            footer={deletesesisDialogFooter}
                            onHide={hideDeletesesisDialog}
                        >
                            <div className="flex align-items-center justify-content-center">
                                <i
                                    className="pi pi-exclamation-triangle mr-3"
                                    style={{ fontSize: "2rem" }}
                                />
                                {sesi && (
                                    <span>
                                        Are you sure you want to delete the
                                        selected sesis?
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

export default sesi;
