import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import React, { useEffect, useRef, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import Layout from "@/Layouts/layout/layout.jsx";
import MhspklDataTable from './component/mhspklDataTable';
import MhspklForm from './component/mhspklForm';
import CSVExportComponent from '@/Components/CSVExportComponent';
import CSVImportComponent from '@/Components/CSVImportComponent';

const mhspkl = () => {
    let emptymhspkl = {
        id_pkl_mhs: null,
        pembimbing_id: null,
        penguji_id: null,
        usulan_tempat_pkl_id: null,
    };

    const { props } = usePage();
    const { data_mhspkl, dosenOptions: initialDosenOptions, usulanOptions: initialUsulanOptions, nextNumber } = props;
    const [mhspkls, setmhspkls] = useState(null);
    const [dosenOptions, setDosenOptions] = useState([]);
    const [usulanOptions, setUsulanOptions] = useState([]);
    const [mhspklDialog, setmhspklDialog] = useState(false);
    const [deletemhspklDialog, setDeletemhspklDialog] = useState(false);
    const [deletemhspklsDialog, setDeletemhspklsDialog] = useState(false);
    const [mhspkl, setmhspkl] = useState(emptymhspkl);
    const [selectedmhspkls, setSelectedmhspkls] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef(null);
    const dt = useRef(null);
    // console.log(props.usulanOptions);

    useEffect(() => {
        setDosenOptions(initialDosenOptions);
        setUsulanOptions(initialUsulanOptions);
        setmhspkls(data_mhspkl);
        displaySuccessMessage(props.flash?.success);
        displayErrorMessage(props.flash?.error);
    }, [initialDosenOptions, initialUsulanOptions, data_mhspkl, props.flash]);

    const openNew = () => {
        setmhspkl(emptymhspkl);
        setSubmitted(false);
        setmhspklDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setmhspklDialog(false);
    };

    const hideDeletemhspklDialog = () => {
        setDeletemhspklDialog(false);
    };

    const hideDeletemhspklsDialog = () => {
        setDeletemhspklsDialog(false);
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

    const savemhspkl = async () => {
        setSubmitted(true);

        const requiredFieldsForCreate = [
            mhspkl.pembimbing_id,
            mhspkl.penguji_id,
            mhspkl.usulan_tempat_pkl_id,
        ];

        const requiredFieldsForUpdate = [
            mhspkl.pembimbing_id,
            mhspkl.penguji_id,
            mhspkl.usulan_tempat_pkl_id,
        ];

        const isCreating = !mhspkl.id_pkl_mhs;
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

        if (mhspkl.pembimbing_id === mhspkl.penguji_id) {
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: "Pembimbing and Penguji cannot be the same.",
                life: 3000,
            });
            return;
        }

        let _mhspkl = { ...mhspkl };

        try {

            if (isCreating) {
                _mhspkl.id_pkl_mhs = nextNumber;
                await router.post('/mhspkl/store', _mhspkl);
            } else {
                await router.put(`/mhspkl/${mhspkl.id_pkl_mhs}/update`, _mhspkl);
            }

            if (isCreating) {
                setmhspkls(prevMhspkls => [...prevMhspkls, _mhspkl]);
            } else {
                setmhspkls(prevMhspkls =>
                    prevMhspkls.map(d => d.id_pkl_mhs === mhspkl.id_pkl_mhs ? _mhspkl : d)
                );
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to save mhspkl.";
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: errorMessage,
                life: 3000,
            });
        } finally {
            setmhspkl(emptymhspkl);
            setmhspklDialog(false);
        }
    };

    const editmhspkl = (mhspkl) => {
        setmhspkl({ ...mhspkl });
        setmhspklDialog(true);
    };

    const confirmDeletemhspkl = (mhspkl) => {
        setmhspkl(mhspkl);
        setDeletemhspklDialog(true);
    };
    const deletemhspkl = async () => {
        try {
            await router.delete(`/mhspkl/${mhspkl.id_pkl_mhs}/delete`);
        } catch (error) {
            console.error("Error deleting mhspkl:", error);
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: "Failed to delete mhspkl.",
                life: 3000,
            });
        }
        finally {
            setDeletemhspklDialog(false);
        }
    };

    const confirmDeleteSelected = () => {
        setDeletemhspklsDialog(true);
    };

    const deleteSelectedmhspkls = async () => {
        if (!selectedmhspkls || selectedmhspkls.length === 0) {
            toast.current.show({
                severity: "warn",
                summary: "Warning",
                detail: "No mhspkls selected for deletion.",
                life: 3000,
            });
            return;
        }

        const selectedIds = selectedmhspkls.map(mhspkl => mhspkl.id_pkl_mhs);

        try {
            await router.delete('/mhspkl/destroyMultiple', {
                data: {
                    ids: selectedIds,
                },
            });
        } catch (error) {
            // console.error("Error deleting selected mhspkls:", error);
            toast.current.show({
                severity: "error",
                summary: "Error",
                detail: "Failed to delete selected mhspkls.",
                life: 3000,
            });
        } finally {
            setDeletemhspklsDialog(false);
            setSelectedmhspkls(null);
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
                        disabled={!selectedmhspkls || !selectedmhspkls.length}
                    />
                </div>
            </React.Fragment>
        );
    };

    const columns = [
        { header: 'ID', field: 'id_pkl_mhs' },
        {
            header: 'Nama mhspkl',
            field: (mhspkl) => `"${mhspkl.nama_mhspkl}"`
        },
        { header: 'Kode mhspkl', field: 'pembimbing_id' },
    ];
    const handleImport = (importedData) => {
        setMhspkls(prevMhspkls => [...prevMhspkls, ...importedData]);
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <CSVImportComponent onImport={handleImport} toast={toast} />
                <CSVExportComponent data={mhspkls} toast={toast} fileName="mhspkl_data.csv" columns={columns} />
            </React.Fragment>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Mahasiswa PKL</h5>
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

    const mhspklDialogFooter = (
        <>
            <Button
                label="Cancel"
                icon="pi pi-times"
                text
                onClick={hideDialog}
            />
            <Button label="Save" icon="pi pi-check" text onClick={savemhspkl} />
        </>
    );
    const deletemhspklDialogFooter = (
        <>
            <Button
                label="No"
                icon="pi pi-times"
                text
                onClick={hideDeletemhspklDialog}
            />
            <Button label="Yes" icon="pi pi-check" text onClick={deletemhspkl} />
        </>
    );
    const deletemhspklsDialogFooter = (
        <>
            <Button
                label="No"
                icon="pi pi-times"
                text
                onClick={hideDeletemhspklsDialog}
            />
            <Button
                label="Yes"
                icon="pi pi-check"
                text
                onClick={deleteSelectedmhspkls}
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

                        <MhspklDataTable
                            dt={dt}
                            mhspkls={mhspkls}
                            selectedmhspkls={selectedmhspkls}
                            setSelectedmhspkls={setSelectedmhspkls}
                            globalFilter={globalFilter}
                            header={header}
                            editmhspkl={editmhspkl}
                            confirmDeletemhspkl={confirmDeletemhspkl}
                        />

                        <MhspklForm
                            mhspklDialog={mhspklDialog}
                            mhspkl={mhspkl}
                            setmhspkl={setmhspkl}
                            submitted={submitted}
                            mhspklDialogFooter={mhspklDialogFooter}
                            hideDialog={hideDialog}
                            dosenOptions={dosenOptions}
                            usulanOptions={usulanOptions}
                        />

                        <Dialog
                            visible={deletemhspklDialog}
                            style={{ width: "450px" }}
                            header="Confirm"
                            modal
                            footer={deletemhspklDialogFooter}
                            onHide={hideDeletemhspklDialog}
                        >
                            <div className="flex align-items-center justify-content-center">
                                <i
                                    className="pi pi-exclamation-triangle mr-3"
                                    style={{ fontSize: "2rem" }}
                                />
                                {mhspkl && (
                                    <span>
                                        Are you sure you want to delete{" "}
                                        <b>{mhspkl.name}</b>?
                                    </span>
                                )}
                            </div>
                        </Dialog>

                        <Dialog
                            visible={deletemhspklsDialog}
                            style={{ width: "450px" }}
                            header="Confirm"
                            modal
                            footer={deletemhspklsDialogFooter}
                            onHide={hideDeletemhspklsDialog}
                        >
                            <div className="flex align-items-center justify-content-center">
                                <i
                                    className="pi pi-exclamation-triangle mr-3"
                                    style={{ fontSize: "2rem" }}
                                />
                                {mhspkl && (
                                    <span>
                                        Are you sure you want to delete the
                                        selected mhspkls?
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

export default mhspkl;
