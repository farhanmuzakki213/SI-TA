import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Link } from '@inertiajs/react';

const UsulanpklDataTable = ({ usulanpkls, selectedusulanpkls, setSelectedusulanpkls, globalFilter, header, editusulanpkl, confirmDeleteusulanpkl, dt }) => {

    // console.log(usulanpkls);
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

    const namaPBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Nama Perusahaan</span>
                {rowData.nama_perusahan || 'N/A'}
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
                {rowData.role || 'N/A'}
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
                {!rowData.id_pkl_mhs && (
                    <Button
                    icon="pi pi-pencil"
                    severity="success"
                    rounded
                    className="mr-2"
                    onClick={() => editusulanpkl(rowData)}
                />
                )}
                {rowData.id_pkl_mhs && (
                    <Link
                        href={'/Kprodi/Mhspkl/' + rowData.id_pkl_mhs}
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
            value={usulanpkls}
            selection={selectedusulanpkls}
            onSelectionChange={(e) => setSelectedusulanpkls(e.value)}
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
            <Column field="nama_mahasiswa" header="Nama Mahasiswa" sortable body={namaBodyTemplate} headerStyle={{ minWidth: "15rem" }}></Column>
            <Column field="nim_mahasiswa" header="Nim Mahasiswa" sortable body={nimBodyTemplate} headerStyle={{ minWidth: "15rem" }}></Column>
            {/* <Column field="prodi" header="Prodi" sortable body={prodiBodyTemplate} headerStyle={{ minWidth: "15rem" }}></Column> */}
            <Column field="nama_perusahan" header="Nama Perusahaan" sortable body={namaPBodyTemplate} headerStyle={{ minWidth: "15rem" }}></Column>
            <Column field="kota_perusahan" header="Domisili Perusahaan" sortable body={domisiliBodyTemplate} headerStyle={{ minWidth: "15rem" }}></Column>
            <Column field="role" header="Role / Divisi" body={roleBodyTemplate} sortable></Column>
            <Column field="status_usulan" header="Status" body={statusBodyTemplate} sortable></Column>
            <Column body={actionBodyTemplate} headerStyle={{ minWidth: "10rem" }}></Column>
        </DataTable>
    );
};

export default UsulanpklDataTable;
