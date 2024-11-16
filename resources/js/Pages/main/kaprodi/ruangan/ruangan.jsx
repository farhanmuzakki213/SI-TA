import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import React, { useEffect, useRef, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import Layout from "@/Layouts/layout/layout.jsx";
import RuanganDataTable from './component/RuanganDataTable';
import RuanganForm from './component/RuanganForm';
import CSVExportComponent from '@/Components/CSVExportComponent';
import CSVImportComponent from '@/Components/CSVImportComponent';

const ruangan = () => {
    let emptyruangan = {
        id_ruangan: null,
        kode_ruangan: ""
    };

    const { props } = usePage();
    const { data_ruangan, nextNumber } = props;
    const [ruangans, setruangans] = useState(null);
    const [ruanganDialog, setruanganDialog] = useState(false);
    const [deleteruanganDialog, setDeleteruanganDialog] = useState(false);
    const [deleteruangansDialog, setDeleteruangansDialog] = useState(false);
    const [ruangan, setruangan] = useState(emptyruangan);
    const [selectedruangans, setSelectedruangans] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef(null);
    const dt = useRef(null);
    // console.log(props)

    useEffect(() => {
        setruangans(data_ruangan);
        displaySuccessMessage(props.flash?.success);
        displayErrorMessage(props.flash?.error);
    }, [data_ruangan, props.flash]);

    const openNew = () => {
        setruangan(emptyruangan);
        setSubmitted(false);
        setruanganDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setruanganDialog(false);
    };

    const hideDeleteruanganDialog = () => {
        setDeleteruanganDialog(false);
    };

    const hideDeleteruangansDialog = () => {
        setDeleteruangansDialog(false);
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

    const saveruangan = async () => {
        setSubmitted(true);

        const requiredFieldsForCreate = [
            ruangan.kode_ruangan,
        ];

        const requiredFieldsForUpdate = [
            ruangan.kode_ruangan,
        ];

        const isCreating = !ruangan.id_ruangan;
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

        let _ruangan = { ...ruangan };

        try {

            if (isCreating) {
                _ruangan.id_ruangan = nextNumber;
                await router.post('/ruangan/store', _ruangan);
            } else {
                await router.put(`/ruangan/${ruangan.id_ruangan}/update`, _ruangan);
            }

            if (isCreating) {
                setruangans(prevRuangans => [...prevRuangans, _ruangan]);
            } else {
                setruangans(prevRuangans =>
                    prevRuangans.map(d => d.id_ruangan === ruangan.id_ruangan ? _ruangan : d)
                );
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to save ruangan.";
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: errorMessage,
                life: 3000,
            });
        } finally {
            setruangan(emptyruangan);
            setruanganDialog(false);
        }
    };

    const editruangan = (ruangan) => {
        setruangan({ ...ruangan });
        setruanganDialog(true);
    };

    const confirmDeleteruangan = (ruangan) => {
        setruangan(ruangan);
        setDeleteruanganDialog(true);
    };
    const deleteruangan = async () => {
        try {
            await router.delete(`/ruangan/${ruangan.id_ruangan}/delete`);
        } catch (error) {
            console.error("Error deleting ruangan:", error);
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: "Failed to delete ruangan.",
                life: 3000,
            });
        }
        finally {
            setDeleteruanganDialog(false);
        }
    };

    const confirmDeleteSelected = () => {
        setDeleteruangansDialog(true);
    };

    const deleteSelectedruangans = async () => {
        if (!selectedruangans || selectedruangans.length === 0) {
            toast.current.show({
                severity: "warn",
                summary: "Warning",
                detail: "No ruangans selected for deletion.",
                life: 3000,
            });
            return;
        }

        const selectedIds = selectedruangans.map(ruangan => ruangan.id_ruangan);

        try {
            await router.delete('/ruangan/destroyMultiple', {
                data: {
                    ids: selectedIds,
                },
            });
        } catch (error) {
            // console.error("Error deleting selected ruangans:", error);
            toast.current.show({
                severity: "error",
                summary: "Error",
                detail: "Failed to delete selected ruangans.",
                life: 3000,
            });
        } finally {
            setDeleteruangansDialog(false);
            setSelectedruangans(null);
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
                        disabled={!selectedruangans || !selectedruangans.length}
                    />
                </div>
            </React.Fragment>
        );
    };

    const columns = [
        { header: 'ID', field: 'id_ruangan' },
        {
            header: 'Nama ruangan',
            field: (ruangan) => `"${ruangan.nama_ruangan}"`
        },
        { header: 'Kode ruangan', field: 'kode_ruangan' },
    ];
    const handleImport = (importedData) => {
        setRuangans(prevRuangans => [...prevRuangans, ...importedData]);
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <CSVImportComponent onImport={handleImport} toast={toast} />
                <CSVExportComponent data={ruangans} toast={toast} fileName="ruangan_data.csv" columns={columns} />
            </React.Fragment>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Ruangan</h5>
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

    const ruanganDialogFooter = (
        <>
            <Button
                label="Cancel"
                icon="pi pi-times"
                text
                onClick={hideDialog}
            />
            <Button label="Save" icon="pi pi-check" text onClick={saveruangan} />
        </>
    );
    const deleteruanganDialogFooter = (
        <>
            <Button
                label="No"
                icon="pi pi-times"
                text
                onClick={hideDeleteruanganDialog}
            />
            <Button label="Yes" icon="pi pi-check" text onClick={deleteruangan} />
        </>
    );
    const deleteruangansDialogFooter = (
        <>
            <Button
                label="No"
                icon="pi pi-times"
                text
                onClick={hideDeleteruangansDialog}
            />
            <Button
                label="Yes"
                icon="pi pi-check"
                text
                onClick={deleteSelectedruangans}
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

                        <RuanganDataTable
                            dt={dt}
                            ruangans={ruangans}
                            selectedruangans={selectedruangans}
                            setSelectedruangans={setSelectedruangans}
                            globalFilter={globalFilter}
                            header={header}
                            editruangan={editruangan}
                            confirmDeleteruangan={confirmDeleteruangan}
                        />

                        <RuanganForm
                            ruanganDialog={ruanganDialog}
                            ruangan={ruangan}
                            setruangan={setruangan}
                            submitted={submitted}
                            ruanganDialogFooter={ruanganDialogFooter}
                            hideDialog={hideDialog}
                        />

                        <Dialog
                            visible={deleteruanganDialog}
                            style={{ width: "450px" }}
                            header="Confirm"
                            modal
                            footer={deleteruanganDialogFooter}
                            onHide={hideDeleteruanganDialog}
                        >
                            <div className="flex align-items-center justify-content-center">
                                <i
                                    className="pi pi-exclamation-triangle mr-3"
                                    style={{ fontSize: "2rem" }}
                                />
                                {ruangan && (
                                    <span>
                                        Are you sure you want to delete{" "}
                                        <b>{ruangan.name}</b>?
                                    </span>
                                )}
                            </div>
                        </Dialog>

                        <Dialog
                            visible={deleteruangansDialog}
                            style={{ width: "450px" }}
                            header="Confirm"
                            modal
                            footer={deleteruangansDialogFooter}
                            onHide={hideDeleteruangansDialog}
                        >
                            <div className="flex align-items-center justify-content-center">
                                <i
                                    className="pi pi-exclamation-triangle mr-3"
                                    style={{ fontSize: "2rem" }}
                                />
                                {ruangan && (
                                    <span>
                                        Are you sure you want to delete the
                                        selected ruangans?
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

export default ruangan;
