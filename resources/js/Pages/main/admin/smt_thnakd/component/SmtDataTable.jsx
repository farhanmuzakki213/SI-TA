import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

const SmtDataTable = ({ smt_thnakds, selectedsmt_thnakds, setSelectedsmt_thnakds, globalFilter, header, editsmt_thnakd, confirmDeletesmt_thnakd }) => {
    const namaBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Nama Semester dan Tahun Akademik</span>
                {rowData.nama_smt_thnakd}
            </>
        );
    };

    const kodeBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Kode Semester dan Tahun Akademik</span>
                {rowData.kode_smt_thnakd}
            </>
        );
    };

    const statusBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Status</span>
                {rowData.status_smt_thnakd === "1" ? "Aktif" : "Tidak Aktif"}
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
                    onClick={() => editsmt_thnakd(rowData)}
                />
                <Button
                    icon="pi pi-trash"
                    severity="warning"
                    rounded
                    onClick={() => confirmDeletesmt_thnakd(rowData)}
                />
            </>
        );
    };

    return (
        <DataTable
            value={smt_thnakds}
            selection={selectedsmt_thnakds}
            onSelectionChange={(e) => setSelectedsmt_thnakds(e.value)}
            dataKey="id_smt_thnakd"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} smt_thnakds"
            globalFilter={globalFilter}
            emptyMessage="No smt_thnakds found."
            header={header}
            responsiveLayout="scroll"
        >
            <Column selectionMode="multiple" headerStyle={{ width: "4rem" }}></Column>
            <Column field="kode_smt_thnakd" header="Kode" body={kodeBodyTemplate} sortable></Column>
            <Column field="nama_smt_thnakd" header="Nama" sortable body={namaBodyTemplate} headerStyle={{ minWidth: "15rem" }}></Column>
            <Column field="status_smt_thnakd" header="Status" body={statusBodyTemplate} sortable></Column>
            <Column body={actionBodyTemplate} headerStyle={{ minWidth: "10rem" }}></Column>
        </DataTable>
    );
};

export default SmtDataTable;
