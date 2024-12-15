import React, { useRef, useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Messages } from "primereact/messages";
import AjukansidangForm from './ajukansidangForm';
import { Toast } from "primereact/toast";
import { router, usePage } from "@inertiajs/react";

const detailSidang = ({
    data_mhs,
}) => {
    const data_mhss = data_mhs[0];
    // console.log("data_mhs", data_mhss);
    let emptyajukansidang = {
        id_pkl_mhs: null,
        pkl_pembimbing: '',
        nilai_industri: '',
        judul: '',
        file_laporan: '',
        file_nilai: '',
    };
    const msgs = useRef(null);

    const { props } = usePage();
    const [ajukansidangs, setajukansidangs] = useState([]);
    const [ajukansidangDialog, setajukansidangDialog] = useState(false);
    const [ajukansidang, setajukansidang] = useState(emptyajukansidang);
    const [submitted, setSubmitted] = useState(false);
    const toast = useRef(null);

    const nilaiPenguji_1 = JSON.parse(data_mhss.nilai_penguji_1?.nilai || null);
    const nilaiPenguji_2 = JSON.parse(data_mhss.nilai_penguji_2?.nilai || null);
    const nilaiPembimbing = JSON.parse(data_mhss.nilai_pembimbing?.nilai || null);
    const nilaiAkhir = () => {
        if (nilaiPembimbing != null && nilaiPenguji_1 != null && nilaiPenguji_2 != null) {
            const totalNilai =
                (data_mhss.nilai_industri * 0.30) +
                (nilaiPembimbing.total_nilai * 0.35) +
                (((nilaiPenguji_1.total_nilai + nilaiPenguji_2.total_nilai) / 2) * 0.35);
            return parseFloat(totalNilai.toFixed(2));
        }
        return null;
    };
    // console.log(nilaiAkhir());
    useEffect(() => {
        setajukansidangs(data_mhss);
        displaySuccessMessage(props.flash?.success);
        displayErrorMessage(props.flash?.error);
        if (msgs.current && data_mhss.status_ver_pkl === '1' && nilaiAkhir() === null) {
            msgs.current.clear();
            msgs.current.show([
                { sticky: true, severity: 'error', summary: 'Error', detail: 'Pengajuan Sidang Gagal. Pastikan data sudah benar', closable: true }
            ]);
        }
        if (msgs.current && data_mhss.status_ver_pkl === '2' && nilaiAkhir() === null) {
            msgs.current.clear();
            msgs.current.show([
                { sticky: true, severity: 'info', summary: 'info', detail: 'Pengajuan Sidang Sedang Diproses, Pastikan data sudah benar', closable: true }
            ]);
        }
        if (msgs.current && data_mhss.status_ver_pkl === '3' && nilaiAkhir() === null) {
            msgs.current.clear();
            msgs.current.show([
                { sticky: true, life: 1000, severity: 'success', summary: 'success', detail: 'Pengajuan Sidang Berhasil', closable: true },
            ]);
        }
        if (msgs.current && data_mhss.id_booking && nilaiAkhir() === null ) {
            msgs.current.clear();
            msgs.current.show([
                { sticky: true, severity: 'info', summary: 'info', detail: 'Anda Sudah Memiliki Jadwal Sidang', closable: true }
            ]);
        }
    }, [data_mhss, props.flash]);

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
            ajukansidang.pkl_pembimbing,
            ajukansidang.nilai_industri,
            ajukansidang.judul,
            ajukansidang.file_laporan,
            ajukansidang.file_nilai,
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
        formData.append('pkl_pembimbing', ajukansidang.pkl_pembimbing);
        formData.append('nilai_industri', ajukansidang.nilai_industri);
        formData.append('judul', ajukansidang.judul);
        formData.append('file_laporan', ajukansidang.file_laporan);
        formData.append('file_nilai', ajukansidang.file_nilai);

        try {
            console.log(ajukansidang);
            await router.post(`/MhsPkl/Sidang/${ajukansidang.id_pkl_mhs}/update`, formData, {
                _method: 'put',
                forceFormData: true,
            });
            setajukansidangs(prevAjukansidangs =>
                Array.isArray(prevAjukansidangs)
                    ? prevAjukansidangs.map(d => d.id_pkl_mhs === ajukansidang.id_pkl_mhs ? ajukansidang : d)
                    : []
            );

        } catch (error) {
            console.log("error:", error);
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
        <div className="card">
            <Toast ref={toast} />
            <div className="tw-flex tw-justify-between tw-items-center tw-py-2">
                <div className="tw-flex tw-items-center">
                    <h1 className="tw-text-2xl tw-font-bold tw-text-gray-900">Sidang Details</h1>
                </div>
                {(data_mhss.status_ver_pkl === "2" || data_mhss.status_ver_pkl === "1") && (
                    <Button
                        label={data_mhss.status_ver_pkl === "1" ? "Perbaiki Sidang" : "Sidang"}
                        icon={data_mhss.status_ver_pkl === "1" ? "pi pi-pencil" : "pi pi-plus"}
                        severity={data_mhss.status_ver_pkl === "1" ? "success" : "sucess"}
                        className="mr-2"
                        tooltip={data_mhss.status_ver_pkl === "1" ? "Perbaiki Data Sidang" : "Pengajuan Sidang"}
                        tooltipOptions={{ position: 'left', mouseTrack: false, mouseTrackLeft: 15 }}
                        onClick={() => editajukansidang(ajukansidangs)}
                    />
                )}
            </div>
            <hr className="tw-my-4" />
            <div className="card">
                <Messages ref={msgs} className="tw-mb-2" />
                <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6 tw-bg-white tw-p-4 tw-rounded-lg tw-shadow-sm">
                    <div>
                        <p className="tw-text-gray-800 tw-font-semibold">Judul</p>
                        {!data_mhss.judul ? (
                            <p className="tw-text-gray-600">Belum Ada Judul</p>
                        ) : (
                            data_mhss.status_ver_pkl === "3" ? (
                                <p className="tw-text-gray-600">{data_mhss.judul}</p>
                            ) : (
                                <p className="tw-text-gray-600">Judul Belum Diverifikasi</p>
                            )
                        )}
                    </div>
                    <div>
                        <p className="tw-text-gray-800 tw-font-semibold">Tanggal Sidang</p>
                        <p className="tw-text-gray-600">{!data_mhss.tgl_sidang ? 'Belum Dijadwalkan' : data_mhss.tgl_sidang}</p>
                    </div>
                    <div>
                        <p className="tw-text-gray-800 tw-font-semibold">Ruangan</p>
                        <p className="tw-text-gray-600">{!data_mhss.ruangan_sidang ? 'Belum Dijadwalkan' : data_mhss.ruangan_sidang}</p>
                    </div>
                    <div>
                        <p className="tw-text-gray-800 tw-font-semibold">Sesi</p>
                        <p className="tw-text-gray-600">{!data_mhss.sesi_sidang ? 'Belum Dijadwalkan' : data_mhss.sesi_sidang}</p>
                    </div>
                </div>
            </div>
            <div className="card">
                <p className="tw-text-lg tw-font-semibold tw-text-gray-800">Penilaian Tugas Akhir</p>
                <hr className="tw-my-3" />
                <div className="tw-mt-4 tw-space-y-4">
                    <div className="tw-flex tw-justify-between tw-items-center tw-border-b tw-pb-2">
                        <div className="tw-w-1/3">
                            <p className="tw-text-gray-800 tw-font-medium">Nama Dosen</p>
                        </div>
                        <div className="tw-w-1/3">
                            <p className="tw-text-gray-800 tw-font-medium">Jabatan</p>
                        </div>
                        <div className="tw-w-1/3 tw-text-right">
                            <p className="tw-text-gray-800 tw-font-medium">Nilai</p>
                        </div>
                    </div>
                    <div className="tw-flex tw-justify-between tw-items-center tw-border-b tw-pb-2">
                        <div className="tw-w-1/3">
                            <p className="tw-text-gray-600">{data_mhss.dosen_pembimbing}</p>
                        </div>
                        <div className="tw-w-1/3">
                            <p className="tw-text-gray-600">Pembimbing Program Studi</p>
                        </div>
                        <div className="tw-w-1/3 tw-text-right">
                            {!nilaiPembimbing ? (
                                <p className="tw-text-gray-600">Belum Dinilai</p>
                            ) : (
                                <p className="tw-text-gray-600">{nilaiPembimbing.total_nilai}</p>
                            )}
                        </div>
                    </div>
                    <div className="tw-flex tw-justify-between tw-items-center tw-border-b tw-pb-2">
                        <div className="tw-w-1/3">
                            {!data_mhss.pkl_pembimbing ? (
                                <p className="tw-text-gray-600">Belum Ada Pembimbing Industri</p>
                            ) : (
                                data_mhss.status_ver_pkl === "3" ? (
                                    <p className="tw-text-gray-600">{data_mhss.pkl_pembimbing}</p>
                                ) : (
                                    <p className="tw-text-gray-600">Pembimbing Industri Belum Diverifikasi</p>
                                )
                            )}
                        </div>
                        <div className="tw-w-1/3">
                            <p className="tw-text-gray-600">Pembimbing dari Industri</p>
                        </div>
                        <div className="tw-w-1/3 tw-text-right">
                            {!data_mhss.nilai_industri ? (
                                <p className="tw-text-gray-600">Belum Dinilai</p>
                            ) : (
                                data_mhss.status_ver_pkl === "3" ? (
                                    <p className="tw-text-gray-600">{data_mhss.nilai_industri}</p>
                                ) : (
                                    <p className="tw-text-gray-600">Nilai Belum Diverifikasi</p>
                                )
                            )}
                        </div>
                    </div>
                    <div className="tw-flex tw-justify-between tw-items-center tw-border-b tw-pb-2">
                        <div className="tw-w-1/3">
                            <p className="tw-text-gray-600">{data_mhss.dosen_pembimbing}</p>
                        </div>
                        <div className="tw-w-1/3">
                            <p className="tw-text-gray-600">Penguji 1</p>
                        </div>
                        <div className="tw-w-1/3 tw-text-right">
                            {!nilaiPenguji_1 ? (
                                <p className="tw-text-gray-600">Belum Dinilai</p>
                            ) : (
                                <p className="tw-text-gray-600">{nilaiPenguji_1.total_nilai}</p>
                            )}
                        </div>
                    </div>
                    <div className="tw-flex tw-justify-between tw-items-center tw-border-b tw-pb-2">
                        <div className="tw-w-1/3">
                            <p className="tw-text-gray-600">{data_mhss.dosen_penguji}</p>
                        </div>
                        <div className="tw-w-1/3">
                            <p className="tw-text-gray-600">Penguji 2</p>
                        </div>
                        <div className="tw-w-1/3 tw-text-right">
                            {!nilaiPenguji_2 ? (
                                <p className="tw-text-gray-600">Belum Dinilai</p>
                            ) : (
                                <p className="tw-text-gray-600">{nilaiPenguji_2.total_nilai}</p>
                            )}
                        </div>
                    </div>
                    <hr className="tw-my-2" />
                    <div className="tw-flex tw-justify-between tw-items-center tw-border-b tw-pb-2">
                        <div className="tw-w-1/2">
                            <p className="tw-text-gray-800 tw-font-medium">Total Nilai</p>
                        </div>
                        <div className="tw-w-1/2 tw-text-right">
                            <p className="tw-text-gray-800 tw-font-medium">{!nilaiAkhir() ? 'Nilai Belum Lengkap' : nilaiAkhir()}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="tw-mt-6">
                <div className="card">
                    <p className="tw-text-lg tw-font-semibold tw-text-gray-800">Files</p>
                    <div className="tw-mt-4 tw-space-y-4">
                        <div className="tw-flex tw-justify-between tw-items-center tw-py-2">
                            <div className="tw-flex tw-items-center">
                                <span className="tw-text-gray-800">Nilai Industri</span>
                            </div>
                            {data_mhss.file_nilai ? (
                                data_mhss.status_ver_pkl === "3" ? (
                                    <Button icon="pi pi-file" severity="primary" outlined label="File"
                                        tooltip="Lihat File" tooltipOptions={{ position: 'left', mouseTrack: false, mouseTrackLeft: 15 }}
                                        onClick={() => window.open(`/storage/uploads/pkl/nilai_industri/${data_mhss.file_nilai}`, '_blank')} />
                                ) : (
                                    <span className="tw-text-gray-800">File Belum Diverifikasi</span>
                                )
                            ) : (
                                <span className="tw-text-gray-800">File Belum Tersedia</span>
                            )}
                        </div>
                        <div className="tw-flex tw-justify-between tw-items-center tw-py-2">
                            <div className="tw-flex tw-items-center">
                                <span className="tw-text-gray-800">Laporan Akhir</span>
                            </div>
                            {data_mhss.file_laporan ? (
                                data_mhss.status_ver_pkl === "3" ? (
                                    <Button icon="pi pi-file" severity="primary" outlined label="File"
                                        tooltip="Lihat File" tooltipOptions={{ position: 'left', mouseTrack: false, mouseTrackLeft: 15 }}
                                        onClick={() => window.open(`/storage/uploads/pkl/laporan_akhir/${data_mhss.file_laporan}`, '_blank')} />
                                ) : (
                                    <span className="tw-text-gray-800">File Belum Diverifikasi</span>
                                )
                            ) : (
                                <span className="tw-text-gray-800">File Belum Tersedia</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <AjukansidangForm
                ajukansidangDialog={ajukansidangDialog}
                ajukansidang={ajukansidang}
                setajukansidang={setajukansidang}
                submitted={submitted}
                ajukansidangDialogFooter={ajukansidangDialogFooter}
                hideDialog={hideDialog}
            />
        </div>
    )
};

export default detailSidang;
