import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import React, { useEffect, useRef, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import Layout from "@/Layouts/layout/layout.jsx";
import ProdiDataTable from './component/ProdiDataTable';
import ProdiForm from './component/ProdiForm';
import CSVExportComponent from '@/Components/CSVExportComponent';
import CSVImportComponent from '@/Components/CSVImportComponent';

const prodi = () => {
    let emptyprodi = {
        id_prodi: null,
        nama_prodi: "",
        kode_prodi: ""
    };

    const { props } = usePage();
    const { data_prodi, jurusanOptions: initialJurusanOptions } = props;
    const [prodis, setprodis] = useState(false)
    const [jurusanOptions, setJurusanOptions] = useState([]);;
    const [prodiDialog, setprodiDialog] = useState(false);
    const [deleteprodiDialog, setDeleteprodiDialog] = useState(false);
    const [deleteprodisDialog, setDeleteprodisDialog] = useState(false);
    const [prodi, setprodi] = useState(emptyprodi);
    const [selectedprodis, setSelectedprodis] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    // console.log(props)

    useEffect(() => {
        setprodis(data_prodi);
        setJurusanOptions(initialJurusanOptions);
        displaySuccessMessage(props.flash?.success);
        displayErrorMessage(props.flash?.error);
    }, [initialJurusanOptions, data_prodi, props.flash]);

    const openNew = () => {
        setprodi(emptyprodi);
        setSubmitted(false);
        setprodiDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setprodiDialog(false);
    };

    const hideDeleteprodiDialog = () => {
        setDeleteprodiDialog(false);
    };

    const hideDeleteprodisDialog = () => {
        setDeleteprodisDialog(false);
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

    const saveProdi = async () => {
        setSubmitted(true);

        const requiredFieldsForCreate = [
            prodi.nama_prodi,
            prodi.kode_prodi,
        ];

        const requiredFieldsForUpdate = [
            prodi.nama_prodi,
            prodi.kode_prodi,
        ];

        const isCreating = !prodi.id_prodi;
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

        let _prodi = { ...prodi };

        try {

            if (isCreating) {
                const existingIds = prodis.map(d => d.id_prodi);
                _prodi.id_prodi = createId(existingIds);
                await router.post('/prodi/store', _prodi);
            } else {
                await router.put(`/prodi/${prodi.id_prodi}/update`, _prodi);
            }

            if (isCreating) {
                setprodis(prevProdis => [...prevProdis, _prodi]);
            } else {
                setprodis(prevProdis =>
                    prevProdis.map(d => d.id_prodi === prodi.id_prodi ? _prodi : d)
                );
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to save prodi.";
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: errorMessage,
                life: 3000,
            });
        }finally {
            setprodi(emptyprodi);
            setprodiDialog(false);
        }
    };

    const editprodi = (prodi) => {
        setprodi({ ...prodi });
        setprodiDialog(true);
    };

    const confirmDeleteprodi = (prodi) => {
        setprodi(prodi);
        setDeleteprodiDialog(true);
    };
    const deleteprodi = async () => {
        try {
            await router.delete(`/prodi/${prodi.id_prodi}/delete`);
        } catch (error) {
            console.error("Error deleting prodi:", error);
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: "Failed to delete prodi.",
                life: 3000,
            });
        }
        finally {
            setDeleteprodiDialog(false);
        }
    };
    const createId = (existingIds) => {
        let id_prodi;
        const generateUniqueId = () => {
            return Math.floor(10000 + Math.random() * 90000);
        };
        do {
            id_prodi = generateUniqueId();
        } while (existingIds.includes(id_prodi));

        return id_prodi;
    };

    const confirmDeleteSelected = () => {
        setDeleteprodisDialog(true);
    };

    const deleteSelectedprodis = async () => {
        if (!selectedprodis || selectedprodis.length === 0) {
            toast.current.show({
                severity: "warn",
                summary: "Warning",
                detail: "No prodis selected for deletion.",
                life: 3000,
            });
            return;
        }

        const selectedIds = selectedprodis.map(prodi => prodi.id_prodi);

        try {
            await router.delete('/prodi/destroyMultiple', {
                data: {
                    ids: selectedIds,
                },
            });
        } catch (error) {
            // console.error("Error deleting selected prodis:", error);
            toast.current.show({
                severity: "error",
                summary: "Error",
                detail: "Failed to delete selected prodis.",
                life: 3000,
            });
        } finally {
            setDeleteprodisDialog(false);
            setSelectedprodis(null);
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
                        disabled={!selectedprodis || !selectedprodis.length}
                    />
                </div>
            </React.Fragment>
        );
    };

    const columns = [
        { header: 'ID', field: 'id_prodi' },
        {
            header: 'Name',
            field: (prodi) => `"${prodi.nama_prodi}"`
        },
        { header: 'Prodi', field: 'r_prodi.nama_prodi' },
        { header: 'Gender', field: 'gender' },
        {
            header: 'Status',
            field: (prodi) => prodi.status_prodi === "1" ? "Aktif" : "Tidak Aktif"
        }
    ];
    const handleImport = (importedData) => {
        setProdis(prevProdis => [...prevProdis, ...importedData]);
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <CSVImportComponent onImport={handleImport} toast={toast} />
                <CSVExportComponent data={prodis} toast={toast} fileName="prodi_data.csv" columns={columns} />
            </React.Fragment>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Prodi</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText
                    type="search"
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    placeholder="Search..."
                />
            </span>
        </div>
    );

    const prodiDialogFooter = (
        <>
            <Button
                label="Cancel"
                icon="pi pi-times"
                text
                onClick={hideDialog}
            />
            <Button label="Save" icon="pi pi-check" text onClick={saveProdi} />
        </>
    );
    const deleteprodiDialogFooter = (
        <>
            <Button
                label="No"
                icon="pi pi-times"
                text
                onClick={hideDeleteprodiDialog}
            />
            <Button label="Yes" icon="pi pi-check" text onClick={deleteprodi} />
        </>
    );
    const deleteprodisDialogFooter = (
        <>
            <Button
                label="No"
                icon="pi pi-times"
                text
                onClick={hideDeleteprodisDialog}
            />
            <Button
                label="Yes"
                icon="pi pi-check"
                text
                onClick={deleteSelectedprodis}
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

                        <ProdiDataTable
                            prodis={prodis}
                            selectedprodis={selectedprodis}
                            setSelectedprodis={setSelectedprodis}
                            globalFilter={globalFilter}
                            header={header}
                            editprodi={editprodi}
                            confirmDeleteprodi={confirmDeleteprodi}
                        />

                        <ProdiForm
                            prodiDialog={prodiDialog}
                            prodi={prodi}
                            setprodi={setprodi}
                            submitted={submitted}
                            jurusanOptions={jurusanOptions}
                            prodiDialogFooter={prodiDialogFooter}
                            hideDialog={hideDialog}
                        />

                        <Dialog
                            visible={deleteprodiDialog}
                            style={{ width: "450px" }}
                            header="Confirm"
                            modal
                            footer={deleteprodiDialogFooter}
                            onHide={hideDeleteprodiDialog}
                        >
                            <div className="flex align-items-center justify-content-center">
                                <i
                                    className="pi pi-exclamation-triangle mr-3"
                                    style={{ fontSize: "2rem" }}
                                />
                                {prodi && (
                                    <span>
                                        Are you sure you want to delete{" "}
                                        <b>{prodi.name}</b>?
                                    </span>
                                )}
                            </div>
                        </Dialog>

                        <Dialog
                            visible={deleteprodisDialog}
                            style={{ width: "450px" }}
                            header="Confirm"
                            modal
                            footer={deleteprodisDialogFooter}
                            onHide={hideDeleteprodisDialog}
                        >
                            <div className="flex align-items-center justify-content-center">
                                <i
                                    className="pi pi-exclamation-triangle mr-3"
                                    style={{ fontSize: "2rem" }}
                                />
                                {prodi && (
                                    <span>
                                        Are you sure you want to delete the
                                        selected prodis?
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

export default prodi;
