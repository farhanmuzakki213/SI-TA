import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

const JurusanDataTable = ({ jurusans, selectedjurusans, setSelectedjurusans, globalFilter, header, editjurusan, confirmDeletejurusan, dt }) => {
    const namaBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Nama Jurusan</span>
                {rowData.nama_jurusan}
            </>
        );
    };

    const kodeBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Kode Jurusan</span>
                {rowData.kode_jurusan}
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
                    onClick={() => editjurusan(rowData)}
                />
                <Button
                    icon="pi pi-trash"
                    severity="warning"
                    rounded
                    onClick={() => confirmDeletejurusan(rowData)}
                />
            </>
        );
    };

    return (
        <DataTable
            ref={dt}
            value={jurusans}
            selection={selectedjurusans}
            onSelectionChange={(e) => setSelectedjurusans(e.value)}
            dataKey="id_jurusan"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} jurusans"
            globalFilter={globalFilter}
            emptyMessage="No jurusans found."
            header={header}
            responsiveLayout="scroll"
            removableSort
        >
            <Column selectionMode="multiple" headerStyle={{ width: "4rem" }}></Column>
            <Column field="kode_jurusan" header="Kode" body={kodeBodyTemplate} sortable></Column>
            <Column field="nama_jurusan" header="Nama" sortable body={namaBodyTemplate} headerStyle={{ minWidth: "15rem" }}></Column>
            <Column body={actionBodyTemplate} headerStyle={{ minWidth: "10rem" }}></Column>
        </DataTable>
    );
};

export default JurusanDataTable;
