import React, { useEffect, useRef, useState } from "react";
import { Button } from 'primereact/button';
import { Toast } from "primereact/toast";
import TaForm from "./taForm";
import { router, usePage } from "@inertiajs/react";
import { Messages } from "primereact/messages";

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

const detailTa = ({
    data_ta,
}) => {
    // console.log("data_ta", data_ta);
    const data_tas = data_ta[0];
    const { props } = usePage();
    const msgs = useRef(null);
    const nilaiPembimbing_1 = JSON.parse(data_tas.nilai_pembimbing_1 || null);
    const nilaiPembimbing_2 = JSON.parse(data_tas.nilai_pembimbing_2 || null);
    const nilaiKetua = JSON.parse(data_tas.nilai_ketua || null);
    const nilaiSekretaris = JSON.parse(data_tas.nilai_sekretaris || null);
    const nilaiPenguji_1 = JSON.parse(data_tas.nilai_penguji_1 || null);
    const nilaiPenguji_2 = JSON.parse(data_tas.nilai_penguji_2 || null);
    const nilaiAkhir = () => {
        if (nilaiPembimbing_1 != null && nilaiPembimbing_2 != null && nilaiKetua != null && nilaiSekretaris != null && nilaiPenguji_1 != null && nilaiPenguji_2 != null) {
            const totalNilai =
                (nilaiPembimbing_1.total_nilai +
                    nilaiPembimbing_2.total_nilai +
                    nilaiKetua.total_nilai +
                    nilaiSekretaris.total_nilai +
                    nilaiPenguji_1.total_nilai +
                    nilaiPenguji_2.total_nilai) / 6;
            return parseFloat(totalNilai.toFixed(2));
        }
        return null;
    };
    let emptyta = {
        id_ta_mhs: null,
        judul: '',
        file_ta: '',
        file_proposal: '',
        file_laporan: '',
        file_revisi_sidang: '',
        ipk: '',
    };
    // console.log(data_ta);
    const [tas, settas] = useState(null);
    const [taDialog, settaDialog] = useState(false);
    const [ta, setta] = useState(emptyta);
    const [submitted, setSubmitted] = useState(false);
    const toast = useRef(null);

    useEffect(() => {
        settas(data_ta);
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
    }, [data_ta, props.flash]);

    const hideDialog = () => {
        setSubmitted(false);
        settaDialog(false);
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

    const saveta = async () => {
        setSubmitted(true);

        const requiredFieldsForUpdate = [
            ta.judul,
        ];
        if (data_tas.status_judul === '2') {
            requiredFieldsForUpdate.push(ta.file_proposal);
        }
        if (data_tas.status_ver_proposal === '2') {
            requiredFieldsForUpdate.push(ta.file_ta);
            requiredFieldsForUpdate.push(ta.file_laporan);
        }
        if (data_tas.status_sidang_ta === '3') {
            requiredFieldsForUpdate.push(ta.file_revisi_sidang);
            requiredFieldsForUpdate.push(ta.ipk);
        }
        let isValid = true;
        isValid = requiredFieldsForUpdate.every(field => field);

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
            formData.append("judul", ta.judul);
            formData.append("file_ta", ta.file_ta);
            formData.append("file_laporan", ta.file_laporan);
            formData.append("file_proposal", ta.file_proposal);
            formData.append("file_revisi_sidang", ta.file_revisi_sidang);
            formData.append("ipk", ta.ipk);
            await router.post(`/MhsTA/Berkas/${ta.id_ta_mhs}/update`, formData, {
                _method: 'put',
                forceFormData: true,
            });
            settas((prev) =>
                prev.map((item) =>
                    item.id_ta_mhs === ta.id_ta_mhs ? ta : item
                )
            );
        } catch (error) {
            console.log("error:", error);
            const errorMessage = error.response?.data?.message || "Failed to save Berkas.";
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

    const openFile = async () => {
        try {
            const url = `/TemplateRevisi/TA/${data_tas.id_ta_mhs}`;
            window.open(url, '_blank');
        } catch (error) {
            console.error(error);
        }
    };

    const openFileBeritaAcara = async () => {
        try {
            const url = `/TemplateBeritaAcara/TA/${data_tas.id_ta_mhs}`;
            window.open(url, '_blank');
        } catch (error) {
            console.error(error);
        }
    };

    const tooltip = () => {
        if (data_tas.status_ver_proposal !== '0' && (data_tas.acc_pembimbing_satu === '0' || data_tas.acc_pembimbing_dua === '0')) {
            return 'Upload Berkas Proposal';
        }
        if (data_tas.status_sidang_ta !== '3' && data_tas.status_ver_ta !== '0' && data_tas.acc_pembimbing_satu === '1' && data_tas.acc_pembimbing_dua === '1') {
            return 'Upload Berkas Tugas Akhir';
        }
        if (data_tas.status_sidang_ta === '3' && data_tas.acc_pembimbing_satu === '1' && data_tas.acc_pembimbing_dua === '1') {
            return 'Upload Berkas Revisi Sidang';
        }
    }
    console.log('data ta:', data_tas)

    const fileButtons = [
        {
            show: data_tas?.status_sidang_ta === '3',
            label: "Template Surat Revisi Tugas Akhir",
            tooltip: "Download File",
            onClick: openFile,
        },
        {
            show: data_tas?.status_sidang_ta === '2',
            label: "Template Berita Acara",
            tooltip: "Download File",
            onClick: openFileBeritaAcara,
        },
        {
            show: data_tas?.file_ta,
            label: "Tugas Akhir",
            tooltip: "Lihat File",
            onClick: () => window.open(`/storage/uploads/ta/file_ta/${data_tas?.file_ta}`, "_blank"),
        },
        {
            show: data_tas?.file_laporan,
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
            label: "Surat Revisi Tugas Akhir",
            tooltip: "Lihat File",
            onClick: () =>
                window.open(`/storage/uploads/ta/file_revisi_sidang/${data_tas?.file_revisi_sidang}`, "_blank"),
        },
    ];
    return (
        <div className="card">
            <Toast ref={toast} />
            <div className="tw-flex tw-justify-between tw-items-center tw-py-2">
                <div className="tw-flex tw-items-center">
                    <h1 className="tw-text-2xl tw-font-bold tw-text-gray-900">Sidang Details</h1>
                </div>
                {(data_tas.status_sidang_ta === '1' || data_tas.status_sidang_ta === '3') && (
                    <Button
                        label="Upload"
                        icon="pi pi-pencil"
                        severity="success"
                        className="mr-2"
                        tooltip={tooltip()}
                        tooltipOptions={{ position: 'left', mouseTrack: false, mouseTrackLeft: 15 }}
                        onClick={() => editta(data_tas)}
                    />
                )}

            </div>
            <hr className="tw-my-4" />
            {data_tas.status_sidang_ta !== '0' && (
                <div className="card">
                    <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6 tw-bg-white tw-p-4 tw-rounded-lg tw-shadow-sm">
                        <div>
                            <p className="tw-text-gray-800 tw-font-semibold">Judul</p>
                            <p className="tw-text-gray-600">{data_tas?.judul_ta || '-'}</p>
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
            <TaForm
                taDialog={taDialog}
                ta={ta}
                setta={setta}
                submitted={submitted}
                taDialogFooter={taDialogFooter}
                hideDialog={hideDialog}
            />
        </div>
    );
};

export default detailTa;
