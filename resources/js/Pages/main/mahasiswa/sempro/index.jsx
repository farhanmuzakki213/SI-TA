import Layout from "@/Layouts/layout/layout.jsx";
import { router, usePage } from "@inertiajs/react";
import { Button } from "primereact/button";
import SemproForm from "./component/semproForm";
import { Toast } from 'primereact/toast';
import React, { useEffect, useRef, useState } from "react";
import DetailSempro from "./detail";
import { Toolbar } from "primereact/toolbar";
import { InputText } from "primereact/inputtext";
import SemproDataTable from "./component/semproDataTable";

const index = () => {
    const { props } = usePage();
    const { data_sempro, data_mahasiswa, nextNumber } = props
    let emptysempro = {
        id_sempro_mhs: null,
        mahasiswa_id: data_mahasiswa[0].id_mahasiswa,
        judul_sempro: '',
        file_sempro: '',
    };
    const data_sempros = data_sempro[0];
    console.log(data_sempro);
    const [sempros, setsempros] = useState(null);
    const [semproDialog, setsemproDialog] = useState(false);
    const [sempro, setsempro] = useState(emptysempro);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        setsempros(data_sempro);
        displaySuccessMessage(props.flash?.success);
        displayErrorMessage(props.flash?.error);
    }, [data_sempro, props.flash]);

    const openNew = () => {
        setsempro(emptysempro);
        setSubmitted(false);
        setsemproDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setsemproDialog(false);
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

    const savesempro = async () => {
        setSubmitted(true);

        const requiredFieldsForCreate = [
            sempro.judul_sempro,
            sempro.file_sempro
        ];

        const requiredFieldsForUpdate = [
            sempro.judul_sempro,
            sempro.file_sempro
        ];

        const isCreating = !sempro.id_sempro_mhs;
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

        try {

            const formData = new FormData();
            formData.append("mahasiswa_id", sempro.mahasiswa_id);
            formData.append("judul_sempro", sempro.judul_sempro);
            formData.append("file_sempro", sempro.file_sempro);

            if (isCreating) {
                formData.append("id_sempro_mhs", nextNumber);
                // console.log(sempro);
                await router.post("/MhsSempro/store", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            } else {
                await router.post(`/MhsSempro/${sempro.id_sempro_mhs}/update`, formData, {
                    _method: 'put',
                    forceFormData: true,
                });
            }

            if (isCreating) {
                setsempros((prev) => [...prev, sempro]);
            } else {
                setsempros((prev) =>
                    prev.map((item) =>
                        item.id_sempro_mhs === sempro.id_sempro_mhs ? sempro : item
                    )
                );
            }
        } catch (error) {
            // console.log("error:",error);
            const errorMessage = error.response?.data?.message || "Failed to save sempro.";
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: errorMessage,
                life: 3000,
            });
        } finally {
            setsempro(emptysempro);
            setsemproDialog(false);
        }
    };

    const editsempro = (sempro) => {
        setsempro({ ...sempro });
        setsemproDialog(true);
    };

    const leftToolbarTemplate = () => {
        return (
            <Button
                label="Sempro"
                icon="pi pi-plus"
                severity="success"
                className="mr-2"
                tooltip="Pengajuan Sempro"
                tooltipOptions={{ position: 'right', mouseTrack: false, mouseTrackRight: 15 }}
                onClick={openNew}
            />
        );
    };

    const semproDialogFooter = (
        <>
            <Button
                label="Cancel"
                icon="pi pi-times"
                text
                onClick={hideDialog}
            />
            <Button label="Save" icon="pi pi-check" text onClick={savesempro} />
        </>
    );
    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Mahasiswa Sempro</h5>
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
    return (
        <Layout>
            {data_sempros ? (
                data_sempros.status_ver_sempro === "3" ? (
                    <DetailSempro data_sempro={sempros} />
                ) : (
                    <>
                        <div className="grid crud-demo">
                            <div className="col-12">
                                <div className="card">
                                    <Toast ref={toast} />
                                    {data_sempros.status_ver_sempro === "1" && (
                                        <Toolbar
                                            className="mb-4"
                                            left={leftToolbarTemplate}
                                        ></Toolbar>
                                    )}
                                    <SemproDataTable
                                        dt={dt}
                                        sempros={sempros}
                                        globalFilter={globalFilter}
                                        header={header}
                                        editsempro={editsempro}
                                    />

                                    <SemproForm
                                        semproDialog={semproDialog}
                                        sempro={sempro}
                                        setsempro={setsempro}
                                        submitted={submitted}
                                        semproDialogFooter={semproDialogFooter}
                                        hideDialog={hideDialog}
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                )
            ) : (
                <>
                    <div className="grid crud-demo">
                        <div className="col-12">
                            <div className="card">
                                <Toast ref={toast} />
                                <Toolbar
                                    className="mb-4"
                                    left={leftToolbarTemplate}
                                ></Toolbar>
                                <SemproDataTable
                                    dt={dt}
                                    sempros={sempros}
                                    globalFilter={globalFilter}
                                    header={header}
                                    editsempro={editsempro}
                                />

                                <SemproForm
                                    semproDialog={semproDialog}
                                    sempro={sempro}
                                    setsempro={setsempro}
                                    submitted={submitted}
                                    semproDialogFooter={semproDialogFooter}
                                    hideDialog={hideDialog}
                                />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </Layout>
    );
};


export default index;
