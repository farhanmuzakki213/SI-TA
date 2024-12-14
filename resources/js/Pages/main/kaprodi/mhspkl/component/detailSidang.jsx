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
    // console.log(data_mhss);
    const { props } = usePage();
    const toast = useRef(null);
    const [submitted, setSubmitted] = useState(false);
    /* Jadwal Sidang */
    let emptybooking = {
        id_booking: null,
        ruangan_id: null,
        sesi_id: null,
        mahasiswa_id: data_mhss.id_mahasiswa,
        tipe: "1",
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

        const { mahasiswa_id, ruangan_id, sesi_id, status_booking, tgl_booking, tipe } = booking;

        try {

            if (isCreating) {
                await router.post('/Kprodi/Mhspkl/Jadwal/store', { id_booking: nextNumber, mahasiswa_id, ruangan_id, sesi_id, tgl_booking, tipe });
            } else {
                await router.put(`/Kprodi/Mhspkl/Jadwal/${booking.id_booking}/update`, { ruangan_id, sesi_id, status_booking, tgl_booking });
            }

            if (isCreating) {
                setbookings(prevbookings => {
                    if (!Array.isArray(prevbookings)) {
                        return [];
                    }
                    return [...prevbookings, _booking]
                });
            } else {
                setbookings(prevbookings => {
                    if (!Array.isArray(prevbookings)) {
                        return [];
                    }
                    return prevbookings.map(d => d.id_booking === booking.id_booking ? _booking : d)
                });
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

    const nilaiPenguji_1 = JSON.parse(data_mhss.nilai_penguji_1?.nilai || null);
    const nilaiPenguji_2 = JSON.parse(data_mhss.nilai_penguji_2?.nilai || null);
    const nilaiPembimbing = JSON.parse(data_mhss.nilai_pembimbing?.nilai || null);
    const nilaiAkhir = () => {
        if (nilaiPembimbing != null && nilaiPenguji_1 != null && nilaiPenguji_2 != null) {
            const totalNilai =
                (data_mhss.nilai_industri * 0.30) +
                (nilaiPembimbing.total_nilai * 0.35) +
                (((nilaiPenguji_1.total_nilai + nilaiPenguji_2.total_nilai) / 2) * 0.35);
            return parseFloat(totalNilai.toFixed(2));
        }
        return null;
    };
    const openFile = async () => {
        try {
            const url = `/SuratTugas/Pkl/${data_mhss.id_pkl_mhs}`;
            window.open(url, '_blank');
        } catch (error) {
            console.error(error);
        }
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
                        onClick={() => editbooking(bookings)}
                    />
                )}
            </div>
            <hr className="tw-my-4" />
            <div className="card">
                <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6 tw-bg-white tw-p-4 tw-rounded-lg tw-shadow-sm">
                    <div>
                        <p className="tw-text-gray-800 tw-font-semibold">Judul</p>
                        {!data_mhss.judul ? (
                            <p className="tw-text-gray-600">Belum Ada Judul</p>
                        ) : (
                            data_mhss.status_ver_pkl === "3" ? (
                                <p className="tw-text-gray-600">{data_mhss.judul}</p>
                            ) : (
                                <p className="tw-text-gray-600">Judul Belum Diverifikasi</p>
                            )
                        )}
                    </div>
                    <div>
                        <p className="tw-text-gray-800 tw-font-semibold">Tanggal Sidang</p>
                        <p className="tw-text-gray-600">{!data_mhss.tgl_sidang ? 'Belum Dijadwalkan' : data_mhss.tgl_sidang}</p>
                    </div>
                    <div>
                        <p className="tw-text-gray-800 tw-font-semibold">Ruangan</p>
                        <p className="tw-text-gray-600">{!data_mhss.ruangan_sidang ? 'Belum Dijadwalkan' : data_mhss.ruangan_sidang}</p>
                    </div>
                    <div>
                        <p className="tw-text-gray-800 tw-font-semibold">Sesi</p>
                        <p className="tw-text-gray-600">{!data_mhss.sesi_sidang ? 'Belum Dijadwalkan' : data_mhss.sesi_sidang}</p>
                    </div>
                </div>
            </div>
            <div className="card">
                <p className="tw-text-lg tw-font-semibold tw-text-gray-800">Penilaian Tugas Akhir</p>
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
                            <p className="tw-text-gray-600">{data_mhss.dosen_pembimbing}</p>
                        </div>
                        <div className="tw-w-1/3">
                            <p className="tw-text-gray-600">Pembimbing Program Studi</p>
                        </div>
                        <div className="tw-w-1/3 tw-text-right">
                            {!nilaiPembimbing ? (
                                <p className="tw-text-gray-600">Belum Dinilai</p>
                            ) : (
                                <p className="tw-text-gray-600">{nilaiPembimbing.total_nilai}</p>
                            )}
                        </div>
                    </div>
                    <div className="tw-flex tw-justify-between tw-items-center tw-border-b tw-pb-2">
                        <div className="tw-w-1/3">
                            {!data_mhss.pkl_pembimbing ? (
                                <p className="tw-text-gray-600">Belum Ada Pembimbing Industri</p>
                            ) : (
                                data_mhss.status_ver_pkl === "3" ? (
                                    <p className="tw-text-gray-600">{data_mhss.pkl_pembimbing}</p>
                                ) : (
                                    <p className="tw-text-gray-600">Pembimbing Industri Belum Diverifikasi</p>
                                )
                            )}
                        </div>
                        <div className="tw-w-1/3">
                            <p className="tw-text-gray-600">Pembimbing dari Industri</p>
                        </div>
                        <div className="tw-w-1/3 tw-text-right">
                            {!data_mhss.nilai_industri ? (
                                <p className="tw-text-gray-600">Belum Dinilai</p>
                            ) : (
                                data_mhss.status_ver_pkl === "3" ? (
                                    <p className="tw-text-gray-600">{data_mhss.nilai_industri}</p>
                                ) : (
                                    <p className="tw-text-gray-600">Nilai Belum Diverifikasi</p>
                                )
                            )}
                        </div>
                    </div>
                    <div className="tw-flex tw-justify-between tw-items-center tw-border-b tw-pb-2">
                        <div className="tw-w-1/3">
                            <p className="tw-text-gray-600">{data_mhss.dosen_pembimbing}</p>
                        </div>
                        <div className="tw-w-1/3">
                            <p className="tw-text-gray-600">Penguji 1</p>
                        </div>
                        <div className="tw-w-1/3 tw-text-right">
                            {!nilaiPenguji_1 ? (
                                <p className="tw-text-gray-600">Belum Dinilai</p>
                            ) : (
                                <p className="tw-text-gray-600">{nilaiPenguji_1.total_nilai}</p>
                            )}
                        </div>
                    </div>
                    <div className="tw-flex tw-justify-between tw-items-center tw-border-b tw-pb-2">
                        <div className="tw-w-1/3">
                            <p className="tw-text-gray-600">{data_mhss.dosen_penguji}</p>
                        </div>
                        <div className="tw-w-1/3">
                            <p className="tw-text-gray-600">Penguji 2</p>
                        </div>
                        <div className="tw-w-1/3 tw-text-right">
                            {!nilaiPenguji_2 ? (
                                <p className="tw-text-gray-600">Belum Dinilai</p>
                            ) : (
                                <p className="tw-text-gray-600">{nilaiPenguji_2.total_nilai}</p>
                            )}
                        </div>
                    </div>
                    <hr className="tw-my-2" />
                    <div className="tw-flex tw-justify-between tw-items-center tw-border-b tw-pb-2">
                        <div className="tw-w-1/2">
                            <p className="tw-text-gray-800 tw-font-medium">Total Nilai</p>
                        </div>
                        <div className="tw-w-1/2 tw-text-right">
                            <p className="tw-text-gray-800 tw-font-medium">{!nilaiAkhir() ? 'Nilai Belum Lengkap' : nilaiAkhir()}</p>
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
                                <span className="tw-text-gray-800">Nilai Industri</span>
                            </div>
                            {data_mhss.file_nilai ? (
                                data_mhss.status_ver_pkl === "3" ? (
                                    <Button icon="pi pi-file" severity="primary" outlined label="File"
                                        tooltip="Lihat File" tooltipOptions={{ position: 'left', mouseTrack: false, mouseTrackLeft: 15 }}
                                        onClick={() => window.open(`/storage/uploads/pkl/nilai_industri/${data_mhss.file_nilai}`, '_blank')} />
                                ) : (
                                    <span className="tw-text-gray-800">File Belum Diverifikasi</span>
                                )
                            ) : (
                                <span className="tw-text-gray-800">File Belum Tersedia</span>
                            )}
                        </div>
                        <div className="tw-flex tw-justify-between tw-items-center tw-py-2">
                            <div className="tw-flex tw-items-center">
                                <span className="tw-text-gray-800">Laporan Akhir</span>
                            </div>
                            {data_mhss.file_laporan ? (
                                data_mhss.status_ver_pkl === "3" ? (
                                    <Button icon="pi pi-file" severity="primary" outlined label="File"
                                        tooltip="Lihat File" tooltipOptions={{ position: 'left', mouseTrack: false, mouseTrackLeft: 15 }}
                                        onClick={() => window.open(`/storage/uploads/pkl/laporan_akhir/${data_mhss.file_laporan}`, '_blank')} />
                                ) : (
                                    <span className="tw-text-gray-800">File Belum Diverifikasi</span>
                                )
                            ) : (
                                <span className="tw-text-gray-800">File Belum Tersedia</span>
                            )}
                        </div>
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
                    </div>
                </div>
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
