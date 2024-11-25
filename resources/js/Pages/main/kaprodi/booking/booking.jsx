import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import React, { useEffect, useRef, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import Layout from "@/Layouts/layout/layout.jsx";
import BookingDataTable from './component/BookingDataTable';
import BookingForm from './component/BookingForm';
import CSVExportComponent from '@/Components/CSVExportComponent';
import CSVImportComponent from '@/Components/CSVImportComponent';

const booking = () => {
    let emptybooking = {
        id_booking: null,
        ruangan_id: null,
        sesi_id: null,
        mahasiswa_id: null,
        tipe: "",
        tgl_booking: null,
        status_booking: "",
    };


    const { props } = usePage();
    const { data_booking,
        ruanganOptions: initialRuanganOptions,
        sesiOptions: initialSesiOptions,
        mahasiswaPklOptions: initialMahasiswaPklOptions,
        mahasiswaSemproOptions: initialMahasiswaSemproOptions,
        mahasiswaTaOptions: initialMahasiswaTaOptions,
        nextNumber } = props;
    const [bookings, setbookings] = useState(null);
    const [ruanganOptions, setRuanganOptions] = useState([]);
    const [sesiOptions, setSesiOptions] = useState([]);
    const [mahasiswaPklOptions, setMahasiswaPklOptions] = useState([]);
    const [mahasiswaSemproOptions, setMahasiswaSemproOptions] = useState([]);
    const [mahasiswaTaOptions, setMahasiswaTaOptions] = useState([]);
    const [bookingDialog, setbookingDialog] = useState(false);
    const [deletebookingDialog, setDeletebookingDialog] = useState(false);
    const [deletebookingsDialog, setDeletebookingsDialog] = useState(false);
    const [booking, setbooking] = useState(emptybooking);
    const [selectedbookings, setSelectedbookings] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        setRuanganOptions(initialRuanganOptions);
        setSesiOptions(initialSesiOptions);
        setMahasiswaPklOptions(initialMahasiswaPklOptions);
        setMahasiswaSemproOptions(initialMahasiswaSemproOptions);
        setMahasiswaTaOptions(initialMahasiswaTaOptions);
        setbookings(data_booking);
        displaySuccessMessage(props.flash?.success);
        displayErrorMessage(props.flash?.error);
    }, [initialRuanganOptions, initialSesiOptions, initialMahasiswaSemproOptions, initialMahasiswaTaOptions, initialMahasiswaPklOptions, data_booking, props.flash]);

    const openNew = () => {
        setbooking(emptybooking);
        setSubmitted(false);
        setbookingDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setbookingDialog(false);
    };

    const hideDeletebookingDialog = () => {
        setDeletebookingDialog(false);
    };

    const hideDeletebookingsDialog = () => {
        setDeletebookingsDialog(false);
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

    const savebooking = async () => {
        setSubmitted(true);

        const requiredFieldsForCreate = [
            booking.ruangan_id,
            booking.sesi_id,
            booking.mahasiswa_id,
            booking.tipe,
            booking.tgl_booking,
        ];

        const requiredFieldsForUpdate = [
            booking.ruangan_id,
            booking.sesi_id,
            booking.mahasiswa_id,
            booking.tipe,
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
                await router.post('/booking/store', _booking);
            } else {

                await router.put(`/booking/${booking.id_booking}/update`, _booking);
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

    const confirmDeletebooking = (booking) => {
        setbooking(booking);
        setDeletebookingDialog(true);
    };
    const deletebooking = async () => {
        try {
            await router.delete(`/booking/${booking.id_booking}/delete`);
        } catch (error) {
            console.error("Error deleting Jadwal Ruangan:", error);
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: "Failed to delete Jadwal Ruangan.",
                life: 3000,
            });
        }
        finally {
            setDeletebookingDialog(false);
        }
    };

    const confirmDeleteSelected = () => {
        setDeletebookingsDialog(true);
    };

    const deleteSelectedbookings = async () => {
        if (!selectedbookings || selectedbookings.length === 0) {
            toast.current.show({
                severity: "warn",
                summary: "Warning",
                detail: "No Jadwal Ruangan selected for deletion.",
                life: 3000,
            });
            return;
        }

        const selectedIds = selectedbookings.map(booking => booking.id_booking);

        try {
            await router.delete('/booking/destroyMultiple', {
                data: {
                    ids: selectedIds,
                },
            });
        } catch (error) {
            console.error("Error deleting selected Jadwal Ruangan:", error);
            toast.current.show({
                severity: "error",
                summary: "Error",
                detail: "Failed to delete selected Jadwal Ruangan.",
                life: 3000,
            });
        } finally {
            setDeletebookingsDialog(false);
            setSelectedbookings(null);
        }
    };
    const leftToolbarTemplate = () => {
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
                    <Button
                        label="Delete"
                        icon="pi pi-trash"
                        severity="danger"
                        onClick={confirmDeleteSelected}
                        disabled={!selectedbookings || !selectedbookings.length}
                    />
                </div>
            </React.Fragment>
        );
    };

    const columns = [
        { header: 'ID', field: 'id_booking' },
        {
            header: 'Name',
            field: (booking) => `"${booking.nama_booking}"`
        },
        { header: 'Nim', field: 'nim_booking' },
        { header: 'Kelas', field: 'r_kelas.nama_kelas' },
        { header: 'Gender', field: 'gender' },
        {
            header: 'Status',
            field: (booking) => booking.status_booking === "1" ? "Aktif" : "Tidak Aktif"
        }
    ];
    const handleImport = (importedData) => {
        setbookings(prevbookings => [...prevbookings, ...importedData]);
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <CSVImportComponent onImport={handleImport} toast={toast} />
                <CSVExportComponent data={bookings} toast={toast} fileName="Jadwal_Ruangan_data.csv" columns={columns} />
            </React.Fragment>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Jadwal Ruangan</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText
                    type="search"
                    value={globalFilter || ''}
                    onInput={(e) => setGlobalFilter(e.target.value || '')}
                    placeholder="Search..."
                />
            </span>
        </div>
    );

    const bookingDialogFooter = (
        <>
            <Button
                label="Cancel"
                icon="pi pi-times"
                text
                onClick={hideDialog}
            />
            <Button label="Save" icon="pi pi-check" text onClick={savebooking} />
        </>
    );
    const deletebookingDialogFooter = (
        <>
            <Button
                label="No"
                icon="pi pi-times"
                text
                onClick={hideDeletebookingDialog}
            />
            <Button label="Yes" icon="pi pi-check" text onClick={deletebooking} />
        </>
    );
    const deletebookingsDialogFooter = (
        <>
            <Button
                label="No"
                icon="pi pi-times"
                text
                onClick={hideDeletebookingsDialog}
            />
            <Button
                label="Yes"
                icon="pi pi-check"
                text
                onClick={deleteSelectedbookings}
            />
        </>
    );

    return (
        <Layout>
            <div className="grid crud-demo">
                <div className="col-12">
                    <div className="card">
                        <Toast ref={toast} />
                        <Toolbar
                            className="mb-4"
                            left={leftToolbarTemplate}
                            right={rightToolbarTemplate}
                        ></Toolbar>

                        <BookingDataTable
                            dt={dt}
                            bookings={bookings}
                            selectedbookings={selectedbookings}
                            setSelectedbookings={setSelectedbookings}
                            globalFilter={globalFilter}
                            header={header}
                            editbooking={editbooking}
                            confirmDeletebooking={confirmDeletebooking}
                        />

                        <BookingForm
                            bookingDialog={bookingDialog}
                            booking={booking}
                            setbooking={setbooking}
                            submitted={submitted}
                            ruanganOptions={ruanganOptions}
                            sesiOptions={sesiOptions}
                            mahasiswaPklOptions={mahasiswaPklOptions}
                            mahasiswaSemproOptions={mahasiswaSemproOptions}
                            mahasiswaTaOptions={mahasiswaTaOptions}
                            bookingDialogFooter={bookingDialogFooter}
                            hideDialog={hideDialog}
                        />

                        <Dialog
                            visible={deletebookingDialog}
                            style={{ width: "450px" }}
                            header="Confirm"
                            modal
                            footer={deletebookingDialogFooter}
                            onHide={hideDeletebookingDialog}
                        >
                            <div className="flex align-items-center justify-content-center">
                                <i
                                    className="pi pi-exclamation-triangle mr-3"
                                    style={{ fontSize: "2rem" }}
                                />
                                {booking && (
                                    <span>
                                        Are you sure you want to delete{" "}
                                        <b>{booking.name}</b>?
                                    </span>
                                )}
                            </div>
                        </Dialog>

                        <Dialog
                            visible={deletebookingsDialog}
                            style={{ width: "450px" }}
                            header="Confirm"
                            modal
                            footer={deletebookingsDialogFooter}
                            onHide={hideDeletebookingsDialog}
                        >
                            <div className="flex align-items-center justify-content-center">
                                <i
                                    className="pi pi-exclamation-triangle mr-3"
                                    style={{ fontSize: "2rem" }}
                                />
                                {booking && (
                                    <span>
                                        Are you sure you want to delete the
                                        selected Jadwal Ruangan?
                                    </span>
                                )}
                            </div>
                        </Dialog>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default booking;
