import React, { useEffect, useRef, useState } from "react";
import { Button } from "primereact/button";
import NilaisemproForm from "./nilaiForm";
import { router, usePage } from "@inertiajs/react";
import { Toast } from "primereact/toast";

const detailSidang = ({
    data_mhs,
    data_nilai,
    nextNumber_nilai,
    dosen_id,
}) => {
    let emptynilaisempro = {
        id_sempro_nilai: null,
        sempro_mhs_id: data_mhs[0].id_sempro_mhs,
        pendahuluan: "",
        tinjauan_pustaka: "",
        metodologi_penelitian: "",
        bahasa_dan_tata_tulis: "",
        presentasi: "",
    };
    const data_mhss = data_mhs[0];
    const { props } = usePage();
    const [nilaisempros, setnilaisempros] = useState(null);
    const [nilaisemproDialog, setnilaisemproDialog] = useState(false);
    const [nilaisempro, setnilaisempro] = useState(emptynilaisempro);
    const [submitted, setSubmitted] = useState(false);
    const toast = useRef(null);

    useEffect(() => {
        setnilaisempros(data_nilai);
        displaySuccessMessage(props.flash?.success);
        displayErrorMessage(props.flash?.error);
    }, [data_nilai, props.flash]);

    console.log(data_nilai);
    const nilaiPembimbing = () => {
        console.log("Nilais", nilaisempros);
        if (!Array.isArray(nilaisempros) || nilaisempros.length === 0) {
            console.warn("nilaisempros is empty or not an array");
            return null;
        }
        const nilaisempro = nilaisempros[0];

        return nilaisempro;
    };

    console.log("Hasil Nilai Pembimbing:", nilaiPembimbing());

    const nilaiPenguji = JSON.parse(data_mhss.nilai_penguji?.nilai || '{}');
    const nilaiPembimbing_1 = JSON.parse(data_mhss.nilai_pembimbing_1?.nilai || null);
    const nilaiPembimbing_2 = JSON.parse(data_mhss.nilai_pembimbing_2?.nilai || null);
    console.log("Hasil Nilai Penguji:", nilaiPenguji);
    console.log("Hasil Nilai Pembimbing 1:", nilaiPembimbing_1);
    console.log("Hasil Nilai Pembimbing 2:", nilaiPembimbing_2);
    const nilaiAkhir = () => {
        if (nilaiPembimbing_1 != null && nilaiPembimbing_2 != null) {
            if (nilaiPembimbing() != null) {
                if (data_mhss.pembimbing_1_id === dosen_id) {
                    const totalNilai =
                        (nilaiPembimbing().total_nilai + nilaiPembimbing_2.total_nilai + nilaiPenguji.total_nilai) / 3;
                    return parseFloat(totalNilai.toFixed(2));
                }

                if (data_mhss.pembimbing_2_id === dosen_id) {
                    const totalNilai =
                        (nilaiPembimbing_1.total_nilai + nilaiPembimbing().total_nilai + nilaiPenguji.total_nilai) / 3;
                    return parseFloat(totalNilai.toFixed(2));
                }
                return null
            }
            return null
        }
        return null
    };
    // console.log("Hasil Nilai Akhir:", nilaiAkhir());
    const openNew = () => {
        setnilaisempro(emptynilaisempro);
        setSubmitted(false);
        setnilaisemproDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setnilaisemproDialog(false);
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

    const savenilaisempro = async () => {
        setSubmitted(true);

        const requiredFieldsForCreate = [
            nilaisempro.pendahuluan,
            nilaisempro.tinjauan_pustaka,
            nilaisempro.metodologi_penelitian,
            nilaisempro.bahasa_dan_tata_tulis,
            nilaisempro.presentasi,
        ];

        const requiredFieldsForUpdate = [
            nilaisempro.pendahuluan,
            nilaisempro.tinjauan_pustaka,
            nilaisempro.metodologi_penelitian,
            nilaisempro.bahasa_dan_tata_tulis,
            nilaisempro.presentasi,
        ];

        const isCreating = !nilaisempro.id_sempro_nilai;
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
        let _nilaisempro = { ...nilaisempro };
        try {
            if (isCreating) {
                _nilaisempro.id_sempro_nilai = nextNumber_nilai;
                // console.log("create", _nilaisempro);
                await router.post("/Pembimbing/Mhssempro/Nilai/store", _nilaisempro);
            } else {
                // console.log("update", _nilaisempro);
                await router.put(`/Pembimbing/Mhssempro/Nilai/${nilaisempro.id_sempro_nilai}/update`, _nilaisempro);
            }
            if (isCreating) {
                setnilaisempros(prevnilaisempros => [...prevnilaisempros, _nilaisempro]);
            } else {
                setnilaisempros(prevnilaisempros =>
                    prevnilaisempros.map(d => d.id_nilaisempro === nilaisempro.id_sempro_nilai ? _nilaisempro : d)
                );
            }
        } catch (error) {
            console.error("Error occurred:", error);
            const errorMessage = error.response?.data?.message || "Failed to save nilaisempro.";
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: errorMessage,
                life: 3000,
            });
        } finally {
            setnilaisempro(emptynilaisempro);
            setnilaisemproDialog(false);
        }
    };

    const editnilaisempro = (nilaisempro) => {
        setnilaisempro({ ...nilaisempro });
        setnilaisemproDialog(true);
    };

    const nilaisemproDialogFooter = (
        <>
            <Button
                label="Cancel"
                icon="pi pi-times"
                text
                onClick={hideDialog}
            />
            <Button label="Save" icon="pi pi-check" text onClick={savenilaisempro} />
        </>
    );
    const openFile = async () => {
        try {
            const url = `/SuratTugas/Sempro/${data_mhss.id_sempro_mhs}`;
            window.open(url, '_blank');
        } catch (error) {
            console.error(error);
        }
    };
    console.log("data mhs :", data_mhss);
    console.log("dosen id :", dosen_id);
    return (
        <div className="card">
            <Toast ref={toast} />
            <h1 className="tw-text-2xl tw-font-bold tw-text-gray-900">Sidang Details</h1>
            <hr className="tw-my-4" />
            <div className="card">
                <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6 tw-bg-white tw-p-4 tw-rounded-lg tw-shadow-sm">
                    <div>
                        <p className="tw-text-gray-800 tw-font-semibold">Judul</p>
                        <p className="tw-text-gray-600">{!data_mhss.judul_sempro ? '-' : data_mhss.judul_sempro}</p>
                    </div>
                    <div>
                        <p className="tw-text-gray-800 tw-font-semibold">Tanggal Sidang</p>
                        <p className="tw-text-gray-600">{!data_mhss.tgl_sidang ? '-' : data_mhss.tgl_sidang}</p>
                    </div>
                    <div>
                        <p className="tw-text-gray-800 tw-font-semibold">Ruangan</p>
                        <p className="tw-text-gray-600">{!data_mhss.ruangan_sidang ? '-' : data_mhss.ruangan_sidang}</p>
                    </div>
                    <div>
                        <p className="tw-text-gray-800 tw-font-semibold">Sesi</p>
                        <p className="tw-text-gray-600">{!data_mhss.sesi_sidang ? '-' : data_mhss.sesi_sidang}</p>
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="tw-flex tw-justify-between tw-items-center tw-py-2">
                    <div className="tw-flex tw-items-center">
                        <p class="tw-text-lg tw-font-semibold tw-text-gray-800">Penilaian Seminar Proposal</p>
                    </div>
                    {data_mhss.pembimbing_1_id === dosen_id && data_mhss.id_booking && (
                        <>
                            {data_mhss.nilai_pembimbing_1 === null ? (
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
                                    onClick={() => editnilaisempro(nilaiPembimbing())}
                                />
                            )}
                        </>
                    )}
                    {data_mhss.pembimbing_2_id === dosen_id && data_mhss.id_booking && (
                        <>
                            {data_mhss.nilai_pembimbing_2 === null ? (
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
                                    onClick={() => editnilaisempro(nilaiPembimbing())}
                                />
                            )}
                        </>
                    )}
                </div>
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
                            <p className="tw-text-gray-600">{!data_mhss.nama_pembimbing_1 ? '-' : data_mhss.nama_pembimbing_1}</p>
                        </div>
                        <div className="tw-w-1/3">
                            <p className="tw-text-gray-600">Pembimbing 1</p>
                        </div>
                        <div className="tw-w-1/3 tw-text-right">
                            {dosen_id === data_mhss.pembimbing_1_id && nilaiPembimbing_1 ? (
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
                            <p className="tw-text-gray-600">{!data_mhss.nama_pembimbing_2 ? '-' : data_mhss.nama_pembimbing_2}</p>
                        </div>
                        <div className="tw-w-1/3">
                            <p className="tw-text-gray-600">Pembimbing 2</p>
                        </div>
                        <div className="tw-w-1/3 tw-text-right">
                            {dosen_id === data_mhss.pembimbing_2_id && nilaiPembimbing_2 ? (
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
                            <p className="tw-text-gray-600">{!data_mhss.nama_penguji ? '-' : data_mhss.nama_penguji}</p>
                        </div>
                        <div className="tw-w-1/3">
                            <p className="tw-text-gray-600">Penguji</p>
                        </div>
                        <div className="tw-w-1/3 tw-text-right">
                            <p className="tw-text-gray-600">{!nilaiPenguji.total_nilai ? 'Belum Dinilai' : nilaiPenguji.total_nilai}</p>
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
                        {data_mhss.id_booking && (
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
                                onClick={() => window.open(`/storage/uploads/sempro/file/${data_sempros?.file_sempro}`, '_blank')}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <NilaisemproForm
                nilaisemproDialog={nilaisemproDialog}
                nilaisempro={nilaisempro}
                setnilaisempro={setnilaisempro}
                submitted={submitted}
                nilaisemproDialogFooter={nilaisemproDialogFooter}
                hideDialog={hideDialog}
            />
        </div>
    )
};

export default detailSidang;
