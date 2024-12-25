import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Link } from '@inertiajs/react';
import { Tag } from 'primereact/tag';

const SemproDataTable = ({ sempros, globalFilter, header, editsempro, dt }) => {

    console.log(sempros);
    const komentarBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Komentar</span>
                {rowData.komentar || 'N/A'}
            </>
        );
    };

    const judulBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Judul Sempro</span>
                {rowData.judul_sempro || 'N/A'}
            </>
        );
    };

    const fileBodyTemplate = (rowData) => {
        return rowData.file_sempro ? (
            <>
                <span className="p-column-title">File</span>
                <Button
                    icon="pi pi-file"
                    severity="info"
                    rounded
                    outlined
                    onClick={() =>
                        window.open(
                            `/storage/uploads/sempro/file/${rowData.file_sempro}`,
                            "_blank"
                        )
                    }
                    tooltip="Lihat File Laporan"
                    tooltipOptions={{ position: "right", mouseTrack: false, mouseTrackRight: 15 }}
                />
            </>
        ) : (
            <>
                <span className="p-column-title">File</span>
                N/A
            </>
        );
    };

    const statusjudulBodyTemplate = (rowData) => {
        let statusLabel;
        let severity;

        switch (rowData.status_judul_sempro) {
            case "1":
                statusLabel = "Ditolak";
                severity = "danger";
                break;
            case "2":
                statusLabel = "Belum";
                severity = "warning";
                break;
            case "3":
                statusLabel = "Diterima";
                severity = "success";
                break;
            default:
                statusLabel = "Butuh Revisi";
                severity = "info";
                break;
        }

        return (
            <>
                <span className="p-column-title">Status Judul</span>
                <Tag value={statusLabel} severity={severity} />
            </>
        );
    };
    const statusberkasBodyTemplate = (rowData) => {
        let statusLabel;
        let severity;

        switch (rowData.status_ver_sempro) {
            case "1":
                statusLabel = "Ditolak";
                severity = "danger";
                break;
            case "2":
                statusLabel = "Belum Diverifikasi";
                severity = "warning";
                break;
            case "3":
                statusLabel = "Diverifikasi";
                severity = "success";
                break;
            default:
                statusLabel = "Butuh Revisi";
                severity = "info";
                break;
        }

        return (
            <>
                <span className="p-column-title">Status Judul</span>
                {rowData.status_judul_sempro === '3' ? (
                    <Tag value={statusLabel} severity={severity} />
                ) : (
                    <>
                        <span className="p-column-title">Status Berkas</span>
                        <Tag value="Belum Diverifikasi" severity="warning" />
                    </>
                )}
            </>
        );
    };

    const actionBodyTemplate = (rowData) => {
        // console.log(rowData.id_pkl_mhs, status);
        return (
            <>
                {rowData.status_ver_sempro === '3' ? (
                    <Link
                        href={'/MhsSempro/' + rowData.id_sempro_mhs}
                        className="text-blue-500 hover:underline"
                        title="View Details"
                    >
                        <Button icon="pi pi-eye" rounded outlined />
                    </Link>
                ) : (
                    rowData.status_judul_sempro !== "1" && rowData.status_ver_sempro !== "1" && (
                        <Button
                            label="Sempro"
                            icon="pi pi-pencil"
                            severity="success"
                            className="mr-2"
                            tooltip="Upload Sempro"
                            tooltipOptions={{ position: 'left', mouseTrack: false, mouseTrackLeft: 15 }}
                            onClick={() => editsempro(rowData)}
                        />
                    )
                )}

            </>
        );
    };
    // console.log(sempros);

    return (
        <DataTable
            ref={dt}
            value={sempros}
            dataKey="id_sempro_mhs"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Mahasiswa Sempro"
            globalFilter={globalFilter}
            emptyMessage="No Mahasiswa Sempro found."
            header={header}
            responsiveLayout="scroll"
            removableSort
        >
            <Column headerStyle={{ width: "4rem" }}></Column>
            <Column field="judul_sempro" header="Judul" sortable body={judulBodyTemplate} headerStyle={{ minWidth: "25rem" }}></Column>
            <Column header="File" sortable body={fileBodyTemplate} headerStyle={{ minWidth: "10rem" }}></Column>
            <Column field="komentar" header="Komentar" sortable body={komentarBodyTemplate} headerStyle={{ minWidth: "25rem" }}></Column>
            <Column field="status_judul_sempro" header="Status Judul" body={statusjudulBodyTemplate} headerStyle={{ minWidth: "10rem" }} sortable></Column>
            <Column field="status_ver_sempro" header="Status Berkas" body={statusberkasBodyTemplate} headerStyle={{ minWidth: "10rem" }} sortable></Column>
            <Column body={actionBodyTemplate} headerStyle={{ minWidth: "15rem" }}></Column>
        </DataTable>
    );
};

export default SemproDataTable;
