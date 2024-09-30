import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { FileUpload } from "primereact/fileupload";
import { InputText } from "primereact/inputtext";
import { RadioButton } from "primereact/radiobutton";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import { classNames } from "primereact/utils";
import React, { useEffect, useRef, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import Layout from "@/Layouts/layout/layout.jsx";
import { Dropdown } from "primereact/dropdown";

const dosen = () => {
    let emptydosen = {
        id_dosen: null,
        user_id: null,
        prodi_id: null,
        nama_dosen: "",
        nidn_dosen: "",
        gender: "",
        status_dosen: "",
    };
    const { props } = usePage();
    const { data_dosen, prodiOptions: initialProdiOptions, userOptions: initialUserOptions } = props;
    const [dosens, setdosens] = useState(false);
    const [prodiOptions, setProdiOptions] = useState([]);
    const [userOptions, setUserOptions] = useState([]);
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
        setUserOptions(initialUserOptions);
        setdosens(data_dosen);
    }, [initialProdiOptions, initialUserOptions, data_dosen]);

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

        if (dosen.nama_dosen && dosen.user_id && dosen.prodi_id && dosen.nidn_dosen && dosen.gender && dosen.status_dosen) {
            let _dosen = { ...dosen };

            // Check if we're creating a new dosen
            if (!dosen.id_dosen) {
                const existingIds = dosens.map(d => d.id_dosen); // Get existing IDs
                _dosen.id_dosen = createId(existingIds); // Generate a unique ID for the new dosen
            }

            // Use Inertia to send data to the backend
            try {
                if (dosen.id_dosen) {
                    // Update existing dosen
                    await router.put(`/dosen/${dosen.id_dosen}/update`, _dosen);
                    toast.current?.show({
                        severity: "success",
                        summary: "Successful",
                        detail: "Dosen Updated",
                        life: 3000,
                    });
                } else {
                    // Create new dosen
                    await router.post('/dosen/store', _dosen);
                    toast.current?.show({
                        severity: "success",
                        summary: "Successful",
                        detail: "Dosen Created",
                        life: 3000,
                    });
                }

                // Reset dosen state and close the dialog
                setdosens((prevDosens) => [...prevDosens, _dosen]);
                setdosen(emptydosen);
                setdosenDialog(false);
            } catch (error) {
                console.error("Error saving dosen:", error);
                toast.current.show({
                    severity: "error",
                    summary: "Error",
                    detail: "Failed to save dosen.",
                    life: 3000,
                });
            }
        } else {
            // Handle validation failure
            toast.current.show({
                severity: "error",
                summary: "Error",
                detail: "Please fill in all required fields.",
                life: 3000,
            });
        }
    };

    // Edit function remains the same
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
    const exportCSV = () => {
        dt.current.exportCSV();
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



    const onInputChange = (e, field) => {
        const value = e.target ? e.target.value : e.value;
        setdosen((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };



    const onStatusChange = (e) => {
        let _dosen = { ...dosen };
        _dosen['status_dosen'] = e.value;

        setdosen(_dosen);
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

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <FileUpload
                    mode="basic"
                    accept="image/*"
                    maxFileSize={1000000}
                    label="Import"
                    chooseLabel="Import"
                    className="mr-2 inline-block"
                />
                <Button
                    label="Export"
                    icon="pi pi-upload"
                    severity="help"
                    onClick={exportCSV}
                />
            </React.Fragment>
        );
    };

    const namaBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Nama Dosen</span>
                {rowData.nama_dosen}
            </>
        );
    };

    const prodiBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Prodi</span>
                {rowData.r_prodi ? rowData.r_prodi.nama_prodi : 'N/A'}
            </>
        );
    };

    const nidnBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">NIDN</span>
                {rowData.nidn_dosen}
            </>
        );
    };

    const genderBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Gender</span>
                {rowData.gender}
            </>
        );
    };

    const statusBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Status</span>
                {rowData.status_dosen === "1" ? "Aktif" : "Tidak Aktif"}
            </>
        );
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <Button
                    icon="pi pi-pencil"
                    severity="success"
                    rounded
                    className="mr-2"
                    onClick={() => editdosen(rowData)}
                />
                <Button
                    icon="pi pi-trash"
                    severity="warning"
                    rounded
                    onClick={() => confirmDeletedosen(rowData)}
                />
            </>
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

                        <DataTable
                            ref={dt}
                            value={dosens}
                            selection={selecteddosens}
                            onSelectionChange={(e) =>
                                setSelecteddosens(e.value)
                            }
                            dataKey="id_dosen"
                            paginator
                            rows={10}
                            rowsPerPageOptions={[5, 10, 25]}
                            className="datatable-responsive"
                            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} dosens"
                            globalFilter={globalFilter}
                            emptyMessage="No dosens found."
                            header={header}
                            responsiveLayout="scroll"
                        >
                            <Column
                                selectionMode="multiple"
                                headerStyle={{ width: "4rem" }}
                            ></Column>
                            <Column
                                field="Nama"
                                header="Nama"
                                sortable
                                body={namaBodyTemplate}
                                headerStyle={{ minWidth: "15rem" }}
                            ></Column>
                            <Column
                                field="Prodi"
                                header="Prodi"
                                sortable
                                body={prodiBodyTemplate}
                                headerStyle={{ minWidth: "15rem" }}
                            ></Column>
                            <Column
                                field="NIDN"
                                header="NIDN"
                                body={nidnBodyTemplate}
                                sortable
                            ></Column>
                            <Column
                                field="Gender"
                                header="Gender"
                                sortable
                                body={genderBodyTemplate}
                                headerStyle={{ minWidth: "10rem" }}
                            ></Column>
                            <Column
                                field="Status"
                                header="Status"
                                body={statusBodyTemplate}
                                sortable
                            ></Column>
                            <Column
                                body={actionBodyTemplate}
                                headerStyle={{ minWidth: "10rem" }}
                            ></Column>
                        </DataTable>

                        <Dialog
                            visible={dosenDialog}
                            style={{ width: "450px" }}
                            header="Dosen Details"
                            modal
                            className="p-fluid"
                            footer={dosenDialogFooter}
                            onHide={hideDialog}
                        >
                            {/* Nama Dosen */}
                            <div className="field">
                                <label htmlFor="nama_dosen">Nama Dosen</label>
                                <InputText
                                    id="nama_dosen"
                                    value={dosen.nama_dosen || ''}  // Menggunakan state dosen
                                    onChange={(e) => onInputChange(e, "nama_dosen")}
                                    required
                                    autoFocus
                                    className={classNames({
                                        "p-invalid": submitted && !dosen.nama_dosen,
                                    })}
                                />
                                {submitted && !dosen.nama_dosen && (
                                    <small className="p-invalid">Nama Dosen is required.</small>
                                )}
                            </div>

                            {/* User ID */}
                            <div className="field">
                                <label htmlFor="user_id">User</label>
                                <Dropdown
                                    id="user_id"
                                    value={dosen.user_id || ''} // Menggunakan state dosen
                                    options={userOptions}
                                    onChange={(e) => onInputChange(e, "user_id")}
                                    placeholder="Select a User"
                                    required
                                />
                                {submitted && !dosen.user_id && (
                                    <small className="p-invalid">User is required.</small>
                                )}
                            </div>

                            {/* Prodi ID */}
                            <div className="field">
                                <label htmlFor="prodi_id">Prodi</label>
                                <Dropdown
                                    id="prodi_id"
                                    value={dosen.prodi_id || ''} // Menggunakan state dosen
                                    onChange={(e) => onInputChange(e, "prodi_id")}
                                    options={prodiOptions}
                                    placeholder="Select a Prodi"
                                    optionLabel="label"
                                    required
                                />
                                {submitted && !dosen.prodi_id && (
                                    <small className="p-invalid">Prodi is required.</small>
                                )}
                            </div>


                            {/* NIDN */}
                            <div className="field">
                                <label htmlFor="nidn_dosen">NIDN</label>
                                <input
                                    type="number"
                                    id="nidn_dosen"
                                    value={dosen.nidn_dosen || ''}
                                    onChange={(e) => onInputChange(e, "nidn_dosen")}
                                    required
                                    min="0"
                                    className="p-inputtext p-component"
                                />
                                {submitted && !dosen.nidn_dosen && (
                                    <small className="p-invalid">NIDN is required.</small>
                                )}
                            </div>

                            {/* Gender */}
                            <div className="field">
                                <label htmlFor="gender">Gender</label>
                                <Dropdown
                                    id="gender"
                                    value={dosen.gender || ''} // Menggunakan state dosen
                                    onChange={(e) => onInputChange(e, "gender")}
                                    options={[
                                        { label: "laki-laki", value: "laki-laki" },
                                        { label: "perempuan", value: "perempuan" },
                                    ]}
                                    placeholder="Select a Gender"
                                    required
                                />
                                {submitted && !dosen.gender && (
                                    <small className="p-invalid">Gender is required.</small>
                                )}
                            </div>

                            {/* Status Dosen */}
                            <div className="field">
                                <label className="mb-3">Status Dosen</label>
                                <div className="formgrid grid">
                                    <div className="field-radiobutton col-6">
                                        <RadioButton
                                            inputId="status1"
                                            name="status"
                                            value="0"
                                            onChange={onStatusChange}
                                            checked={dosen.status_dosen === "0"}
                                        />
                                        <label htmlFor="status1">Tidak Aktif</label>
                                    </div>
                                    <div className="field-radiobutton col-6">
                                        <RadioButton
                                            inputId="status2"
                                            name="status"
                                            value="1"
                                            onChange={onStatusChange}
                                            checked={dosen.status_dosen === "1"}
                                        />
                                        <label htmlFor="status2">Aktif</label>
                                    </div>
                                </div>
                            </div>
                        </Dialog>
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
