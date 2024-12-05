import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Link } from '@inertiajs/react';

const MhspklDataTable = ({ mhspkls, selectedmhspkls, setSelectedmhspkls, globalFilter, header, editmhspkl, confirmDeletemhspkl, dt }) => {

    const mahasiswaBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Nama Mahasiswa</span>
                {rowData.r_usulan?.r_mahasiswa?.nama_mahasiswa || 'N/A'}
            </>
        );
    };

    const mahasiswaNimBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">NIM Mahasiswa</span>
                {rowData.r_usulan?.r_mahasiswa?.nim_mahasiswa || 'N/A'}
            </>
        );
    };

    const roleBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Role / Divisi</span>
                {rowData.r_usulan?.r_role_tempat_pkls?.nama_role || 'N/A'}
            </>
        );
    };

    const actionBodyTemplate = (rowData) => {
        console.log(rowData);
        return (
            <>
                {rowData.id_pkl_mhs && (
                    <Link
                        href={route('MhsPklPembimbing.detail'/* , { id: rowData.id_pkl_mhs } */)}
                        className="text-blue-500 hover:underline"
                        title="View Details"
                    >
                        <i className="pi pi-eye"></i>
                    </Link>
                )}
            </>
        );
    };

    return (
        <DataTable
            ref={dt}
            value={mhspkls}
            selection={selectedmhspkls}
            onSelectionChange={(e) => setSelectedmhspkls(e.value)}
            dataKey="id_pkl_mhs"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Mahasiswa PKL"
            globalFilter={globalFilter}
            emptyMessage="No Mahasiswa PKL found."
            header={header}
            responsiveLayout="scroll"
            removableSort
        >
            <Column field="r_usulan.r_mahasiswa.nama_mahasiswa" header="Nama Mahasiswa" sortable body={mahasiswaBodyTemplate}></Column>
            <Column field="r_usulan.r_mahasiswa.nim_mahasiswa" header="NIM Mahasiswa" sortable body={mahasiswaNimBodyTemplate}></Column>
            <Column field="r_usulan.r_role_tempat_pkls.nama_role" header="Role / Divisi" body={roleBodyTemplate} sortable></Column>
            <Column body={actionBodyTemplate} headerStyle={{ minWidth: "10rem" }}></Column>
        </DataTable>
    );
};

export default MhspklDataTable;
