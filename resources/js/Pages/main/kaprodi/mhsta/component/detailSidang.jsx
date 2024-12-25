import React, { useEffect, useRef, useState } from "react";
import { Button } from 'primereact/button';
import BookingForm from "./BookingForm";
import UbahDosenForm from "./ubahdosenForm";
import { router, usePage } from "@inertiajs/react";
import { Messages } from "primereact/messages";
import { Toast } from "primereact/toast";

const detailTa = ({
    data_ta,
    dosenPengujiOptions: initialDosenPengujiOptions,
    dosenPembimbingOptions: initialDosenPembimbingOptions,
    ruanganOptions: initialRuanganOptions,
    sesiOptions: initialSesiOptions,
    nextNumber,
    bookingused,
    jambookingused
}) => {
    // console.log("data_ta", data_ta);
    const data_tas = data_ta[0];
    const { props } = usePage();
    const toast = useRef(null);
    const msgs = useRef(null);
    const [submitted, setSubmitted] = useState(false);

    /* Jadwal Sidang */
    let emptybooking = {
        id_booking: null,
        ruangan_id: null,
        sesi_id: null,
        mahasiswa_id: data_tas.id_mahasiswa,
        tipe: "3",
        tgl_booking: null,
        status_booking: "",
    };
    const [bookings, setbookings] = useState(null);
    const [ruanganOptions, setRuanganOptions] = useState([]);
    const [sesiOptions, setSesiOptions] = useState([]);
    const [bookingDialog, setbookingDialog] = useState(false);
    const [booking, setbooking] = useState(emptybooking);

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
    useEffect(() => {
        setbookings(data_tas);
        setRuanganOptions(initialRuanganOptions);
        setSesiOptions(initialSesiOptions);

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
    }, [data_tas, initialRuanganOptions, initialSesiOptions]);

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
                await router.post('/Kprodi/MhsTA/Jadwal/store', { id_booking: nextNumber, mahasiswa_id, ruangan_id, sesi_id, tgl_booking, tipe });
            } else {
                await router.put(`/Kprodi/MhsTA/Jadwal/${booking.id_booking}/update`, { ruangan_id, sesi_id, status_booking, tgl_booking });
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
    let emptydosensidang = {
        id_ta_mhs: null,
        pembimbing_1_id: null,
        pembimbing_2_id: null,
        ketua_id: null,
        sekretaris_id: null,
        penguji_1_id: null,
        penguji_2_id: null,
    };
    const [dosensidangs, setdosensidangs] = useState([]);
    const [dosenPengujiOptions, setDosenPengujiOptions] = useState([]);
    const [dosenPembimbingOptions, setDosenPembimbingOptions] = useState([]);
    const [dosensidangDialog, setdosensidangDialog] = useState(false);
    const [dosensidang, setdosensidang] = useState(emptydosensidang);

    useEffect(() => {
        setdosensidangs(data_tas);
        setDosenPengujiOptions(initialDosenPengujiOptions);
        setDosenPembimbingOptions(initialDosenPembimbingOptions);
        displaySuccessMessage(props.flash?.success);
        displayErrorMessage(props.flash?.error);
    }, [data_tas, props.flash, initialDosenPengujiOptions, initialDosenPembimbingOptions]);

    const dosensidanghideDialog = () => {
        setSubmitted(false);
        setdosensidangDialog(false);
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

    const savedosensidang = async () => {
        setSubmitted(true);

        const requiredFieldsForUpdate = [
            dosensidang.id_ta_mhs,
            dosensidang.pembimbing_1_id,
            dosensidang.pembimbing_2_id,
        ];
        if (data_tas.status_ver_ta === '2') {
            requiredFieldsForUpdate.push(dosensidang.ketua_id);
            requiredFieldsForUpdate.push(dosensidang.sekretaris_id);
            requiredFieldsForUpdate.push(dosensidang.penguji_1_id);
            requiredFieldsForUpdate.push(dosensidang.penguji_2_id);
        }

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

        const { id_ta_mhs, pembimbing_1_id, pembimbing_2_id, ketua_id, sekretaris_id, penguji_1_id, penguji_2_id } = dosensidang;

        try {
            await router.put(`/Kprodi/MhsTA/Dosen/${id_ta_mhs}/update`, { pembimbing_1_id, pembimbing_2_id, ketua_id, sekretaris_id, penguji_1_id, penguji_2_id });

            setdosensidangs(prevdosensidangs => {
                if (!Array.isArray(prevdosensidangs)) {
                    return [];
                }

                return prevdosensidangs.map(d =>
                    d.id_ta_mhs === dosensidang.id_ta_mhs ? dosensidang : d
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
            setdosensidang(emptydosensidang);
            setdosensidangDialog(false);
        }
    };

    const editdosensidang = (dosensidang) => {
        setdosensidang({ ...dosensidang });
        setdosensidangDialog(true);
    };

    const dosensidangDialogFooter = (
        <>
            <Button
                label="Cancel"
                icon="pi pi-times"
                text
                onClick={dosensidanghideDialog}
            />
            <Button label="Save" icon="pi pi-check" text onClick={savedosensidang} />
        </>
    );
    const openFile = async () => {
        try {
            const url = `/SuratTugas/TA/${data_tas.id_ta_mhs}`;
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
                {data_tas.status_ver_ta === "2" && data_tas.tgl_sidang === null && !nilaiAkhir() && (
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
                {data_tas.status_ver_ta === "2" && data_tas.tgl_sidang != null && !nilaiAkhir() && (
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
            {data_tas.status_sidang_ta !== '0' && (
                <>
                    <div className="card">
                        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6 tw-bg-white tw-p-4 tw-rounded-lg tw-shadow-sm">
                            <div>
                                <p className="tw-text-gray-800 tw-font-semibold">Judul</p>
                                <p className="tw-text-gray-600">{!data_tas.judul ? '-' : data_tas.judul}</p>
                            </div>
                            <div>
                                <p className="tw-text-gray-800 tw-font-semibold">Tanggal Sidang</p>
                                <p className="tw-text-gray-600">{!data_tas.tgl_sidang ? '-' : data_tas.tgl_sidang}</p>
                            </div>
                            <div>
                                <p className="tw-text-gray-800 tw-font-semibold">Ruangan</p>
                                <p className="tw-text-gray-600">{!data_tas.ruangan_sidang ? '-' : data_tas.ruangan_sidang}</p>
                            </div>
                            <div>
                                <p className="tw-text-gray-800 tw-font-semibold">Sesi</p>
                                <p className="tw-text-gray-600">{!data_tas.sesi_sidang ? '-' : data_tas.sesi_sidang}</p>
                            </div>
                        </div>
                    </div>
                </>
            )}
            <div className="card">
                <Messages ref={msgs} className="tw-mb-2" />
                <div className="tw-flex tw-justify-between tw-items-center tw-py-2">
                    <div className="tw-flex tw-items-center">
                        <p className="tw-text-lg tw-font-semibold tw-text-gray-800">Penilaian Tugas Akhir</p>
                    </div>
                    {!nilaiAkhir() && (
                        <Button icon="pi pi-pencil" severity="success" label="Ubah Dosen"
                            tooltip="Ubah Pembimbing dan Penguji" tooltipOptions={{ position: 'left', mouseTrack: false, mouseTrackLeft: 15 }}
                            onClick={() => editdosensidang(data_tas)} />
                    )}
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
                        {data_tas.id_booking && (
                            <div className="tw-flex tw-justify-between tw-items-center tw-py-2">
                                <div className="tw-flex tw-items-center">
                                    <span className="tw-text-gray-800">Surat Tugas</span>
                                </div>
                                <Button icon="pi pi-file" severity="primary" outlined label="File"
                                    tooltip="Lihat File" tooltipOptions={{ position: 'left', mouseTrack: false, mouseTrackLeft: 15 }}
                                    onClick={openFile} />
                            </div>
                        )}
                        {data_tas.status_ver_ta === '2' && (
                            <>
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
                                        onClick={() => window.open(`/storage/uploads/sempro/file/${data_tas?.file_proposal}`, '_blank')}
                                    />
                                </div>
                            </>
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
            <UbahDosenForm
                dosensidangDialog={dosensidangDialog}
                dosensidang={dosensidang}
                dosenPengujiOptions={dosenPengujiOptions}
                dosenPembimbingOptions={dosenPembimbingOptions}
                setdosensidang={setdosensidang}
                submitted={submitted}
                dosensidangDialogFooter={dosensidangDialogFooter}
                dosensidanghideDialog={dosensidanghideDialog}
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
    );
};

export default detailTa;
