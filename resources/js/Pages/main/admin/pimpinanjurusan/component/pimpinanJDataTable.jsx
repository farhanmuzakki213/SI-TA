import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

const pimpinan_jurusanDataTable = ({ pimpinan_jurusans, selectedpimpinan_jurusans, setSelectedpimpinan_jurusans, globalFilter, header, editpimpinan_jurusan, confirmDeletepimpinan_jurusan, dt }) => {
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
                {rowData.status_pimpinan_jurusan === "1" ? "Aktif" : "Tidak Aktif"}
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
                    onClick={() => editpimpinan_jurusan(rowData)}
                />
                <Button
                    icon="pi pi-trash"
                    severity="warning"
                    rounded
                    onClick={() => confirmDeletepimpinan_jurusan(rowData)}
                />
            </>
        );
    };

    return (
        <DataTable
            ref={dt}
            value={pimpinan_jurusans}
            selection={selectedpimpinan_jurusans}
            onSelectionChange={(e) => setSelectedpimpinan_jurusans(e.value)}
            dataKey="id_pimpinan_jurusan"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} pimpinan_jurusans"
            globalFilter={globalFilter}
            emptyMessage="No pimpinan_jurusans found."
            header={header}
            responsiveLayout="scroll"
        >
            <Column selectionMode="multiple" headerStyle={{ width: "4rem" }}></Column>
            <Column field="r_dosen.nama_dosen" header="Nama" sortable body={namaBodyTemplate} headerStyle={{ minWidth: "15rem" }}></Column>
            <Column field="r_dosen?.r_prodi?.r_jurusan?.nama_jurusan" header="Jurusan" sortable body={jurusanBodyTemplate} headerStyle={{ minWidth: "15rem" }}></Column>
            <Column field="periode" header="Periode" body={periodeBodyTemplate} sortable></Column>
            <Column field="status_pimpinan_jurusan" header="Status" body={statusBodyTemplate} sortable></Column>
            <Column body={actionBodyTemplate} headerStyle={{ minWidth: "10rem" }}></Column>
        </DataTable>
    );
};

export default pimpinan_jurusanDataTable;
