import React, { useEffect, useRef, useState } from "react";
import { Button } from "primereact/button";
import NilaipklForm from "./nilaiForm";
import { router, usePage } from "@inertiajs/react";
import { Toast } from "primereact/toast";

const detailSidang = ({
    data_mhs,
    data_nilai,
    nextNumber_nilai,
}) => {
    let emptynilaipkl = {
        id_pkl_nilai: null,
        pkl_mhs_id: data_mhs[0].id_pkl_mhs,
        bahasa: "",
        analisis: "",
        sikap: "",
        komunikasi: "",
        penyajian: "",
        penguasaan: "",
    };
    const data_mhss = data_mhs[0];
    const { props } = usePage();
    const [nilaipkls, setnilaipkls] = useState(null);
    const [nilaipklDialog, setnilaipklDialog] = useState(false);
    const [nilaipkl, setnilaipkl] = useState(emptynilaipkl);
    const [submitted, setSubmitted] = useState(false);
    const toast = useRef(null);

    useEffect(() => {
        setnilaipkls(data_nilai);
        displaySuccessMessage(props.flash?.success);
        displayErrorMessage(props.flash?.error);
    }, [data_nilai, props.flash]);

    const nilaiPenguji = () => {
        console.log("Nilais", nilaipkls);
        if (!Array.isArray(nilaipkls) || nilaipkls.length === 0) {
            console.warn("nilaipkls is empty or not an array");
            return null;
        }
        const nilaipkl = nilaipkls[0];

        return nilaipkl;
    };

    console.log("Hasil Nilai Pembimbing:", nilaipkls);

    const nilaiPembimbing = JSON.parse(data_mhss.nilai_pembimbing?.nilai || '{}');
    const nilaiAkhir = () => {
        if (nilaiPenguji() != null && nilaiPenguji != null) {
            return ((data_mhss.nilai_industri + nilaiPembimbing.total_nilai + nilaiPenguji().total_nilai) / 3);
        }
        return null;
    };
    // console.log("Hasil Nilai Akhir:", nilaiAkhir());
    const openNew = () => {
        setnilaipkl(emptynilaipkl);
        setSubmitted(false);
        setnilaipklDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setnilaipklDialog(false);
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

    const savenilaipkl = async () => {
        setSubmitted(true);

        const requiredFieldsForCreate = [
            nilaipkl.bahasa,
            nilaipkl.analisis,
            nilaipkl.sikap,
            nilaipkl.komunikasi,
            nilaipkl.penyajian,
            nilaipkl.penguasaan,
        ];

        const requiredFieldsForUpdate = [
            nilaipkl.bahasa,
            nilaipkl.analisis,
            nilaipkl.sikap,
            nilaipkl.komunikasi,
            nilaipkl.penyajian,
            nilaipkl.penguasaan,
        ];

        const isCreating = !nilaipkl.id_pkl_nilai;
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
        let _nilaipkl = { ...nilaipkl };
        try {
            if (isCreating) {
                _nilaipkl.id_pkl_nilai = nextNumber_nilai;
                console.log("create",_nilaipkl);
                await router.post("/Penguji/Mhspkl/Nilai/store", _nilaipkl);
            } else {
                console.log("update",_nilaipkl);
                await router.put(`/Penguji/Mhspkl/Nilai/${nilaipkl.id_pkl_nilai}/update`, _nilaipkl);
            }
            if (isCreating) {
                setnilaipkls(prevnilaipkls => [...prevnilaipkls, _nilaipkl]);
            } else {
                setnilaipkls(prevnilaipkls =>
                    prevnilaipkls.map(d => d.id_nilaipkl === nilaipkl.id_pkl_nilai ? _nilaipkl : d)
                );
            }
        } catch (error) {
            console.error("Error occurred:", error);
            const errorMessage = error.response?.data?.message || "Failed to save nilaipkl.";
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: errorMessage,
                life: 3000,
            });
        } finally {
            setnilaipkl(emptynilaipkl);
            setnilaipklDialog(false);
        }
    };

    const editnilaipkl = (nilaipkl) => {
        setnilaipkl({ ...nilaipkl });
        setnilaipklDialog(true);
    };

    const nilaipklDialogFooter = (
        <>
            <Button
                label="Cancel"
                icon="pi pi-times"
                text
                onClick={hideDialog}
            />
            <Button label="Save" icon="pi pi-check" text onClick={savenilaipkl} />
        </>
    );

    const openFile = async () => {
        try {
            const url = `/SuratTugas/Pkl/${data_mhss.id_pkl_mhs}`;
            window.open(url, '_blank');
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className="card">
            <Toast ref={toast} />
            <h1 className="tw-text-2xl tw-font-bold tw-text-gray-900">Sidang Details</h1>
            <hr className="tw-my-4" />
            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4">
                <div>
                    <p className="tw-text-gray-800 tw-font-semibold">Judul Laporan</p>
                    <p className="tw-text-gray-600">{!data_mhss.judul ? '-' : data_mhss.judul}</p>
                </div>
                <div>
                    <p className="tw-text-gray-800 tw-font-semibold">Tanggal Sidang</p>
                    <p className="tw-text-gray-600">{!data_mhss.tgl_sidang ? '-' : data_mhss.tgl_sidang}</p>
                </div>
                <div>
                    <p className="tw-text-gray-800 tw-font-semibold">Pembimbing Industri</p>
                    <p className="tw-text-gray-600">{!data_mhss.pkl_pembimbing ? '-' : data_mhss.pkl_pembimbing}</p>
                </div>
                <div>
                    <p className="tw-text-gray-800 tw-font-semibold">Ruangan</p>
                    <p className="tw-text-gray-600">{!data_mhss.ruangan_sidang ? '-' : data_mhss.ruangan_sidang}</p>
                </div>
                <div>
                    <p className="tw-text-gray-800 tw-font-semibold">Dosen Penguji</p>
                    <p className="tw-text-gray-600">{data_mhss.dosen_penguji}</p>
                </div>
                <div>
                    <p className="tw-text-gray-800 tw-font-semibold">Sesi</p>
                    <p className="tw-text-gray-600">{!data_mhss.sesi_sidang ? '-' : data_mhss.sesi_sidang}</p>
                </div>
            </div>
            <hr className="tw-my-3" />
            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4">
                <div>
                    <p className="tw-text-gray-800 tw-font-semibold">Nilai Industri</p>
                    <p className="tw-flex tw-items-center tw-text-gray-600">{!data_mhss.nilai_industri ? '-' : data_mhss.nilai_industri}</p>
                </div>
                <div>
                    <p className="tw-text-gray-800 tw-font-semibold">Nilai Pembimbing</p>
                    <p className="tw-text-gray-600">{!nilaiPembimbing.total_nilai ? '-' : nilaiPembimbing.total_nilai}</p>
                </div>
                <div>
                    <p className="tw-text-gray-800 tw-font-semibold">Nilai Penguji</p>
                    {!nilaiPenguji() ? (
                        <div className="tw-flex tw-justify-between tw-items-start">
                            <div className="tw-flex tw-items-center">
                                <p className="tw-text-gray-600">-</p>
                            </div>
                            {data_mhss.tgl_sidang && new Date(data_mhss.tgl_sidang).toDateString() === new Date().toDateString() && (
                                <Button icon="pi pi-pencil" severity="success" outlined rounded
                                    tooltip="Beri Nilai" tooltipOptions={{ position: 'left', mouseTrack: false, mouseTrackLeft: 15 }}
                                    onClick={openNew}/>)}
                        </div>
                    ) : (
                        <div className="tw-flex tw-justify-between tw-items-center">
                            <div className="tw-flex tw-items-center">
                                <p className="tw-text-gray-600">{nilaiPenguji().total_nilai}</p>
                            </div>
                            <Button icon="pi pi-pencil" severity="success" outlined rounded
                                tooltip="Edit Nilai" tooltipOptions={{ position: 'left', mouseTrack: false, mouseTrackLeft: 15}}
                                onClick={() => editnilaipkl(nilaiPenguji())} />
                        </div>
                    )
                    }
                </div>
                <div>
                    <p className="tw-text-gray-800 tw-font-semibold">Nilai Akhir</p>
                    <p className="tw-text-gray-600">{!nilaiAkhir() ? '-' : nilaiAkhir()}</p>
                </div>
            </div>
            <div className="tw-mt-4">
                <p className="tw-text-gray-800 tw-font-semibold">Files</p>
                <hr className="tw-my-2" />
                <div className="tw-flex tw-justify-between tw-items-center tw-py-2">
                    <div className="tw-flex tw-items-center">
                        <span className="tw-ml-2 tw-text-gray-800">Nilai Industri</span>
                    </div>
                    <Button icon="pi pi-file" severity="primary" outlined label="File"
                        tooltip="Lihat File" tooltipOptions={{ position: 'left', mouseTrack: false, mouseTrackLeft: 15 }}
                        onClick={() => window.open(`/storage/uploads/pkl/nilai_industri/${data_mhss.file_nilai}`, '_blank')} />
                </div>
                <hr />
                <div className="tw-flex tw-justify-between tw-items-center tw-py-2">
                    <div className="tw-flex tw-items-center">
                        <span className="tw-ml-2 tw-text-gray-800">Laporan Akhir</span>
                    </div>
                    <Button icon="pi pi-file" severity="primary" outlined label="File"
                        tooltip="Lihat File" tooltipOptions={{ position: 'left', mouseTrack: false, mouseTrackLeft: 15 }}
                        onClick={() => window.open(`/storage/uploads/pkl/laporan_akhir/${data_mhss.file_laporan}`, '_blank')} />
                </div>
                <hr />
                {data_mhss.id_booking && (
                    <>
                        <div className="tw-flex tw-justify-between tw-items-center tw-py-2">
                            <div className="tw-flex tw-items-center">
                                <span className="tw-ml-2 tw-text-gray-800">Surat Tugas</span>
                            </div>
                            <Button icon="pi pi-file" severity="primary" outlined label="File"
                                tooltip="Lihat File" tooltipOptions={{ position: 'left', mouseTrack: false, mouseTrackLeft: 15 }}
                                onClick={openFile} />
                        </div>
                        <hr />
                    </>
                )}
            </div>

            <NilaipklForm
                nilaipklDialog={nilaipklDialog}
                nilaipkl={nilaipkl}
                setnilaipkl={setnilaipkl}
                submitted={submitted}
                nilaipklDialogFooter={nilaipklDialogFooter}
                hideDialog={hideDialog}
            />
        </div>
    )
};

export default detailSidang;
