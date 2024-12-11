import React, { useEffect, useRef, useState } from "react";
import { Button } from "primereact/button";
import NilaipklForm from "./nilaiForm";
import { router, usePage } from "@inertiajs/react";
import { Toast } from "primereact/toast";
import dosen from "@/Pages/main/admin/dosen/dosen";

const detailSidang = ({
    data_mhs,
    data_nilai,
    nextNumber_nilai,
    id_dosen
}) => {
    let emptynilaipkl = {
        id_pkl_nilai: null,
        pkl_mhs_id: data_mhs[0].id_pkl_mhs,
        dosen_id: null,
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
    console.log("data_mhs:", data_mhss);
    // console.log("data_nilai:", data_nilai);
    const nilaiPenguji = () => {
        // console.log("Nilais", nilaipkls);
        if (!Array.isArray(nilaipkls) || nilaipkls.length === 0) {
            console.warn("nilaipkls is empty or not an array");
            return null;
        }
        const nilaipkl = nilaipkls[0];

        return nilaipkl;
    };

    console.log("Hasil Nilai penguji:", nilaiPenguji());
    const nilaiPembimbing = JSON.parse(data_mhss.nilai_pembimbing?.nilai || '{}');
    const nilaiPenguji_1 = JSON.parse(data_mhss.nilai_penguji_1?.nilai || null);
    const nilaiPenguji_2 = JSON.parse(data_mhss.nilai_penguji_2?.nilai || null);
    console.log("Hasil Nilai penguji 1:", nilaiPenguji_1);
    console.log("Hasil Nilai penguji 2:", nilaiPenguji_2);
    const nilaiAkhir = () => {
        if (nilaiPenguji_1 != null && nilaiPenguji_2 != null) {
            if (nilaiPenguji() != null) {
                if (data_mhss.pembimbing_id === id_dosen) {
                    const totalNilai =
                        (data_mhss.nilai_industri * 0.30) +
                        (nilaiPembimbing.total_nilai * 0.35) +
                        (((nilaiPenguji().total_nilai + nilaiPenguji_1.total_nilai) / 2) * 0.35);
                    return parseFloat(totalNilai.toFixed(2));
                }

                if (data_mhss.penguji_id === id_dosen) {
                    const totalNilai =
                        (data_mhss.nilai_industri * 0.30) +
                        (nilaiPembimbing.total_nilai * 0.35) +
                        (((nilaiPenguji().total_nilai + nilaiPenguji_2.total_nilai) / 2) * 0.35);
                    return parseFloat(totalNilai.toFixed(2));
                }
                return null
            }
            return null
        }
        return null
    };



    console.log("Hasil Nilai Akhir:", nilaiAkhir());
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
                console.log("create", _nilaipkl);
                await router.post("/Penguji/Mhspkl/Nilai/store", _nilaipkl);
            } else {
                console.log("update", _nilaipkl);
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
            <h1 class="tw-text-2xl tw-font-bold tw-text-gray-900">Sidang Details</h1>
            <hr class="tw-my-4" />
            <div class="card">
                <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6 tw-bg-white tw-p-4 tw-rounded-lg tw-shadow-sm">
                    <div>
                        <p class="tw-text-gray-800 tw-font-semibold">Judul</p>
                        <p class="tw-text-gray-600">{!data_mhss.judul ? '-' : data_mhss.judul}</p>
                    </div>
                    <div>
                        <p class="tw-text-gray-800 tw-font-semibold">Tanggal Sidang</p>
                        <p class="tw-text-gray-600">{!data_mhss.tgl_sidang ? '-' : data_mhss.tgl_sidang}</p>
                    </div>
                    <div>
                        <p class="tw-text-gray-800 tw-font-semibold">Ruangan</p>
                        <p class="tw-text-gray-600">{!data_mhss.ruangan_sidang ? '-' : data_mhss.ruangan_sidang}</p>
                    </div>
                    <div>
                        <p class="tw-text-gray-800 tw-font-semibold">Sesi</p>
                        <p class="tw-text-gray-600">{!data_mhss.sesi_sidang ? '-' : data_mhss.sesi_sidang}</p>
                    </div>
                </div>
            </div>
            <div class="card">
                <div className="tw-flex tw-justify-between tw-items-center tw-py-2">
                    <div className="tw-flex tw-items-center">
                        <p class="tw-text-lg tw-font-semibold tw-text-gray-800">Penilaian Tugas Akhir</p>
                    </div>
                    {data_mhss.pembimbing_id === id_dosen && data_mhss.id_booking  && (
                        <>
                            {data_mhss.nilai_penguji_1 === null ? (
                                <Button
                                    label="Nilai"
                                    icon="pi pi-plus"
                                    severity="success"
                                    className="mr-2"
                                    tooltip="Beri Nilai"
                                    tooltipOptions={{ position: 'left', mouseTrack: false, mouseTrackLeft: 15 }}
                                    onClick={openNew}
                                />
                            ) : (
                                <Button
                                    label="Nilai"
                                    icon="pi pi-pencil"
                                    severity="success"
                                    className="mr-2"
                                    tooltip="Edit Nilai"
                                    tooltipOptions={{ position: 'left', mouseTrack: false, mouseTrackLeft: 15 }}
                                    onClick={() => editnilaipkl(nilaiPenguji())}
                                />
                            )}
                        </>
                    )}
                    {data_mhss.penguji_id === id_dosen && data_mhss.id_booking && (
                        <>
                            {data_mhss.nilai_penguji_2 === null ? (
                                <Button
                                    label="Nilai"
                                    icon="pi pi-plus"
                                    severity="success"
                                    className="mr-2"
                                    tooltip="Beri Nilai"
                                    tooltipOptions={{ position: 'left', mouseTrack: false, mouseTrackLeft: 15 }}
                                    onClick={openNew}
                                />
                            ) : (
                                <Button
                                    label="Nilai"
                                    icon="pi pi-pencil"
                                    severity="success"
                                    className="mr-2"
                                    tooltip="Edit Nilai"
                                    tooltipOptions={{ position: 'left', mouseTrack: false, mouseTrackLeft: 15 }}
                                    onClick={() => editnilaipkl(nilaiPenguji())}
                                />
                            )}
                        </>
                    )}
                </div>
                <div class="tw-mt-4 tw-space-y-4">
                    <div class="tw-flex tw-justify-between tw-items-center tw-border-b tw-pb-2">
                        <div class="tw-w-1/3">
                            <p class="tw-text-gray-800 tw-font-medium">Nama Dosen</p>
                        </div>
                        <div class="tw-w-1/3">
                            <p class="tw-text-gray-800 tw-font-medium">Jabatan</p>
                        </div>
                        <div class="tw-w-1/3 tw-text-right">
                            <p class="tw-text-gray-800 tw-font-medium">Nilai</p>
                        </div>
                    </div>
                    <div class="tw-flex tw-justify-between tw-items-center tw-border-b tw-pb-2">
                        <div class="tw-w-1/3">
                            <p class="tw-text-gray-600">{data_mhss.dosen_pembimbing}</p>
                        </div>
                        <div class="tw-w-1/3">
                            <p class="tw-text-gray-600">Pembimbing Program Studi</p>
                        </div>
                        <div class="tw-w-1/3 tw-text-right">
                            <p class="tw-text-gray-600">{!nilaiPembimbing.total_nilai ? '-' : nilaiPembimbing.total_nilai}</p>
                        </div>
                    </div>
                    <div class="tw-flex tw-justify-between tw-items-center tw-border-b tw-pb-2">
                        <div class="tw-w-1/3">
                            <p class="tw-text-gray-600">{!data_mhss.pkl_pembimbing ? '-' : data_mhss.pkl_pembimbing}</p>
                        </div>
                        <div class="tw-w-1/3">
                            <p class="tw-text-gray-600">Pembimbing dari Industri</p>
                        </div>
                        <div class="tw-w-1/3 tw-text-right">
                            <p class="tw-text-gray-600">{!data_mhss.nilai_industri ? '-' : data_mhss.nilai_industri}</p>
                        </div>
                    </div>
                    <div class="tw-flex tw-justify-between tw-items-center tw-border-b tw-pb-2">
                        <div class="tw-w-1/3">
                            <p class="tw-text-gray-600">{data_mhss.dosen_pembimbing}</p>
                        </div>
                        <div class="tw-w-1/3">
                            <p class="tw-text-gray-600">Penguji 1</p>
                        </div>
                        <div class="tw-w-1/3 tw-text-right">
                            {data_mhss.pembimbing_id === id_dosen ? (
                                <>
                                    {!nilaiPenguji() ? (
                                        <p className="tw-text-gray-600">-</p>
                                    ) : (
                                        <p className="tw-text-gray-600">{nilaiPenguji().total_nilai}</p>
                                    )}
                                </>
                            ) : (
                                <>
                                    {!nilaiPenguji_1 ? (
                                        <p className="tw-text-gray-600">-</p>
                                    ) : (
                                        <p className="tw-text-gray-600">{nilaiPenguji_1.total_nilai}</p>
                                    )

                                    }
                                </>
                            )}
                        </div>
                    </div>
                    <div class="tw-flex tw-justify-between tw-items-center tw-border-b tw-pb-2">
                        <div class="tw-w-1/3">
                            <p class="tw-text-gray-600">{data_mhss.dosen_penguji}</p>
                        </div>
                        <div class="tw-w-1/3">
                            <p class="tw-text-gray-600">Penguji 2</p>
                        </div>
                        <div class="tw-w-1/3 tw-text-right">
                            {data_mhss.penguji_id === id_dosen ? (
                                <>
                                    {!nilaiPenguji() ? (
                                        <p className="tw-text-gray-600">-</p>
                                    ) : (
                                        <p className="tw-text-gray-600">{nilaiPenguji().total_nilai}</p>
                                    )}
                                </>
                            ) : (
                                <>
                                    {!nilaiPenguji_2 ? (
                                        <p className="tw-text-gray-600">-</p>
                                    ) : (
                                        <p className="tw-text-gray-600">{nilaiPenguji_2.total_nilai}</p>
                                    )

                                    }
                                </>
                            )}
                        </div>
                    </div>
                    <hr className="tw-my-2" />
                    <div class="tw-flex tw-justify-between tw-items-center tw-border-b tw-pb-2">
                        <div class="tw-w-1/2">
                            <p class="tw-text-gray-800 tw-font-medium">Total Nilai</p>
                        </div>
                        <div class="tw-w-1/2 tw-text-right">
                            <p class="tw-text-gray-800 tw-font-medium">{!nilaiAkhir() ? '-' : nilaiAkhir()}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="tw-mt-6">
                <div className="card">
                    <p class="tw-text-lg tw-font-semibold tw-text-gray-800">Files</p>
                    <div class="tw-mt-4 tw-space-y-4">
                        <div class="tw-flex tw-justify-between tw-items-center tw-py-2">
                            <div class="tw-flex tw-items-center">
                                <span class="tw-text-gray-800">Nilai Industri</span>
                            </div>
                            <Button icon="pi pi-file" severity="primary" outlined label="File"
                                tooltip="Lihat File" tooltipOptions={{ position: 'left', mouseTrack: false, mouseTrackLeft: 15 }}
                                onClick={() => window.open(`/storage/uploads/pkl/nilai_industri/${data_mhss.file_nilai}`, '_blank')} />
                        </div>
                        <div class="tw-flex tw-justify-between tw-items-center tw-py-2">
                            <div class="tw-flex tw-items-center">
                                <span class="tw-text-gray-800">Laporan Akhir</span>
                            </div>
                            <Button icon="pi pi-file" severity="primary" outlined label="File"
                                tooltip="Lihat File" tooltipOptions={{ position: 'left', mouseTrack: false, mouseTrackLeft: 15 }}
                                onClick={() => window.open(`/storage/uploads/pkl/laporan_akhir/${data_mhss.file_laporan}`, '_blank')} />
                        </div>
                        {data_mhss.id_booking && (
                            <div class="tw-flex tw-justify-between tw-items-center tw-py-2">
                                <div class="tw-flex tw-items-center">
                                    <span class="tw-text-gray-800">Surat Tugas</span>
                                </div>
                                <Button icon="pi pi-file" severity="primary" outlined label="File"
                                    tooltip="Lihat File" tooltipOptions={{ position: 'left', mouseTrack: false, mouseTrackLeft: 15 }}
                                    onClick={openFile} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <NilaipklForm
                nilaipklDialog={nilaipklDialog}
                nilaipkl={nilaipkl}
                setnilaipkl={setnilaipkl}
                submitted={submitted}
                nilaipklDialogFooter={nilaipklDialogFooter}
                hideDialog={hideDialog}
            />
        </div >
    )
};

export default detailSidang;
