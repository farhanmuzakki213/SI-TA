import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

const MahasiswaDataTable = ({ mahasiswas, selectedmahasiswas, setSelectedmahasiswas, globalFilter, header, editmahasiswa, confirmDeletemahasiswa, dt }) => {
    const namaBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Nama Mahasiswa</span>
                {rowData.nama_mahasiswa}
            </>
        );
    };

    const prodiBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Prodi</span>
                {rowData.r_kelas && rowData.r_kelas.r_prodi ? rowData.r_kelas.r_prodi.nama_prodi : 'N/A'}
            </>
        );
    };

    const nimBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">NIM</span>
                {rowData.nim_mahasiswa}
            </>
        );
    };

    const genderBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Gender</span>
                {rowData.gender}
            </>
        );
    };

    const statusBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Status</span>
                {rowData.status_mahasiswa === "1" ? "Aktif" : "Tidak Aktif"}
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
                    onClick={() => editmahasiswa(rowData)}
                />
                <Button
                    icon="pi pi-trash"
                    severity="warning"
                    rounded
                    onClick={() => confirmDeletemahasiswa(rowData)}
                />
            </>
        );
    };

    return (
        <DataTable
            ref={dt}
            value={mahasiswas}
            selection={selectedmahasiswas}
            onSelectionChange={(e) => setSelectedmahasiswas(e.value)}
            dataKey="id_mahasiswa"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} mahasiswas"
            globalFilter={globalFilter}
            emptyMessage="No mahasiswas found."
            header={header}
            responsiveLayout="scroll"
            removableSort
        >
            <Column selectionMode="multiple" headerStyle={{ width: "4rem" }}></Column>
            <Column field="nama_mahasiswa" header="Nama" sortable body={namaBodyTemplate} headerStyle={{ minWidth: "15rem" }}></Column>
            <Column field="r_kelas.r_prodi.nama_prodi" header="Prodi" sortable body={prodiBodyTemplate} headerStyle={{ minWidth: "15rem" }}></Column>
            <Column field="nim_mahasiswa" header="NIM" body={nimBodyTemplate} sortable></Column>
            <Column field="gender" header="Gender" sortable body={genderBodyTemplate} headerStyle={{ minWidth: "10rem" }}></Column>
            <Column field="status_mahasiswa" header="Status" body={statusBodyTemplate} sortable></Column>
            <Column body={actionBodyTemplate} headerStyle={{ minWidth: "10rem" }}></Column>
        </DataTable>
    );
};

export default MahasiswaDataTable;
