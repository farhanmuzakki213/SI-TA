import React, { useEffect, useRef, useState } from "react";
import { Button } from 'primereact/button';
import { Messages } from "primereact/messages";
import { Toast } from "primereact/toast";
import { router, usePage } from "@inertiajs/react";
import NilaitaForm from "./nilaiForm";

const FileButton = ({ label, tooltip, onClick }) => (
    <div className="tw-flex tw-justify-between tw-items-center tw-py-2">
        <div className="tw-flex tw-items-center">
            <span className="tw-text-gray-800">{label}</span>
        </div>
        <Button
            icon="pi pi-file"
            severity="primary"
            outlined
            label="File"
            tooltip={tooltip}
            tooltipOptions={{ position: "left", mouseTrack: false, mouseTrackLeft: 15 }}
            onClick={onClick}
        />
    </div>
);

const PenilaianRow = ({ nama, jabatan, nilai, isCurrentDosen, nilaiDosen }) => (
    <div className="tw-flex tw-justify-between tw-items-center tw-border-b tw-pb-2">
        <div className="tw-w-1/3">
            <p className="tw-text-gray-600">{nama || "-"}</p>
        </div>
        <div className="tw-w-1/3">
            <p className="tw-text-gray-600">{jabatan}</p>
        </div>
        <div className="tw-w-1/3 tw-text-right">
            {isCurrentDosen && nilaiDosen ? (
                <p className="tw-text-gray-600">{nilaiDosen.total_nilai || "-"}</p>
            ) : (
                <p className="tw-text-gray-600">{nilai ? nilai.total_nilai : "Belum Dinilai"}</p>
            )}
        </div>
    </div>
);

