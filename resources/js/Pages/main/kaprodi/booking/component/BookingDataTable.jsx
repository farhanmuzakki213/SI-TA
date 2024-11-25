import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

const BookingDataTable = ({ bookings, selectedbookings, setSelectedbookings, globalFilter, header, editbooking, confirmDeletebooking, dt }) => {
    const sesiBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Sesi</span>
                {rowData.r_sesi?.periode_sesi || 'N/A'}
            </>
        );
    };

    const ruanganBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Ruangan</span>
                {rowData.r_ruangan?.kode_ruangan || 'N/A'}
            </>
        );
    };

    const mahasiswaBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Nama Mahasiswa</span>
                {rowData.r_mahasiswa?.nama_mahasiswa || 'N/A'}
            </>
        );
    };

    const tipeBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Tipe Booking</span>
                {rowData.tipe === "1" ? "Sidang PKL" : rowData.tipe === "2" ? "Sidang Sempro" : "Sidang TA"}
            </>
        );
    };

    const tglbookingBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Tanggal Booking</span>
                {rowData.tgl_booking || 'N/A'}
            </>
        );
    };

    const statusBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Status</span>
                {rowData.status_booking === "1" ? "Booking" : "Cancel"}
            </>
        );
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <Button
                    icon="pi pi-pencil"
                    severity="success"
                    rounded
                    className="mr-2"
                    onClick={() => editbooking(rowData)}
                />
                <Button
                    icon="pi pi-trash"
                    severity="warning"
                    rounded
                    onClick={() => confirmDeletebooking(rowData)}
                />
            </>
        );
    };

    return (
        <DataTable
            ref={dt}
            value={bookings}
            selection={selectedbookings}
            onSelectionChange={(e) => setSelectedbookings(e.value)}
            dataKey="id_booking"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Jadwal Ruangan"
            globalFilter={globalFilter}
            emptyMessage="No Jadwal Ruangan found."
            header={header}
            responsiveLayout="scroll"
            removableSort
        >
            <Column selectionMode="multiple" headerStyle={{ width: "4rem" }}></Column>
            <Column field="r_ruangan.kode_ruangan" header="Ruangan" sortable body={ruanganBodyTemplate} headerStyle={{ minWidth: "15rem" }}></Column>
            <Column field="r_sesi.periode_sesi" header="Sesi" sortable body={sesiBodyTemplate} headerStyle={{ minWidth: "15rem" }}></Column>
            <Column field="r_mahasiswa.nama_mahasiswa" header="Nama Mahasiswa" sortable body={mahasiswaBodyTemplate} headerStyle={{ minWidth: "15rem" }}></Column>
            <Column field="tipe" header="Tipe Booking" sortable body={tipeBodyTemplate} headerStyle={{ minWidth: "15rem" }}></Column>
            <Column field="tgl_booking" header="Tanggal Booking" sortable body={tglbookingBodyTemplate} headerStyle={{ minWidth: "15rem" }}></Column>
            <Column field="status_booking" header="Status" body={statusBodyTemplate} sortable></Column>
            <Column body={actionBodyTemplate} headerStyle={{ minWidth: "10rem" }}></Column>
        </DataTable>
    );
};

export default BookingDataTable;
