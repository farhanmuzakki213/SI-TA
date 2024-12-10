import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Link } from '@inertiajs/react';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';

const MhspklDataTable = ({ mhspkls, selectedmhspkls, setSelectedmhspkls, globalFilter, header, editmhspkl, confirmDeletemhspkl, dt }) => {

    const mahasiswaBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Nama Mahasiswa</span>
                {rowData.nama_mahasiswa || 'N/A'}
            </>
        );
    };

    const mahasiswaNimBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">NIM Mahasiswa</span>
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

    const jurusanBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Status</span>
                {rowData.jurusan || 'N/A'}
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
        // console.log(rowData);
        return (
            <>
                {rowData.id_pkl_mhs && (
                    <Link
                        href={'/Pembimbing/Mhspkl/' + rowData.id_pkl_mhs}
                        className="text-blue-500 hover:underline"
                        title="View Details"
                    >
                        <Button icon="pi pi-eye" rounded outlined
                        tooltip="Lihat Details" tooltipOptions={{ position: 'right', mouseTrack: false, mouseTrackRight: 15 }}/>
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
            <Column field="foto_mahasiswa" header="Gambar" sortable body={gambarBodyTemplate}></Column>
            <Column field="nama_mahasiswa" header="Nama Mahasiswa" sortable body={mahasiswaBodyTemplate}></Column>
            <Column field="nim_mahasiswa" header="NIM Mahasiswa" sortable body={mahasiswaNimBodyTemplate}></Column>
            <Column field="prodi" header="Prodi" sortable body={prodiBodyTemplate}></Column>
            <Column field="jurusan" header="Jurusan" body={jurusanBodyTemplate} sortable></Column>
            <Column body={actionBodyTemplate} headerStyle={{ minWidth: "10rem" }}></Column>
        </DataTable>
    );
};

export default MhspklDataTable;
