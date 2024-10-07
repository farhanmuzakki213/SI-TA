import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

const KelasDataTable = ({ kelass, selectedkelass, setSelectedkelass, globalFilter, header, editkelas, confirmDeletekelas, dt }) => {
    const namaBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Nama Kelas</span>
                {rowData.nama_kelas}
            </>
        );
    };

    const kodeBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Kode Kelas</span>
                {rowData.kode_kelas}
            </>
        );
    };

    const prodiBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Prodi</span>
                {rowData.r_prodi ? rowData.r_prodi.nama_prodi : 'N/A'}
            </>
        );
    };

    const smt_thnakdBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Semester dan Tahun Akademik</span>
                {rowData.r_smt_thnakd ? rowData.r_smt_thnakd.nama_smt_thnakd : 'N/A'}
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
                    onClick={() => editkelas(rowData)}
                />
                <Button
                    icon="pi pi-trash"
                    severity="warning"
                    rounded
                    onClick={() => confirmDeletekelas(rowData)}
                />
            </>
        );
    };

    return (
        <DataTable
            ref={dt}
            value={kelass}
            selection={selectedkelass}
            onSelectionChange={(e) => setSelectedkelass(e.value)}
            dataKey="id_kelas"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} kelass"
            globalFilter={globalFilter}
            emptyMessage="No kelass found."
            header={header}
            responsiveLayout="scroll"
            removableSort
        >
            <Column selectionMode="multiple" headerStyle={{ width: "4rem" }}></Column>
            <Column field="kode_kelas" header="Kode" body={kodeBodyTemplate} sortable></Column>
            <Column field="nama_kelas" header="Nama" sortable body={namaBodyTemplate} headerStyle={{ minWidth: "15rem" }}></Column>
            <Column field="r_prodi.nama_prodi" header="Prodi" sortable body={prodiBodyTemplate} headerStyle={{ minWidth: "15rem" }}></Column>
            <Column field="r_smt_thnakd.nama_smt_thnakd" header="Semester dan Tahun Akademik" sortable body={smt_thnakdBodyTemplate} headerStyle={{ minWidth: "15rem" }}></Column>
            <Column body={actionBodyTemplate} headerStyle={{ minWidth: "10rem" }}></Column>
        </DataTable>
    );
};

export default KelasDataTable;
