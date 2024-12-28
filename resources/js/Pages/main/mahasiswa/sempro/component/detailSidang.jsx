import React, { useEffect, useRef, useState } from "react";
import { Button } from 'primereact/button';
import SemproForm from "./semproForm";
import { Messages } from "primereact/messages";
import { Toast } from "primereact/toast";
import { router, usePage } from "@inertiajs/react";

const detailSempro = ({
    data_sempro,
}) => {
    // console.log("data_sempro", data_sempro);
    const data_sempros = data_sempro[0];
    const { props } = usePage();
    const msgs = useRef(null);
    const nilaiPenguji = JSON.parse(data_sempros?.nilai_penguji?.nilai || null);
    const nilaiPembimbing_1 = JSON.parse(data_sempros?.nilai_pembimbing_1?.nilai || null);
    const nilaiPembimbing_2 = JSON.parse(data_sempros?.nilai_pembimbing_2?.nilai || null);
    const nilaiAkhir = () => {
        if (nilaiPenguji != null && nilaiPembimbing_1 != null && nilaiPembimbing_2 != null) {
            const totalNilai =
                (nilaiPembimbing_1.total_nilai + nilaiPembimbing_2.total_nilai + nilaiPenguji.total_nilai) / 3;
            return parseFloat(totalNilai.toFixed(2));
        }
        return null;
    };
    let emptysempro = {
        id_sempro_mhs: null,
        judul_sempro: '',
        file_sempro: '',
    };
    // console.log(data_sempro);
    const [sempros, setsempros] = useState(null);
    const [semproDialog, setsemproDialog] = useState(false);
    const [sempro, setsempro] = useState(emptysempro);
    const [submitted, setSubmitted] = useState(false);
    const toast = useRef(null);

    useEffect(() => {
        setsempros(data_sempro);
        displaySuccessMessage(props.flash?.success);
        displayErrorMessage(props.flash?.error);

        if (msgs.current && data_sempros.status_ver_sempro === '1') {
            msgs.current.clear();
            msgs.current.show([
                { sticky: true, severity: 'error', detail: 'File Proposal Ditolak, Mohon Kirim File Proposal Dengan Benar', closable: true }
            ]);
        }
        if (msgs.current && data_sempros.status_ver_sempro === '2') {
            msgs.current.clear();
            msgs.current.show([
                { sticky: true, severity: 'warn', summary: 'Warning', detail: 'Mohon Melakukan Revisi Sebelum Sidang Dimulai !!!', closable: true }
            ]);
        }
        if (msgs.current && data_sempros.status_ver_sempro === '3') {
            msgs.current.clear();
            msgs.current.show([
                { sticky: true, life: 1000, severity: 'success', summary: 'success', detail: 'File Proposal Anda Telah Diverifikasi, Jangan Lewatkan Jadwal Sidang Anda', closable: true },
            ]);
        }
        if (msgs.current && data_sempros.status_sempro === '1' && nilaiAkhir() !== null) {
            msgs.current.clear();
            msgs.current.show([
                { sticky: true, severity: 'error', detail: 'Anda Tidak Lulus Seminar Proposal', closable: true }
            ]);
        }
        if (msgs.current && data_sempros.status_sempro === '2' && nilaiAkhir() !== null) {
            msgs.current.clear();
            msgs.current.show([
                { sticky: true, severity: 'warn', summary: 'Warning', detail: 'Mohon Melakukan Revisi Sebelum Sidang Dimulai !!!', closable: true }
            ]);
        }
        if (msgs.current && data_sempros.status_sempro === '3' && nilaiAkhir() !== null) {
            msgs.current.clear();
            msgs.current.show([
                { sticky: true, life: 1000, severity: 'success', summary: 'success', detail: 'Selamat Anda Lulus Seminar Proposal', closable: true },
            ]);
        }
    }, [data_sempro, props.flash]);

    const hideDialog = () => {
        setSubmitted(false);
        setsemproDialog(false);
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

    const savesempro = async () => {
        setSubmitted(true);

        const requiredFieldsForUpdate = [
            sempro.judul_sempro,
            sempro.file_sempro
        ];
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
            formData.append("judul_sempro", sempro.judul_sempro);
            formData.append("file_sempro", sempro.file_sempro);
            await router.post(`/MhsSempro/FileUpload/${sempro.id_sempro_mhs}/update`, formData, {
                _method: 'put',
                forceFormData: true,
            });
            setsempros((prev) =>
                prev.map((item) =>
                    item.id_sempro_mhs === sempro.id_sempro_mhs ? sempro : item
                )
            );
        } catch (error) {
            // console.log("error:",error);
            const errorMessage = error.response?.data?.message || "Failed to save sempro.";
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: errorMessage,
                life: 3000,
            });
        } finally {
            setsempro(emptysempro);
            setsemproDialog(false);
        }
    };

    const editsempro = (sempro) => {
        setsempro({ ...sempro });
        setsemproDialog(true);
    };

    const semproDialogFooter = (
        <>
            <Button
                label="Cancel"
                icon="pi pi-times"
                text
                onClick={hideDialog}
            />
            <Button label="Save" icon="pi pi-check" text onClick={savesempro} />
        </>
    );
    return (
        <div className="card">
            <Toast ref={toast} />
            <div className="tw-flex tw-justify-between tw-items-center tw-py-2">
                <div className="tw-flex tw-items-center">
                    <h1 className="tw-text-2xl tw-font-bold tw-text-gray-900">Sidang Details</h1>
                </div>
                {data_sempros.acc_pembimbing_satu === '1' && data_sempros.acc_pembimbing_dua === '1' && data_sempros.status_sempro === '2' && (
                    <Button
                        label="Sempro"
                        icon="pi pi-pencil"
                        severity="success"
                        className="mr-2"
                        tooltip={data_sempros.file_sempro === null ? "Upload File" : "Ubah Data Sempro"}
                        tooltipOptions={{ position: 'left', mouseTrack: false, mouseTrackLeft: 15 }}
                        onClick={() => editsempro(data_sempros)}
                    />
                )}

            </div>
            <hr className="tw-my-4" />
            {data_sempros.status_sempro !== '1' && (
                <>
                    <div className="card">
                        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6 tw-bg-white tw-p-4 tw-rounded-lg tw-shadow-sm">
                            <div>
                                <p className="tw-text-gray-800 tw-font-semibold">Judul</p>
                                <p className="tw-text-gray-600">{data_sempros?.judul_sempro || '-'}</p>
                            </div>
                            <div>
                                <p className="tw-text-gray-800 tw-font-semibold">Tanggal Sidang</p>
                                <p className="tw-text-gray-600">{data_sempros?.tgl_sidang || '-'}</p>
                            </div>
                            <div>
                                <p className="tw-text-gray-800 tw-font-semibold">Ruangan</p>
                                <p className="tw-text-gray-600">{data_sempros?.ruangan_sidang || '-'}</p>
                            </div>
                            <div>
                                <p className="tw-text-gray-800 tw-font-semibold">Sesi</p>
                                <p className="tw-text-gray-600">{data_sempros?.sesi_sidang || '-'}</p>
                            </div>
                        </div>
                    </div>
                    <hr className="tw-my-3" />
                </>
            )}
            <div className="card">
                <Messages ref={msgs} className="tw-mb-2" />
                <div className="tw-flex tw-justify-between tw-items-center tw-py-2">
                    <div className="tw-flex tw-items-center">
                        <p class="tw-text-lg tw-font-semibold tw-text-gray-800">Penilaian Seminar Proposal</p>
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
                    <div className="tw-flex tw-justify-between tw-items-center tw-border-b tw-pb-2">
                        <div className="tw-w-1/3">
                            <p className="tw-text-gray-600">{!data_sempros.nama_pembimbing_1 ? '-' : data_sempros.nama_pembimbing_1}</p>
                        </div>
                        <div className="tw-w-1/3">
                            <p className="tw-text-gray-600">Pembimbing 1</p>
                        </div>
                        <div className="tw-w-1/3 tw-text-right">
                            {!nilaiPembimbing_1 ? (
                                <p className="tw-text-gray-600">Belum Dinilai</p>
                            ) : (
                                <p className="tw-text-gray-600">{nilaiPembimbing_1.total_nilai}</p>
                            )}
                        </div>
                    </div>
                    <div className="tw-flex tw-justify-between tw-items-center tw-border-b tw-pb-2">
                        <div className="tw-w-1/3">
                            <p className="tw-text-gray-600">{!data_sempros.nama_pembimbing_2 ? '-' : data_sempros.nama_pembimbing_2}</p>
                        </div>
                        <div className="tw-w-1/3">
                            <p className="tw-text-gray-600">Pembimbing 2</p>
                        </div>
                        <div className="tw-w-1/3 tw-text-right">
                            {!nilaiPembimbing_2 ? (
                                <p className="tw-text-gray-600">Belum Dinilai</p>
                            ) : (
                                <p className="tw-text-gray-600">{nilaiPembimbing_2.total_nilai}</p>
                            )}
                        </div>
                    </div>
                    <div className="tw-flex tw-justify-between tw-items-center tw-border-b tw-pb-2">
                        <div className="tw-w-1/3">
                            <p className="tw-text-gray-600">{!data_sempros.nama_penguji ? '-' : data_sempros.nama_penguji}</p>
                        </div>
                        <div className="tw-w-1/3">
                            <p className="tw-text-gray-600">Penguji</p>
                        </div>
                        <div className="tw-w-1/3 tw-text-right">
                            {!nilaiPenguji ? (
                                <p className="tw-text-gray-600">Belum Dinilai</p>
                            ) : (
                                <p className="tw-text-gray-600">{nilaiPenguji.total_nilai}</p>
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
                                onClick={() => window.open(`/storage/uploads/sempro/file/${data_sempros?.file_sempro}`, '_blank')}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <SemproForm
                semproDialog={semproDialog}
                sempro={sempro}
                setsempro={setsempro}
                submitted={submitted}
                semproDialogFooter={semproDialogFooter}
                hideDialog={hideDialog}
            />
        </div>
    );
};

export default detailSempro;
