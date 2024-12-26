import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Link } from '@inertiajs/react';
import { Avatar } from 'primereact/avatar';
import { Tag } from 'primereact/tag';

const TaDataTable = ({ tas, selectedtas, setSelectedtas, globalFilter, header, editta, dt }) => {
    const getStatusLabel = (status, additionalCondition) => {
        switch (status) {
            case "0":
                return {
                    label: additionalCondition ? "Ditolak" : "Tidak Lulus",
                    severity: "danger",
                };
            case "1":
                return {
                    label: additionalCondition ? "Belum Diverifikasi" : "Sedang Diproses",
                    severity: "warning",
                };
            case "2":
                return {
                    label: additionalCondition ? "Diverifikasi" : "Lulus",
                    severity: "success",
                };
            default:
                return {
                    label: "Butuh Revisi",
                    severity: "info",
                };
        }
    };

    const getStatusTemplate = (status, additionalCondition) => {
        const { label, severity } = getStatusLabel(status, additionalCondition);
        return (
            <>
                <span className="p-column-title">Status</span>
                <Tag value={label} severity={severity} />
            </>
        );
    };

    const judulBodyTemplate = (rowData) => (
        <>
            <span className="p-column-title">Judul TA</span>
            {rowData.judul || 'N/A'}
        </>
    );

    const gambarBodyTemplate = (rowData) => (
        <>
            <span className="p-column-title">Foto Profil</span>
            <Avatar image={rowData.foto_mahasiswa} size="xlarge" />
        </>
    );

    const actionBodyTemplate = (rowData) => (
        <>
            {rowData.status_judul === '2' && (
                <Link
                    href={'/MhsTA/' + rowData.id_ta_mhs}
                    className="text-blue-500 hover:underline"
                    title="View Details"
                >
                    <Button icon="pi pi-eye" rounded outlined />
                </Link>
            )}
            {(rowData.status_judul === '1' || rowData.status_judul === '3') && (
                <Button
                    icon="pi pi-pencil"
                    severity="success"
                    rounded
                    className="mr-2"
                    onClick={() => editta(rowData)}
                />
            )}
        </>
    );

    return (
        <DataTable
            ref={dt}
            value={tas}
            selection={selectedtas}
            onSelectionChange={(e) => setSelectedtas(e.value)}
            dataKey="id_ta_mhs"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Mahasiswa Tugas Akhir"
            globalFilter={globalFilter}
            emptyMessage="No Mahasiswa Tugas Akhir found."
            header={header}
            responsiveLayout="scroll"
            removableSort
        >
            <Column headerStyle={{ width: "4rem" }}></Column>
            <Column field="foto_mahasiswa" header="Gambar" sortable body={gambarBodyTemplate}></Column>
            <Column field="judul" header="Judul TA" sortable body={judulBodyTemplate} headerStyle={{ minWidth: "15rem" }}></Column>
            <Column
                field="status_judul"
                header="Status Judul"
                sortable
                body={(rowData) => getStatusTemplate(rowData.status_judul, rowData.status_sidang_ta)}
                headerStyle={{ minWidth: "15rem" }}
            ></Column>
            <Column
                field="status_ver_proposal"
                header="Status Proposal"
                sortable
                body={(rowData) => getStatusTemplate(rowData.status_ver_proposal, rowData.status_sidang_ta)}
                headerStyle={{ minWidth: "15rem" }}
            ></Column>
            <Column
                field="status_ver_ta"
                header="Status Berkas TA"
                sortable
                body={(rowData) => getStatusTemplate(rowData.status_ver_ta, rowData.status_sidang_ta)}
                headerStyle={{ minWidth: "15rem" }}
            ></Column>
            <Column
                field="status_sidang_ta"
                header="Status Kelulusan"
                sortable
                body={(rowData) => getStatusTemplate(rowData.status_sidang_ta)}
                headerStyle={{ minWidth: "15rem" }}
            ></Column>
            <Column body={actionBodyTemplate} headerStyle={{ minWidth: "10rem" }}></Column>
        </DataTable>
    );
};

export default TaDataTable;
