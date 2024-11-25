import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

const LaporanpklDataTable = ({ laporanpkls, selectedlaporanpkls, setSelectedlaporanpkls, globalFilter, header, editlaporanpkl, confirmDeletelaporanpkl, dt }) => {

    console.log(laporanpkls);
    const mahasiswaBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Nama Mahasiswa</span>
                {rowData.r_mahasiswa?.nama_mahasiswa || 'N/A'}
            </>
        );
    };

    const namaPBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Nama Perusahaan</span>
                {rowData.r_role_tempat_pkls?.r_tempat_pkls?.nama_tempat_pkl || 'N/A'}
            </>
        );
    };

    const roleBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Role / Divisi</span>
                {rowData.r_role_tempat_pkls?.nama_role || 'N/A'}
            </>
        );
    };

    const statusBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Status</span>
                {rowData.status_laporan === "1" ? "Diproses" : rowData.status_laporan === "2" ? "Ditolak" : "Diterima"}
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
            </>
        );
    };

    return (
        <DataTable
            ref={dt}
            value={laporanpkls}
            selection={selectedlaporanpkls}
            onSelectionChange={(e) => setSelectedlaporanpkls(e.value)}
            dataKey="id_laporanpkl"
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
            <Column field="r_mahasiswa.nama_mahasiswa" header="Nama Mahasiswa" sortable body={mahasiswaBodyTemplate} headerStyle={{ minWidth: "15rem" }}></Column>
            <Column field="r_role_tempat_pkls.r_tempat_pkls.nama_tempat_pkl" header="Nama Perusahaan" sortable body={namaPBodyTemplate} headerStyle={{ minWidth: "15rem" }}></Column>
            <Column field="r_role_tempat_pkls.nama_role" header="Role / Divisi" body={roleBodyTemplate} sortable></Column>
            <Column field="status_laporan" header="Status" body={statusBodyTemplate} sortable></Column>
            <Column body={actionBodyTemplate} headerStyle={{ minWidth: "10rem" }}></Column>
        </DataTable>
    );
};

export default LaporanpklDataTable;
