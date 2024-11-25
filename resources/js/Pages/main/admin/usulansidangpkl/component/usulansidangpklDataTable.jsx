import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

const UsulansidangpklDataTable = ({ usulansidangpkls, selectedusulansidangpkls, setSelectedusulansidangpkls, globalFilter, header, editusulansidangpkl, confirmDeleteusulansidangpkl, dt }) => {

    console.log(usulansidangpkls);
    const mahasiswaBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Nama Mahasiswa</span>
                {rowData.r_usulan?.r_mahasiswa?.nama_mahasiswa || 'N/A'}
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

    const statusBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Status</span>
                {rowData.status_ver_pkl === "1" ? "Diproses" : rowData.status_ver_pkl === "2" ? "Ditolak" : "Diterima"}
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
                    onClick={() => editusulansidangpkl(rowData)}
                />
            </>
        );
    };

    return (
        <DataTable
            ref={dt}
            value={usulansidangpkls}
            selection={selectedusulansidangpkls}
            onSelectionChange={(e) => setSelectedusulansidangpkls(e.value)}
            dataKey="id_usulansidangpkl"
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
            <Column field="r_usulan.r_mahasiswa.nama_mahasiswa" header="Nama Mahasiswa" sortable body={mahasiswaBodyTemplate} headerStyle={{ minWidth: "15rem" }}></Column>
            <Column field="judul" header="Judul" body={judulBodyTemplate} sortable></Column>
            <Column field="pembimbing_pkl" header="Pembimbing PKL" body={pembimbingpklBodyTemplate} sortable></Column>
            <Column field="dokumen_laporan" header="File" body={fileBodyTemplate} sortable></Column>
            <Column field="status_ver_pkl" header="Status" body={statusBodyTemplate} sortable></Column>
            <Column body={actionBodyTemplate} headerStyle={{ minWidth: "10rem" }}></Column>
        </DataTable>
    );
};

export default UsulansidangpklDataTable;
