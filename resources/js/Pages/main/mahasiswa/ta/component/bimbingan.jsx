import React from "react";
import { router, usePage } from "@inertiajs/react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { Toolbar } from "primereact/toolbar";

const bimbingan = () => {
    const { props } = usePage();
    const { data_ta, data_bimbingan, data_bimbingan_2, data_bimbingan_1 } = props;
    const data_mhs_ta = data_ta[0];
    // console.log(data_tas);
    // console.log("data bimbingan 1", data_bimbingan_1)
    // console.log("data bimbingan 2", data_bimbingan_2)

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button
                        label="New"
                        icon="pi pi-plus"
                        severity="sucess"
                        className="mr-2"
                        // onClick={openNew}
                    />
                </div>
            </React.Fragment>
        );
    };

    const leftToolbarTemplate = () => {
        return (
            <h5>Bimbingan TA</h5>
        );
    };
    return (
        <div className="card">
            <h1 className="tw-text-2xl tw-font-bold tw-text-gray-900">Bimbingan TA Details</h1>
            <hr className="tw-my-4" />
            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4">
                <div>
                    <p className="tw-text-gray-800 tw-font-semibold">Jumlah Bimbingan Dosen 1</p>
                    <p className="tw-text-gray-600">{data_bimbingan_1.length}</p>
                </div>
                <div>
                    <p className="tw-text-gray-800 tw-font-semibold">Jumlah Bimbingan Dosen 2</p>
                    <p className="tw-text-gray-600">{data_bimbingan_2.length}</p>
                </div>
            </div>
            <hr className="tw-my-2" />
            <div className="tw-mt-4">
                <div className="card">
                    <Toolbar
                        className="mb-4"
                        left={leftToolbarTemplate}
                        right={rightToolbarTemplate}
                    />
                    <DataTable value={data_bimbingan} rows={1} paginator responsiveLayout="scroll">
                        <Column field="tanggal_bimbingan" header="Tanggal Bimbingan" style={{ width: '10%' }} />
                        <Column field="pembahasan" header="Pembahasan" style={{ width: '30%' }} />
                        <Column field="komentar" header="Komentar" style={{ width: '30%' }} />
                        <Column
                            header="File"
                            style={{ width: '5%' }}
                            body={(data) => (
                                <>
                                    <Button
                                        icon="pi pi-file"
                                        severity="info"
                                        rounded outlined
                                        onClick={() => window.open(`/storage/uploads/sempro/file/${data.file_bimbingan}`, '_blank')}
                                        tooltip="Lihat File" tooltipOptions={{ position: 'right', mouseTrack: false, mouseTrackRight: 15 }}
                                    />
                                </>
                            )}
                        />
                        <Column field="nama_dosen" header="Nama Dosen" style={{ width: '20%' }} />
                        <Column field="status_bimbingan_ta" header="Status" style={{ width: '5%' }} body={(data) => {
                            data.status_bimbingan_ta === '1' ? (
                                <Tag severity="warning">Belum</Tag>
                            ) : data.status_bimbingan_ta === '2' ? (
                                <Tag severity="success">Diterima</Tag>
                            ) : data.status_bimbingan_ta === '3' ? (
                                <Tag severity="danger">Revisi</Tag>
                            ) : (
                                <Tag severity="info">Status Tidak Diketahui</Tag>
                            )
                        }
                        } />
                        <Column header="Aksi" style={{ width: '5%' }} body={(data) =>
                            <Button icon="pi pi-pencil" severity="success" rounded
                                tooltip="Konfirmasi" tooltipOptions={{ position: 'left', mouseTrack: false, mouseTrackLeft: 15 }}
                                /* onClick={() => editlaporanpkl(data)} */ />
                        } />
                    </DataTable>
                </div>
            </div>
        </div>
    )
};

export default bimbingan;
