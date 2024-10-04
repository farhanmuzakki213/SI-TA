import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import React, { useEffect, useRef, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import Layout from "@/Layouts/layout/layout.jsx";
import PimpinanJDataTable from './component/pimpinanJDataTable';
import PimpinanJForm from './component/pimpinanJForm';
import CSVExportComponent from '@/Components/CSVExportComponent';
import CSVImportComponent from '@/Components/CSVImportComponent';

const pimpinan_jurusan = () => {
    let emptypimpinan_jurusan = {
        id_pimpinan_jurusan: null,
        dosen_id: null,
        jabatan_pimpinan_id: null,
        periode: "",
        status_pimpinan_jurusan: ""
    };


    const { props } = usePage();
    const { data_pimpinan_jurusan, dosenOptions: initialDosenOptions, jabatan_pimpinanOptions: initialJabatan_pimpinanOptions, nextNumber } = props;
    const [pimpinan_jurusans, setpimpinan_jurusans] = useState(null);
    const [dosenOptions, setDosenOptions] = useState([]);
    const [jabatan_pimpinanOptions, setJabatan_pimpinanOptions] = useState([]);
    const [pimpinan_jurusanDialog, setpimpinan_jurusanDialog] = useState(false);
    const [deletepimpinan_jurusanDialog, setDeletepimpinan_jurusanDialog] = useState(false);
    const [deletepimpinan_jurusansDialog, setDeletepimpinan_jurusansDialog] = useState(false);
    const [pimpinan_jurusan, setpimpinan_jurusan] = useState(emptypimpinan_jurusan);
    const [selectedpimpinan_jurusans, setSelectedpimpinan_jurusans] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        setDosenOptions(initialDosenOptions);
        setJabatan_pimpinanOptions(initialJabatan_pimpinanOptions);
        setpimpinan_jurusans(data_pimpinan_jurusan);
        displaySuccessMessage(props.flash?.success);
        displayErrorMessage(props.flash?.error);
    }, [initialDosenOptions, initialJabatan_pimpinanOptions, data_pimpinan_jurusan, props.flash]);

    const openNew = () => {
        setpimpinan_jurusan(emptypimpinan_jurusan);
        setSubmitted(false);
        setpimpinan_jurusanDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setpimpinan_jurusanDialog(false);
    };

    const hideDeletepimpinan_jurusanDialog = () => {
        setDeletepimpinan_jurusanDialog(false);
    };

    const hideDeletepimpinan_jurusansDialog = () => {
        setDeletepimpinan_jurusansDialog(false);
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

    const savepimpinan_jurusan = async () => {
        setSubmitted(true);

        const requiredFieldsForCreate = [
            pimpinan_jurusan.dosen_id,
            pimpinan_jurusan.jabatan_pimpinan_id,
            pimpinan_jurusan.periode,
        ];

        const requiredFieldsForUpdate = [
            pimpinan_jurusan.dosen_id,
            pimpinan_jurusan.jabatan_pimpinan_id,
            pimpinan_jurusan.periode,
            pimpinan_jurusan.status_pimpinan_jurusan,
        ];

        const isCreating = !pimpinan_jurusan.id_pimpinan_jurusan;
        let isValid = true;

        if (isCreating) {
            isValid = requiredFieldsForCreate.every(field => field);
            if (isValid && pimpinan_jurusan.password !== pimpinan_jurusan.password_confirmation) {
                toast.current?.show({
                    severity: "error",
                    summary: "Error",
                    detail: "Passwords do not match.",
                    life: 3000,
                });
                return;
            }
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

        let _pimpinan_jurusan = { ...pimpinan_jurusan };

        try {

            if (isCreating) {
                _pimpinan_jurusan.id_pimpinan_jurusan = nextNumber;
                await router.post('/pimpinanjurusan/store', _pimpinan_jurusan);
            } else {
                delete _pimpinan_jurusan.email;
                delete _pimpinan_jurusan.password;
                delete _pimpinan_jurusan.password_confirmation;

                await router.put(`/pimpinanjurusan/${pimpinan_jurusan.id_pimpinan_jurusan}/update`, _pimpinan_jurusan);
            }

            if (isCreating) {
                setpimpinan_jurusans(prevpimpinan_jurusans => [...prevpimpinan_jurusans, _pimpinan_jurusan]);
            } else {
                setpimpinan_jurusans(prevpimpinan_jurusans =>
                    prevpimpinan_jurusans.map(d => d.id_pimpinan_jurusan === pimpinan_jurusan.id_pimpinan_jurusan ? _pimpinan_jurusan : d)
                );
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to save pimpinan_jurusan.";
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: errorMessage,
                life: 3000,
            });
        } finally {
            setpimpinan_jurusan(emptypimpinan_jurusan);
            setpimpinan_jurusanDialog(false);
        }
    };
    const editpimpinan_jurusan = (pimpinan_jurusan) => {
        setpimpinan_jurusan({ ...pimpinan_jurusan });
        setpimpinan_jurusanDialog(true);
    };

    const confirmDeletepimpinan_jurusan = (pimpinan_jurusan) => {
        setpimpinan_jurusan(pimpinan_jurusan);
        setDeletepimpinan_jurusanDialog(true);
    };
    const deletepimpinan_jurusan = async () => {
        try {
            await router.delete(`/pimpinanjurusan/${pimpinan_jurusan.id_pimpinan_jurusan}/delete`);
        } catch (error) {
            console.error("Error deleting pimpinan_jurusan:", error);
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: "Failed to delete pimpinan_jurusan.",
                life: 3000,
            });
        }
        finally {
            setDeletepimpinan_jurusanDialog(false);
        }
    };

    const confirmDeleteSelected = () => {
        setDeletepimpinan_jurusansDialog(true);
    };

    const deleteSelectedpimpinan_jurusans = async () => {
        if (!selectedpimpinan_jurusans || selectedpimpinan_jurusans.length === 0) {
            toast.current.show({
                severity: "warn",
                summary: "Warning",
                detail: "No pimpinan_jurusans selected for deletion.",
                life: 3000,
            });
            return;
        }

        const selectedIds = selectedpimpinan_jurusans.map(pimpinan_jurusan => pimpinan_jurusan.id_pimpinan_jurusan);

        try {
            await router.delete('/pimpinanjurusan/destroyMultiple', {
                data: {
                    ids: selectedIds,
                },
            });
        } catch (error) {
            console.error("Error deleting selected pimpinan_jurusans:", error);
            toast.current.show({
                severity: "error",
                summary: "Error",
                detail: "Failed to delete selected pimpinan_jurusans.",
                life: 3000,
            });
        } finally {
            setDeletepimpinan_jurusansDialog(false);
            setSelectedpimpinan_jurusans(null);
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
                        disabled={!selectedpimpinan_jurusans || !selectedpimpinan_jurusans.length}
                    />
                </div>
            </React.Fragment>
        );
    };

    const columns = [
        { header: 'ID', field: 'id_pimpinan_jurusan' },
        {
            header: 'Name',
            field: (pimpinan_jurusan) => `"${pimpinan_jurusan.nama_pimpinan_jurusan}"`
        },
        { header: 'Nim', field: 'nim_pimpinan_jurusan' },
        { header: 'Kelas', field: 'r_kelas.nama_kelas' },
        { header: 'Gender', field: 'gender' },
        {
            header: 'Status',
            field: (pimpinan_jurusan) => pimpinan_jurusan.status_pimpinan_jurusan === "1" ? "Aktif" : "Tidak Aktif"
        }
    ];
    const handleImport = (importedData) => {
        setpimpinan_jurusans(prevpimpinan_jurusans => [...prevpimpinan_jurusans, ...importedData]);
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <CSVImportComponent onImport={handleImport} toast={toast} />
                <CSVExportComponent data={pimpinan_jurusans} toast={toast} fileName="pimpinan_jurusan_data.csv" columns={columns} />
            </React.Fragment>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">pimpinan_jurusan</h5>
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

    const pimpinan_jurusanDialogFooter = (
        <>
            <Button
                label="Cancel"
                icon="pi pi-times"
                text
                onClick={hideDialog}
            />
            <Button label="Save" icon="pi pi-check" text onClick={savepimpinan_jurusan} />
        </>
    );
    const deletepimpinan_jurusanDialogFooter = (
        <>
            <Button
                label="No"
                icon="pi pi-times"
                text
                onClick={hideDeletepimpinan_jurusanDialog}
            />
            <Button label="Yes" icon="pi pi-check" text onClick={deletepimpinan_jurusan} />
        </>
    );
    const deletepimpinan_jurusansDialogFooter = (
        <>
            <Button
                label="No"
                icon="pi pi-times"
                text
                onClick={hideDeletepimpinan_jurusansDialog}
            />
            <Button
                label="Yes"
                icon="pi pi-check"
                text
                onClick={deleteSelectedpimpinan_jurusans}
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

                        <PimpinanJDataTable
                            dt={dt}
                            pimpinan_jurusans={pimpinan_jurusans}
                            selectedpimpinan_jurusans={selectedpimpinan_jurusans}
                            setSelectedpimpinan_jurusans={setSelectedpimpinan_jurusans}
                            globalFilter={globalFilter}
                            header={header}
                            editpimpinan_jurusan={editpimpinan_jurusan}
                            confirmDeletepimpinan_jurusan={confirmDeletepimpinan_jurusan}
                        />

                        <PimpinanJForm
                            pimpinan_jurusanDialog={pimpinan_jurusanDialog}
                            pimpinan_jurusan={pimpinan_jurusan}
                            setpimpinan_jurusan={setpimpinan_jurusan}
                            submitted={submitted}
                            dosenOptions={dosenOptions}
                            jabatan_pimpinanOptions={jabatan_pimpinanOptions}
                            pimpinan_jurusanDialogFooter={pimpinan_jurusanDialogFooter}
                            hideDialog={hideDialog}
                        />

                        <Dialog
                            visible={deletepimpinan_jurusanDialog}
                            style={{ width: "450px" }}
                            header="Confirm"
                            modal
                            footer={deletepimpinan_jurusanDialogFooter}
                            onHide={hideDeletepimpinan_jurusanDialog}
                        >
                            <div className="flex align-items-center justify-content-center">
                                <i
                                    className="pi pi-exclamation-triangle mr-3"
                                    style={{ fontSize: "2rem" }}
                                />
                                {pimpinan_jurusan && (
                                    <span>
                                        Are you sure you want to delete{" "}
                                        <b>{pimpinan_jurusan.name}</b>?
                                    </span>
                                )}
                            </div>
                        </Dialog>

                        <Dialog
                            visible={deletepimpinan_jurusansDialog}
                            style={{ width: "450px" }}
                            header="Confirm"
                            modal
                            footer={deletepimpinan_jurusansDialogFooter}
                            onHide={hideDeletepimpinan_jurusansDialog}
                        >
                            <div className="flex align-items-center justify-content-center">
                                <i
                                    className="pi pi-exclamation-triangle mr-3"
                                    style={{ fontSize: "2rem" }}
                                />
                                {pimpinan_jurusan && (
                                    <span>
                                        Are you sure you want to delete the
                                        selected pimpinan_jurusans?
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

export default pimpinan_jurusan;
