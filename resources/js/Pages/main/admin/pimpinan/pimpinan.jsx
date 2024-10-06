import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import React, { useEffect, useRef, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import Layout from "@/Layouts/layout/layout.jsx";
import PimpinanDataTable from './component/pimpinanDataTable';
import PimpinanForm from './component/pimpinanForm';
import CSVExportComponent from '@/Components/CSVExportComponent';
import CSVImportComponent from '@/Components/CSVImportComponent';

const pimpinan = () => {
    let emptypimpinan = {
        id_pimpinan: null,
        dosen_id: null,
        jabatan_pimpinan_id: null,
        periode: "",
        status_pimpinan: ""
    };


    const { props } = usePage();
    const { data_pimpinan, dosenOptions: initialDosenOptions, jabatan_pimpinanOptions: initialJabatan_pimpinanOptions, nextNumber } = props;
    const [pimpinans, setpimpinans] = useState(null);
    const [dosenOptions, setDosenOptions] = useState([]);
    const [jabatan_pimpinanOptions, setJabatan_pimpinanOptions] = useState([]);
    const [pimpinanDialog, setpimpinanDialog] = useState(false);
    const [deletepimpinanDialog, setDeletepimpinanDialog] = useState(false);
    const [deletepimpinansDialog, setDeletepimpinansDialog] = useState(false);
    const [pimpinan, setpimpinan] = useState(emptypimpinan);
    const [selectedpimpinans, setSelectedpimpinans] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        setDosenOptions(initialDosenOptions);
        setJabatan_pimpinanOptions(initialJabatan_pimpinanOptions);
        setpimpinans(data_pimpinan);
        displaySuccessMessage(props.flash?.success);
        displayErrorMessage(props.flash?.error);
    }, [initialDosenOptions, initialJabatan_pimpinanOptions, data_pimpinan, props.flash]);

    const openNew = () => {
        setpimpinan(emptypimpinan);
        setSubmitted(false);
        setpimpinanDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setpimpinanDialog(false);
    };

    const hideDeletepimpinanDialog = () => {
        setDeletepimpinanDialog(false);
    };

    const hideDeletepimpinansDialog = () => {
        setDeletepimpinansDialog(false);
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

    const savepimpinan = async () => {
        setSubmitted(true);

        const requiredFieldsForCreate = [
            pimpinan.dosen_id,
            pimpinan.jabatan_pimpinan_id,
            pimpinan.periode,
        ];

        const requiredFieldsForUpdate = [
            pimpinan.dosen_id,
            pimpinan.jabatan_pimpinan_id,
            pimpinan.periode,
            pimpinan.status_pimpinan,
        ];

        const isCreating = !pimpinan.id_pimpinan;
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

        let _pimpinan = { ...pimpinan };

        try {

            if (isCreating) {
                _pimpinan.id_pimpinan = nextNumber;
                await router.post('/pimpinan/store', _pimpinan);
            } else {

                await router.put(`/pimpinan/${pimpinan.id_pimpinan}/update`, _pimpinan);
            }

            if (isCreating) {
                setpimpinans(prevpimpinans => [...prevpimpinans, _pimpinan]);
            } else {
                setpimpinans(prevpimpinans =>
                    prevpimpinans.map(d => d.id_pimpinan === pimpinan.id_pimpinan ? _pimpinan : d)
                );
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to save pimpinan.";
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: errorMessage,
                life: 3000,
            });
        } finally {
            setpimpinan(emptypimpinan);
            setpimpinanDialog(false);
        }
    };
    const editpimpinan = (pimpinan) => {
        setpimpinan({ ...pimpinan });
        setpimpinanDialog(true);
    };

    const confirmDeletepimpinan = (pimpinan) => {
        setpimpinan(pimpinan);
        setDeletepimpinanDialog(true);
    };
    const deletepimpinan = async () => {
        try {
            await router.delete(`/pimpinan/${pimpinan.id_pimpinan}/delete`);
        } catch (error) {
            console.error("Error deleting pimpinan:", error);
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: "Failed to delete pimpinan.",
                life: 3000,
            });
        }
        finally {
            setDeletepimpinanDialog(false);
        }
    };

    const confirmDeleteSelected = () => {
        setDeletepimpinansDialog(true);
    };

    const deleteSelectedpimpinans = async () => {
        if (!selectedpimpinans || selectedpimpinans.length === 0) {
            toast.current.show({
                severity: "warn",
                summary: "Warning",
                detail: "No pimpinans selected for deletion.",
                life: 3000,
            });
            return;
        }

        const selectedIds = selectedpimpinans.map(pimpinan => pimpinan.id_pimpinan);

        try {
            await router.delete('/pimpinan/destroyMultiple', {
                data: {
                    ids: selectedIds,
                },
            });
        } catch (error) {
            console.error("Error deleting selected pimpinans:", error);
            toast.current.show({
                severity: "error",
                summary: "Error",
                detail: "Failed to delete selected pimpinans.",
                life: 3000,
            });
        } finally {
            setDeletepimpinansDialog(false);
            setSelectedpimpinans(null);
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
                        disabled={!selectedpimpinans || !selectedpimpinans.length}
                    />
                </div>
            </React.Fragment>
        );
    };

    const columns = [
        { header: 'ID', field: 'id_pimpinan' },
        {
            header: 'Name',
            field: (pimpinan) => `"${pimpinan.nama_pimpinan}"`
        },
        { header: 'Nim', field: 'nim_pimpinan' },
        { header: 'Kelas', field: 'r_kelas.nama_kelas' },
        { header: 'Gender', field: 'gender' },
        {
            header: 'Status',
            field: (pimpinan) => pimpinan.status_pimpinan === "1" ? "Aktif" : "Tidak Aktif"
        }
    ];
    const handleImport = (importedData) => {
        setpimpinans(prevpimpinans => [...prevpimpinans, ...importedData]);
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <CSVImportComponent onImport={handleImport} toast={toast} />
                <CSVExportComponent data={pimpinans} toast={toast} fileName="pimpinan_data.csv" columns={columns} />
            </React.Fragment>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">pimpinan</h5>
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

    const pimpinanDialogFooter = (
        <>
            <Button
                label="Cancel"
                icon="pi pi-times"
                text
                onClick={hideDialog}
            />
            <Button label="Save" icon="pi pi-check" text onClick={savepimpinan} />
        </>
    );
    const deletepimpinanDialogFooter = (
        <>
            <Button
                label="No"
                icon="pi pi-times"
                text
                onClick={hideDeletepimpinanDialog}
            />
            <Button label="Yes" icon="pi pi-check" text onClick={deletepimpinan} />
        </>
    );
    const deletepimpinansDialogFooter = (
        <>
            <Button
                label="No"
                icon="pi pi-times"
                text
                onClick={hideDeletepimpinansDialog}
            />
            <Button
                label="Yes"
                icon="pi pi-check"
                text
                onClick={deleteSelectedpimpinans}
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

                        <PimpinanDataTable
                            dt={dt}
                            pimpinans={pimpinans}
                            selectedpimpinans={selectedpimpinans}
                            setSelectedpimpinans={setSelectedpimpinans}
                            globalFilter={globalFilter}
                            header={header}
                            editpimpinan={editpimpinan}
                            confirmDeletepimpinan={confirmDeletepimpinan}
                        />

                        <PimpinanForm
                            pimpinanDialog={pimpinanDialog}
                            pimpinan={pimpinan}
                            setpimpinan={setpimpinan}
                            submitted={submitted}
                            dosenOptions={dosenOptions}
                            jabatan_pimpinanOptions={jabatan_pimpinanOptions}
                            pimpinanDialogFooter={pimpinanDialogFooter}
                            hideDialog={hideDialog}
                        />

                        <Dialog
                            visible={deletepimpinanDialog}
                            style={{ width: "450px" }}
                            header="Confirm"
                            modal
                            footer={deletepimpinanDialogFooter}
                            onHide={hideDeletepimpinanDialog}
                        >
                            <div className="flex align-items-center justify-content-center">
                                <i
                                    className="pi pi-exclamation-triangle mr-3"
                                    style={{ fontSize: "2rem" }}
                                />
                                {pimpinan && (
                                    <span>
                                        Are you sure you want to delete{" "}
                                        <b>{pimpinan.name}</b>?
                                    </span>
                                )}
                            </div>
                        </Dialog>

                        <Dialog
                            visible={deletepimpinansDialog}
                            style={{ width: "450px" }}
                            header="Confirm"
                            modal
                            footer={deletepimpinansDialogFooter}
                            onHide={hideDeletepimpinansDialog}
                        >
                            <div className="flex align-items-center justify-content-center">
                                <i
                                    className="pi pi-exclamation-triangle mr-3"
                                    style={{ fontSize: "2rem" }}
                                />
                                {pimpinan && (
                                    <span>
                                        Are you sure you want to delete the
                                        selected pimpinans?
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

export default pimpinan;
