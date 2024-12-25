import React, { useEffect, useRef, useState } from "react";
import { Button } from 'primereact/button';
import { Toast } from "primereact/toast";
import TaForm from "./taForm";
import { router, usePage } from "@inertiajs/react";
import { Messages } from "primereact/messages";

const detailTa = ({
    data_ta,
}) => {
    // console.log("data_ta", data_ta);
    const data_tas = data_ta[0];
    const { props } = usePage();
    const msgs = useRef(null);
    const nilaiPembimbing_1 = JSON.parse(data_tas.nilai_pembimbing_1?.nilai || null);
    const nilaiPembimbing_2 = JSON.parse(data_tas.nilai_pembimbing_2?.nilai || null);
    const nilaiKetua = JSON.parse(data_tas.nilai_ketua?.nilai || null);
    const nilaiSekretaris = JSON.parse(data_tas.nilai_sekretaris?.nilai || null);
    const nilaiPenguji_1 = JSON.parse(data_tas.nilai_penguji_1?.nilai || null);
    const nilaiPenguji_2 = JSON.parse(data_tas.nilai_penguji_2?.nilai || null);
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
            ta.file_ta,
            ta.file_proposal,
            ta.file_laporan,
        ];
        if(data_tas.status_sidang_ta === '3'){
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
    return (
        <div className="card">
            <Toast ref={toast} />
            <div className="tw-flex tw-justify-between tw-items-center tw-py-2">
                <div className="tw-flex tw-items-center">
                    <h1 className="tw-text-2xl tw-font-bold tw-text-gray-900">Sidang Details</h1>
                </div>
                {data_tas.acc_pembimbing_satu === '1' && data_tas.acc_pembimbing_dua === '1' && data_tas.status_sidang_ta === '1' && (
                    <Button
                        label="Upload"
                        icon="pi pi-pencil"
                        severity="success"
                        className="mr-2"
                        tooltip="Upload Berkas"
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
                        <p class="tw-text-lg tw-font-semibold tw-text-gray-800">Penilaian Tugas Akhir</p>
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
                            <p className="tw-text-gray-600">{!data_tas.nama_pembimbing_1 ? '-' : data_tas.nama_pembimbing_1}</p>
                        </div>
                        <div className="tw-w-1/3">
                            <p className="tw-text-gray-600">Pembimbing 1</p>
                        </div>
                        <div className="tw-w-1/3 tw-text-right">
                            <p className="tw-text-gray-600">Belum Dinilai</p>

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
                            <p className="tw-text-gray-600">Belum Dinilai</p>
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
                            <p className="tw-text-gray-600">Belum Dinilai</p>
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
                            <p className="tw-text-gray-600">Belum Dinilai</p>
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
                            <p className="tw-text-gray-600">Belum Dinilai</p>
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
                            <p className="tw-text-gray-600">Belum Dinilai</p>
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
                        {data_tas.file_proposal && (
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
                                    onClick={() => window.open(`/storage/uploads/ta/file/${data_tas?.file_proposal}`, '_blank')}
                                />
                            </div>
                        )}
                        {data_tas.file_ta && (
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
                        {data_tas.file_laporan && (
                            <div className="tw-flex tw-justify-between tw-items-center tw-py-2">
                                <div className="tw-flex tw-items-center">
                                    <span className="tw-text-gray-800">Laporan</span>
                                </div>
                                <Button
                                    icon="pi pi-file"
                                    severity="primary"
                                    outlined
                                    label="File"
                                    tooltip="Lihat File"
                                    tooltipOptions={{ position: 'left', mouseTrack: false, mouseTrackLeft: 15 }}
                                    onClick={() => window.open(`/storage/uploads/ta/file_laporan/${data_tas?.file_laporan}`, '_blank')}
                                />
                            </div>
                        )}
                        {data_tas.file_revisi_sidang && (
                            <div className="tw-flex tw-justify-between tw-items-center tw-py-2">
                                <div className="tw-flex tw-items-center">
                                    <span className="tw-text-gray-800">Laporan</span>
                                </div>
                                <Button
                                    icon="pi pi-file"
                                    severity="primary"
                                    outlined
                                    label="File"
                                    tooltip="Lihat File"
                                    tooltipOptions={{ position: 'left', mouseTrack: false, mouseTrackLeft: 15 }}
                                    onClick={() => window.open(`/storage/uploads/ta/file_revisi_sidang/${data_tas?.file_revisi_sidang}`, '_blank')}
                                />
                            </div>
                        )}
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
