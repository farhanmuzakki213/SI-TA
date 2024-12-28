import Layout from "@/Layouts/layout/layout.jsx";
import { router, usePage } from "@inertiajs/react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useRef, useState } from "react";
import TaDataTable from "./component/taDataTable";
import TaForm from "./component/taForm";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";

const index = () => {

    const { props } = usePage();
    const { data_ta, data_sempro, data_mahasiswa, nextNumber, data_pkl } = props
    let emptyta = {
        id_ta_mhs: null,
        mahasiswa_id: data_mahasiswa[0].id_mahasiswa,
        judul: "",
    };
    const data_mahasiswas = data_mahasiswa[0];
    const [globalFilter, setGlobalFilter] = useState('');
    const [tas, settas] = useState(null);
    const [taDialog, settaDialog] = useState(false);
    const [ta, setta] = useState(emptyta);
    const [selectedtas, setSelectedtas] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const toast = useRef(null);
    const dt = useRef(null);
    useEffect(() => {
        settas(data_ta);
        displaySuccessMessage(props.flash?.success);
        displayErrorMessage(props.flash?.error);
    }, [data_ta, props.flash]);

    const hideDialog = () => {
        setSubmitted(false);
        settaDialog(false);
    };
    const openNew = () => {
        setta(emptyta);
        setSubmitted(false);
        settaDialog(true);
    };

    // console.log(data_dosen)
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

    const saveta = async () => {
        setSubmitted(true);

        const requiredFieldsForCreate = [
            ta.mahasiswa_id,
            ta.judul,
        ];

        const requiredFieldsForUpdate = [
            ta.mahasiswa_id,
            ta.judul,
        ];

        const isCreating = !ta.id_ta_mhs;
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
            formData.append("mahasiswa_id", ta.mahasiswa_id);
            formData.append("judul", ta.judul);

            if (isCreating) {
                formData.append("id_ta_mhs", nextNumber);
                // console.log(ta);
                await router.post("/MhsTA/Judul/store", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            } else {
                await router.post(`/MhsTA/Judul/${ta.id_ta_mhs}/update`, formData, {
                    _method: 'put',
                    forceFormData: true,
                });
            }

            if (isCreating) {
                settas((prev) => [...prev, ta]);
            } else {
                settas((prev) =>
                    prev.map((item) =>
                        item.id_ta_mhs === ta.id_ta_mhs ? ta : item
                    )
                );
            }
        } catch (error) {
            // console.log("error:",error);
            const errorMessage = error.response?.data?.message || "Failed to save ta.";
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: errorMessage,
                life: 3000,
            });
        } finally {
            setta(emptyta);
            settaDialog(false);
        }
    };

    const editta = (ta) => {
        setta({ ...ta });
        settaDialog(true);
    };

    const taDialogFooter = (
        <>
            <Button
                label="Cancel"
                icon="pi pi-times"
                text
                onClick={hideDialog}
            />
            <Button label="Save" icon="pi pi-check" text onClick={saveta} />
        </>
    );

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Mahasiswa Tugas Akhir</h5>
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
    const leftToolbarTemplate = () => {
        return (
            <>
                {data_mahasiswas.jenjang === "D3" && data_pkl[0]?.status_ver_pkl === "3" && (
                    <Button
                        label="New"
                        icon="pi pi-plus"
                        severity="success"
                        className="mr-2"
                        tooltip="Pengajuan Judul TA"
                        tooltipOptions={{ position: 'right', mouseTrack: false, mouseTrackRight: 15 }}
                        onClick={openNew}
                    />
                )}
            </>
        );
    };
    // console.log(data_ta);
    return (
        <Layout>
            <div className="grid crud-demo">
                <div className="col-12">
                    <div className="card">
                        <Toast ref={toast} />
                        <Toolbar
                            className="mb-4"
                            left={leftToolbarTemplate}
                        ></Toolbar>

                        <TaDataTable
                            dt={dt}
                            tas={tas}
                            selectedtas={selectedtas}
                            setSelectedtas={setSelectedtas}
                            globalFilter={globalFilter}
                            header={header}
                            editta={editta}
                        />

                        <TaForm
                            taDialog={taDialog}
                            ta={ta}
                            setta={setta}
                            submitted={submitted}
                            taDialogFooter={taDialogFooter}
                            hideDialog={hideDialog}
                        />
                    </div>
                </div>
            </div>
        </Layout >
    );
};


export default index;
