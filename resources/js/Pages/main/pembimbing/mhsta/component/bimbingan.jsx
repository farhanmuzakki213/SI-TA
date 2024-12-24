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
import { Dialog } from "primereact/dialog";

const bimbingan = () => {
    const { props } = usePage();
    const { data_ta, data_bimbingan, data_bimbingan_2, data_bimbingan_1, data_dosen } = props;
    const data_mhs_ta = data_ta[0];
    // console.log(data_tas);
    // console.log("data bimbingan 1", data_bimbingan_1)
    // console.log("data bimbingan 2", data_bimbingan_2)
    let emptybimbingan = {
        id_bimbingan_mhs: null,
        komentar: '',
        file_bimbingan: '',
        status_bimbingan_ta: '',
        dosen_id: '',
        sebagai: '',
    };
    const [bimbingans, setbimbingans] = useState(null);
    const [bimbinganDialog, setbimbinganDialog] = useState(false);
    const [tolakbimbinganDialog, setTolakbimbinganDialog] = useState(false);
    const [accsidangtaDialog, setAccSidangTaDialog] = useState(false);
    const [bimbinganDetailDialog, setbimbinganDetailDialog] = useState(false);
    const [bimbingan, setbimbingan] = useState(emptybimbingan);
    const [submitted, setSubmitted] = useState(false);
    const toast = useRef(null);
    const status1 = String(data_mhs_ta.acc_pembimbing_satu);
    const status2 = String(data_mhs_ta.acc_pembimbing_dua);

    useEffect(() => {
        setbimbingans(data_bimbingan);
        displaySuccessMessage(props.flash?.success);
        displayErrorMessage(props.flash?.error);
    }, [data_bimbingan, props.flash]);

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

        const requiredFieldsForUpdate = [
            bimbingan.komentar,
            bimbingan.file_bimbingan,
            bimbingan.status_bimbingan_ta,
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
        // console.log(bimbingan);

        try {

            const formData = new FormData();
            formData.append("komentar", bimbingan.komentar);
            formData.append("file_bimbingan", bimbingan.file_bimbingan);
            formData.append("status_bimbingan_ta", bimbingan.status_bimbingan_ta);
            await router.post(`/Pembimbing/MhsTA/Bimbingan/${bimbingan.id_bimbingan_mhs}/update`, formData, {
                _method: 'put',
                forceFormData: true,
            });
            setbimbingans((prev) =>
                prev.map((item) =>
                    item.id_bimbingan_mhs === bimbingan.id_bimbingan_mhs ? bimbingan : item
                )
            );
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

    const leftToolbarTemplate = () => {
        return (
            <h5>Bimbingan TA</h5>
        );
    };

    const hideTolakbimbinganDialog = () => {
        setTolakbimbinganDialog(false);
    };

    const confirmTolakbimbingan = (bimbingan) => {
        setbimbingan({ ...bimbingan });
        setTolakbimbinganDialog(true);
    };
    const tolakbimbingan = async () => {
        try {
            const formData = new FormData();
            console.log('test131', data_mhs_ta);
            if (bimbingan.dosen_id === data_mhs_ta.pembimbing_1_id) {
                formData.append("dosen_id", data_mhs_ta.pembimbing_2_id);
                formData.append("sebagai", 'pembimbing_2');
            } else {
                formData.append("dosen_id", data_mhs_ta.pembimbing_1_id);
                formData.append("sebagai", 'pembimbing_1');
            }
            await router.post(
                `/Pembimbing/MhsTA/Bimbingan/${bimbingan.id_bimbingan_mhs}/tolak`,
                formData, {
                _method: 'put',
                forceFormData: true,
            }
            );
        } catch (error) {
            console.error("Error deleting bimbingan:", error);
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: "Failed to tolak bimbingan.",
                life: 3000,
            });
        }
        finally {
            setTolakbimbinganDialog(false);
        }
    };

    const tolakbimbinganDialogFooter = (
        <>
            <Button
                label="No"
                icon="pi pi-times"
                text
                onClick={hideTolakbimbinganDialog}
            />
            <Button label="Yes" icon="pi pi-check" text onClick={tolakbimbingan} />
        </>
    );

    const hideAccSidangTaDialog = () => {
        setAccSidangTaDialog(false);
    };

    const confirmAccSidangTa = (bimbingan) => {
        setbimbingan({ ...bimbingan });
        setAccSidangTaDialog(true);
    };
    const accsidangta = async () => {
        try {
            const formData = new FormData();
            console.log('ta', data_mhs_ta);
            console.log('bimbingan', data_dosen);
            if (data_dosen.id_dosen === data_mhs_ta.pembimbing_1_id) {
                if (status1 === '0') {
                    formData.append("acc_pembimbing_satu", '1');
                } else {
                    formData.append("acc_pembimbing_satu", '0');
                }
                formData.append("acc_pembimbing_dua", status2);
            } else {
                if (status2 === '0') {
                    formData.append("acc_pembimbing_dua", '1');
                } else {
                    formData.append("acc_pembimbing_dua", '0');
                }
                formData.append("acc_pembimbing_satu", status1);
            }
            await router.post(
                `/Pembimbing/MhsTA/AccSidangTA/${data_mhs_ta.id_ta_mhs}/update`,
                formData, {
                _method: 'put',
                forceFormData: true,
            }
            );
        } catch (error) {
            console.error("Error deleting bimbingan:", error);
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: "Failed to tolak bimbingan.",
                life: 3000,
            });
        }
        finally {
            setAccSidangTaDialog(false);
        }
    };

    const accsidangtaDialogFooter = (
        <>
            <Button
                label="No"
                icon="pi pi-times"
                text
                onClick={hideAccSidangTaDialog}
            />
            <Button label="Yes" icon="pi pi-check" text onClick={accsidangta} />
        </>
    );

    const rightToolbarTemplate = () => {
        console.log('r', data_mhs_ta);
        return (
            <React.Fragment>
                {data_bimbingan_1.length > 0 && data_bimbingan_2.length > 0 && (
                    data_dosen.id_dosen === data_mhs_ta.pembimbing_1_id ? (
                        <div className="my-2">
                            <Button
                                label="Tugas Akhir"
                                icon={status1 === '0' ? "pi pi-check" : "pi pi-times"}
                                severity={status1 === '0' ? "success" : "danger"}
                                className="mr-2"
                                tooltip={status1 === '0' ? "Accept Tugas Akhir" : "Cancel"}
                                tooltipOptions={{
                                    position: 'left',
                                    mouseTrack: false,
                                    mouseTrackLeft: 15,
                                }}
                                onClick={() => confirmAccSidangTa(data_mhs_ta)}
                            />
                        </div>
                    ) : (
                        <div className="my-2">
                            <Button
                                label="Tugas Akhir"
                                icon={status2 === '0' ? "pi pi-check" : "pi pi-times"}
                                severity={status2 === '0' ? "success" : "danger"}
                                className="mr-2"
                                tooltip={status2 === '0' ? "Accept Tugas Akhir" : "Cancel"}
                                tooltipOptions={{
                                    position: 'left',
                                    mouseTrack: false,
                                    mouseTrackLeft: 15,
                                }}
                                onClick={() => confirmAccSidangTa(data_mhs_ta)}
                            />
                        </div>
                    )
                )}
            </React.Fragment>
        );
    };
    // console.log(bimbingans);
    return (
        <div className="card">
            <Toast ref={toast} />
            <h1 className="tw-text-2xl tw-font-bold tw-text-gray-900">Bimbingan TA Details</h1>
            <hr className="tw-my-4" />
            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4">
                <div>
                    <p className="tw-text-gray-800 tw-font-semibold">Pembimbing 1</p>
                    <p className="tw-text-gray-600">{data_mhs_ta.nama_pembimbing_1}</p>
                </div>
                <div>
                    <p className="tw-text-gray-800 tw-font-semibold">Pembimbing 2</p>
                    <p className="tw-text-gray-600">{data_mhs_ta.nama_pembimbing_2}</p>
                </div>
                <div>
                    <p className="tw-text-gray-800 tw-font-semibold">Jumlah Bimbingan</p>
                    <p className="tw-text-gray-600">{data_bimbingan_1.length}</p>
                </div>
                <div>
                    <p className="tw-text-gray-800 tw-font-semibold">Jumlah Bimbingan</p>
                    <p className="tw-text-gray-600">{data_bimbingan_2.length}</p>
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
                        <Column
                            header="Aksi"
                            style={{ width: '5%' }}
                            body={(data) => {
                                return (
                                    <>
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
                                        {data.status_bimbingan_ta === '1' && (
                                            <Button
                                                icon="pi pi-trash"
                                                severity="warning"
                                                rounded
                                                tooltip="Tolak Bimbingan"
                                                tooltipOptions={{
                                                    position: 'left',
                                                    mouseTrack: false,
                                                    mouseTrackLeft: 15,
                                                }}
                                                onClick={() => confirmTolakbimbingan(data)}
                                            />
                                        )}

                                    </>
                                );
                            }}
                        />

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

                    <Dialog
                        visible={tolakbimbinganDialog}
                        style={{ width: "450px" }}
                        header="Confirm"
                        modal
                        footer={tolakbimbinganDialogFooter}
                        onHide={hideTolakbimbinganDialog}
                    >
                        <div className="flex align-items-center justify-content-center">
                            <i
                                className="pi pi-exclamation-triangle mr-3"
                                style={{ fontSize: "2rem" }}
                            />
                            {bimbingan && (
                                <span>
                                    Are you sure you are not guiding{" "}
                                    <b>{data_mhs_ta.nama_mahasiswa}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog
                        visible={accsidangtaDialog}
                        style={{ width: "450px" }}
                        header="Confirm"
                        modal
                        footer={accsidangtaDialogFooter}
                        onHide={hideAccSidangTaDialog}
                    >
                        <div className="flex align-items-center justify-content-center">
                            <i
                                className="pi pi-exclamation-triangle mr-3"
                                style={{ fontSize: "2rem" }}
                            />
                            {data_mhs_ta.acc_pembimbing_satu === '0' ? (
                                <span>
                                    are you sure about accepting {" "} <b>{data_mhs_ta.nama_mahasiswa}</b> {" "}final project hearing
                                    ?
                                </span>
                            ) : (
                                <span>
                                    are you sure about canceling {" "} <b>{data_mhs_ta.nama_mahasiswa}</b> {" "}final project hearing
                                    ?
                                </span>
                            )}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    )
};

export default bimbingan;
