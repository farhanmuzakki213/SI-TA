import { React, useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { RadioButton } from "primereact/radiobutton";
import { Calendar } from "primereact/calendar";
import "primeicons/primeicons.css";

const BookingForm = ({
    bookingDialog,
    booking,
    submitted,
    ruanganOptions,
    sesiOptions,
    bookingDialogFooter,
    hideDialog,
    setbooking,
    mahasiswaPklOptions,
    mahasiswaSemproOptions,
    mahasiswaTaOptions,
}) => {
    const [calendarValue, setCalendarValue] = useState(null);
    const parseDate = (dateString) => {
        if (!dateString) return null;
        const [year, month, day] = dateString.split("-");
        return new Date(year, month - 1, day);
    };

    const formatDate = (date) => {
        if (!date) return "";

        return date.toLocaleDateString("en-CA", {
            timeZone: "Asia/Jakarta",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
    };

    const handleDateChange = (e) => {
        const selectedDate = e.value ?? null;
        setCalendarValue(selectedDate);

        setbooking((prevBooking) => ({
            ...prevBooking,
            tgl_booking: formatDate(selectedDate),
        }));
    };

    useEffect(() => {
        if (booking.tgl_booking) {
            setCalendarValue(parseDate(booking.tgl_booking));
        } else {
            setCalendarValue(null);
        }
    }, [booking.tgl_booking]);
    const onInputChange = (e, field) => {
        const value = e.target ? e.target.value : e.value;
        setbooking((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };
    const onStatusChange = (e) => {
        let _booking = { ...booking };
        _booking["status_booking"] = e.value;

        setbooking(_booking);
    };

    const onTipeChange = (e) => {
        let _booking = { ...booking };
        _booking["tipe"] = e.value;
        _booking["mahasiswa_id"] = "";

        setbooking(_booking);
    };

    const today = new Date();

    const minDate = new Date(today);
    minDate.setDate(minDate.getDate() + 1);

    const maxDate = new Date(today);
    maxDate.setDate(maxDate.getDate() + 8);

    return (
        <Dialog
            visible={bookingDialog}
            style={{ width: "450px" }}
            header="Jadwal Ruangan Details"
            modal
            className="p-fluid"
            footer={bookingDialogFooter}
            onHide={hideDialog}
        >
            {/* Ruangan ID */}
            <div className="field">
                <label htmlFor="ruangan_id">Ruangan</label>
                <Dropdown
                    id="ruangan_id"
                    value={booking.ruangan_id || ""}
                    onChange={(e) => onInputChange(e, "ruangan_id")}
                    options={ruanganOptions}
                    placeholder="Select a Ruangan"
                    optionLabel="label"
                    required
                />
                {submitted && !booking.ruangan_id && (
                    <small className="p-invalid"> Ruangan is required.</small>
                )}
            </div>

            {/* Sesi ID */}
            <div className="field">
                <label htmlFor="sesi_id">Sesi</label>
                <Dropdown
                    id="sesi_id"
                    value={booking.sesi_id || ""}
                    onChange={(e) => onInputChange(e, "sesi_id")}
                    options={sesiOptions}
                    placeholder="Select a Sesi"
                    optionLabel="label"
                    required
                />
                {submitted && !booking.sesi_id && (
                    <small className="p-invalid"> Sesi is required.</small>
                )}
            </div>

            {/* Mahasiswa ID */}
            <div className="field">
                <label htmlFor="mahasiswa_id">Mahasiswa</label>
                <Dropdown
                    id="mahasiswa_id"
                    value={booking.mahasiswa_id || ""}
                    onChange={(e) => onInputChange(e, "mahasiswa_id")}
                    options={
                        booking.tipe === "1"
                            ? mahasiswaPklOptions
                            : booking.tipe === "2"
                            ? mahasiswaSemproOptions
                            : booking.tipe === "3"
                            ? mahasiswaTaOptions
                            : []
                    }
                    placeholder="Select a Mahasiswa"
                    optionLabel="label"
                    disabled={!booking.tipe}
                    required
                />
                {submitted && !booking.mahasiswa_id && (
                    <small className="p-invalid"> Mahasiswa is required.</small>
                )}
            </div>

            {/* Tipe */}
            <div className="field">
                <label className="mb-3">Tujuan Booking</label>
                <div className="formgrid grid">
                    <div className="field-radiobutton col-4">
                        <RadioButton
                            inputId="tipe1"
                            name="tipe"
                            value="1"
                            onChange={onTipeChange}
                            checked={booking.tipe === "1"}
                        />
                        <label htmlFor="tipe1">Sidang PKL</label>
                    </div>
                    <div className="field-radiobutton col-4">
                        <RadioButton
                            inputId="tipe2"
                            name="tipe"
                            value="2"
                            onChange={onTipeChange}
                            checked={booking.tipe === "2"}
                        />
                        <label htmlFor="tipe2">Sidang Sempro</label>
                    </div>
                    <div className="field-radiobutton col-4">
                        <RadioButton
                            inputId="tipe3"
                            name="tipe"
                            value="3"
                            onChange={onTipeChange}
                            checked={booking.tipe === "3"}
                        />
                        <label htmlFor="tipe3">Sidang TA</label>
                    </div>
                </div>
            </div>

            {/* Tanggal Booking */}
            <div className="field">
                <label htmlFor="tgl_booking">Tanggal Booking</label>
                <Calendar
                    id="tgl_booking"
                    showIcon
                    showButtonBar
                    dateFormat="dd/mm/yy"
                    value={calendarValue}
                    onChange={handleDateChange}
                    placeholder="Pilih Tanggal"
                    minDate={minDate}
                    maxDate={maxDate}
                />
            </div>

            {/* Status Jadwal Ruangan */}
            {booking.status_booking && (
                <div className="field">
                    <label className="mb-3">Status</label>
                    <div className="formgrid grid">
                        <div className="field-radiobutton col-6">
                            <RadioButton
                                inputId="status1"
                                name="status"
                                value="0"
                                onChange={onStatusChange}
                                checked={booking.status_booking === "0"}
                            />
                            <label htmlFor="status1">Tidak Tersedia</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton
                                inputId="status2"
                                name="status"
                                value="1"
                                onChange={onStatusChange}
                                checked={booking.status_booking === "1"}
                            />
                            <label htmlFor="status2">Tersedia</label>
                        </div>
                    </div>
                </div>
            )}
        </Dialog>
    );
};

export default BookingForm;
