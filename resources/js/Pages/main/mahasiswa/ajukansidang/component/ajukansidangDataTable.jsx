import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

const AjukansidangDataTable = ({ ajukansidangs, selectedajukansidangs, setSelectedajukansidangs, globalFilter, header, editajukansidang, dt }) => {

    const pembimbingBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Pembimbing</span>
                {rowData.r_pembimbing?.nama_dosen || 'N/A'}
            </>
        );
    };

    const pengujiBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Penguji</span>
                {rowData.r_penguji?.nama_dosen || 'N/A'}
            </>
        );
    };

    const judulBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Judul</span>
                {rowData.judul || 'N/A'}
            </>
        );
    };

    const pembimbingpklBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Pembimbing PKL</span>
                {rowData.pembimbing_pkl || 'N/A'}
            </>
        );
    };

    const fileBodyTemplate = (rowData) => {
        if (rowData.dokumen_pendukung) {
            try {
                const fileArray = JSON.parse(rowData.dokumen_pendukung);

                return (
                    <>
                        <span className="p-column-title">Files</span>
                        <div>
                            {/* Menampilkan setiap file dalam array dokumen_pendukung */}
                            {fileArray.map((file, index) => (
                                <div key={index}>
                                    <a
                                        href={`/storage/uploads/pkl/dokumen_pendukung_sidang/${file}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {file}
                                    </a>
                                </div>
                            ))}
                        </div>
                    </>
                );
            } catch (error) {
                return (
                    <>
                        <span className="p-column-title">Files</span>
                        <div>Error parsing files.</div>
                    </>
                );
            }
        }
        return (
            <>
                <span className="p-column-title">Files</span>
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
                    onClick={() => editajukansidang(rowData)}
                />
            </>
        );
    };

    return (
        <DataTable
            ref={dt}
            value={ajukansidangs}
            selection={selectedajukansidangs}
            onSelectionChange={(e) => setSelectedajukansidangs(e.value)}
            dataKey="id_log_book_pkl"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} ajukansidangs"
            globalFilter={globalFilter}
            emptyMessage="No ajukansidangs found."
            header={header}
            responsiveLayout="scroll"
            removableSort
        >
            <Column selectionMode="multiple" headerStyle={{ width: "4rem" }}></Column>
            <Column field="r_pembimbing.nama_dosen" header="Pembimbing" body={pembimbingBodyTemplate} sortable></Column>
            <Column field="r_penguji.nama_dosen" header="Penguji" body={pengujiBodyTemplate} sortable></Column>
            <Column field="pembimbing_pkl" header="Pembimbing PKL" body={pembimbingpklBodyTemplate} sortable></Column>
            <Column field="judul" header="Judul" body={judulBodyTemplate} sortable></Column>
            <Column field="dokumen_laporan" header="File" body={fileBodyTemplate} sortable></Column>
            <Column body={actionBodyTemplate} headerStyle={{ maxWidth: "1rem" }}></Column>

        </DataTable>
    );
};

export default AjukansidangDataTable;
