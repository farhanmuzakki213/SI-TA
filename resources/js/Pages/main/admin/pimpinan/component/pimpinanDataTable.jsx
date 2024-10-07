import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

const pimpinanDataTable = ({ pimpinans, selectedpimpinans, setSelectedpimpinans, globalFilter, header, editpimpinan, confirmDeletepimpinan, dt }) => {
    const namaBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Nama Dosen</span>
                {rowData.r_dosen ? rowData.r_dosen.nama_dosen : 'N/A'}
            </>
        );
    };

    const jurusanBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Jurusan</span>
                {rowData.r_dosen?.r_prodi?.r_jurusan?.nama_jurusan || 'N/A'}
            </>
        );
    };

    const prodiBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Prodi</span>
                {rowData.r_dosen?.r_prodi?.nama_prodi || 'N/A'}
            </>
        );
    };

    const jabatanBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Jabatan</span>
                {rowData.r_jabatan_pimpinan?.nama_jabatan_pimpinan || 'N/A'}
            </>
        );
    };

    const periodeBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Periode</span>
                {rowData.periode}
            </>
        );
    };

    const statusBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Status</span>
                {rowData.status_pimpinan === "1" ? "Aktif" : "Tidak Aktif"}
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
                    onClick={() => editpimpinan(rowData)}
                />
                <Button
                    icon="pi pi-trash"
                    severity="warning"
                    rounded
                    onClick={() => confirmDeletepimpinan(rowData)}
                />
            </>
        );
    };

    return (
        <DataTable
            ref={dt}
            value={pimpinans}
            selection={selectedpimpinans}
            onSelectionChange={(e) => setSelectedpimpinans(e.value)}
            dataKey="id_pimpinan"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} pimpinans"
            globalFilter={globalFilter}
            emptyMessage="No pimpinans found."
            header={header}
            responsiveLayout="scroll"
            removableSort
        >
            <Column selectionMode="multiple" headerStyle={{ width: "4rem" }}></Column>
            <Column field="r_dosen.nama_dosen" header="Nama" sortable body={namaBodyTemplate} headerStyle={{ minWidth: "15rem" }}></Column>
            <Column field="r_jabatan_pimpinan.nama_jabatan_pimpinan" header="Jabatan" sortable body={jabatanBodyTemplate} headerStyle={{ minWidth: "15rem" }}></Column>
            <Column field="r_dosen.r_prodi.nama_prodi" header="Prodi" sortable body={prodiBodyTemplate} headerStyle={{ minWidth: "15rem" }}></Column>
            <Column field="r_dosen.r_prodi.r_jurusan.nama_jurusan" header="Jurusan" sortable body={jurusanBodyTemplate} headerStyle={{ minWidth: "15rem" }}></Column>
            <Column field="periode" header="Periode" body={periodeBodyTemplate} sortable></Column>
            <Column field="status_pimpinan" header="Status" body={statusBodyTemplate} sortable></Column>
            <Column body={actionBodyTemplate} headerStyle={{ minWidth: "10rem" }}></Column>
        </DataTable>
    );
};

export default pimpinanDataTable;
