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
    const nilaiPenguji = () => {
        // console.log("Nilais", nilaitas);
        if (!Array.isArray(nilaitas) || nilaitas.length === 0) {
            // console.warn("nilaitas is empty or not an array");
            return null;
        }
        const nilaita = nilaitas[0];

        return nilaita;
    };
    const nilai = nilaiPenguji();
    const nilaiPembimbing_1 = JSON.parse(data_tas.nilai_pembimbing_1 || null);
    const nilaiPembimbing_2 = JSON.parse(data_tas.nilai_pembimbing_2 || null);
    const nilaiKetua = JSON.parse(data_tas.nilai_ketua || null);
    const nilaiSekretaris = JSON.parse(data_tas.nilai_sekretaris || null);
    const nilaiPenguji_1 = JSON.parse(data_tas.nilai_penguji_1 || null);
    const nilaiPenguji_2 = JSON.parse(data_tas.nilai_penguji_2 || null);
    const nilaiAkhir = () => {
        if (nilaiPembimbing_1 != null && nilaiPembimbing_2 != null && nilaiKetua != null && nilaiSekretaris != null && nilaiPenguji_1 != null && nilaiPenguji_2 != null) {
            if (nilai != null) {
                if (data_tas.ketua_id === data_dosen.id_dosen) {
                    const totalNilai =
                        (nilai.total_nilai +
                            nilaiPembimbing_2.total_nilai +
                            nilaiPembimbing_1.total_nilai +
                            nilaiSekretaris.total_nilai +
                            nilaiPenguji_1.total_nilai +
                            nilaiPenguji_2.total_nilai) / 6;
                    return parseFloat(totalNilai.toFixed(2));
                }

                if (data_tas.sekretaris_id === data_dosen.id_dosen) {
                    const totalNilai =
                        (nilai.total_nilai +
                            nilaiPembimbing_1.total_nilai +
                            nilaiKetua.total_nilai +
                            nilaiPembimbing_2.total_nilai +
                            nilaiPenguji_1.total_nilai +
                            nilaiPenguji_2.total_nilai) / 6;
                    return parseFloat(totalNilai.toFixed(2));
                }

                if (data_tas.penguji_1_id === data_dosen.id_dosen) {
                    const totalNilai =
                        (nilai.total_nilai +
                            nilaiPembimbing_1.total_nilai +
                            nilaiKetua.total_nilai +
                            nilaiSekretaris.total_nilai +
                            nilaiPembimbing_2.total_nilai +
                            nilaiPenguji_2.total_nilai) / 6;
                    return parseFloat(totalNilai.toFixed(2));
                }

                if (data_tas.penguji_2_id === data_dosen.id_dosen) {
                    const totalNilai =
                        (nilai.total_nilai +
                            nilaiPembimbing_1.total_nilai +
                            nilaiKetua.total_nilai +
                            nilaiSekretaris.total_nilai +
                            nilaiPenguji_1.total_nilai +
                            nilaiPembimbing_2.total_nilai) / 6;
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
                await router.post("/Penguji/MhsTA/Nilai/store", _nilaita);
            } else {
                // console.log("update", _nilaita);
                await router.put(`/Penguji/MhsTA/Nilai/${nilaita.id_ta_nilai}/update`, _nilaita);
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
            const url = `/SuratTugas/TA/${data_tas.id_ta_mhs}`;
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

    const RenderButton = ({ roleId, nilai, nilaiField, label, tooltipAdd, tooltipEdit }) => {
        if (data_tas[roleId] === data_dosen.id_dosen && data_tas.id_booking && data_tas.status_sidang_ta === '1') {
            return data_tas[nilaiField] === null ? (
                <Button
                    label={label}
                    icon="pi pi-plus"
                    severity="success"
                    className="mr-2"
                    tooltip={tooltipAdd}
                    tooltipOptions={{ position: 'left', mouseTrack: false, mouseTrackLeft: 15 }}
                    onClick={openNew}
                />
            ) : (
                <Button
                    label={label}
                    icon="pi pi-pencil"
                    severity="success"
                    className="mr-2"
                    tooltip={tooltipEdit}
                    tooltipOptions={{ position: 'left', mouseTrack: false, mouseTrackLeft: 15 }}
                    onClick={() => editnilaita(nilai)}
                />
            );
        }
        return null;
    };
    const statusOptions = [
        { label: "Lulus", value: "2" },
        { label: "Tidak Lulus", value: "0" },
        { label: "Revisi", value: "3" },
    ];

    const currentStatus = statusOptions.find(
        (option) => option.value === data_tas.status_sidang_ta
    )?.label || "Hasil Sidang";
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(currentStatus);

    const saveStatus = async (status) => {
        try {
            const formData = new FormData();
            formData.append("status_sidang_ta", status);
            await router.post(`/Penguji/MhsTA/HasilSidang/${data_tas.id_ta_mhs}/update`, formData, {
                _method: 'put',
            });
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
            setDropdownVisible(false);
        }
        // console.log("Status disimpan:", status);
    };

    const handleDropdownChange = (item) => {
        setSelectedStatus(item.label);
        saveStatus(item.value);
    };
    const getButtonSeverity = (status) => {
        switch (status) {
            case "2":
                return "success";
            case "0":
                return "danger";
            case "3":
                return "warning";
            default:
                return "sucess";
        }
    };

    return (
        <div className="card">
            <Toast ref={toast} />
            <div className="tw-flex tw-justify-between tw-items-center tw-py-2">
                <div className="tw-flex tw-items-center">
                    <h1 className="tw-text-2xl tw-font-bold tw-text-gray-900">Sidang Details</h1>
                </div>
                <div className="tw-relative tw-inline-block">
                    <Button
                        label={selectedStatus}
                        severity={getButtonSeverity(data_tas.status_sidang_ta)}
                        className="tw-mr-2"
                        tooltip="Hasil Akhir Sidang"
                        tooltipOptions={{ position: "left", mouseTrack: false, mouseTrackLeft: 15 }}
                        onClick={() => setDropdownVisible((prev) => !prev)}
                    />

                    {dropdownVisible && (
                        <div className="tw-absolute tw-top-full tw-left-0 tw-bg-white tw-border tw-rounded-lg tw-shadow-lg tw-w-48 tw-mt-2 tw-z-10 tw-overflow-hidden tw-border-gray-200">
                            {statusOptions.map((item) => (
                                <div
                                    key={item.value}
                                    onClick={() => handleDropdownChange(item)}
                                    className="tw-px-4 tw-py-3 tw-cursor-pointer hover:tw-bg-blue-500 hover:tw-text-white tw-transition-all tw-duration-200 tw-ease-in-out"
                                >
                                    {item.label}
                                </div>
                            ))}
                        </div>

                    )}
                </div>
            </div>
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
                    <RenderButton
                        roleId="penguji_1_id"
                        nilai={nilai}
                        nilaiField="nilai_penguji_1"
                        label="Nilai"
                        tooltipAdd="Beri Nilai"
                        tooltipEdit="Edit Nilai"
                    />
                    <RenderButton
                        roleId="penguji_2_id"
                        nilai={nilai}
                        nilaiField="nilai_penguji_2"
                        label="Nilai"
                        tooltipAdd="Beri Nilai"
                        tooltipEdit="Edit Nilai"
                    />
                    <RenderButton
                        roleId="ketua_id"
                        nilai={nilai}
                        nilaiField="nilai_ketua"
                        label="Nilai"
                        tooltipAdd="Beri Nilai"
                        tooltipEdit="Edit Nilai"
                    />
                    <RenderButton
                        roleId="sekretaris_id"
                        nilai={nilai}
                        nilaiField="nilai_sekretaris"
                        label="Nilai"
                        tooltipAdd="Beri Nilai"
                        tooltipEdit="Edit Nilai"
                    />
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
                    <PenilaianRow nama={data_tas?.nama_pembimbing_1} jabatan="Pembimbing 1" nilai={nilaiPembimbing_1} />
                    <PenilaianRow nama={data_tas?.nama_pembimbing_2} jabatan="Pembimbing 2" nilai={nilaiPembimbing_2} />
                    <div className="tw-flex tw-justify-between tw-items-center tw-border-b tw-pb-2">
                        <div className="tw-w-1/3">
                            <p className="tw-text-gray-600">{!data_tas.nama_ketua ? '-' : data_tas.nama_ketua}</p>
                        </div>
                        <div className="tw-w-1/3">
                            <p className="tw-text-gray-600">Ketua</p>
                        </div>
                        <div className="tw-w-1/3 tw-text-right">
                            {data_dosen.id_dosen === data_tas.ketua_id && nilaiKetua ? (
                                <>
                                    {!nilai ? (
                                        <p className="tw-text-gray-600">-</p>
                                    ) : (
                                        <p className="tw-text-gray-600">{nilai.total_nilai}</p>
                                    )}
                                </>
                            ) : (
                                <p className="tw-text-gray-600">
                                    {!nilaiKetua ? 'Belum Dinilai' : nilaiKetua.total_nilai}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="tw-flex tw-justify-between tw-items-center tw-border-b tw-pb-2">
                        <div className="tw-w-1/3">
                            <p className="tw-text-gray-600">{!data_tas.nama_sekretaris ? '-' : data_tas.nama_sekretaris}</p>
                        </div>
                        <div className="tw-w-1/3">
                            <p className="tw-text-gray-600">Sekretaris</p>
                        </div>
                        <div className="tw-w-1/3 tw-text-right">
                            {data_dosen.id_dosen === data_tas.sekretaris_id && nilaiSekretaris ? (
                                <>
                                    {!nilai ? (
                                        <p className="tw-text-gray-600">-</p>
                                    ) : (
                                        <p className="tw-text-gray-600">{nilai.total_nilai}</p>
                                    )}
                                </>
                            ) : (
                                <p className="tw-text-gray-600">
                                    {!nilaiSekretaris ? 'Belum Dinilai' : nilaiSekretaris.total_nilai}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="tw-flex tw-justify-between tw-items-center tw-border-b tw-pb-2">
                        <div className="tw-w-1/3">
                            <p className="tw-text-gray-600">{!data_tas.nama_penguji_1 ? '-' : data_tas.nama_penguji_1}</p>
                        </div>
                        <div className="tw-w-1/3">
                            <p className="tw-text-gray-600">Penguji 1</p>
                        </div>
                        <div className="tw-w-1/3 tw-text-right">
                            {data_dosen.id_dosen === data_tas.penguji_1_id && nilaiPenguji_1 ? (
                                <>
                                    {!nilai ? (
                                        <p className="tw-text-gray-600">-</p>
                                    ) : (
                                        <p className="tw-text-gray-600">{nilai.total_nilai}</p>
                                    )}
                                </>
                            ) : (
                                <p className="tw-text-gray-600">
                                    {!nilaiPenguji_1 ? 'Belum Dinilai' : nilaiPenguji_1.total_nilai}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="tw-flex tw-justify-between tw-items-center tw-border-b tw-pb-2">
                        <div className="tw-w-1/3">
                            <p className="tw-text-gray-600">{!data_tas.nama_penguji_2 ? '-' : data_tas.nama_penguji_2}</p>
                        </div>
                        <div className="tw-w-1/3">
                            <p className="tw-text-gray-600">Penguji 2</p>
                        </div>
                        <div className="tw-w-1/3 tw-text-right">
                            {data_dosen.id_dosen === data_tas.penguji_2_id && nilaiPenguji_2 ? (
                                <>
                                    {!nilai ? (
                                        <p className="tw-text-gray-600">-</p>
                                    ) : (
                                        <p className="tw-text-gray-600">{nilai.total_nilai}</p>
                                    )}
                                </>
                            ) : (
                                <p className="tw-text-gray-600">
                                    {!nilaiPenguji_2 ? 'Belum Dinilai' : nilaiPenguji_2.total_nilai}
                                </p>
                            )}
                        </div>
                    </div>
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
