import React, { useEffect, useRef, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { Toolbar } from "primereact/toolbar";
import { Toast } from "primereact/toast";
import BimbinganForm from "./bimbinganForm";
import BimbinganDetail from "./bimbinganDetail";

const bimbingan = () => {
    const { props } = usePage();
    const { data_ta, data_bimbingan, data_bimbingan_2, data_bimbingan_1, nextNumberBimbingan } = props;
    const data_mhs_ta = data_ta[0];
    // console.log(data_tas);
    // console.log("data bimbingan 1", data_bimbingan_1)
    // console.log("data bimbingan 2", data_bimbingan_2)
    let emptybimbingan = {
        id_bimbingan_mhs: null,
        ta_mhs_id: data_mhs_ta.id_ta_mhs,
        dosen_id: '',
        sebagai: '',
        pembahasan: '',
        file_bimbingan: '',
    };
    const [bimbingans, setbimbingans] = useState(null);
    const [bimbinganDialog, setbimbinganDialog] = useState(false);
    const [bimbinganDetailDialog, setbimbinganDetailDialog] = useState(false);
    const [bimbingan, setbimbingan] = useState(emptybimbingan);
    const [submitted, setSubmitted] = useState(false);
    const toast = useRef(null);

    useEffect(() => {
        setbimbingans(data_bimbingan);
        displaySuccessMessage(props.flash?.success);
        displayErrorMessage(props.flash?.error);
    }, [data_bimbingan, props.flash]);

    const openNew = () => {
        setbimbingan(emptybimbingan);
        setSubmitted(false);
        setbimbinganDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setbimbinganDialog(false);
        setbimbinganDetailDialog(false);
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

    const savebimbingan = async () => {
        setSubmitted(true);

        const requiredFieldsForCreate = [
            bimbingan.ta_mhs_id,
            bimbingan.dosen_id,
            bimbingan.sebagai,
            bimbingan.file_bimbingan,
            bimbingan.pembahasan,
        ];

        const requiredFieldsForUpdate = [
            bimbingan.ta_mhs_id,
            bimbingan.dosen_id,
            bimbingan.sebagai,
            bimbingan.file_bimbingan,
            bimbingan.pembahasan,
        ];

        const isCreating = !bimbingan.id_bimbingan_mhs;
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
        // console.log(bimbingan);

        try {

            const formData = new FormData();
            formData.append("ta_mhs_id", bimbingan.ta_mhs_id);
            formData.append("dosen_id", bimbingan.dosen_id);
            formData.append("sebagai", bimbingan.sebagai);
            formData.append("file_bimbingan", bimbingan.file_bimbingan);
            formData.append("pembahasan", bimbingan.pembahasan);

            if (isCreating) {
                formData.append("id_bimbingan_mhs", nextNumberBimbingan);
                await router.post("/MhsTA/Bimbingan/store", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            } else {
                await router.post(`/MhsTA/Bimbingan/${bimbingan.id_bimbingan_mhs}/update`, formData, {
                    _method: 'put',
                    forceFormData: true,
                });
            }

            if (isCreating) {
                setbimbingans((prev) => [...prev, bimbingan]);
            } else {
                setbimbingans((prev) =>
                    prev.map((item) =>
                        item.id_bimbingan_mhs === bimbingan.id_bimbingan_mhs ? bimbingan : item
                    )
                );
            }
        } catch (error) {
            console.log("error:", error);
            const errorMessage = error.response?.data?.message || "Failed to save bimbingan.";
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: errorMessage,
                life: 3000,
            });
        } finally {
            setbimbingan(emptybimbingan);
            setbimbinganDialog(false);
        }
    };

    const detailbimbingan = (bimbingan) => {
        setbimbingan({ ...bimbingan });
        setbimbinganDetailDialog(true);
    };

    const editbimbingan = (bimbingan) => {
        setbimbingan({ ...bimbingan });
        setbimbinganDialog(true);
    };

    const bimbinganDialogFooter = (
        <>
            <Button
                label="Cancel"
                icon="pi pi-times"
                text
                onClick={hideDialog}
            />
            <Button label="Save" icon="pi pi-check" text onClick={savebimbingan} />
        </>
    );

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
            <h5>Bimbingan TA</h5>
        );
    };
    const statusTA = (data) => {
        let statusLabel;
        let severity;

        switch (data) {
            case "0":
                statusLabel = "Belum Disetujui";
                severity = "warning";
                break;
            default:
                statusLabel = "Disetujui";
                severity = "success";
                break;
        }

        return (
            <>
                <Tag value={statusLabel} severity={severity} />
            </>
        );
    };
    // console.log(bimbingans);
    return (
        <div className="card">
            <Toast ref={toast} />
            <h1 className="tw-text-2xl tw-font-bold tw-text-gray-900">Bimbingan TA Details</h1>
            <hr className="tw-my-4" />
            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6 tw-p-6">
                <div className="tw-bg-white tw-rounded-xl tw-shadow-md tw-p-6 tw-border tw-border-gray-200">
                    <p className="tw-text-lg tw-font-medium tw-text-gray-700">{data_mhs_ta.nama_pembimbing_1}</p>
                    <div className="tw-flex tw-items-center tw-justify-between tw-mt-5">
                        <div className="tw-text-base tw-text-gray-600">
                            <span className="tw-font-semibold tw-text-gray-500">Status</span>
                            <p className="tw-text-gray-800">{statusTA(data_mhs_ta.acc_pembimbing_satu)}</p>
                        </div>
                        <div className="tw-text-base tw-text-gray-600">
                            <span className="tw-font-semibold tw-text-gray-500">Jumlah Bimbingan</span>
                            <p className="tw-text-gray-800">{data_bimbingan_1.length}</p>
                        </div>
                    </div>
                </div>
                <div className="tw-bg-white tw-rounded-xl tw-shadow-md tw-p-6 tw-border tw-border-gray-200">
                    <p className="tw-text-lg tw-font-medium tw-text-gray-700">{data_mhs_ta.nama_pembimbing_2}</p>
                    <div className="tw-flex tw-items-center tw-justify-between tw-mt-5">
                        <div className="tw-text-base tw-text-gray-600">
                            <span className="tw-font-semibold tw-text-gray-500">Status</span>
                            <p className="tw-text-gray-800">{statusTA(data_mhs_ta.acc_pembimbing_dua)}</p>
                        </div>
                        <div className="tw-text-base tw-text-gray-600">
                            <span className="tw-font-semibold tw-text-gray-500">Jumlah Bimbingan</span>
                            <p className="tw-text-gray-800">{data_bimbingan_2.length}</p>
                        </div>
                    </div>
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
                    <DataTable value={bimbingans} rows={2} paginator responsiveLayout="scroll">
                        <Column field="tanggal_bimbingan" header="Tanggal Bimbingan" style={{ width: '10%' }} />
                        <Column field="pembahasan" header="Pembahasan" style={{ width: '30%' }}
                            body={(data) => {
                                const maxLength = 100;
                                const truncatedText = data.pembahasan.length > maxLength
                                    ? data.pembahasan.substring(0, maxLength) + "..."
                                    : data.pembahasan;

                                return <div dangerouslySetInnerHTML={{ __html: truncatedText }} />;
                            }} />
                        <Column
                            field="komentar"
                            header="Komentar"
                            style={{ width: '30%' }}
                            body={(data) => {
                                if (data.komentar !== null) {
                                    const maxLength = 100;
                                    const truncatedText = data.komentar.length > maxLength
                                        ? data.komentar.substring(0, maxLength) + "..."
                                        : data.komentar;

                                    return <div dangerouslySetInnerHTML={{ __html: truncatedText }} />;
                                } else {
                                    return <span>Belum Diperiksa</span>;
                                }
                            }}
                        />

                        <Column
                            header="File"
                            style={{ width: '5%' }}
                            body={(data) => (
                                <>
                                    <Button
                                        icon="pi pi-file"
                                        severity="info"
                                        rounded outlined
                                        onClick={() => window.open(`/storage/uploads/ta/bimbingan/${data.file_bimbingan}`, '_blank')}
                                        tooltip="Lihat File" tooltipOptions={{ position: 'right', mouseTrack: false, mouseTrackRight: 15 }}
                                    />
                                </>
                            )}
                        />
                        <Column field="nama_dosen" header="Nama Dosen" style={{ width: '20%' }} />
                        <Column field="status_bimbingan_ta" header="Status Bimbingan" style={{ width: '5%' }} body={(data) => {
                            const status = String(data.status_bimbingan_ta);
                            return status === '1' ? (
                                <Tag severity="warning">Belum</Tag>
                            ) : status === '2' ? (
                                <Tag severity="success">Diterima</Tag>
                            ) : status === '3' ? (
                                <Tag severity="danger">Revisi</Tag>
                            ) : (
                                <Tag severity="info">Status Tidak Diketahui</Tag>
                            );
                        }
                        } />
                        <Column header="Aksi" style={{ width: '5%' }} body={(data) => {
                            return data.status_bimbingan_ta !== '1' ? (
                                <Button
                                    icon="pi pi-info-circle"
                                    severity="info"
                                    rounded
                                    tooltip="Detail Bimbingan"
                                    tooltipOptions={{
                                        position: 'left',
                                        mouseTrack: false,
                                        mouseTrackLeft: 15,
                                    }}
                                    onClick={() => detailbimbingan(data)}
                                />
                            ) : (
                                <Button
                                    icon="pi pi-pencil"
                                    severity="success"
                                    rounded
                                    tooltip="Edit Bimbingan"
                                    tooltipOptions={{
                                        position: 'left',
                                        mouseTrack: false,
                                        mouseTrackLeft: 15,
                                    }}
                                    onClick={() => editbimbingan(data)}
                                />
                            );
                        }} />
                    </DataTable>

                    <BimbinganForm
                        bimbinganDialog={bimbinganDialog}
                        bimbingan={bimbingan}
                        setbimbingan={setbimbingan}
                        submitted={submitted}
                        bimbinganDialogFooter={bimbinganDialogFooter}
                        hideDialog={hideDialog}
                        data_mhs_ta={data_mhs_ta}
                    />

                    <BimbinganDetail
                        bimbinganDetailDialog={bimbinganDetailDialog}
                        bimbingan={bimbingan}
                        hideDialog={hideDialog}
                    />
                </div>
            </div>
        </div>
    )
};

export default bimbingan;
