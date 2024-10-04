import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import React, { useEffect, useRef, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import Layout from "@/Layouts/layout/layout.jsx";
import JabatanDataTable from './component/JabatanDataTable';
import JabatanForm from './component/JabatanForm';
import CSVExportComponent from '@/Components/CSVExportComponent';
import CSVImportComponent from '@/Components/CSVImportComponent';

const jabatan_pimpinan = () => {
    let emptyjabatan_pimpinan = {
        id_jabatan_pimpinan: null,
        nama_jabatan_pimpinan: "",
        kode_jabatan_pimpinan: ""
    };

    const { props } = usePage();
    const { data_jabatan_pimpinan, nextNumber } = props;
    const [jabatan_pimpinans, setjabatan_pimpinans] = useState(null);
    const [jabatan_pimpinanDialog, setjabatan_pimpinanDialog] = useState(false);
    const [deletejabatan_pimpinanDialog, setDeletejabatan_pimpinanDialog] = useState(false);
    const [deletejabatan_pimpinansDialog, setDeletejabatan_pimpinansDialog] = useState(false);
    const [jabatan_pimpinan, setjabatan_pimpinan] = useState(emptyjabatan_pimpinan);
    const [selectedjabatan_pimpinans, setSelectedjabatan_pimpinans] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef(null);
    const dt = useRef(null);
    // console.log(props)

    useEffect(() => {
        setjabatan_pimpinans(data_jabatan_pimpinan);
        displaySuccessMessage(props.flash?.success);
        displayErrorMessage(props.flash?.error);
    }, [data_jabatan_pimpinan, props.flash]);

    const openNew = () => {
        setjabatan_pimpinan(emptyjabatan_pimpinan);
        setSubmitted(false);
        setjabatan_pimpinanDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setjabatan_pimpinanDialog(false);
    };

    const hideDeletejabatan_pimpinanDialog = () => {
        setDeletejabatan_pimpinanDialog(false);
    };

    const hideDeletejabatan_pimpinansDialog = () => {
        setDeletejabatan_pimpinansDialog(false);
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

    const savejabatan_pimpinan = async () => {
        setSubmitted(true);

        const requiredFieldsForCreate = [
            jabatan_pimpinan.nama_jabatan_pimpinan,
            jabatan_pimpinan.kode_jabatan_pimpinan,
        ];

        const requiredFieldsForUpdate = [
            jabatan_pimpinan.nama_jabatan_pimpinan,
            jabatan_pimpinan.kode_jabatan_pimpinan,
        ];

        const isCreating = !jabatan_pimpinan.id_jabatan_pimpinan;
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

        let _jabatan_pimpinan = { ...jabatan_pimpinan };

        try {

            if (isCreating) {
                _jabatan_pimpinan.id_jabatan_pimpinan = nextNumber;
                await router.post('/jabatanpimpinan/store', _jabatan_pimpinan);
            } else {
                await router.put(`/jabatanpimpinan/${jabatan_pimpinan.id_jabatan_pimpinan}/update`, _jabatan_pimpinan);
            }

            if (isCreating) {
                setjabatan_pimpinans(prevJabatan_pimpinans => [...prevJabatan_pimpinans, _jabatan_pimpinan]);
            } else {
                setjabatan_pimpinans(prevJabatan_pimpinans =>
                    prevJabatan_pimpinans.map(d => d.id_jabatan_pimpinan === jabatan_pimpinan.id_jabatan_pimpinan ? _jabatan_pimpinan : d)
                );
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to save jabatan_pimpinan.";
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: errorMessage,
                life: 3000,
            });
        } finally {
            setjabatan_pimpinan(emptyjabatan_pimpinan);
            setjabatan_pimpinanDialog(false);
        }
    };

    const editjabatan_pimpinan = (jabatan_pimpinan) => {
        setjabatan_pimpinan({ ...jabatan_pimpinan });
        setjabatan_pimpinanDialog(true);
    };

    const confirmDeletejabatan_pimpinan = (jabatan_pimpinan) => {
        setjabatan_pimpinan(jabatan_pimpinan);
        setDeletejabatan_pimpinanDialog(true);
    };
    const deletejabatan_pimpinan = async () => {
        try {
            await router.delete(`/jabatanpimpinan/${jabatan_pimpinan.id_jabatan_pimpinan}/delete`);
        } catch (error) {
            console.error("Error deleting jabatan_pimpinan:", error);
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: "Failed to delete jabatan_pimpinan.",
                life: 3000,
            });
        }
        finally {
            setDeletejabatan_pimpinanDialog(false);
        }
    };

    const confirmDeleteSelected = () => {
        setDeletejabatan_pimpinansDialog(true);
    };

    const deleteSelectedjabatan_pimpinans = async () => {
        if (!selectedjabatan_pimpinans || selectedjabatan_pimpinans.length === 0) {
            toast.current.show({
                severity: "warn",
                summary: "Warning",
                detail: "No jabatan_pimpinans selected for deletion.",
                life: 3000,
            });
            return;
        }

        const selectedIds = selectedjabatan_pimpinans.map(jabatan_pimpinan => jabatan_pimpinan.id_jabatan_pimpinan);

        try {
            await router.delete('/jabatanpimpinan/destroyMultiple', {
                data: {
                    ids: selectedIds,
                },
            });
        } catch (error) {
            // console.error("Error deleting selected jabatan_pimpinans:", error);
            toast.current.show({
                severity: "error",
                summary: "Error",
                detail: "Failed to delete selected jabatan_pimpinans.",
                life: 3000,
            });
        } finally {
            setDeletejabatan_pimpinansDialog(false);
            setSelectedjabatan_pimpinans(null);
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
                        disabled={!selectedjabatan_pimpinans || !selectedjabatan_pimpinans.length}
                    />
                </div>
            </React.Fragment>
        );
    };

    const columns = [
        { header: 'ID', field: 'id_jabatan_pimpinan' },
        {
            header: 'Nama jabatan_pimpinan',
            field: (jabatan_pimpinan) => `"${jabatan_pimpinan.nama_jabatan_pimpinan}"`
        },
        { header: 'Kode jabatan_pimpinan', field: 'kode_jabatan_pimpinan' },
    ];
    const handleImport = (importedData) => {
        setjabatan_pimpinans(prevJabatan_pimpinans => [...prevJabatan_pimpinans, ...importedData]);
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <CSVImportComponent onImport={handleImport} toast={toast} />
                <CSVExportComponent data={jabatan_pimpinans} toast={toast} fileName="jabatan_pimpinan_data.csv" columns={columns} />
            </React.Fragment>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">jabatan_pimpinan</h5>
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

    const jabatan_pimpinanDialogFooter = (
        <>
            <Button
                label="Cancel"
                icon="pi pi-times"
                text
                onClick={hideDialog}
            />
            <Button label="Save" icon="pi pi-check" text onClick={savejabatan_pimpinan} />
        </>
    );
    const deletejabatan_pimpinanDialogFooter = (
        <>
            <Button
                label="No"
                icon="pi pi-times"
                text
                onClick={hideDeletejabatan_pimpinanDialog}
            />
            <Button label="Yes" icon="pi pi-check" text onClick={deletejabatan_pimpinan} />
        </>
    );
    const deletejabatan_pimpinansDialogFooter = (
        <>
            <Button
                label="No"
                icon="pi pi-times"
                text
                onClick={hideDeletejabatan_pimpinansDialog}
            />
            <Button
                label="Yes"
                icon="pi pi-check"
                text
                onClick={deleteSelectedjabatan_pimpinans}
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

                        <JabatanDataTable
                            dt={dt}
                            jabatan_pimpinans={jabatan_pimpinans}
                            selectedjabatan_pimpinans={selectedjabatan_pimpinans}
                            setSelectedjabatan_pimpinans={setSelectedjabatan_pimpinans}
                            globalFilter={globalFilter}
                            header={header}
                            editjabatan_pimpinan={editjabatan_pimpinan}
                            confirmDeletejabatan_pimpinan={confirmDeletejabatan_pimpinan}
                        />

                        <JabatanForm
                            jabatan_pimpinanDialog={jabatan_pimpinanDialog}
                            jabatan_pimpinan={jabatan_pimpinan}
                            setjabatan_pimpinan={setjabatan_pimpinan}
                            submitted={submitted}
                            jabatan_pimpinanDialogFooter={jabatan_pimpinanDialogFooter}
                            hideDialog={hideDialog}
                        />

                        <Dialog
                            visible={deletejabatan_pimpinanDialog}
                            style={{ width: "450px" }}
                            header="Confirm"
                            modal
                            footer={deletejabatan_pimpinanDialogFooter}
                            onHide={hideDeletejabatan_pimpinanDialog}
                        >
                            <div className="flex align-items-center justify-content-center">
                                <i
                                    className="pi pi-exclamation-triangle mr-3"
                                    style={{ fontSize: "2rem" }}
                                />
                                {jabatan_pimpinan && (
                                    <span>
                                        Are you sure you want to delete{" "}
                                        <b>{jabatan_pimpinan.name}</b>?
                                    </span>
                                )}
                            </div>
                        </Dialog>

                        <Dialog
                            visible={deletejabatan_pimpinansDialog}
                            style={{ width: "450px" }}
                            header="Confirm"
                            modal
                            footer={deletejabatan_pimpinansDialogFooter}
                            onHide={hideDeletejabatan_pimpinansDialog}
                        >
                            <div className="flex align-items-center justify-content-center">
                                <i
                                    className="pi pi-exclamation-triangle mr-3"
                                    style={{ fontSize: "2rem" }}
                                />
                                {jabatan_pimpinan && (
                                    <span>
                                        Are you sure you want to delete the
                                        selected jabatan_pimpinans?
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

export default jabatan_pimpinan;
