import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Link } from '@inertiajs/react';
import { Avatar } from 'primereact/avatar';
import { Tag } from 'primereact/tag';

const TaDataTable = ({ tas, selectedtas, setSelectedtas, globalFilter, header, editta, dt }) => {

    // console.log(tas);
    const namaBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Nama Mahasiswa</span>
                {rowData.nama_mahasiswa || 'N/A'}
            </>
        );
    };

    const nimBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Nim Mahasiswa</span>
                {rowData.nim_mahasiswa || 'N/A'}
            </>
        );
    };

    const prodiBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Prodi Mahasiswa</span>
                {rowData.prodi || 'N/A'}
            </>
        );
    };

    const judulBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Judul Ta</span>
                {rowData.judul || 'N/A'}
            </>
        );
    };

    const ipkBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">IPK</span>
                {rowData.ipk || 'N/A'}
            </>
        );
    };

    const fileproposalBodyTemplate = (rowData) => {
        return rowData.file_proposal ? (
            <>
                <span className="p-column-title">File Proposal</span>
                <Button
                    icon="pi pi-file"
                    severity="info"
                    rounded
                    outlined
                    onClick={() =>
                        window.open(
                            `/storage/uploads/sempro/file/${rowData.file_proposal}`,
                            "_blank"
                        )
                    }
                    tooltip="Lihat File Proposal"
                    tooltipOptions={{ position: "right", mouseTrack: false, mouseTrackRight: 15 }}
                />
            </>
        ) : (
            <>
                <span className="p-column-title">File Proposal</span>
                N/A
            </>
        );
    };

    const statusBodyTemplate = (rowData) => {
        let statusLabel;
        let severity;

        switch (rowData.status_ver_proposal) {
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
                <Tag value={statusLabel} severity={severity} />
            </>
        );
    };
    const gambarBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Foto Profil</span>
                <Avatar image={rowData.foto_mahasiswa} size="xlarge" />
            </>
        );
    };

    const actionBodyTemplate = (rowData) => {
        // console.log(rowData.id_pkl_mhs, status);
        return (
            <>
                <Button
                    icon="pi pi-pencil"
                    severity="success"
                    rounded
                    className="mr-2"
                    onClick={() => editta(rowData)}
                />
            </>
        );
    };

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
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Mahasiswa TA"
            globalFilter={globalFilter}
            emptyMessage="No Mahasiswa TA found."
            header={header}
            responsiveLayout="scroll"
            removableSort
        >
            <Column headerStyle={{ width: "4rem" }}></Column>
            <Column field="foto_mahasiswa" header="Gambar" sortable body={gambarBodyTemplate}></Column>
            <Column field="nama_mahasiswa" header="Nama Mahasiswa" sortable body={namaBodyTemplate} headerStyle={{ minWidth: "15rem" }}></Column>
            <Column field="nim_mahasiswa" header="Nim Mahasiswa" sortable body={nimBodyTemplate} headerStyle={{ minWidth: "15rem" }}></Column>
            {/* <Column field="prodi" header="Prodi" sortable body={prodiBodyTemplate} headerStyle={{ minWidth: "15rem" }}></Column> */}
            <Column field="judul" header="Judul" sortable body={judulBodyTemplate} headerStyle={{ minWidth: "15rem" }}></Column>
            <Column header="File Proposal" sortable body={fileproposalBodyTemplate} ></Column>
            <Column field="status_ver_proposal" header="Status Berkas" body={statusBodyTemplate} sortable></Column>
            <Column body={actionBodyTemplate} headerStyle={{ minWidth: "10rem" }}></Column>
        </DataTable>
    );
};

export default TaDataTable;
