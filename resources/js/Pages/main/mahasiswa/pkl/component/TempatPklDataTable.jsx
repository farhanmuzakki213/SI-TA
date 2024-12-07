import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

const TempatPklDataTable = ({ tempatpkls, selectedtempatpkls, setSelectedtempatpkls, globalFilter, header, edittempatpkl, dt }) => {
    const namaPBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Nama Perusahaan</span>
                {rowData.r_role_tempat_pkls?.r_tempat_pkls?.nama_perusahaan || 'N/A'}
            </>
        );
    };
    // console.log(tempatpkls);

    const alamatPBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Alamat Perusahaan</span>
                {rowData.r_role_tempat_pkls?.r_tempat_pkls?.alamat_perusahaan || 'N/A'}
            </>
        );
    };

    const mahasiswaBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Nama Mahasiswa</span>
                {rowData.r_mahasiswa?.nama_mahasiswa || 'N/A'}
            </>
        );
    };

    const roleBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Role</span>
                {rowData.r_role_tempat_pkls?.role_tempat_pkl || 'N/A'}
            </>
        );
    };

    const tglpklBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Tanggal Pkl</span>
                {rowData.tgl_awal_pkl || 'N/A'} - {rowData.tgl_akhir_pkl || 'N/A'}
            </>
        );
    };

    const statusBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Status</span>
                {rowData.status_usulan === "1" ? "Sedang Diproses" : rowData.status_usulan === "0" ? "Tidak Disetujui" : rowData.status_usulan === "2" ? "Disetujui" : "N/A"}
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
                    onClick={() => edittempatpkl(rowData)}
                />
            </>
        );
    };

    return (
        <DataTable
            ref={dt}
            value={tempatpkls}
            selection={selectedtempatpkls}
            onSelectionChange={(e) => setSelectedtempatpkls(e.value)}
            dataKey="id_tempatpkl"
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
            <Column field="r_role_tempat_pkls.r_tempat_pkls.nama_perusahaan" header="Nama Perusahaan" sortable body={namaPBodyTemplate} headerStyle={{ minWidth: "15rem" }}></Column>
            <Column field="r_role_tempat_pkls.r_tempat_pkls.alamat_perusahaan" header="Alamat Perusahaan" sortable body={alamatPBodyTemplate} headerStyle={{ minWidth: "15rem" }}></Column>
            <Column field="r_role_tempat_pkls.role_tempat_pkl" header="Role PKL" sortable body={roleBodyTemplate} headerStyle={{ minWidth: "15rem" }}></Column>
            <Column field="tgl_awal_pkl" header="Tanggal PKL" sortable body={tglpklBodyTemplate} headerStyle={{ minWidth: "15rem" }}></Column>
            <Column field="status_usulan" header="Status Usulan" body={statusBodyTemplate} sortable></Column>
            <Column body={actionBodyTemplate} headerStyle={{ minWidth: "10rem" }}></Column>
        </DataTable>
    );
};

export default TempatPklDataTable;
