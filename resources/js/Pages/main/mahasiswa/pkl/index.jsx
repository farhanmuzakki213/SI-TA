import Layout from "@/Layouts/layout/layout.jsx";
import { router, usePage } from "@inertiajs/react";
import { Button } from "primereact/button";
import PklForm from "./component/PklForm";
import { Toast } from 'primereact/toast';
import React, { useEffect, useRef, useState } from "react";
import DetailMhs from "./detail";
const index = () => {
    const { props } = usePage();
    const { data_pkl, data_laporan, data_usulan, nextNumberUsulan, nextNumberLaporan, roleOptions: initialRoleOptions, tempatOptions: initialTempatOptions } = props
    let emptypkl = {
        id_usulan: null,
        nama_role: "",
        nama_tempat_pkl: "",
        kota_perusahaan: "",
        alamat_tempat_pkl: "",
        tgl_awal_pkl: "",
        tgl_akhir_pkl: "",
    };
    console.log(data_usulan);
    const data_usulans = data_usulan[0];
    const [pkls, setpkls] = useState(null);
    const [roleOptions, setRoleOptions] = useState([]);
    const [tempatOptions, setTempatOptions] = useState([]);
    const [pklDialog, setpklDialog] = useState(false);
    const [pkl, setpkl] = useState(emptypkl);
    const [submitted, setSubmitted] = useState(false);
    const toast = useRef(null);
    // const nilaiPenguji = JSON.parse(data_pkls.nilai_penguji?.nilai || null);
    // const nilaiPembimbing_1 = JSON.parse(data_pkls.nilai_pembimbing_1?.nilai || null);
    // const nilaiPembimbing_2 = JSON.parse(data_pkls.nilai_pembimbing_2?.nilai || null);
    // const nilaiAkhir = () => {
    //     if (nilaiPenguji != null && nilaiPembimbing_1 != null && nilaiPembimbing_2 != null) {
    //         const totalNilai =
    //             (nilaiPembimbing_1.total_nilai + nilaiPembimbing_2.total_nilai + nilaiPenguji.total_nilai) / 3;
    //         return parseFloat(totalNilai.toFixed(2));
    //     }
    //     return null;
    // };

    useEffect(() => {
        setRoleOptions(initialRoleOptions);
        setTempatOptions(initialTempatOptions);
        setpkls(data_usulans);
        displaySuccessMessage(props.flash?.success);
        displayErrorMessage(props.flash?.error);
    }, [data_usulans, props.flash, initialRoleOptions, initialTempatOptions]);

    const openNew = () => {
        setpkl(emptypkl);
        setSubmitted(false);
        setpklDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setpklDialog(false);
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

    const savepkl = async () => {
        setSubmitted(true);

        const requiredFieldsForCreate = [
            pkl.nama_role,
            pkl.nama_tempat_pkl,
            pkl.kota_perusahaan,
            pkl.alamat_tempat_pkl,
            pkl.tgl_awal_pkl,
            pkl.tgl_akhir_pkl,
        ];

        const requiredFieldsForUpdate = [
            pkl.nama_role,
            pkl.nama_tempat_pkl,
            pkl.kota_perusahaan,
            pkl.alamat_tempat_pkl,
            pkl.tgl_awal_pkl,
            pkl.tgl_akhir_pkl,
        ];

        const isCreating = !pkl.id_usulan;
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
            formData.append("nama_role", pkl.nama_role);
            formData.append("nama_tempat_pkl", pkl.nama_tempat_pkl);
            formData.append("kota_perusahaan", pkl.kota_perusahaan);
            formData.append("alamat_tempat_pkl", pkl.alamat_tempat_pkl);
            formData.append("tgl_awal_pkl", pkl.tgl_awal_pkl);
            formData.append("tgl_akhir_pkl", pkl.tgl_akhir_pkl);

            if (isCreating) {
                formData.append("id_usulan", nextNumberUsulan);
                console.log(pkl);
                await router.post("/MhsPkl/TempatPkl/store", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            } else {
                await router.put(`/MhsPkl/TempatPkl/${pkl.id_usulan}/update`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            }

            if (isCreating) {
                setpkls((prev) => [...prev, pkl]);
            } else {
                setpkls((prev) => {
                    const prevArray = Array.isArray(prev) ? prev : [];
                    return prevArray.map((item) =>
                        item.id_usulan === pkl.id_usulan ? pkl : item
                    );
                });
            }
        } catch (error) {
            console.log("error:", error);
            const errorMessage = error.response?.data?.message || "Failed to save pkl.";
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: errorMessage,
                life: 3000,
            });
        } finally {
            setpkl(emptypkl);
            setpklDialog(false);
        }
    };

    const editpkl = (pkl) => {
        setpkl({ ...pkl });
        setpklDialog(true);
    };

    const pklDialogFooter = (
        <>
            <Button
                label="Cancel"
                icon="pi pi-times"
                text
                onClick={hideDialog}
            />
            <Button label="Save" icon="pi pi-check" text onClick={savepkl} />
        </>
    );
    return (
        <Layout>
            <Toast ref={toast} />

            {!data_usulan[0] ? (
                <div className="grid crud-demo">
                    <div className="col-12">
                        <div className="card">
                            <Button
                                label="Tempat PKL"
                                icon="pi pi-plus"
                                severity="success"
                                className="mr-2"
                                tooltip="Pengajuan Tempat Pkl"
                                tooltipOptions={{ position: 'right', mouseTrack: false, mouseTrackRight: 15 }}
                                onClick={openNew}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                data_usulan[0] && data_usulan[0].status_usulan === "3" ? (
                    <DetailMhs
                        data_mhs={data_pkl}
                        data_laporan={data_laporan}
                        nextNumberLaporan={nextNumberLaporan}
                    />
                ) : (
                    <div className="grid crud-demo">
                        <div className="col-12">
                            <div className="card">
                                <Button
                                    label="Tempat PKL"
                                    icon="pi pi-pencil"
                                    severity="success"
                                    className="mr-2"
                                    tooltip="Ubah Tempat Pkl"
                                    tooltipOptions={{ position: 'left', mouseTrack: false, mouseTrackLeft: 15 }}
                                    onClick={() => editpkl(data_usulan[0])}
                                />
                            </div>
                        </div>
                    </div>
                )
            )}

            <PklForm
                pklDialog={pklDialog}
                pkl={pkl}
                setpkl={setpkl}
                submitted={submitted}
                roleOptions={roleOptions}
                tempatOptions={tempatOptions}
                pklDialogFooter={pklDialogFooter}
                hideDialog={hideDialog}
                setRoleOptions={setRoleOptions}
                setTempatOptions={setTempatOptions}
            />
        </Layout>
    );
};


export default index;
