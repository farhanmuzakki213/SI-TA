import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

const SesiDataTable = ({ sesis, selectedsesis, setSelectedsesis, globalFilter, header, editsesi, confirmDeletesesi, dt }) => {
    const periodeBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Periode Sesi</span>
                {rowData.periode_sesi}
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
                    onClick={() => editsesi(rowData)}
                />
                <Button
                    icon="pi pi-trash"
                    severity="warning"
                    rounded
                    onClick={() => confirmDeletesesi(rowData)}
                />
            </>
        );
    };

    return (
        <DataTable
            ref={dt}
            value={sesis}
            selection={selectedsesis}
            onSelectionChange={(e) => setSelectedsesis(e.value)}
            dataKey="id_sesi"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} sesis"
            globalFilter={globalFilter}
            emptyMessage="No sesis found."
            header={header}
            responsiveLayout="scroll"
            removableSort
        >
            <Column selectionMode="multiple" headerStyle={{ width: "4rem" }}></Column>
            <Column field="periode_sesi" header="periode" body={periodeBodyTemplate} headerStyle={{ width: "60rem" }} sortable></Column>
            <Column body={actionBodyTemplate} headerStyle={{ minWidth: "10rem" }}></Column>
        </DataTable>
    );
};

export default SesiDataTable;
