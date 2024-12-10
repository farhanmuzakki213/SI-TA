import Layout from "@/Layouts/layout/layout.jsx";
import { router, usePage } from "@inertiajs/react";
import { Button } from "primereact/button";
import SemproForm from "./component/semproForm";
import { Toast } from 'primereact/toast';
import React, { useEffect, useRef, useState } from "react";
const index = () => {
    const { props } = usePage();
    const { data_sempro, data_mahasiswa, nextNumber } = props
    let emptysempro = {
        id_sempro_mhs: null,
        mahasiswa_id: data_mahasiswa[0].id_mahasiswa,
        judul_sempro: '',
        file_sempro: '',
    };
    console.log(data_sempro);
    const [sempros, setsempros] = useState(null);
    const [semproDialog, setsemproDialog] = useState(false);
    const [sempro, setsempro] = useState(emptysempro);
    const [submitted, setSubmitted] = useState(false);
    const toast = useRef(null);

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
    return (
        <Layout>
            <Toast ref={toast} />
            <div className="tw-flex tw-flex-col sm:tw-flex-row tw-gap-4">
                <div className="tw-w-full sm:tw-max-w-sm">
                    <div className="tw-rounded-[12px] tw-border tw-bg-white tw-px-4 tw-pt-8 tw-pb-10 tw-shadow-lg">
                        <div className="tw-relative tw-mx-auto tw-w-40 tw-h-40 tw-rounded-full tw-overflow-hidden">
                            <img
                                src={data_mahasiswa[0].foto_mahasiswa}
                                alt="Michael Simbal"
                                className="tw-object-cover tw-w-full tw-h-full"
                            />
                        </div>
                        <div className="tw-text-center tw-mt-4">
                            <h1 className="tw-text-xl tw-font-bold tw-text-gray-900">{data_mahasiswa[0].nama_mahasiswa}</h1>
                            <p className="tw-text-sm tw-text-gray-600">{data_mahasiswa[0].nim_mahasiswa}</p>
                            <p className="tw-mt-2 tw-text-sm tw-text-gray-500">{data_mahasiswa[0].prodi}</p>
                        </div>
                    </div>
                </div>
                <div className="tw-w-full sm:tw-max-w-96">
                    <div className="tw-grid tw-gap-1">
                        <div className="tw-col-12">
                            <div className="card">
                                {!data_sempro[0] ? (
                                    <Button
                                        label="Sempro"
                                        icon="pi pi-plus"
                                        severity="success"
                                        className="mr-2"
                                        tooltip="Pengajuan Sempro"
                                        tooltipOptions={{ position: 'right', mouseTrack: false, mouseTrackRight: 15 }}
                                        onClick={openNew}
                                    />
                                ) : (
                                    <p>detail sempro</p>
                                )}

                            </div>
                        </div>
                    </div>
                </div>
                <SemproForm
                    semproDialog={semproDialog}
                    sempro={sempro}
                    setsempro={setsempro}
                    submitted={submitted}
                    semproDialogFooter={semproDialogFooter}
                    hideDialog={hideDialog}
                />
            </div>
        </Layout>
    );
};


export default index;
