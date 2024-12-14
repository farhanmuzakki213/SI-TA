import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import React, { useEffect, useRef, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import Layout from "@/Layouts/layout/layout.jsx";
import JurusanDataTable from './component/JurusanDataTable';
import JurusanForm from './component/JurusanForm';
import CSVExportComponent from '@/Components/CSVExportComponent';
import CSVImportComponent from '@/Components/CSVImportComponent';

const jurusan = () => {
    let emptyjurusan = {
        id_jurusan: null,
        nama_jurusan: "",
        kode_jurusan: ""
    };

    const { props } = usePage();
    const { data_jurusan, nextNumber } = props;
    const [jurusans, setjurusans] = useState([]);
    const [jurusanDialog, setjurusanDialog] = useState(false);
    const [deletejurusanDialog, setDeletejurusanDialog] = useState(false);
    const [deletejurusansDialog, setDeletejurusansDialog] = useState(false);
    const [jurusan, setjurusan] = useState(emptyjurusan);
    const [selectedjurusans, setSelectedjurusans] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef(null);
    const dt = useRef(null);
    // console.log(props)

    useEffect(() => {
        setjurusans(data_jurusan);
        displaySuccessMessage(props.flash?.success);
        displayErrorMessage(props.flash?.error);
    }, [data_jurusan, props.flash]);

    const openNew = () => {
        setjurusan(emptyjurusan);
        setSubmitted(false);
        setjurusanDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setjurusanDialog(false);
    };

    const hideDeletejurusanDialog = () => {
        setDeletejurusanDialog(false);
    };

    const hideDeletejurusansDialog = () => {
        setDeletejurusansDialog(false);
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

    const saveJurusan = async () => {
        setSubmitted(true);

        const requiredFieldsForCreate = [
            jurusan.nama_jurusan,
            jurusan.kode_jurusan,
        ];

        const requiredFieldsForUpdate = [
            jurusan.nama_jurusan,
            jurusan.kode_jurusan,
        ];

        const isCreating = !jurusan.id_jurusan;
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

        let _jurusan = { ...jurusan };

        try {

            if (isCreating) {
                _jurusan.id_jurusan = nextNumber;
                await router.post('/jurusan/store', _jurusan);
            } else {
                await router.put(`/jurusan/${jurusan.id_jurusan}/update`, _jurusan);
            }

            if (isCreating) {
                setjurusans(prevjurusans => [...prevjurusans, _jurusan]);
            } else {
                setjurusans(prevJurusans =>
                    prevJurusans.map(d => d.id_jurusan === jurusan.id_jurusan ? _jurusan : d)
                );
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to save jurusan.";
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: errorMessage,
                life: 3000,
            });
        } finally {
            setjurusan(emptyjurusan);
            setjurusanDialog(false);
        }
    };

    const editjurusan = (jurusan) => {
        setjurusan({ ...jurusan });
        setjurusanDialog(true);
    };

    const confirmDeletejurusan = (jurusan) => {
        setjurusan(jurusan);
        setDeletejurusanDialog(true);
    };
    const deletejurusan = async () => {
        try {
            await router.delete(`/jurusan/${jurusan.id_jurusan}/delete`);
        } catch (error) {
            console.error("Error deleting jurusan:", error);
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: "Failed to delete jurusan.",
                life: 3000,
            });
        }
        finally {
            setDeletejurusanDialog(false);
        }
    };

    const confirmDeleteSelected = () => {
        setDeletejurusansDialog(true);
    };

    const deleteSelectedjurusans = async () => {
        if (!selectedjurusans || selectedjurusans.length === 0) {
            toast.current.show({
                severity: "warn",
                summary: "Warning",
                detail: "No jurusans selected for deletion.",
                life: 3000,
            });
            return;
        }

        const selectedIds = selectedjurusans.map(jurusan => jurusan.id_jurusan);

        try {
            await router.delete('/jurusan/destroyMultiple', {
                data: {
                    ids: selectedIds,
                },
            });
        } catch (error) {
            // console.error("Error deleting selected jurusans:", error);
            toast.current.show({
                severity: "error",
                summary: "Error",
                detail: "Failed to delete selected jurusans.",
                life: 3000,
            });
        } finally {
            setDeletejurusansDialog(false);
            setSelectedjurusans(null);
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
                        disabled={!selectedjurusans || !selectedjurusans.length}
                    />
                </div>
            </React.Fragment>
        );
    };

    const columns = [
        { header: 'ID', field: 'id_jurusan' },
        {
            header: 'Nama Jurusan',
            field: (jurusan) => `"${jurusan.nama_jurusan}"`
        },
        { header: 'Kode Jurusan', field: 'kode_jurusan' },
    ];
    const handleImport = (importedData) => {
        setJurusans(prevJurusans => [...prevJurusans, ...importedData]);
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <CSVImportComponent onImport={handleImport} toast={toast} />
                <CSVExportComponent data={jurusans} toast={toast} fileName="jurusan_data.csv" columns={columns} />
            </React.Fragment>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Jurusan</h5>
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

    const jurusanDialogFooter = (
        <>
            <Button
                label="Cancel"
                icon="pi pi-times"
                text
                onClick={hideDialog}
            />
            <Button label="Save" icon="pi pi-check" text onClick={saveJurusan} />
        </>
    );
    const deletejurusanDialogFooter = (
        <>
            <Button
                label="No"
                icon="pi pi-times"
                text
                onClick={hideDeletejurusanDialog}
            />
            <Button label="Yes" icon="pi pi-check" text onClick={deletejurusan} />
        </>
    );
    const deletejurusansDialogFooter = (
        <>
            <Button
                label="No"
                icon="pi pi-times"
                text
                onClick={hideDeletejurusansDialog}
            />
            <Button
                label="Yes"
                icon="pi pi-check"
                text
                onClick={deleteSelectedjurusans}
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

                        <JurusanDataTable
                            dt={dt}
                            jurusans={jurusans}
                            selectedjurusans={selectedjurusans}
                            setSelectedjurusans={setSelectedjurusans}
                            globalFilter={globalFilter}
                            header={header}
                            editjurusan={editjurusan}
                            confirmDeletejurusan={confirmDeletejurusan}
                        />

                        <JurusanForm
                            jurusanDialog={jurusanDialog}
                            jurusan={jurusan}
                            setjurusan={setjurusan}
                            submitted={submitted}
                            jurusanDialogFooter={jurusanDialogFooter}
                            hideDialog={hideDialog}
                        />

                        <Dialog
                            visible={deletejurusanDialog}
                            style={{ width: "450px" }}
                            header="Confirm"
                            modal
                            footer={deletejurusanDialogFooter}
                            onHide={hideDeletejurusanDialog}
                        >
                            <div className="flex align-items-center justify-content-center">
                                <i
                                    className="pi pi-exclamation-triangle mr-3"
                                    style={{ fontSize: "2rem" }}
                                />
                                {jurusan && (
                                    <span>
                                        Are you sure you want to delete{" "}
                                        <b>{jurusan.name}</b>?
                                    </span>
                                )}
                            </div>
                        </Dialog>

                        <Dialog
                            visible={deletejurusansDialog}
                            style={{ width: "450px" }}
                            header="Confirm"
                            modal
                            footer={deletejurusansDialogFooter}
                            onHide={hideDeletejurusansDialog}
                        >
                            <div className="flex align-items-center justify-content-center">
                                <i
                                    className="pi pi-exclamation-triangle mr-3"
                                    style={{ fontSize: "2rem" }}
                                />
                                {jurusan && (
                                    <span>
                                        Are you sure you want to delete the
                                        selected jurusans?
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

export default jurusan;
