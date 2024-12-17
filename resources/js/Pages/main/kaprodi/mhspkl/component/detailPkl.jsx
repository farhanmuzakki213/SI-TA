import React, { useEffect, useRef, useState } from "react";
import { Tag } from 'primereact/tag';
import { Button } from "primereact/button";
import PklForm from "./ubahpklForm";
import { router, usePage } from "@inertiajs/react";
import { Toast } from "primereact/toast";

const detailPkl = ({
    data_mhs,
    dosenOptions : initialDosenOptions,
    dosenPembimbingOptions : initialDosenPembimbingOptions,
}) => {
    let emptypkl = {
        id_pkl_mhs: null,
        pembimbing_id: null,
        penguji_id: null,
    };
    const { props } = usePage();
    const data_mhss = data_mhs[0];
    const [pkls, setpkls] = useState([]);
    const [dosenOptions, setDosenOptions] = useState([]);
    const [dosenPembimbingOptions, setDosenPembimbingOptions] = useState([]);
    const [pklDialog, setpklDialog] = useState(false);
    const [pkl, setpkl] = useState(emptypkl);
    const [submitted, setSubmitted] = useState(false);
    const toast = useRef(null);

    useEffect(() => {
        setpkls(data_mhss);
        setDosenOptions(initialDosenOptions);
        setDosenPembimbingOptions(initialDosenPembimbingOptions);
        displaySuccessMessage(props.flash?.success);
        displayErrorMessage(props.flash?.error);
    }, [data_mhss, props.flash, initialDosenOptions, initialDosenPembimbingOptions]);

    // console.log("2:",initialDosenOptions)
    const hideDialog = () => {
        setSubmitted(false);
        setpklDialog(false);
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

    const savepkl = async () => {
        console.log("test1", pkl);
        setSubmitted(true);

        const requiredFieldsForUpdate = [
            pkl.id_pkl_mhs,
            pkl.pembimbing_id,
            pkl.penguji_id
        ];

        const isValid = requiredFieldsForUpdate.every(field => field);

        if (!isValid) {
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: "Please fill in all required fields.",
                life: 3000,
            });
            return;
        }
        console.log("test2", pkl);

        const { id_pkl_mhs, pembimbing_id, penguji_id } = pkl;

        try {
            console.log("test3", pkl);
            await router.put(`/Kprodi/Mhspkl/Pkl/${id_pkl_mhs}/update`, { pembimbing_id, penguji_id });

            setpkls(prevpkls => {
                if (!Array.isArray(prevpkls)) {
                    return [];
                }

                return prevpkls.map(d =>
                    d.id_pkl_mhs === pkl.id_pkl_mhs ? pkl : d
                );
            });
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to update data.";
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: errorMessage,
                life: 3000,
            });
        } finally {
            setpkl(emptypkl);
            setpklDialog(false);
        }
    };

    const editpkl = (pkl) => {
        setpkl({ ...pkl });
        setpklDialog(true);
    };

    const pklDialogFooter = (
        <>
            <Button
                label="Cancel"
                icon="pi pi-times"
                text
                onClick={hideDialog}
            />
            <Button label="Save" icon="pi pi-check" text onClick={savepkl} />
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
                    <div className="tw-flex tw-justify-between tw-items-center">
                        <div className="tw-flex tw-items-center">
                            <p className="tw-text-gray-600">{pkls.dosen_pembimbing}</p>
                        </div>
                        <Button icon="pi pi-pencil" severity="success" outlined rounded
                            tooltip="Ubah Pembimbing" tooltipOptions={{ position: 'left', mouseTrack: false, mouseTrackLeft: 15 }}
                        onClick={() => editpkl(data_mhss)}/>
                    </div>
                </div>
                <div>
                    <p className="tw-text-gray-800 tw-font-semibold">Status</p>
                    {statusUsulan()}
                </div>
            </div>
            <PklForm
                pklDialog={pklDialog}
                pkl={pkl}
                dosenOptions={dosenOptions}
                dosenPembimbingOptions={dosenPembimbingOptions}
                setpkl={setpkl}
                submitted={submitted}
                pklDialogFooter={pklDialogFooter}
                hideDialog={hideDialog}
            />
        </div>
    )
};

export default detailPkl;
