import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

const UserDataTable = ({ users, selectedusers, setSelectedusers, globalFilter, header, edituser, dt }) => {
    const namaBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Nama User</span>
                {rowData.name}
            </>
        );
    };

    const emailBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Email</span>
                {rowData.email}
            </>
        );
    };

    const rolesBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Roles</span>
                <div className='flex flex-wrap gap-2'>
                    {rowData.roles.map((role, index) => (
                        <span key={index} className="p-tag p-component p-tag-info">
                            <span className="p-tag-value">{role.name}</span>
                        </span>
                    ))}
                </div>
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
                    onClick={() => edituser(rowData)}
                />
            </>
        );
    };

    return (
        <DataTable
            ref={dt}
            value={users}
            selection={selectedusers}
            onSelectionChange={(e) => setSelectedusers(e.value)}
            dataKey="id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users"
            globalFilter={globalFilter}
            emptyMessage="No users found."
            header={header}
            responsiveLayout="scroll"
            removableSort
        >
            <Column selectionMode="multiple" headerStyle={{ width: "4rem" }}></Column>
            <Column field="name" header="Nama" sortable body={namaBodyTemplate} headerStyle={{ minWidth: "15rem" }}></Column>
            <Column field="email" header="Email" sortable body={emailBodyTemplate} headerStyle={{ minWidth: "15rem" }}></Column>
            <Column field="roles" header="Roles" sortable body={rolesBodyTemplate} headerStyle={{ minWidth: "15rem" }}></Column>
            <Column body={actionBodyTemplate} headerStyle={{ minWidth: "10rem" }}></Column>
        </DataTable>
    );
};

export default UserDataTable;
