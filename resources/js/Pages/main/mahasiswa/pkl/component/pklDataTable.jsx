import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Link } from '@inertiajs/react';

const pklDataTable = ({ pkls, globalFilter, header, editpkl, dt }) => {

    // console.log(pkls);
    const komentarBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Komentar</span>
                {rowData.komentar || 'N/A'}
            </>
        );
    };

    const tanggalBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Tanggal PKL</span>
                {rowData.tglAwal || 'N/A'} - {rowData.tglAkhir || 'N/A'}
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

    const namaPBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Nama Perusahaan</span>
                {rowData.nama_tempat_pkl || 'N/A'}
            </>
        );
    };

    const domisiliBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Domisili Perusahaan</span>
                {rowData.kota_perusahaan || 'N/A'}
            </>
        );
    };

    const roleBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Role / Divisi</span>
                {rowData.nama_role || 'N/A'}
            </>
        );
    };

    const statusBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Status</span>
                {rowData.status_usulan === "1" ? "Diproses" : rowData.status_usulan === "2" ? "Ditolak" : "Diterima"}
            </>
        );
    };

    const actionBodyTemplate = (rowData) => {
        // console.log(rowData.id_pkl_mhs);
        return (
            <>
                {!rowData.id_pkl_mhs && rowData.status_usulan === "1" && (
                    <Button
                    icon="pi pi-pencil"
                    severity="success"
                    rounded
                    className="mr-2"
                    onClick={() => editpkl(rowData)}
                />
                )}
            </>
        );
    };

    return (
        <DataTable
            ref={dt}
            value={pkls}
            dataKey="id_usulan"
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
            <Column headerStyle={{ width: "4rem" }}></Column>
            {/* <Column field="prodi" header="Prodi" sortable body={prodiBodyTemplate} headerStyle={{ minWidth: "15rem" }}></Column> */}
            <Column field="nama_tempat_pkl" header="Nama Perusahaan" sortable body={namaPBodyTemplate} headerStyle={{ minWidth: "15rem" }}></Column>
            <Column field="kota_perusahan" header="Domisili Perusahaan" sortable body={domisiliBodyTemplate} headerStyle={{ minWidth: "15rem" }}></Column>
            <Column field="nama_role" header="Role / Divisi" body={roleBodyTemplate} sortable></Column>
            <Column header="Tanggal PKL" sortable body={tanggalBodyTemplate} headerStyle={{ minWidth: "15rem" }}></Column>
            <Column field="status_usulan" header="Status" body={statusBodyTemplate} sortable></Column>
            <Column field="komentar" header="Komentar" sortable body={komentarBodyTemplate} headerStyle={{ minWidth: "15rem" }}></Column>
            <Column body={actionBodyTemplate} headerStyle={{ minWidth: "10rem" }}></Column>
        </DataTable>
    );
};

export default pklDataTable;
