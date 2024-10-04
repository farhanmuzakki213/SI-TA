import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

const JabatanDataTable = ({ jabatan_pimpinans, selectedjabatan_pimpinans, setSelectedjabatan_pimpinans, globalFilter, header, editjabatan_pimpinan, confirmDeletejabatan_pimpinan, dt }) => {
    const namaBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Nama Jabatan Pimpinan</span>
                {rowData.nama_jabatan_pimpinan}
            </>
        );
    };

    const kodeBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Kode Jabatan Pimpinan</span>
                {rowData.kode_jabatan_pimpinan}
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
                    onClick={() => editjabatan_pimpinan(rowData)}
                />
                <Button
                    icon="pi pi-trash"
                    severity="warning"
                    rounded
                    onClick={() => confirmDeletejabatan_pimpinan(rowData)}
                />
            </>
        );
    };

    return (
        <DataTable
            ref={dt}
            value={jabatan_pimpinans}
            selection={selectedjabatan_pimpinans}
            onSelectionChange={(e) => setSelectedjabatan_pimpinans(e.value)}
            dataKey="id_jabatan_pimpinan"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} jabatan_pimpinans"
            globalFilter={globalFilter}
            emptyMessage="No jabatan_pimpinans found."
            header={header}
            responsiveLayout="scroll"
        >
            <Column selectionMode="multiple" headerStyle={{ width: "4rem" }}></Column>
            <Column field="kode_jabatan_pimpinan" header="Kode" body={kodeBodyTemplate} sortable></Column>
            <Column field="nama_jabatan_pimpinan" header="Nama" sortable body={namaBodyTemplate} headerStyle={{ minWidth: "15rem" }}></Column>
            <Column body={actionBodyTemplate} headerStyle={{ minWidth: "10rem" }}></Column>
        </DataTable>
    );
};

export default JabatanDataTable;