const detailTa = ({
    data_ta,
    data_dosen,
    data_nilai,
    nextNumber_nilai,
}) => {
    // console.log("data_dosen.id_dosen", data_dosen.id_dosen);
    let emptynilaita = {
        id_ta_nilai: null,
        ta_mhs_id: data_ta[0].id_ta_mhs,
        etika_dan_penampilan: "",
        komunikasi_dan_sistematika: "",
        penguasaan_materi_pengetahuan_dasar: "",
        penguasaan_materi_pemahaman: "",
        penguasaan_materi_kemampuan_terapan: "",
        bahasa_dan_tata_tulis: "",
        penerapan_siklus_pengembangan_sistem: "",
        kesesuian_hasil_dengan_kebutuhan_sistem: "",
        program_sistem: "",
        komentar: "",
    };
    const data_tas = data_ta[0];
    const { props } = usePage();
    const [nilaitas, setnilaitas] = useState(null);
    const [nilaitaDialog, setnilaitaDialog] = useState(false);
    const [nilaita, setnilaita] = useState(emptynilaita);
    const [submitted, setSubmitted] = useState(false);
    const toast = useRef(null);
    const msgs = useRef(null);

    useEffect(() => {
        setnilaitas(data_nilai);
        displaySuccessMessage(props.flash?.success);
        displayErrorMessage(props.flash?.error);

        if (msgs.current && data_tas.status_sidang_ta === '0' && nilaiAkhir() !== null) {
            msgs.current.clear();
            msgs.current.show([
                { sticky: true, severity: 'error', detail: 'Tidak Lulus Sidang Tugas Akhir', closable: true }
            ]);
        }
        if (msgs.current && data_tas.status_sidang_ta === '2' && nilaiAkhir() !== null) {
            msgs.current.clear();
            msgs.current.show([
                { sticky: true, life: 1000, severity: 'success', summary: 'success', detail: ' Lulus Sidang Tugas Akhir', closable: true },
            ]);
        }
        if (msgs.current && data_tas.status_sidang_ta === '3' && nilaiAkhir() !== null) {
            msgs.current.clear();
            msgs.current.show([
                { sticky: true, life: 1000, severity: 'warn', summary: 'warning', detail: 'Tugas Akhir Butuh Revisi', closable: true },
            ]);
        }
    }, [data_nilai, props.flash]);

    console.log(data_nilai);
    const nilaiPembimbing = () => {
        console.log("Nilais", nilaitas);
        if (!Array.isArray(nilaitas) || nilaitas.length === 0) {
            console.warn("nilaitas is empty or not an array");
            return null;
        }
        const nilaita = nilaitas[0];

        return nilaita;
    };
    const nilai = nilaiPembimbing();
    const nilaiPembimbing_1 = JSON.parse(data_tas.nilai_pembimbing_1 || null);
    const nilaiPembimbing_2 = JSON.parse(data_tas.nilai_pembimbing_2 || null);
    const nilaiKetua = JSON.parse(data_tas.nilai_ketua || null);
    const nilaiSekretaris = JSON.parse(data_tas.nilai_sekretaris || null);
    const nilaiPenguji_1 = JSON.parse(data_tas.nilai_penguji_1 || null);
    const nilaiPenguji_2 = JSON.parse(data_tas.nilai_penguji_2 || null);
    const nilaiAkhir = () => {
        if (nilaiPembimbing_1 != null && nilaiPembimbing_2 != null && nilaiKetua != null && nilaiSekretaris != null && nilaiPenguji_1 != null && nilaiPenguji_2 != null) {
            if (nilai != null) {
                if (data_tas.pembimbing_1_id === data_dosen.id_dosen) {
                    const totalNilai =
                        (nilai.total_nilai +
                            nilaiPembimbing_2.total_nilai +
                            nilaiKetua.total_nilai +
                            nilaiSekretaris.total_nilai +
                            nilaiPenguji_1.total_nilai +
                            nilaiPenguji_2.total_nilai) / 6;
                    return parseFloat(totalNilai.toFixed(2));
                }

                if (data_tas.pembimbing_2_id === data_dosen.id_dosen) {
                    const totalNilai =
                        (nilai.total_nilai +
                            nilaiPembimbing_1.total_nilai +
                            nilaiKetua.total_nilai +
                            nilaiSekretaris.total_nilai +
                            nilaiPenguji_1.total_nilai +
                            nilaiPenguji_2.total_nilai) / 6;
                    return parseFloat(totalNilai.toFixed(2));
                }
                return null
            }
            return null
        }
        return null
    };

    const openNew = () => {
        setnilaita(emptynilaita);
        setSubmitted(false);
        setnilaitaDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setnilaitaDialog(false);
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

    const savenilaita = async () => {
        setSubmitted(true);

        const requiredFieldsForCreate = [
            nilaita.etika_dan_penampilan,
            nilaita.komunikasi_dan_sistematika,
            nilaita.penguasaan_materi_pengetahuan_dasar,
            nilaita.penguasaan_materi_pemahaman,
            nilaita.penguasaan_materi_kemampuan_terapan,
            nilaita.bahasa_dan_tata_tulis,
            nilaita.penerapan_siklus_pengembangan_sistem,
            nilaita.kesesuian_hasil_dengan_kebutuhan_sistem,
            nilaita.program_sistem,
            nilaita.komentar,
        ];

        const requiredFieldsForUpdate = [
            nilaita.etika_dan_penampilan,
            nilaita.komunikasi_dan_sistematika,
            nilaita.penguasaan_materi_pengetahuan_dasar,
            nilaita.penguasaan_materi_pemahaman,
            nilaita.penguasaan_materi_kemampuan_terapan,
            nilaita.bahasa_dan_tata_tulis,
            nilaita.penerapan_siklus_pengembangan_sistem,
            nilaita.kesesuian_hasil_dengan_kebutuhan_sistem,
            nilaita.program_sistem,
            nilaita.komentar,
        ];

        const isCreating = !nilaita.id_ta_nilai;
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
        let _nilaita = { ...nilaita };
        try {
            if (isCreating) {
                _nilaita.id_ta_nilai = nextNumber_nilai;
                // console.log("create", _nilaita);
                await router.post("/Pembimbing/MhsTA/Nilai/store", _nilaita);
            } else {
                // console.log("update", _nilaita);
                await router.put(`/Pembimbing/MhsTA/Nilai/${nilaita.id_ta_nilai}/update`, _nilaita);
            }
            if (isCreating) {
                setnilaitas(prevnilaitas => [...prevnilaitas, _nilaita]);
            } else {
                setnilaitas(prevnilaitas =>
                    prevnilaitas.map(d => d.id_nilaita === nilaita.id_ta_nilai ? _nilaita : d)
                );
            }
        } catch (error) {
            console.error("Error occurred:", error);
            const errorMessage = error.response?.data?.message || "Failed to save nilai TA.";
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: errorMessage,
                life: 3000,
            });
        } finally {
            setnilaita(emptynilaita);
            setnilaitaDialog(false);
        }
    };

    const editnilaita = (nilaita) => {
        setnilaita({ ...nilaita });
        setnilaitaDialog(true);
    };

    const nilaitaDialogFooter = (
        <>
            <Button
                label="Cancel"
                icon="pi pi-times"
                text
                onClick={hideDialog}
            />
            <Button label="Save" icon="pi pi-check" text onClick={savenilaita} />
        </>
    );
    const openFile = async () => {
        try {
            const url = `/SuratTugas/TA/Pembimbing/${data_tas.id_ta_mhs}`;
            window.open(url, '_blank');
        } catch (error) {
            console.error(error);
        }
    };
    if (!data_tas || !data_dosen) return null;

    const gridData = [
        { label: "Judul", value: data_tas?.judul || "-" },
        { label: "Tanggal Sidang", value: data_tas?.tgl_sidang || "-" },
        { label: "Ruangan", value: data_tas?.ruangan_sidang || "-" },
        { label: "Sesi", value: data_tas?.sesi_sidang || "-" },
    ];

    const fileButtons = [
        {
            show: data_tas?.id_booking,
            label: "Surat Tugas",
            tooltip: "Lihat File",
            onClick: openFile,
        },
        {
            show: data_tas?.status_ver_ta === "2",
            label: "Tugas Akhir",
            tooltip: "Lihat File",
            onClick: () => window.open(`/storage/uploads/ta/file_ta/${data_tas?.file_ta}`, "_blank"),
        },
        {
            show: data_tas?.status_ver_ta === "2",
            label: "Laporan",
            tooltip: "Lihat File",
            onClick: () =>
                window.open(`/storage/uploads/ta/file_laporan/${data_tas?.file_laporan}`, "_blank"),
        },
        {
            show: data_tas?.file_proposal,
            label: "Proposal",
            tooltip: "Lihat File",
            onClick: () =>
                window.open(`/storage/uploads/sempro/file/${data_tas?.file_proposal}`, "_blank"),
        },
        {
            show: data_tas?.file_revisi_sidang,
            label: "Laporan Revisi",
            tooltip: "Lihat File",
            onClick: () =>
                window.open(`/storage/uploads/ta/file_revisi_sidang/${data_tas?.file_revisi_sidang}`, "_blank"),
        },
    ];

    return (
        <div className="card">
            {data_tas.acc_pembimbing_satu === '1' && data_tas.acc_pembimbing_dua === '1' && (
                <>
                    <Toast ref={toast} />
                    <h1 className="tw-text-2xl tw-font-bold tw-text-gray-900">Sidang Details</h1>
                    <hr className="tw-my-4" />

                    {data_tas?.status_sidang_ta !== "0" && (
                        <div className="card tw-mb-4">
                            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6 tw-bg-white tw-p-4 tw-rounded-lg tw-shadow-sm">
                                {gridData.map((item, index) => (
                                    <div key={index}>
                                        <p className="tw-text-gray-800 tw-font-semibold">{item.label}</p>
                                        <p className="tw-text-gray-600">{item.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="card tw-mb-4">
                        <Messages ref={msgs} className="tw-mb-2" />
                        <div className="tw-flex tw-justify-between tw-items-center tw-py-2">
                            <div className="tw-flex tw-items-center">
                                <p className="tw-text-lg tw-font-semibold tw-text-gray-800">Penilaian Tugas Akhir</p>
                            </div>
                            {data_tas.pembimbing_1_id === data_dosen.id_dosen && data_tas.id_booking && data_tas.status_sidang_ta === '1' && (
                                <>
                                    {data_tas.nilai_pembimbing_1 === null ? (
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
                                            onClick={() => editnilaita(nilai)}
                                        />
                                    )}
                                </>
                            )}
                            {data_tas.pembimbing_2_id === data_dosen.id_dosen && data_tas.id_booking && data_tas.status_sidang_ta === '1' && (
                                <>
                                    {data_tas.nilai_pembimbing_2 === null ? (
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
                                            onClick={() => editnilaita(nilai)}
                                        />
                                    )}
                                </>
                            )}
                        </div>
                        <hr className="tw-my-4" />
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
                                    <p className="tw-text-gray-600">{!data_tas.nama_pembimbing_1 ? '-' : data_tas.nama_pembimbing_1}</p>
                                </div>
                                <div className="tw-w-1/3">
                                    <p className="tw-text-gray-600">Pembimbing 1</p>
                                </div>
                                <div className="tw-w-1/3 tw-text-right">
                                    {data_dosen.id_dosen === data_tas.pembimbing_1_id && nilaiPembimbing_1 ? (
                                        <>
                                            {!nilai ? (
                                                <p className="tw-text-gray-600">-</p>
                                            ) : (
                                                <p className="tw-text-gray-600">{nilai.total_nilai}</p>
                                            )}
                                        </>
                                    ) : (
                                        <p className="tw-text-gray-600">
                                            {!nilaiPembimbing_1 ? 'Belum Dinilai' : nilaiPembimbing_1.total_nilai}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="tw-flex tw-justify-between tw-items-center tw-border-b tw-pb-2">
                                <div className="tw-w-1/3">
                                    <p className="tw-text-gray-600">{!data_tas.nama_pembimbing_2 ? '-' : data_tas.nama_pembimbing_2}</p>
                                </div>
                                <div className="tw-w-1/3">
                                    <p className="tw-text-gray-600">Pembimbing 2</p>
                                </div>
                                <div className="tw-w-1/3 tw-text-right">
                                    {data_dosen.id_dosen === data_tas.pembimbing_2_id && nilaiPembimbing_2 ? (
                                        <>
                                            {!nilai ? (
                                                <p className="tw-text-gray-600">-</p>
                                            ) : (
                                                <p className="tw-text-gray-600">{nilai.total_nilai}</p>
                                            )}
                                        </>
                                    ) : (
                                        <p className="tw-text-gray-600">
                                            {!nilaiPembimbing_2 ? 'Belum Dinilai' : nilaiPembimbing_2.total_nilai}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <PenilaianRow nama={data_tas?.nama_ketua} jabatan="Ketua" nilai={nilaiKetua} />
                            <PenilaianRow nama={data_tas?.nama_sekretaris} jabatan="Sekretaris" nilai={nilaiSekretaris} />
                            <PenilaianRow nama={data_tas?.nama_penguji_1} jabatan="Penguji 1" nilai={nilaiPenguji_1} />
                            <PenilaianRow nama={data_tas?.nama_penguji_2} jabatan="Penguji 2" nilai={nilaiPenguji_2} />
                        </div>


                        <hr className="tw-my-4" />
                        <div className="tw-flex tw-justify-between tw-items-center tw-border-b tw-pb-2">
                            <div className="tw-w-1/2">
                                <p className="tw-text-gray-800 tw-font-medium">Total Nilai</p>
                            </div>
                            <div className="tw-w-1/2 tw-text-right">
                                <p className="tw-text-gray-800 tw-font-medium">{!nilaiAkhir() ? 'Belum Lengkap' : nilaiAkhir()}</p>
                            </div>
                        </div>
                    </div>
                </>
            )}
            <div className="tw-mt-6">
                <div className="card">
                    <h2 className="tw-text-lg tw-font-semibold tw-text-gray-800">Files</h2>
                    <div className="tw-mt-4 tw-space-y-4">
                        {fileButtons
                            .filter((file) => file.show)
                            .map((file, index) => (
                                <FileButton
                                    key={index}
                                    label={file.label}
                                    tooltip={file.tooltip}
                                    onClick={file.onClick}
                                />
                            ))}
                    </div>
                </div>
            </div>

            <NilaitaForm
                nilaitaDialog={nilaitaDialog}
                nilaita={nilaita}
                setnilaita={setnilaita}
                submitted={submitted}
                nilaitaDialogFooter={nilaitaDialogFooter}
                hideDialog={hideDialog}
            />
        </div>
    );
};

export default detailTa;
