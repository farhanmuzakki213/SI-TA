import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

const LaporanpklDataTable = ({ laporanpkls, selectedlaporanpkls, setSelectedlaporanpkls, globalFilter, header, editlaporanpkl, confirmDeletelaporanpkl, dt }) => {

    const tglawalBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Tanggal Awal</span>
                {rowData.tgl_awal_kegiatan || 'N/A'}
            </>
        );
    };

    const tglakhirBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Tanggal Akhir</span>
                {rowData.tgl_akhir_kegiatan || 'N/A'}
            </>
        );
    };

    const komentarBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Komentar</span>
                {rowData.komentar ? rowData.komentar : (rowData.status === "2" ? "Sedang Diproses" : "N/A")}
            </>
        );
    };

    const statusBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Status</span>
                {rowData.status === "1" ? "Ditolak" : rowData.status === "2" ? "Diproses" : "Diterima"}
            </>
        );
    };

    const fileBodyTemplate = (rowData) => {
        // Pastikan dokumen_laporan adalah string (misalnya, nama file)
        if (typeof rowData.dokumen_laporan === "string") {
            return (
                <>
                    <span className="p-column-title">File</span>
                    <a href={`/storage/uploads/pkl/laporan/${rowData.dokumen_laporan}`} target="_blank" rel="noopener noreferrer">
                        {rowData.dokumen_laporan}
                    </a>
                </>
            );
        }
        return (
            <>
                <span className="p-column-title">File</span>
                N/A
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
                    onClick={() => editlaporanpkl(rowData)}
                />
                <Button
                    icon="pi pi-trash"
                    severity="warning"
                    rounded
                    onClick={() => confirmDeletelaporanpkl(rowData)}
                />
            </>
        );
    };

    return (
        <DataTable
            ref={dt}
            value={laporanpkls}
            selection={selectedlaporanpkls}
            onSelectionChange={(e) => setSelectedlaporanpkls(e.value)}
            dataKey="id_log_book_pkl"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} laporanpkls"
            globalFilter={globalFilter}
            emptyMessage="No laporanpkls found."
            header={header}
            responsiveLayout="scroll"
            removableSort
        >
            <Column selectionMode="multiple" headerStyle={{ width: "4rem" }}></Column>
            <Column field="tgl_awal_kegiatan" header="Tanggal Awal" body={tglawalBodyTemplate} sortable></Column>
            <Column field="tgl_akhir_kegiatan" header="Tanggal Akhir" body={tglakhirBodyTemplate} sortable></Column>
            <Column field="dokumen_laporan" header="File" body={fileBodyTemplate} sortable></Column>
            <Column field="komentar" header="Komentar" body={komentarBodyTemplate} sortable></Column>
            <Column field="status" header="Status" body={statusBodyTemplate} sortable></Column>
            <Column body={actionBodyTemplate} headerStyle={{ maxWidth: "1rem" }}></Column>
        </DataTable>
    );
};

export default LaporanpklDataTable;
