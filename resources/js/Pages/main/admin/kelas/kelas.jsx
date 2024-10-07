import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import React, { useEffect, useRef, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import Layout from "@/Layouts/layout/layout.jsx";
import KelasDataTable from './component/KelasDataTable';
import KelasForm from './component/KelasForm';
import CSVExportComponent from '@/Components/CSVExportComponent';
import CSVImportComponent from '@/Components/CSVImportComponent';

const kelas = () => {
    let emptykelas = {
        id_kelas: null,
        nama_kelas: "",
        kode_kelas: "",
        prodi_id: null,
        smt_thnakd_id: null,
    };

    const { props } = usePage();
    const { data_kelas, prodiOptions: initialProdiOptions, smt_thnakdOptions: initialSmt_thnakdOptions, nextNumber } = props;
    const [kelass, setkelass] = useState(null)
    const [prodiOptions, setProdiOptions] = useState([]);
    const [smt_thnakdOptions, setSmt_thnakdOptions] = useState([]);
    const [kelasDialog, setkelasDialog] = useState(false);
    const [deletekelasDialog, setDeletekelasDialog] = useState(false);
    const [deletekelassDialog, setDeletekelassDialog] = useState(false);
    const [kelas, setkelas] = useState(emptykelas);
    const [selectedkelass, setSelectedkelass] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef(null);
    const dt = useRef(null);
    // console.log(props.smt_thnakdOptions)

    useEffect(() => {
        setkelass(data_kelas);
        setProdiOptions(initialProdiOptions);
        setSmt_thnakdOptions(initialSmt_thnakdOptions);
        displaySuccessMessage(props.flash?.success);
        displayErrorMessage(props.flash?.error);
    }, [initialProdiOptions, initialSmt_thnakdOptions, data_kelas, props.flash]);

    const openNew = () => {
        setkelas(emptykelas);
        setSubmitted(false);
        setkelasDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setkelasDialog(false);
    };

    const hideDeletekelasDialog = () => {
        setDeletekelasDialog(false);
    };

    const hideDeletekelassDialog = () => {
        setDeletekelassDialog(false);
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

    const savekelas = async () => {
        setSubmitted(true);

        const requiredFieldsForCreate = [
            kelas.nama_kelas,
            kelas.kode_kelas,
            kelas.prodi_id,
        ];

        const requiredFieldsForUpdate = [
            kelas.nama_kelas,
            kelas.kode_kelas,
            kelas.prodi_id,
            kelas.smt_thnakd_id,
        ];

        const isCreating = !kelas.id_kelas;
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

        let _kelas = { ...kelas };

        try {

            if (isCreating) {
                _kelas.id_kelas = nextNumber;
                await router.post('/kelas/store', _kelas);
            } else {
                await router.put(`/kelas/${kelas.id_kelas}/update`, _kelas);
            }

            if (isCreating) {
                setkelass(prevKelass => [...prevKelass, _kelas]);
            } else {
                setkelass(prevKelass =>
                    prevKelass.map(d => d.id_kelas === kelas.id_kelas ? _kelas : d)
                );
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to save kelas.";
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: errorMessage,
                life: 3000,
            });
        } finally {
            setkelas(emptykelas);
            setkelasDialog(false);
        }
    };

    const editkelas = (kelas) => {
        setkelas({ ...kelas });
        setkelasDialog(true);
    };

    const confirmDeletekelas = (kelas) => {
        setkelas(kelas);
        setDeletekelasDialog(true);
    };
    const deletekelas = async () => {
        try {
            await router.delete(`/kelas/${kelas.id_kelas}/delete`);
        } catch (error) {
            console.error("Error deleting kelas:", error);
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: "Failed to delete kelas.",
                life: 3000,
            });
        }
        finally {
            setDeletekelasDialog(false);
        }
    };

    const confirmDeleteSelected = () => {
        setDeletekelassDialog(true);
    };

    const deleteSelectedkelass = async () => {
        if (!selectedkelass || selectedkelass.length === 0) {
            toast.current.show({
                severity: "warn",
                summary: "Warning",
                detail: "No kelass selected for deletion.",
                life: 3000,
            });
            return;
        }

        const selectedIds = selectedkelass.map(kelas => kelas.id_kelas);

        try {
            await router.delete('/kelas/destroyMultiple', {
                data: {
                    ids: selectedIds,
                },
            });
        } catch (error) {
            // console.error("Error deleting selected kelass:", error);
            toast.current.show({
                severity: "error",
                summary: "Error",
                detail: "Failed to delete selected kelass.",
                life: 3000,
            });
        } finally {
            setDeletekelassDialog(false);
            setSelectedkelass(null);
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
                        disabled={!selectedkelass || !selectedkelass.length}
                    />
                </div>
            </React.Fragment>
        );
    };

    const columns = [
        { header: 'ID', field: 'id_kelas' },
        {
            header: 'Nama Kelas',
            field: (kelas) => `"${kelas.nama_kelas}"`
        },
        { header: 'Kode Kelas', field: 'kode_kelas' },
        { header: 'Nama Prodi', field: 'r_prodi.nama_prodi' },
        { header: 'Semester dan Tahun Akademik', field: 'r_smt_thnakd.nama_smt_thnakd' },
    ];
    const handleImport = (importedData) => {
        setkelass(prevKelass => [...prevKelass, ...importedData]);
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <CSVImportComponent onImport={handleImport} toast={toast} />
                <CSVExportComponent data={kelass} toast={toast} fileName="kelas_data.csv" columns={columns} />
            </React.Fragment>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Kelas</h5>
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

    const kelasDialogFooter = (
        <>
            <Button
                label="Cancel"
                icon="pi pi-times"
                text
                onClick={hideDialog}
            />
            <Button label="Save" icon="pi pi-check" text onClick={savekelas} />
        </>
    );
    const deletekelasDialogFooter = (
        <>
            <Button
                label="No"
                icon="pi pi-times"
                text
                onClick={hideDeletekelasDialog}
            />
            <Button label="Yes" icon="pi pi-check" text onClick={deletekelas} />
        </>
    );
    const deletekelassDialogFooter = (
        <>
            <Button
                label="No"
                icon="pi pi-times"
                text
                onClick={hideDeletekelassDialog}
            />
            <Button
                label="Yes"
                icon="pi pi-check"
                text
                onClick={deleteSelectedkelass}
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

                        <KelasDataTable
                            dt={dt}
                            kelass={kelass}
                            selectedkelass={selectedkelass}
                            setSelectedkelass={setSelectedkelass}
                            globalFilter={globalFilter}
                            header={header}
                            editkelas={editkelas}
                            confirmDeletekelas={confirmDeletekelas}
                        />

                        <KelasForm
                            kelasDialog={kelasDialog}
                            kelas={kelas}
                            setkelas={setkelas}
                            submitted={submitted}
                            prodiOptions={prodiOptions}
                            smt_thnakdOptions={smt_thnakdOptions}
                            kelasDialogFooter={kelasDialogFooter}
                            hideDialog={hideDialog}
                        />

                        <Dialog
                            visible={deletekelasDialog}
                            style={{ width: "450px" }}
                            header="Confirm"
                            modal
                            footer={deletekelasDialogFooter}
                            onHide={hideDeletekelasDialog}
                        >
                            <div className="flex align-items-center justify-content-center">
                                <i
                                    className="pi pi-exclamation-triangle mr-3"
                                    style={{ fontSize: "2rem" }}
                                />
                                {kelas && (
                                    <span>
                                        Are you sure you want to delete{" "}
                                        <b>{kelas.name}</b>?
                                    </span>
                                )}
                            </div>
                        </Dialog>

                        <Dialog
                            visible={deletekelassDialog}
                            style={{ width: "450px" }}
                            header="Confirm"
                            modal
                            footer={deletekelassDialogFooter}
                            onHide={hideDeletekelassDialog}
                        >
                            <div className="flex align-items-center justify-content-center">
                                <i
                                    className="pi pi-exclamation-triangle mr-3"
                                    style={{ fontSize: "2rem" }}
                                />
                                {kelas && (
                                    <span>
                                        Are you sure you want to delete the
                                        selected kelass?
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

export default kelas;
