import React, { useEffect, useRef, useState } from "react";
import { Button } from "primereact/button";
import PklForm from "./ubahpklForm";
import { router, usePage } from "@inertiajs/react";
import { Toast } from "primereact/toast";
import BookingForm from "./BookingForm";

const detailSidang = ({
    data_mhs,
    dosenOptions: initialDosenOptions,
    ruanganOptions: initialRuanganOptions,
    sesiOptions: initialSesiOptions,
    nextNumber,
    bookingused,
    jambookingused
}) => {
    const data_mhss = data_mhs[0];
    const { props } = usePage();
    const toast = useRef(null);
    const [submitted, setSubmitted] = useState(false);
    /* Jadwal Sidang */
    let emptybooking = {
        id_booking: null,
        ruangan_id: null,
        sesi_id: null,
        mahasiswa_id: null,
        tipe: "",
        tgl_booking: null,
        status_booking: "",
    };
    const [bookings, setbookings] = useState(null);
    const [ruanganOptions, setRuanganOptions] = useState([]);
    const [sesiOptions, setSesiOptions] = useState([]);
    const [bookingDialog, setbookingDialog] = useState(false);
    const [booking, setbooking] = useState(emptybooking);

    useEffect(() => {
        setbookings(data_mhss);
        setRuanganOptions(initialRuanganOptions);
        setSesiOptions(initialSesiOptions);
    }, [data_mhss, initialRuanganOptions, initialSesiOptions]);

    const bookingopenNew = () => {
        setbooking(emptybooking);
        setSubmitted(false);
        setbookingDialog(true);
    };

    const savebooking = async () => {
        setSubmitted(true);

        const requiredFieldsForCreate = [
            booking.ruangan_id,
            booking.sesi_id,
            booking.tgl_booking,
        ];

        const requiredFieldsForUpdate = [
            booking.ruangan_id,
            booking.sesi_id,
            booking.tgl_booking,
            booking.status_booking
        ];

        const isCreating = !booking.id_booking;
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

        let _booking = { ...booking };

        try {

            if (isCreating) {
                _booking.id_booking = nextNumber;
                await router.post('/Kprodi/Mhspkl/Jadwal/store', _booking);
            } else {

                await router.put(`/Kprodi/Mhspkl/Jadwal/${booking.id_booking}/update`, _booking);
            }

            if (isCreating) {
                setbookings(prevbookings => [...prevbookings, _booking]);
            } else {
                setbookings(prevbookings =>
                    prevbookings.map(d => d.id_booking === booking.id_booking ? _booking : d)
                );
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to save Jadwal Ruangan.";
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: errorMessage,
                life: 3000,
            });
        } finally {
            setbooking(emptybooking);
            setbookingDialog(false);
        }
    };
    const editbooking = (booking) => {
        setbooking({ ...booking });
        setbookingDialog(true);
    };

    const bookinghideDialog = () => {
        setSubmitted(false);
        setbookingDialog(false);
    };

    const bookingDialogFooter = (
        <>
            <Button
                label="Cancel"
                icon="pi pi-times"
                text
                onClick={bookinghideDialog}
            />
            <Button label="Save" icon="pi pi-check" text onClick={savebooking} />
        </>
    );
    /* Pembimbing dan Penguji */
    let emptypkl = {
        id_pkl_mhs: null,
        pembimbing_id: null,
        penguji_id: null,
    };
    const [pkls, setpkls] = useState([]);
    const [dosenOptions, setDosenOptions] = useState([]);
    const [pklDialog, setpklDialog] = useState(false);
    const [pkl, setpkl] = useState(emptypkl);

    useEffect(() => {
        setpkls(data_mhss);
        setDosenOptions(initialDosenOptions);
        displaySuccessMessage(props.flash?.success);
        displayErrorMessage(props.flash?.error);
    }, [data_mhss, props.flash, initialDosenOptions]);

    const pklhideDialog = () => {
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

        const { id_pkl_mhs, pembimbing_id, penguji_id } = pkl;

        try {
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
                onClick={pklhideDialog}
            />
            <Button label="Save" icon="pi pi-check" text onClick={savepkl} />
        </>
    );

    const nilaiPenguji = JSON.parse(data_mhss.nilai_penguji?.nilai || '{}');
    const nilaiPembimbing = JSON.parse(data_mhss.nilai_pembimbing?.nilai || '{}');
    const nilaiAkhir = () => {
        if (nilaiPembimbing != null && nilaiPenguji != null) {
            return ((data_mhss.nilai_industri + nilaiPenguji.total_nilai + nilaiPembimbing.total_nilai) / 3);
        }
        return null;
    };
    return (
        <div className="card">
            <Toast ref={toast} />
            <div className="tw-flex tw-justify-between tw-items-center tw-py-2">
                <div className="tw-flex tw-items-center">
                    <h1 className="tw-text-2xl tw-font-bold tw-text-gray-900">Sidang Details</h1>
                </div>
                {data_mhss.status_ver_pkl === "3" && data_mhss.tgl_sidang === null && (
                    <Button
                        label="Jadwal"
                        icon="pi pi-plus"
                        severity="sucess"
                        className="mr-2"
                        tooltip="Tambah Jadwal"
                        tooltipOptions={{ position: 'left', mouseTrack: false, mouseTrackLeft: 15 }}
                        onClick={bookingopenNew}
                    />
                )}
                {data_mhss.status_ver_pkl === "3" && data_mhss.tgl_sidang != null && (
                    <Button
                        label="Jadwal"
                        icon="pi pi-pencil"
                        severity="success"
                        className="mr-2"
                        tooltip="Ubah Jadwal"
                        tooltipOptions={{ position: 'left', mouseTrack: false, mouseTrackLeft: 15 }}
                        onClick={() => editbooking(data_mhss)}
                    />
                )}

            </div>
            <hr className="tw-my-4" />
            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4">
                <div>
                    <p className="tw-text-gray-800 tw-font-semibold">Judul Laporan</p>
                    <p className="tw-text-gray-600">{!data_mhss.judul ? '-' : data_mhss.judul}</p>
                </div>
                <div>
                    <p className="tw-text-gray-800 tw-font-semibold">Tanggal Sidang</p>
                    <p className="tw-text-gray-600">{!data_mhss.tgl_sidang ? '-' : data_mhss.tgl_sidang}</p>
                </div>
                <div>
                    <p className="tw-text-gray-800 tw-font-semibold">Pembimbing Industri</p>
                    <p className="tw-text-gray-600">{!data_mhss.pkl_pembimbing ? '-' : data_mhss.pkl_pembimbing}</p>
                </div>
                <div>
                    <p className="tw-text-gray-800 tw-font-semibold">Ruangan</p>
                    <p className="tw-text-gray-600">{!data_mhss.ruangan_sidang ? '-' : data_mhss.ruangan_sidang}</p>
                </div>
                <div>
                    <p className="tw-text-gray-800 tw-font-semibold">Dosen Penguji</p>
                    <div className="tw-flex tw-justify-between tw-items-center">
                        <div className="tw-flex tw-items-center">
                            <p className="tw-text-gray-600">{pkls.dosen_penguji}</p>
                        </div>
                        <Button icon="pi pi-pencil" severity="success" outlined rounded
                            tooltip="Ubah Penguji" tooltipOptions={{ position: 'left', mouseTrack: false, mouseTrackLeft: 15 }}
                            onClick={() => editpkl(data_mhss)} />
                    </div>
                </div>
                <div>
                    <p className="tw-text-gray-800 tw-font-semibold">Sesi</p>
                    <p className="tw-text-gray-600">{!data_mhss.sesi_sidang ? '-' : data_mhss.sesi_sidang}</p>
                </div>
            </div>
            <hr className="tw-my-3" />
            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4">
                <div>
                    <p className="tw-text-gray-800 tw-font-semibold">Nilai Industri</p>
                    <p className="tw-flex tw-items-center tw-text-gray-600">{!data_mhss.nilai_industri ? '-' : data_mhss.nilai_industri}</p>
                </div>
                <div>
                    <p className="tw-text-gray-800 tw-font-semibold">Nilai Pembimbing</p>
                    <p className="tw-text-gray-600">{!nilaiPembimbing.total_nilai ? '-' : nilaiPembimbing.total_nilai}</p>
                </div>
                <div>
                    <p className="tw-text-gray-800 tw-font-semibold">Nilai Penguji</p>
                    <p className="tw-text-gray-600">{!nilaiPenguji.total_nilai ? '-' : nilaiPenguji.total_nilai}</p>
                </div>
                <div>
                    <p className="tw-text-gray-800 tw-font-semibold">Nilai Akhir</p>
                    <p className="tw-text-gray-600">{!nilaiAkhir() ? '-' : nilaiAkhir()}</p>
                </div>
            </div>
            <div className="tw-mt-4">
                <p className="tw-text-gray-800 tw-font-semibold">Files</p>
                <hr className="tw-my-2" />
                <div className="tw-flex tw-justify-between tw-items-center tw-py-2">
                    <div className="tw-flex tw-items-center">
                        <span className="tw-ml-2 tw-text-gray-800">Nilai Industri</span>
                    </div>
                    <Button icon="pi pi-file" severity="primary" outlined label="File"
                        tooltip="Lihat File" tooltipOptions={{ position: 'left', mouseTrack: false, mouseTrackLeft: 15 }}
                        onClick={() => window.open(`/storage/uploads/pkl/nilai_industri/${data_mhss.file_nilai}`, '_blank')} />
                </div>
                <hr />
                <div className="tw-flex tw-justify-between tw-items-center tw-py-2">
                    <div className="tw-flex tw-items-center">
                        <span className="tw-ml-2 tw-text-gray-800">Laporan Akhir</span>
                    </div>
                    <Button icon="pi pi-file" severity="primary" outlined label="File"
                        tooltip="Lihat File" tooltipOptions={{ position: 'left', mouseTrack: false, mouseTrackLeft: 15 }}
                        onClick={() => window.open(`/storage/uploads/pkl/laporan_akhir/${data_mhss.file_laporan}`, '_blank')} />
                </div>
                <hr />
                <div className="tw-flex tw-justify-between tw-items-center tw-py-2">
                    <div className="tw-flex tw-items-center">
                        <span className="tw-ml-2 tw-text-gray-800">Surat Tugas</span>
                    </div>
                    <Button icon="pi pi-file" severity="primary" outlined label="File"
                        tooltip="Lihat File" tooltipOptions={{ position: 'left', mouseTrack: false, mouseTrackLeft: 15 }} />
                </div>
                <hr />
            </div>
            <PklForm
                pklDialog={pklDialog}
                pkl={pkl}
                dosenOptions={dosenOptions}
                setpkl={setpkl}
                submitted={submitted}
                pklDialogFooter={pklDialogFooter}
                pklhideDialog={pklhideDialog}
            />

            <BookingForm
                bookingDialog={bookingDialog}
                booking={booking}
                setbooking={setbooking}
                submitted={submitted}
                ruanganOptions={ruanganOptions}
                sesiOptions={sesiOptions}
                bookingDialogFooter={bookingDialogFooter}
                bookinghideDialog={bookinghideDialog}
                bookingused={bookingused}
                jambookingused={jambookingused}
            />
        </div>
    )
};

export default detailSidang;
