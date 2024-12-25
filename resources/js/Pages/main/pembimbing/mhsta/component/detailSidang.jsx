import React, { useEffect, useRef, useState } from "react";
import { Button } from 'primereact/button';
import { Messages } from "primereact/messages";
import { Toast } from "primereact/toast";
import { router, usePage } from "@inertiajs/react";
import NilaitaForm from "./nilaiForm";

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

    // console.log(data_nilai);
    const nilaiPembimbing = () => {
        console.log("Nilais", nilaitas);
        if (!Array.isArray(nilaitas) || nilaitas.length === 0) {
            // console.warn("nilaitas is empty or not an array");
            return null;
        }
        const nilaita = nilaitas[0];

        return nilaita;
    };

    // console.log("Hasil Nilai Pembimbing:", nilaiPembimbing());

    const nilaiPembimbing_1 = JSON.parse(data_tas.nilai_pembimbing_1?.nilai || null);
    const nilaiPembimbing_2 = JSON.parse(data_tas.nilai_pembimbing_2?.nilai || null);
    const nilaiKetua = JSON.parse(data_tas.nilai_ketua?.nilai || null);
    const nilaiSekretaris = JSON.parse(data_tas.nilai_sekretaris?.nilai || null);
    const nilaiPenguji_1 = JSON.parse(data_tas.nilai_penguji_1?.nilai || null);
    const nilaiPenguji_2 = JSON.parse(data_tas.nilai_penguji_2?.nilai || null);
    const nilaiAkhir = () => {
        if (nilaiPembimbing_1 != null && nilaiPembimbing_2 != null && nilaiKetua != null && nilaiSekretaris != null && nilaiPenguji_1 != null && nilaiPenguji_2 != null) {
            if (nilaiPembimbing() != null) {
                if (data_tas.pembimbing_1_id === data_dosen.id_dosen) {
                    const totalNilai =
                        (nilaiPembimbing().total_nilai +
                            nilaiPembimbing_2.total_nilai +
                            nilaiKetua.total_nilai +
                            nilaiSekretaris.total_nilai +
                            nilaiPenguji_1.total_nilai +
                            nilaiPenguji_2.total_nilai) / 6;
                    return parseFloat(totalNilai.toFixed(2));
                }

                if (data_tas.pembimbing_2_id === data_dosen.id_dosen) {
                    const totalNilai =
                        (nilaiPembimbing().total_nilai +
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
            const url = `/SuratTugas/TA/${data_tas.id_ta_mhs}`;
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
            {data_tas.status_sidang_ta !== '0' && (
                <div className="card">
                    <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6 tw-bg-white tw-p-4 tw-rounded-lg tw-shadow-sm">
                        <div>
                            <p className="tw-text-gray-800 tw-font-semibold">Judul</p>
                            <p className="tw-text-gray-600">{data_tas?.judul || '-'}</p>
                        </div>
                        <div>
                            <p className="tw-text-gray-800 tw-font-semibold">Tanggal Sidang</p>
                            <p className="tw-text-gray-600">{data_tas?.tgl_sidang || '-'}</p>
                        </div>
                        <div>
                            <p className="tw-text-gray-800 tw-font-semibold">Ruangan</p>
                            <p className="tw-text-gray-600">{data_tas?.ruangan_sidang || '-'}</p>
                        </div>
                        <div>
                            <p className="tw-text-gray-800 tw-font-semibold">Sesi</p>
                            <p className="tw-text-gray-600">{data_tas?.sesi_sidang || '-'}</p>
                        </div>
                    </div>
                </div>
            )}
            <hr className="tw-my-3" />
            <div className="card">
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
                                    onClick={() => editnilaita(nilaiPembimbing())}
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
                                    onClick={() => editnilaita(nilaiPembimbing())}
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
                                    {!nilaiPembimbing() ? (
                                        <p className="tw-text-gray-600">-</p>
                                    ) : (
                                        <p className="tw-text-gray-600">{nilaiPembimbing().total_nilai}</p>
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
                                    {!nilaiPembimbing() ? (
                                        <p className="tw-text-gray-600">-</p>
                                    ) : (
                                        <p className="tw-text-gray-600">{nilaiPembimbing().total_nilai}</p>
                                    )}
                                </>
                            ) : (
                                <p className="tw-text-gray-600">
                                    {!nilaiPembimbing_2 ? 'Belum Dinilai' : nilaiPembimbing_2.total_nilai}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="tw-flex tw-justify-between tw-items-center tw-border-b tw-pb-2">
                        <div className="tw-w-1/3">
                            <p className="tw-text-gray-600">{!data_tas.nama_ketua ? '-' : data_tas.nama_ketua}</p>
                        </div>
                        <div className="tw-w-1/3">
                            <p className="tw-text-gray-600">Ketua</p>
                        </div>
                        <div className="tw-w-1/3 tw-text-right">
                            {!nilaiKetua ? (
                                <p className="tw-text-gray-600">Belum Dinilai</p>
                            ) : (
                                <p className="tw-text-gray-600">{nilaiKetua.total_nilai}</p>
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
                            {!nilaiSekretaris ? (
                                <p className="tw-text-gray-600">Belum Dinilai</p>
                            ) : (
                                <p className="tw-text-gray-600">{nilaiSekretaris.total_nilai}</p>
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
                            {!nilaiPenguji_1 ? (
                                <p className="tw-text-gray-600">Belum Dinilai</p>
                            ) : (
                                <p className="tw-text-gray-600">{nilaiPenguji_1.total_nilai}</p>
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
                            <p className="tw-text-gray-800 tw-font-medium">{!nilaiAkhir() ? 'Belum Lengkap' : nilaiAkhir()}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="tw-mt-6">
                <div className="card">
                    <p className="tw-text-lg tw-font-semibold tw-text-gray-800">Files</p>
                    <div className="tw-mt-4 tw-space-y-4">
                        {data_tas.id_booking && (
                            <div className="tw-flex tw-justify-between tw-items-center tw-py-2">
                                <div className="tw-flex tw-items-center">
                                    <span className="tw-text-gray-800">Surat Tugas</span>
                                </div>
                                <Button icon="pi pi-file" severity="primary" outlined label="File"
                                    tooltip="Lihat File" tooltipOptions={{ position: 'left', mouseTrack: false, mouseTrackLeft: 15 }}
                                    onClick={openFile} />
                            </div>
                        )}
                        <div className="tw-flex tw-justify-between tw-items-center tw-py-2">
                            <div className="tw-flex tw-items-center">
                                <span className="tw-text-gray-800">Proposal</span>
                            </div>
                            <Button
                                icon="pi pi-file"
                                severity="primary"
                                outlined
                                label="File"
                                tooltip="Lihat File"
                                tooltipOptions={{ position: 'left', mouseTrack: false, mouseTrackLeft: 15 }}
                                onClick={() => window.open(`/storage/uploads/sempro/file/${data_tas?.file_proposal}`, '_blank')}
                            />
                        </div>
                        {data_tas.status_ver_ta === '2' && (
                            <div className="tw-flex tw-justify-between tw-items-center tw-py-2">
                                <div className="tw-flex tw-items-center">
                                    <span className="tw-text-gray-800">Tugas Akhir</span>
                                </div>
                                <Button
                                    icon="pi pi-file"
                                    severity="primary"
                                    outlined
                                    label="File"
                                    tooltip="Lihat File"
                                    tooltipOptions={{ position: 'left', mouseTrack: false, mouseTrackLeft: 15 }}
                                    onClick={() => window.open(`/storage/uploads/ta/file_ta/${data_tas?.file_ta}`, '_blank')}
                                />
                            </div>
                        )}
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
