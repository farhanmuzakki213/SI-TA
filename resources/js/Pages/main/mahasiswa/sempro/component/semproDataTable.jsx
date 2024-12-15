import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

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

    const statusBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Status</span>
                {rowData.status_ver_sempro === "1" ? "Ditolak" : rowData.status_ver_sempro === "2" ? "Sedang Diproses" : rowData.status_ver_sempro === "3" ? "Diterima" : "Butuh Revisi"}
            </>
        );
    };

    const actionBodyTemplate = (rowData) => {
        // console.log(rowData.id_pkl_mhs, status);
        return (
            <>
                {(rowData.status_ver_sempro === "2" || rowData.status_ver_sempro === "4") && (
                    <Button
                        label="Sempro"
                        icon="pi pi-pencil"
                        severity="success"
                        className="mr-2"
                        tooltip="Ubah Sempro"
                        tooltipOptions={{ position: 'left', mouseTrack: false, mouseTrackLeft: 15 }}
                        onClick={() => editsempro(rowData)}
                    />
                )}
            </>
        );
    };

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
            <Column field="judul_sempro" header="Judul" sortable body={judulBodyTemplate} headerStyle={{ minWidth: "15rem" }}></Column>
            <Column header="File" sortable body={fileBodyTemplate} headerStyle={{ minWidth: "15rem" }}></Column>
            <Column field="komentar" header="Komentar" sortable body={komentarBodyTemplate} headerStyle={{ minWidth: "15rem" }}></Column>
            <Column field="status_ver_sempro" header="Status" body={statusBodyTemplate} headerStyle={{ minWidth: "15rem" }} sortable></Column>
            <Column body={actionBodyTemplate} headerStyle={{ minWidth: "10rem" }}></Column>
        </DataTable>
    );
};

export default SemproDataTable;
