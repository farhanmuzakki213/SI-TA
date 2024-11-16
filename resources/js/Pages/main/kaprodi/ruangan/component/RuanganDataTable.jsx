import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

const RuanganDataTable = ({ ruangans, selectedruangans, setSelectedruangans, globalFilter, header, editruangan, confirmDeleteruangan, dt }) => {

    const kodeBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Kode Ruangan</span>
                {rowData.kode_ruangan}
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
                    onClick={() => editruangan(rowData)}
                />
                <Button
                    icon="pi pi-trash"
                    severity="warning"
                    rounded
                    onClick={() => confirmDeleteruangan(rowData)}
                />
            </>
        );
    };

    return (
        <DataTable
            ref={dt}
            value={ruangans}
            selection={selectedruangans}
            onSelectionChange={(e) => setSelectedruangans(e.value)}
            dataKey="id_ruangan"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} ruangans"
            globalFilter={globalFilter}
            emptyMessage="No ruangans found."
            header={header}
            responsiveLayout="scroll"
            removableSort
        >
            <Column selectionMode="multiple" headerStyle={{ width: "4rem" }}></Column>
            <Column field="kode_ruangan" header="Kode" body={kodeBodyTemplate} headerStyle={{ width: "60rem" }} sortable></Column>
            <Column body={actionBodyTemplate} headerStyle={{ maxWidth: "1rem" }}></Column>
        </DataTable>
    );
};

export default RuanganDataTable;
