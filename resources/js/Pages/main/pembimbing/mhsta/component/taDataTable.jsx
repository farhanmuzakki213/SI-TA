import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Link } from '@inertiajs/react';
import { Avatar } from 'primereact/avatar';

const TugasAkhirDataTable = ({ tugasakhirs, selectedtugasakhirs, setSelectedtugasakhirs, globalFilter, header, edittugasakhir, dt }) => {

    // console.log(tugasakhirs);
    const namaBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Nama Mahasiswa</span>
                {rowData.nama_mahasiswa || 'N/A'}
            </>
        );
    };

    const nimBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Nim Mahasiswa</span>
                {rowData.nim_mahasiswa || 'N/A'}
            </>
        );
    };

    const prodiBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Prodi Mahasiswa</span>
                {rowData.prodi || 'N/A'}
            </>
        );
    };

    const statusTugasAkhirBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Status TugasAkhir</span>
                {rowData.status_sidang_ta === "0" ? "Ditolak" : rowData.status_sidang_ta === "1" ? "Belum" : rowData.status_sidang_ta === "2" ? "Belum" : "Revisi"}
            </>
        );
    };
    const gambarBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Foto Profil</span>
                <Avatar image={rowData.foto_mahasiswa} size="xlarge" />
            </>
        );
    };

    const actionBodyTemplate = (rowData) => {
        // console.log(rowData.id_pkl_mhs, status);
        return (
            <>
                {rowData.status_ver_proposal === '2' && (
                    <Link
                        href={'/Pembimbing/MhsTA/' + rowData.id_ta_mhs}
                        className="text-blue-500 hover:underline"
                        title="View Details"
                    >
                        <Button icon="pi pi-eye" rounded outlined />
                    </Link>
                )}
            </>
        );
    };

    return (
        <DataTable
            ref={dt}
            value={tugasakhirs}
            selection={selectedtugasakhirs}
            onSelectionChange={(e) => setSelectedtugasakhirs(e.value)}
            dataKey="id_ta_mhs"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Mahasiswa Tugas Akhir"
            globalFilter={globalFilter}
            emptyMessage="No Mahasiswa Tugas Akhir found."
            header={header}
            responsiveLayout="scroll"
            removableSort
        >
            <Column headerStyle={{ width: "4rem" }}></Column>
            <Column field="foto_mahasiswa" header="Gambar" sortable body={gambarBodyTemplate}></Column>
            <Column field="nama_mahasiswa" header="Nama Mahasiswa" sortable body={namaBodyTemplate} headerStyle={{ minWidth: "15rem" }}></Column>
            <Column field="nim_mahasiswa" header="Nim Mahasiswa" sortable body={nimBodyTemplate} headerStyle={{ minWidth: "15rem" }}></Column>
            <Column field="prodi" header="Prodi" sortable body={prodiBodyTemplate} headerStyle={{ minWidth: "15rem" }}></Column>
            <Column field="status_sidang_ta" header="Status Tugas Akhir" body={statusTugasAkhirBodyTemplate} sortable></Column>
            <Column body={actionBodyTemplate} headerStyle={{ minWidth: "10rem" }}></Column>
        </DataTable>
    );
};

export default TugasAkhirDataTable;
