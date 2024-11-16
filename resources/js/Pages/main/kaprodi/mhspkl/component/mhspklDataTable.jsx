import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

const MhspklDataTable = ({ mhspkls, selectedmhspkls, setSelectedmhspkls, globalFilter, header, editmhspkl, confirmDeletemhspkl, dt }) => {

    const namaBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Nama Mahasiswa</span>
                {rowData.r_usulan?.r_mahasiswa?.nama_mahasiswa || 'N/A'}
            </>
        );
    };

    const pembimbingBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Pembimbing</span>
                {rowData.r_pembimbing?.nama_dosen || 'N/A'}
            </>
        );
    };

    const pengujiBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Penguji</span>
                {rowData.r_penguji?.nama_dosen || 'N/A'}
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
                    onClick={() => editmhspkl(rowData)}
                />
                <Button
                    icon="pi pi-trash"
                    severity="warning"
                    rounded
                    onClick={() => confirmDeletemhspkl(rowData)}
                />
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
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} mhspkls"
            globalFilter={globalFilter}
            emptyMessage="No mhspkls found."
            header={header}
            responsiveLayout="scroll"
            removableSort
        >
            <Column selectionMode="multiple" headerStyle={{ width: "4rem" }}></Column>
            <Column field="r_usulan.r_mahasiswa.nama_mahasiswa" header="Mahasiswa" body={namaBodyTemplate} headerStyle={{ width: "20rem" }} sortable></Column>
            <Column field="r_pembimbing.nama_dosen" header="Pembimbing" body={pembimbingBodyTemplate} headerStyle={{ width: "20rem" }} sortable></Column>
            <Column field="r_penguji.nama_dosen" header="Penguji" body={pengujiBodyTemplate} headerStyle={{ width: "20rem" }} sortable></Column>
            <Column body={actionBodyTemplate} headerStyle={{ maxWidth: "1rem" }}></Column>
        </DataTable>
    );
};

export default MhspklDataTable;
