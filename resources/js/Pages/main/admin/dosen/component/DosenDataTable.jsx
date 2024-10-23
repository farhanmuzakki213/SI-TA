import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

const DosenDataTable = ({ dosens, selecteddosens, setSelecteddosens, globalFilter, header, editdosen, confirmDeletedosen, dt }) => {
    const namaBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Nama Dosen</span>
                {rowData.nama_dosen}
            </>
        );
    };

    const prodiBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Prodi</span>
                {rowData.nama_prodi}
            </>
        );
    };

    const nidnBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">NIDN</span>
                {rowData.nidn_dosen}
            </>
        );
    };

    const golonganBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Golongan</span>
                {rowData.nama_golongan}
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
                {rowData.status_dosen === "1" ? "Aktif" : "Tidak Aktif"}
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
                    onClick={() => editdosen(rowData)}
                />
                <Button
                    icon="pi pi-trash"
                    severity="warning"
                    rounded
                    onClick={() => confirmDeletedosen(rowData)}
                />
            </>
        );
    };

    return (
        <DataTable
            ref={dt}
            value={dosens}
            selection={selecteddosens}
            onSelectionChange={(e) => setSelecteddosens(e.value)}
            dataKey="id_dosen"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} dosens"
            globalFilter={globalFilter}
            emptyMessage="No dosens found."
            header={header}
            responsiveLayout="scroll"
            removableSort
        >
            <Column selectionMode="multiple" headerStyle={{ width: "4rem" }}></Column>
            <Column field="nama_dosen" header="Nama" sortable body={namaBodyTemplate} headerStyle={{ minWidth: "15rem" }}></Column>
            <Column field="nama_prodi" header="Prodi" sortable body={prodiBodyTemplate} headerStyle={{ minWidth: "15rem" }}></Column>
            <Column field="nidn_dosen" header="NIDN" sortable body={nidnBodyTemplate} ></Column>
            <Column field="nama_golongan" header="Golongan" sortable body={golonganBodyTemplate} ></Column>
            <Column field="gender" header="Gender" sortable body={genderBodyTemplate} headerStyle={{ minWidth: "10rem" }}></Column>
            <Column field="status_dosen" header="Status" sortable body={statusBodyTemplate} ></Column>
            <Column body={actionBodyTemplate} headerStyle={{ minWidth: "10rem" }}></Column>
        </DataTable>
    );
};

export default DosenDataTable;
