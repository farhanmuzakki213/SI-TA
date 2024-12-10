import React, { useEffect, useRef, useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { router, usePage } from "@inertiajs/react";
import LaporanpklForm from "./laporanpklForm";
import { Toolbar } from "primereact/toolbar";

const detailPkl = ({
    data_mhs,
    data_laporan,
}) => {
    let emptylaporanpkl = {
        id_log_book_pkl: '',
        kegiatan: [],
        tgl_awal_kegiatan: '',
        tgl_akhir_kegiatan: '',
        dokumen_laporan: '',
    };
    const { props } = usePage();
    const data_mhss = data_mhs[0];
    const data_laporanpkl = data_laporan;
    const [laporanpkls, setlaporanpkls] = useState(null);
    const [laporanpklDialog, setlaporanpklDialog] = useState(false);
    const [laporanpkl, setlaporanpkl] = useState(emptylaporanpkl);
    const [submitted, setSubmitted] = useState(false);
    const toast = useRef(null);

    useEffect(() => {
        setlaporanpkls(data_laporanpkl);
        displaySuccessMessage(props.flash?.success);
        displayErrorMessage(props.flash?.error);
    }, [data_laporanpkl, props.flash]);

    const openNew = () => {
        setlaporanpkl(emptylaporanpkl);
        setSubmitted(false);
        setlaporanpklDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setlaporanpklDialog(false);
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

    const savelaporanpkl = async () => {
        setSubmitted(true);

        const requiredFieldsForCreate = [
            laporanpkl.kegiatan,
            laporanpkl.tgl_awal_kegiatan,
            laporanpkl.tgl_akhir_kegiatan,
            laporanpkl.dokumen_laporan,
        ];

        const requiredFieldsForUpdate = [
            laporanpkl.kegiatan,
            laporanpkl.tgl_awal_kegiatan,
            laporanpkl.tgl_akhir_kegiatan,
        ];

        const isCreating = !laporanpkl.id_log_book_pkl;
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
        console.log(laporanpkl);

        try {

            const formData = new FormData();
            formData.append("kegiatan", laporanpkl.kegiatan);
            formData.append("tgl_awal_kegiatan", laporanpkl.tgl_awal_kegiatan);
            formData.append("tgl_akhir_kegiatan", laporanpkl.tgl_akhir_kegiatan);
            formData.append("dokumen_laporan", laporanpkl.dokumen_laporan);

            if (isCreating) {
                formData.append("id_log_book_pkl", nextNumber);
                await router.post("/logbookmhs/store", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            } else {
                await router.post(`/logbookmhs/${laporanpkl.id_log_book_pkl}/update`, formData, {
                    _method: 'put',
                    forceFormData: true,
                });
            }

            if (isCreating) {
                setlaporanpkls((prev) => [...prev, laporanpkl]);
            } else {
                setlaporanpkls((prev) =>
                    prev.map((item) =>
                        item.id_log_book_pkl === laporanpkl.id_log_book_pkl ? laporanpkl : item
                    )
                );
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to save laporanpkl.";
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: errorMessage,
                life: 3000,
            });
        } finally {
            setlaporanpkl(emptylaporanpkl);
            setlaporanpklDialog(false);
        }
    };

    const editlaporanpkl = (laporanpkl) => {
        setlaporanpkl({ ...laporanpkl });
        setlaporanpklDialog(true);
    };

    const laporanpklDialogFooter = (
        <>
            <Button
                label="Cancel"
                icon="pi pi-times"
                text
                onClick={hideDialog}
            />
            <Button label="Save" icon="pi pi-check" text onClick={savelaporanpkl} />
        </>
    );
    const statusUsulan = () => {

        switch (data_mhss.status_usulan) {
            case "1":
                return <Tag severity="danger" value="Belum Disetujui" />;
            case "2":
                return <Tag severity="warning" value="Menunggu Persetujuan" />;
            case "3":
                return <Tag severity="success" value="Dikonfirmasi" />;
            default:
                return <Tag severity="info" value="Status Tidak Dikenal" />;
        }
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button
                        label="New"
                        icon="pi pi-plus"
                        severity="sucess"
                        className="mr-2"
                        onClick={openNew}
                    />
                </div>
            </React.Fragment>
        );
    };

    const leftToolbarTemplate = () => {
        return (
            <h5>Laporan</h5>
        );
    };
    return (
        <div className="card">
            <Toast ref={toast} />
            <h1 className="tw-text-2xl tw-font-bold tw-text-gray-900">PKL Details</h1>
            <hr className="tw-my-4" />
            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4">
                <div>
                    <p className="tw-text-gray-800 tw-font-semibold">Perusahaan</p>
                    <p className="tw-text-gray-600">{data_mhss.tempat_pkl}</p>
                </div>
                <div>
                    <p className="tw-text-gray-800 tw-font-semibold">Alamat</p>
                    <p className="tw-text-gray-600">{data_mhss.alamat_perusahaan}</p>
                </div>
                <div>
                    <p className="tw-text-gray-800 tw-font-semibold">Role / Divisi</p>
                    <p className="tw-text-gray-600">{data_mhss.role_pkl}</p>
                </div>
                <div>
                    <p className="tw-text-gray-800 tw-font-semibold">Tanggal PKL</p>
                    <p className="tw-text-gray-600">{data_mhss.tgl_awal_pkl} - {data_mhss.tgl_akhir_pkl}</p>
                </div>
                <div>
                    <p className="tw-text-gray-800 tw-font-semibold">Dosen Pembimbing</p>
                    <p className="tw-text-gray-600">{data_mhss.dosen_pembimbing}</p>
                </div>
                <div>
                    <p className="tw-text-gray-800 tw-font-semibold">Status</p>
                    {statusUsulan()}
                </div>
            </div>
            <hr className="tw-my-2" />
            <div className="tw-mt-4">
                <div className="card">
                    <Toolbar
                        className="mb-4"
                        left={leftToolbarTemplate}
                        right={rightToolbarTemplate}
                    />
                    <DataTable value={laporanpkls} rows={3} paginator responsiveLayout="scroll">
                        <Column field="tanggal" header="Tanggal Kegiatan" style={{ width: '20%' }} body={(data) => data.tanggal} />
                        <Column field="kegiatan" header="Kegiatan" style={{ width: '65%' }}
                            body={(data) =>
                                <div>
                                    {Object.entries(data.kegiatan).map(([key, value]) => (
                                        <div key={key}>
                                            <p className="tw-text-gray-600">{value}</p>
                                        </div>
                                    ))}
                                </div>
                            } />
                        <Column
                            header="File"
                            style={{ width: '5%' }}
                            body={(data) => (
                                <>
                                    <Button
                                        icon="pi pi-file"
                                        severity="info"
                                        rounded outlined
                                        onClick={() => window.open(`/storage/uploads/pkl/laporan/${data.file}`, '_blank')}
                                        tooltip="Lihat File" tooltipOptions={{ position: 'right', mouseTrack: false, mouseTrackRight: 15 }}
                                    />
                                </>
                            )}
                        />
                        <Column field="status" header="Status" style={{ width: '5%' }} body={(data) =>
                            data.status === '1' ? (
                                <Tag severity="warning">Belum</Tag>
                            ) : (
                                <Tag severity="success">Diverifikasi</Tag>
                            )
                        } />
                        <Column header="Aksi" style={{ width: '5%' }}
                            body={(data) =>
                                <Button icon="pi pi-pencil" severity="success" rounded
                                    tooltip="Konfirmasi" tooltipOptions={{ position: 'left', mouseTrack: false, mouseTrackLeft: 15 }}
                                    onClick={() => editlaporanpkl(data)} />
                            } />
                    </DataTable>

                    <LaporanpklForm
                        laporanpklDialog={laporanpklDialog}
                        laporanpkl={laporanpkl}
                        setlaporanpkl={setlaporanpkl}
                        submitted={submitted}
                        laporanpklDialogFooter={laporanpklDialogFooter}
                        hideDialog={hideDialog}
                    />
                </div>
            </div>
        </div>
    )
};

export default detailPkl;
