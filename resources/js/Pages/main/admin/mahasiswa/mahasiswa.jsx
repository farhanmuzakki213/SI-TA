import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import React, { useEffect, useRef, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import Layout from "@/Layouts/layout/layout.jsx";
import MahasiswaDataTable from './component/mahasiswaDataTable';
import MahasiswaForm from './component/mahasiswaForm';
import CSVExportComponent from '@/Components/CSVExportComponent';
import CSVImportComponent from '@/Components/CSVImportComponent';

const mahasiswa = () => {
    let emptymahasiswa = {
        id_mahasiswa: null,
        kelas_id: null,
        email: "",
        password: "",
        password_confirmation: "",
        nama_mahasiswa: "",
        nim_mahasiswa: "",
        gender: "",
        status_mahasiswa: ""
    };


    const { props } = usePage();
    const {data_mahasiswa, kelasOptions: initialKelasOptions, nextNumber } = props;
    const [mahasiswas, setmahasiswas] = useState(null);
    const [kelasOptions, setKelasOptions] = useState([]);
    const [mahasiswaDialog, setmahasiswaDialog] = useState(false);
    const [deletemahasiswaDialog, setDeletemahasiswaDialog] = useState(false);
    const [deletemahasiswasDialog, setDeletemahasiswasDialog] = useState(false);
    const [mahasiswa, setmahasiswa] = useState(emptymahasiswa);
    const [selectedmahasiswas, setSelectedmahasiswas] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        setKelasOptions(initialKelasOptions);
        setmahasiswas(data_mahasiswa);
        displaySuccessMessage(props.flash?.success);
        displayErrorMessage(props.flash?.error);
    }, [initialKelasOptions, data_mahasiswa, props.flash]);

    const openNew = () => {
        setmahasiswa(emptymahasiswa);
        setSubmitted(false);
        setmahasiswaDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setmahasiswaDialog(false);
    };

    const hideDeletemahasiswaDialog = () => {
        setDeletemahasiswaDialog(false);
    };

    const hideDeletemahasiswasDialog = () => {
        setDeletemahasiswasDialog(false);
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

    const savemahasiswa = async () => {
        setSubmitted(true);

        const requiredFieldsForCreate = [
            mahasiswa.nama_mahasiswa,
            mahasiswa.kelas_id,
            mahasiswa.nim_mahasiswa,
            mahasiswa.gender,
            mahasiswa.status_mahasiswa,
            mahasiswa.email,
            mahasiswa.password,
            mahasiswa.password_confirmation,
        ];

        const requiredFieldsForUpdate = [
            mahasiswa.nama_mahasiswa,
            mahasiswa.kelas_id,
            mahasiswa.nim_mahasiswa,
            mahasiswa.gender,
            mahasiswa.status_mahasiswa,
        ];

        const isCreating = !mahasiswa.id_mahasiswa;
        let isValid = true;

        if (isCreating) {
            isValid = requiredFieldsForCreate.every(field => field);
            if (isValid && mahasiswa.password !== mahasiswa.password_confirmation) {
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

        let _mahasiswa = { ...mahasiswa };

        try {

            if (isCreating) {
                _mahasiswa.id_mahasiswa = nextNumber;
                await router.post('/mahasiswa/store', _mahasiswa);
            } else {
                delete _mahasiswa.email;
                delete _mahasiswa.password;
                delete _mahasiswa.password_confirmation;

                await router.put(`/mahasiswa/${mahasiswa.id_mahasiswa}/update`, _mahasiswa);
            }

            if (isCreating) {
                setmahasiswas(prevmahasiswas => [...prevmahasiswas, _mahasiswa]);
            } else {
                setmahasiswas(prevmahasiswas =>
                    prevmahasiswas.map(d => d.id_mahasiswa === mahasiswa.id_mahasiswa ? _mahasiswa : d)
                );
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to save mahasiswa.";
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: errorMessage,
                life: 3000,
            });
        }finally{
            setmahasiswa(emptymahasiswa);
            setmahasiswaDialog(false);
        }
    };
    const editmahasiswa = (mahasiswa) => {
        setmahasiswa({ ...mahasiswa });
        setmahasiswaDialog(true);
    };

    const confirmDeletemahasiswa = (mahasiswa) => {
        setmahasiswa(mahasiswa);
        setDeletemahasiswaDialog(true);
    };
    const deletemahasiswa = async () => {
        try {
            await router.delete(`/mahasiswa/${mahasiswa.id_mahasiswa}/delete`);
        } catch (error) {
            console.error("Error deleting mahasiswa:", error);
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: "Failed to delete mahasiswa.",
                life: 3000,
            });
        }
        finally {
            setDeletemahasiswaDialog(false);
        }
    };

    const confirmDeleteSelected = () => {
        setDeletemahasiswasDialog(true);
    };

    const deleteSelectedmahasiswas = async () => {
        if (!selectedmahasiswas || selectedmahasiswas.length === 0) {
            toast.current.show({
                severity: "warn",
                summary: "Warning",
                detail: "No mahasiswas selected for deletion.",
                life: 3000,
            });
            return;
        }

        const selectedIds = selectedmahasiswas.map(mahasiswa => mahasiswa.id_mahasiswa);

        try {
            await router.delete('/mahasiswa/destroyMultiple', {
                data: {
                    ids: selectedIds,
                },
            });
        } catch (error) {
            console.error("Error deleting selected mahasiswas:", error);
            toast.current.show({
                severity: "error",
                summary: "Error",
                detail: "Failed to delete selected mahasiswas.",
                life: 3000,
            });
        } finally {
            setDeletemahasiswasDialog(false);
            setSelectedmahasiswas(null);
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
                        disabled={!selectedmahasiswas || !selectedmahasiswas.length}
                    />
                </div>
            </React.Fragment>
        );
    };

    const columns = [
        { header: 'ID', field: 'id_mahasiswa' },
        {
            header: 'Name',
            field: (mahasiswa) => `"${mahasiswa.nama_mahasiswa}"`
        },
        { header: 'Nim', field: 'nim_mahasiswa' },
        { header: 'Kelas', field: 'r_kelas.nama_kelas' },
        { header: 'Gender', field: 'gender' },
        {
            header: 'Status',
            field: (mahasiswa) => mahasiswa.status_mahasiswa === "1" ? "Aktif" : "Tidak Aktif"
        }
    ];
    const handleImport = (importedData) => {
        setmahasiswas(prevmahasiswas => [...prevmahasiswas, ...importedData]);
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <CSVImportComponent onImport={handleImport} toast={toast} />
                <CSVExportComponent data={mahasiswas} toast={toast} fileName="mahasiswa_data.csv" columns={columns} />
            </React.Fragment>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Mahasiswa</h5>
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

    const mahasiswaDialogFooter = (
        <>
            <Button
                label="Cancel"
                icon="pi pi-times"
                text
                onClick={hideDialog}
            />
            <Button label="Save" icon="pi pi-check" text onClick={savemahasiswa} />
        </>
    );
    const deletemahasiswaDialogFooter = (
        <>
            <Button
                label="No"
                icon="pi pi-times"
                text
                onClick={hideDeletemahasiswaDialog}
            />
            <Button label="Yes" icon="pi pi-check" text onClick={deletemahasiswa} />
        </>
    );
    const deletemahasiswasDialogFooter = (
        <>
            <Button
                label="No"
                icon="pi pi-times"
                text
                onClick={hideDeletemahasiswasDialog}
            />
            <Button
                label="Yes"
                icon="pi pi-check"
                text
                onClick={deleteSelectedmahasiswas}
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

                        <MahasiswaDataTable
                            mahasiswas={mahasiswas}
                            selectedmahasiswas={selectedmahasiswas}
                            setSelectedmahasiswas={setSelectedmahasiswas}
                            globalFilter={globalFilter}
                            header={header}
                            editmahasiswa={editmahasiswa}
                            confirmDeletemahasiswa={confirmDeletemahasiswa}
                        />

                        <MahasiswaForm
                            mahasiswaDialog={mahasiswaDialog}
                            mahasiswa={mahasiswa}
                            setmahasiswa={setmahasiswa}
                            submitted={submitted}
                            kelasOptions={kelasOptions}
                            mahasiswaDialogFooter={mahasiswaDialogFooter}
                            hideDialog={hideDialog}
                        />

                        <Dialog
                            visible={deletemahasiswaDialog}
                            style={{ width: "450px" }}
                            header="Confirm"
                            modal
                            footer={deletemahasiswaDialogFooter}
                            onHide={hideDeletemahasiswaDialog}
                        >
                            <div className="flex align-items-center justify-content-center">
                                <i
                                    className="pi pi-exclamation-triangle mr-3"
                                    style={{ fontSize: "2rem" }}
                                />
                                {mahasiswa && (
                                    <span>
                                        Are you sure you want to delete{" "}
                                        <b>{mahasiswa.name}</b>?
                                    </span>
                                )}
                            </div>
                        </Dialog>

                        <Dialog
                            visible={deletemahasiswasDialog}
                            style={{ width: "450px" }}
                            header="Confirm"
                            modal
                            footer={deletemahasiswasDialogFooter}
                            onHide={hideDeletemahasiswasDialog}
                        >
                            <div className="flex align-items-center justify-content-center">
                                <i
                                    className="pi pi-exclamation-triangle mr-3"
                                    style={{ fontSize: "2rem" }}
                                />
                                {mahasiswa && (
                                    <span>
                                        Are you sure you want to delete the
                                        selected mahasiswas?
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

export default mahasiswa;
