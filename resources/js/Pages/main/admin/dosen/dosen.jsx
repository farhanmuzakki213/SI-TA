import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import React, { useEffect, useRef, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import Layout from "@/Layouts/layout/layout.jsx";
import DosenDataTable from './component/DosenDataTable';
import DosenForm from './component/DosenForm';
import CSVExportComponent from '@/Components/CSVExportComponent';
import CSVImportComponent from '@/Components/CSVImportComponent';

const dosen = () => {
    let emptydosen = {
        id_dosen: null,
        prodi_id: null,
        email: "",
        password: "",
        password_confirmation: "",
        nama_dosen: "",
        nidn_dosen: "",
        gender: "",
        status_dosen: ""
    };


    const { props } = usePage();
    const { data_dosen, prodiOptions: initialProdiOptions } = props;
    const [dosens, setdosens] = useState(false);
    const [prodiOptions, setProdiOptions] = useState([]);
    const [dosenDialog, setdosenDialog] = useState(false);
    const [deletedosenDialog, setDeletedosenDialog] = useState(false);
    const [deletedosensDialog, setDeletedosensDialog] = useState(false);
    const [dosen, setdosen] = useState(emptydosen);
    const [selecteddosens, setSelecteddosens] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        setProdiOptions(initialProdiOptions);
        setdosens(data_dosen);
    }, [initialProdiOptions, data_dosen]);

    const openNew = () => {
        setdosen(emptydosen);
        setSubmitted(false);
        setdosenDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setdosenDialog(false);
    };

    const hideDeletedosenDialog = () => {
        setDeletedosenDialog(false);
    };

    const hideDeletedosensDialog = () => {
        setDeletedosensDialog(false);
    };
    const saveDosen = async () => {
        setSubmitted(true);

        const requiredFieldsForCreate = [
            dosen.nama_dosen,
            dosen.prodi_id,
            dosen.nidn_dosen,
            dosen.gender,
            dosen.status_dosen,
            dosen.email,
            dosen.password,
            dosen.password_confirmation,
        ];

        const requiredFieldsForUpdate = [
            dosen.nama_dosen,
            dosen.prodi_id,
            dosen.nidn_dosen,
            dosen.gender,
            dosen.status_dosen,
        ];

        const isCreating = !dosen.id_dosen;
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

        let _dosen = { ...dosen };

        try {
            let response;

            if (isCreating) {
                const existingIds = dosens.map(d => d.id_dosen);
                _dosen.id_dosen = createId(existingIds);
                response = await router.post('/dosen/store', _dosen);
            } else {
                delete _dosen.email;
                delete _dosen.password;
                delete _dosen.password_confirmation;

                response = await router.put(`/dosen/${dosen.id_dosen}/update`, _dosen);
            }

            if (response && response.data) {
                const message = response.data.success || response.data.message || "Operation successful";
                toast.current?.show({
                    severity: "success",
                    summary: "Successful",
                    detail: message,
                    life: 3000,
                });

                // Khusus untuk DEBUG
                // if (isCreating) {
                //     setdosens(prevDosens => [...prevDosens, _dosen]);
                // } else {
                //     setdosens(prevDosens =>
                //         prevDosens.map(d => d.id_dosen === dosen.id_dosen ? _dosen : d)
                //     );
                // }

                // setdosen(emptydosen);
                // setdosenDialog(false);
            }

            if (isCreating) {
                setdosens(prevDosens => [...prevDosens, _dosen]);
            } else {
                setdosens(prevDosens =>
                    prevDosens.map(d => d.id_dosen === dosen.id_dosen ? _dosen : d)
                );
            }

            setdosen(emptydosen);
            setdosenDialog(false);
            // Khusus untuk DEBUG
            // else {
            //     // Menangani kasus di mana response tidak memiliki data yang diharapkan
            //     toast.current?.show({
            //         severity: "error",
            //         summary: "Error",
            //         detail: "Unexpected response format.",
            //         life: 3000,
            //     });
            // }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to save dosen.";
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: errorMessage,
                life: 3000,
            });
        }
    };
    const editdosen = (dosen) => {
        setdosen({ ...dosen });
        setdosenDialog(true);
    };

    const confirmDeletedosen = (dosen) => {
        setdosen(dosen);
        setDeletedosenDialog(true);
    };
    const deletedosen = async (id_dosen) => {
        try {
            await router.delete(`/dosen/${dosen.id_dosen}/delete`);
            toast.current?.show({
                severity: "success",
                summary: "Successful",
                detail: "Dosen Deleted",
                life: 3000,
            });
        } catch (error) {
            console.error("Error deleting dosen:", error);
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: "Failed to delete dosen.",
                life: 3000,
            });
        }
        finally {
            setDeletedosenDialog(false);
        }
    };
    const createId = (existingIds) => {
        let id_dosen;
        const generateUniqueId = () => {
            return Math.floor(10000 + Math.random() * 90000);
        };
        do {
            id_dosen = generateUniqueId();
        } while (existingIds.includes(id_dosen));

        return id_dosen;
    };

    const confirmDeleteSelected = () => {
        setDeletedosensDialog(true);
    };

    const deleteSelecteddosens = async () => {
        if (!selecteddosens || selecteddosens.length === 0) {
            toast.current.show({
                severity: "warn",
                summary: "Warning",
                detail: "No dosens selected for deletion.",
                life: 3000,
            });
            return;
        }

        const selectedIds = selecteddosens.map(dosen => dosen.id_dosen);

        try {
            await router.delete('/dosen/destroyMultiple', {
                data: {
                    ids: selectedIds,
                },
            });

            toast.current.show({
                severity: "success",
                summary: "Successful",
                detail: "Selected dosens deleted.",
                life: 3000,
            });
        } catch (error) {
            console.error("Error deleting selected dosens:", error);
            toast.current.show({
                severity: "error",
                summary: "Error",
                detail: "Failed to delete selected dosens.",
                life: 3000,
            });
        } finally {
            setDeletedosensDialog(false);
            setSelecteddosens(null);
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
                        disabled={!selecteddosens || !selecteddosens.length}
                    />
                </div>
            </React.Fragment>
        );
    };

    const columns = [
        { header: 'ID', field: 'id_dosen' },
        {
            header: 'Name',
            field: (dosen) => `"${dosen.nama_dosen}"`
        },
        { header: 'Prodi', field: 'r_prodi.nama_prodi' },
        { header: 'Gender', field: 'gender' },
        {
            header: 'Status',
            field: (dosen) => dosen.status_dosen === "1" ? "Aktif" : "Tidak Aktif"
        }
    ];
    const handleImport = (importedData) => {
        setDosens(prevDosens => [...prevDosens, ...importedData]);
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <CSVImportComponent onImport={handleImport} toast={toast} />
                <CSVExportComponent data={dosens} toast={toast} fileName="dosen_data.csv" columns={columns} />
            </React.Fragment>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Dosen</h5>
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

    const dosenDialogFooter = (
        <>
            <Button
                label="Cancel"
                icon="pi pi-times"
                text
                onClick={hideDialog}
            />
            <Button label="Save" icon="pi pi-check" text onClick={saveDosen} />
        </>
    );
    const deletedosenDialogFooter = (
        <>
            <Button
                label="No"
                icon="pi pi-times"
                text
                onClick={hideDeletedosenDialog}
            />
            <Button label="Yes" icon="pi pi-check" text onClick={deletedosen} />
        </>
    );
    const deletedosensDialogFooter = (
        <>
            <Button
                label="No"
                icon="pi pi-times"
                text
                onClick={hideDeletedosensDialog}
            />
            <Button
                label="Yes"
                icon="pi pi-check"
                text
                onClick={deleteSelecteddosens}
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

                        <DosenDataTable
                            dosens={dosens}
                            selecteddosens={selecteddosens}
                            setSelecteddosens={setSelecteddosens}
                            globalFilter={globalFilter}
                            header={header}
                            editdosen={editdosen}
                            confirmDeletedosen={confirmDeletedosen}
                        />

                        <DosenForm
                            dosenDialog={dosenDialog}
                            dosen={dosen}
                            setdosen={setdosen}
                            submitted={submitted}
                            prodiOptions={prodiOptions}
                            dosenDialogFooter={dosenDialogFooter}
                            hideDialog={hideDialog}
                        />

                        <Dialog
                            visible={deletedosenDialog}
                            style={{ width: "450px" }}
                            header="Confirm"
                            modal
                            footer={deletedosenDialogFooter}
                            onHide={hideDeletedosenDialog}
                        >
                            <div className="flex align-items-center justify-content-center">
                                <i
                                    className="pi pi-exclamation-triangle mr-3"
                                    style={{ fontSize: "2rem" }}
                                />
                                {dosen && (
                                    <span>
                                        Are you sure you want to delete{" "}
                                        <b>{dosen.name}</b>?
                                    </span>
                                )}
                            </div>
                        </Dialog>

                        <Dialog
                            visible={deletedosensDialog}
                            style={{ width: "450px" }}
                            header="Confirm"
                            modal
                            footer={deletedosensDialogFooter}
                            onHide={hideDeletedosensDialog}
                        >
                            <div className="flex align-items-center justify-content-center">
                                <i
                                    className="pi pi-exclamation-triangle mr-3"
                                    style={{ fontSize: "2rem" }}
                                />
                                {dosen && (
                                    <span>
                                        Are you sure you want to delete the
                                        selected dosens?
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

export default dosen;
