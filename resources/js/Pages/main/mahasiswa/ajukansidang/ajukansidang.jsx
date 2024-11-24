import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import React, { useEffect, useRef, useState } from "react";
import { router, useForm, usePage } from "@inertiajs/react";
import Layout from "@/Layouts/layout/layout.jsx";
import AjukansidangDataTable from './component/ajukansidangDataTable';
import AjukansidangForm from './component/ajukansidangForm';

const ajukansidang = () => {
    let emptyajukansidang = {
        id_pkl_mhs: '',
        pembimbing_pkl: '',
        judul: '',
        dokumen_pendukung: [],
    };

    const { props } = usePage();
    const { data_ajukansidang, total_log_book } = props;
    const [ajukansidangs, setajukansidangs] = useState(null);
    const [ajukansidangDialog, setajukansidangDialog] = useState(false);
    const [ajukansidang, setajukansidang] = useState(emptyajukansidang);
    const [selectedajukansidangs, setSelectedajukansidangs] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef(null);
    const dt = useRef(null);
    console.log(props);

    useEffect(() => {
        setajukansidangs(data_ajukansidang);
        displaySuccessMessage(props.flash?.success);
        displayErrorMessage(props.flash?.error);
    }, [data_ajukansidang, props.flash]);

    const hideDialog = () => {
        setSubmitted(false);
        setajukansidangDialog(false);
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

    const saveajukansidang = async () => {
        setSubmitted(true);

        const requiredFieldsForUpdate = [
            ajukansidang.pembimbing_pkl,
            ajukansidang.judul,
            ajukansidang.dokumen_pendukung,
        ];
        // console.log(ajukansidang);

        const isValid = requiredFieldsForUpdate.every(field => field);

        if (!isValid) {
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: "Please fill in all required fields.",
                life: 3000,
            });
            console.log(ajukansidang);
            return;
        }

        const formData = new FormData();
        formData.append('pembimbing_pkl', ajukansidang.pembimbing_pkl);
        formData.append('judul', ajukansidang.judul);
        if (ajukansidang.dokumen_pendukung && ajukansidang.dokumen_pendukung.length > 0) {
            ajukansidang.dokumen_pendukung.forEach((file, index) => {
                formData.append('dokumen_pendukung[]', file);
            });
        } else {
            console.error('Dokumen pendukung tidak ada');
        }

        try {
            await router.post(`/ajukansidang/${ajukansidang.id_pkl_mhs}/update`, formData, {
                _method: 'put',
                forceFormData: true,
            });

            setajukansidangs(prevAjukansidangs =>
                prevAjukansidangs.map(d => d.id_pkl_mhs === ajukansidang.id_pkl_mhs ? ajukansidang : d)
            );
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to save ajukansidang.";
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: errorMessage,
                life: 3000,
            });
        } finally {
            setajukansidang(emptyajukansidang);
            setajukansidangDialog(false);
        }
    };

    const editajukansidang = (ajukansidang) => {
        setajukansidang({ ...ajukansidang });
        setajukansidangDialog(true);
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Laporan PKL</h5>
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

    const ajukansidangDialogFooter = (
        <>
            <Button
                label="Cancel"
                icon="pi pi-times"
                text
                onClick={hideDialog}
            />
            <Button label="Save" icon="pi pi-check" text onClick={saveajukansidang} />
        </>
    );

    return (
        <Layout>
            <div className="grid crud-demo">
                <div className="col-12">
                    <div className="card">
                        <Toast ref={toast} />

                        {total_log_book > 3 ? (
                            <AjukansidangDataTable
                            ajukansidangs={ajukansidangs}
                            selectedajukansidangs={selectedajukansidangs}
                            setSelectedajukansidangs={setSelectedajukansidangs}
                            globalFilter={globalFilter}
                            header={header}
                            editajukansidang={editajukansidang}
                            dt={dt}
                            />
                        ) : (
                            <div>Laporan PKL Anda belum mencukupi syarat minimum untuk pengajuan sidang PKL, yaitu 16 laporan.</div>
                        )}


                        <AjukansidangForm
                            ajukansidangDialog={ajukansidangDialog}
                            ajukansidang={ajukansidang}
                            setajukansidang={setajukansidang}
                            submitted={submitted}
                            ajukansidangDialogFooter={ajukansidangDialogFooter}
                            hideDialog={hideDialog}
                        />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ajukansidang;
