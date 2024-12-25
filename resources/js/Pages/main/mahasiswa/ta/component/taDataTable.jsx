import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';

const TaDataTable = ({ tas, globalFilter, header, editta, dt }) => {

    console.log(tas);
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
                <span className="p-column-title">Judul Ta</span>
                {rowData.judul_ta || 'N/A'}
            </>
        );
    };

    const fileBodyTemplate = (rowData) => {
        return rowData.file_ta ? (
            <>
                <span className="p-column-title">File</span>
                <Button
                    icon="pi pi-file"
                    severity="info"
                    rounded
                    outlined
                    onClick={() =>
                        window.open(
                            `/storage/uploads/ta/file/${rowData.file_ta}`,
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

    // const statusjudulBodyTemplate = (rowData) => {
    //     return (
    //         <>
    //             <span className="p-column-title">Status Judul</span>
    //             {rowData.status_judul_ta === "1" ? "Ditolak" : rowData.status_judul_ta === "2" ? "Sedang Diproses" : rowData.status_judul_ta === "3" ? "Diterima" : "Butuh Revisi"}
    //         </>
    //     );
    // };
    const statusberkasBodyTemplate = (rowData) => {
        let statusLabel;
        let severity;

        switch (rowData.status_ver_ta) {
            case "0":
                statusLabel = "Ditolak";
                severity = "danger";
                break;
            case "1":
                statusLabel = "Belum Diverifikasi";
                severity = "warning";
                break;
            case "2":
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
                <span className="p-column-title">Status Verifikasi TA</span>
                {rowData.status_judul_ta === '3' ? (
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
    const statusTugasAkhirBodyTemplate = (rowData) => {
        let statusLabel;
        let severity;

        switch (rowData.status_sidang_ta) {
            case "0":
                statusLabel = "Tidak Lulus";
                severity = "danger";
                break;
            case "1":
                statusLabel = "Belum";
                severity = "warning";
                break;
            case "2":
                statusLabel = "Lulus";
                severity = "success";
                break;
            default:
                statusLabel = "Butuh Revisi";
                severity = "info";
                break;
        }

        return (
            <>
                <span className="p-column-title">Status Kelulusan</span>
                <Tag value={statusLabel} severity={severity} />
            </>
        );
    };

    const actionBodyTemplate = (rowData) => {
        // console.log(rowData.id_pkl_mhs, status);
        return (
            <>
                {(rowData.status_ver_ta === "2" || rowData.status_ver_ta === "4") && (
                    <Button
                        label="Ta"
                        icon="pi pi-pencil"
                        severity="success"
                        className="mr-2"
                        tooltip="Upload Berkas Ta"
                        tooltipOptions={{ position: 'left', mouseTrack: false, mouseTrackLeft: 15 }}
                        onClick={() => editta(rowData)}
                    />
                )}
            </>
        );
    };
    // console.log(tas);

    return (
        <DataTable
            ref={dt}
            value={tas}
            dataKey="id_ta_mhs"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Mahasiswa Ta"
            globalFilter={globalFilter}
            emptyMessage="No Mahasiswa Ta found."
            header={header}
            responsiveLayout="scroll"
            removableSort
        >
            <Column headerStyle={{ width: "4rem" }}></Column>
            <Column field="judul_ta" header="Judul" sortable body={judulBodyTemplate} headerStyle={{ minWidth: "15rem" }}></Column>
            <Column header="File" sortable body={fileBodyTemplate} headerStyle={{ minWidth: "15rem" }}></Column>
            <Column field="komentar" header="Komentar" sortable body={komentarBodyTemplate} headerStyle={{ minWidth: "15rem" }}></Column>
            {/* <Column field="status_judul_ta" header="Status Judul" body={statusjudulBodyTemplate}  sortable></Column> */}
            <Column field="status_ver_ta" header="Status Berkas" body={statusberkasBodyTemplate} sortable></Column>
            <Column field="status_sidang_ta" header="Status Kelulusan" body={statusTugasAkhirBodyTemplate} sortable></Column>
            <Column body={actionBodyTemplate} headerStyle={{ minWidth: "10rem" }}></Column>
        </DataTable>
    );
};

export default TaDataTable;
