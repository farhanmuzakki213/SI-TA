import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

const ProdiDataTable = ({ prodis, selectedprodis, setSelectedprodis, globalFilter, header, editprodi, confirmDeleteprodi }) => {
    const namaBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Nama Prodi</span>
                {rowData.nama_prodi}
            </>
        );
    };

    const kodeBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Kode Prodi</span>
                {rowData.kode_prodi}
            </>
        );
    };

    const jurusanBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Jurusan</span>
                {rowData.r_jurusan ? rowData.r_jurusan.nama_jurusan : 'N/A'}
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
                    onClick={() => editprodi(rowData)}
                />
                <Button
                    icon="pi pi-trash"
                    severity="warning"
                    rounded
                    onClick={() => confirmDeleteprodi(rowData)}
                />
            </>
        );
    };

    return (
        <DataTable
            value={prodis}
            selection={selectedprodis}
            onSelectionChange={(e) => setSelectedprodis(e.value)}
            dataKey="id_prodi"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} prodis"
            globalFilter={globalFilter}
            emptyMessage="No prodis found."
            header={header}
            responsiveLayout="scroll"
        >
            <Column selectionMode="multiple" headerStyle={{ width: "4rem" }}></Column>
            <Column field="kode_prodi" header="Kode" body={kodeBodyTemplate} sortable></Column>
            <Column field="nama_prodi" header="Nama" sortable body={namaBodyTemplate} headerStyle={{ minWidth: "15rem" }}></Column>
            <Column field="r_jurusan.nama_jurusan" header="Jurusan" sortable body={jurusanBodyTemplate} headerStyle={{ minWidth: "15rem" }}></Column>
            <Column body={actionBodyTemplate} headerStyle={{ minWidth: "10rem" }}></Column>
        </DataTable>
    );
};

export default ProdiDataTable;
