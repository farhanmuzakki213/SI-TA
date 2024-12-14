import Layout from "@/Layouts/layout/layout.jsx";
import { router, usePage } from "@inertiajs/react";
import { Button } from "primereact/button";
import SemproForm from "./component/semproForm";
import { Toast } from 'primereact/toast';
import React, { useEffect, useRef, useState } from "react";
const index = () => {
    const { props } = usePage();
    const { data_sempro, data_mahasiswa, nextNumber } = props
    let emptysempro = {
        id_sempro_mhs: null,
        mahasiswa_id: data_mahasiswa[0].id_mahasiswa,
        judul_sempro: '',
        file_sempro: '',
    };
    const data_sempros = data_sempro[0];
    console.log(data_sempro);
    const [sempros, setsempros] = useState(null);
    const [semproDialog, setsemproDialog] = useState(false);
    const [sempro, setsempro] = useState(emptysempro);
    const [submitted, setSubmitted] = useState(false);
    const toast = useRef(null);
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

    useEffect(() => {
        setsempros(data_sempro);
        displaySuccessMessage(props.flash?.success);
        displayErrorMessage(props.flash?.error);
    }, [data_sempro, props.flash]);

    const openNew = () => {
        setsempro(emptysempro);
        setSubmitted(false);
        setsemproDialog(true);
    };

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

        const requiredFieldsForCreate = [
            sempro.judul_sempro,
            sempro.file_sempro
        ];

        const requiredFieldsForUpdate = [
            sempro.judul_sempro,
            sempro.file_sempro
        ];

        const isCreating = !sempro.id_sempro_mhs;
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

        try {

            const formData = new FormData();
            formData.append("mahasiswa_id", sempro.mahasiswa_id);
            formData.append("judul_sempro", sempro.judul_sempro);
            formData.append("file_sempro", sempro.file_sempro);

            if (isCreating) {
                formData.append("id_sempro_mhs", nextNumber);
                // console.log(sempro);
                await router.post("/MhsSempro/store", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            } else {
                await router.post(`/MhsSempro/${sempro.id_sempro_mhs}/update`, formData, {
                    _method: 'put',
                    forceFormData: true,
                });
            }

            if (isCreating) {
                setsempros((prev) => [...prev, sempro]);
            } else {
                setsempros((prev) =>
                    prev.map((item) =>
                        item.id_sempro_mhs === sempro.id_sempro_mhs ? sempro : item
                    )
                );
            }
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
        <Layout>
            <Toast ref={toast} />
            <div className="tw-flex tw-flex-col sm:tw-flex-row tw-gap-4">
                <div className="tw-w-full sm:tw-max-w-sm">
                    <div className="tw-rounded-[12px] tw-border tw-bg-white tw-px-4 tw-pt-8 tw-pb-10 tw-shadow-lg">
                        <div className="tw-relative tw-mx-auto tw-w-40 tw-h-40 tw-rounded-full tw-overflow-hidden">
                            <img
                                src={data_mahasiswa[0].foto_mahasiswa}
                                alt="Michael Simbal"
                                className="tw-object-cover tw-w-full tw-h-full"
                            />
                        </div>
                        <div className="tw-text-center tw-mt-4">
                            <h1 className="tw-text-xl tw-font-bold tw-text-gray-900">{data_mahasiswa[0].nama_mahasiswa}</h1>
                            <p className="tw-text-sm tw-text-gray-600">{data_mahasiswa[0].nim_mahasiswa}</p>
                            <p className="tw-mt-2 tw-text-sm tw-text-gray-500">{data_mahasiswa[0].prodi}</p>

                            <ul className="tw-mt-3 tw-divide-y tw-rounded tw-bg-gray-100 tw-py-2 tw-px-3 tw-text-gray-600 tw-shadow-sm hover:tw-text-gray-700 hover:tw-shadow">
                                <li className="tw-flex tw-items-center tw-py-3 tw-text-sm">
                                    <span>Status Proposal</span>
                                    <span className="tw-ml-auto">
                                        <span className="tw-rounded-full tw-bg-green-200 tw-py-1 tw-px-2 tw-text-xs tw-font-medium tw-text-green-700">{data_sempros?.status ? data_sempros.status : "Belum Pengajuan"}</span>
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="tw-w-full sm:tw-max-w-96">
                    <div className="tw-grid tw-gap-1">
                        <div className="tw-col-12">
                            <div className="card">
                                {!data_sempro[0] ? (
                                    <Button
                                        label="Sempro"
                                        icon="pi pi-plus"
                                        severity="success"
                                        className="mr-2"
                                        tooltip="Pengajuan Sempro"
                                        tooltipOptions={{ position: 'right', mouseTrack: false, mouseTrackRight: 15 }}
                                        onClick={openNew}
                                    />
                                ) : (
                                    data_sempro[0].status_ver_sempro === '3' ? (
                                        <div className="card">
                                            <h1 className="tw-text-2xl tw-font-bold tw-text-gray-900">Sidang Details</h1>
                                            <hr className="tw-my-4" />
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
                                            <div className="card">
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
                                        </div>
                                    ) : (
                                        <Button
                                            label="Sempro"
                                            icon="pi pi-pencil"
                                            severity="success"
                                            className="mr-2"
                                            tooltip="Ubah Sempro"
                                            tooltipOptions={{ position: 'left', mouseTrack: false, mouseTrackLeft: 15 }}
                                            onClick={() => editsempro(sempros)}
                                        />
                                    )
                                )}
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
        </Layout>
    );
};


export default index;
