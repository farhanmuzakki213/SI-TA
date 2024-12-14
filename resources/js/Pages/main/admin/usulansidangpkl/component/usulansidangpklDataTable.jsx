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
                {rowData.nama_mahasiswa || 'N/A'}
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
                {rowData.pkl_pembimbing || 'N/A'}
            </>
        );
    };

    const filelaporanBodyTemplate = (rowData) => {
        return rowData.file_laporan ? (
            <>
                <span className="p-column-title">Files</span>
                <Button
                    icon="pi pi-file"
                    severity="info"
                    rounded
                    outlined
                    onClick={() =>
                        window.open(
                            `/storage/uploads/pkl/laporan_akhir/${rowData.file_laporan}`,
                            "_blank"
                        )
                    }
                    tooltip="Lihat File Laporan"
                    tooltipOptions={{ position: "right", mouseTrack: false, mouseTrackRight: 15 }}
                />
            </>
        ) : (
            <>
                <span className="p-column-title">Files</span>
                N/A
            </>
        );
    };

    const filenilaiBodyTemplate = (rowData) => {
        return rowData.file_nilai ? (
            <>
                <span className="p-column-title">Files</span>
                <Button
                    icon="pi pi-file"
                    severity="info"
                    rounded
                    outlined
                    onClick={() =>
                        window.open(
                            `/storage/uploads/pkl/laporan_akhir/${rowData.file_nilai}`,
                            "_blank"
                        )
                    }
                    tooltip="Lihat File Nilai Industri"
                    tooltipOptions={{ position: "right", mouseTrack: false, mouseTrackRight: 15 }}
                />
            </>
        ) : (
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
                {rowData.status_ver_pkl === "1" ? "Ditolak" : rowData.status_ver_pkl === "2" ? "Diproses" : "Diterima"}
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
            dataKey="id_pkl_mhs"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Jadwal Ruangan"
            globalFilter={globalFilter}
            emptyMessage="No Usulan Sidang Pkl found."
            header={header}
            responsiveLayout="scroll"
            removableSort
        >
            <Column selectionMode="multiple" headerStyle={{ width: "4rem" }}></Column>
            <Column field="nama_mahasiswa" header="Nama Mahasiswa" sortable body={mahasiswaBodyTemplate} headerStyle={{ minWidth: "15rem" }}></Column>
            <Column field="judul" header="Judul" body={judulBodyTemplate} sortable></Column>
            <Column field="pkl_pembimbing" header="Pembimbing PKL" body={pembimbingpklBodyTemplate} sortable></Column>
            <Column field="file_laporan" header="Laporan" body={filelaporanBodyTemplate} sortable></Column>
            <Column field="file_nilai" header="Nilai Industri" body={filenilaiBodyTemplate} sortable></Column>
            <Column field="status_ver_pkl" header="Status" body={statusBodyTemplate} sortable></Column>
            <Column body={actionBodyTemplate} headerStyle={{ minWidth: "10rem" }}></Column>
        </DataTable>
    );
};

export default UsulansidangpklDataTable;
