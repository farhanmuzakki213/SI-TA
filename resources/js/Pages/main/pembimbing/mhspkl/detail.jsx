import { usePage } from '@inertiajs/react';
import React from 'react';
import Layout from '@/Layouts/layout/layout.jsx';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';

const MhspklDetail = () => {
    const { props } = usePage();
    const { data_mhs, data_laporan, data_nilai } = props;
    // console.log("data_mhs", data_mhs);
    // console.log("data_laporan", data_laporan);
    // console.log("data_nilai", data_nilai);

    const Section1 = () => {
        const data_mhss = data_mhs[0];
        const statusUsulan = () => {

            switch (data_mhss.status_usulan) {
                case "1":
                    return <Tag severity="danger" value="Belum Disetujui" />;
                case "2":
                    return <Tag severity="warning" value="Menunggu Persetujuan" />;
                case "3":
                    return <Tag severity="success" value="Dikonfirmasi" />;
                default:
                    return <Tag severity="info" value="Status Tidak Dikenal" />;
            }
        };
        return (
            <div className="card">
                <div>
                    <h1 className="tw-text-2xl tw-font-bold tw-text-gray-900">PKL Details</h1>
                    <hr className="tw-my-4" />
                    <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4">
                        <div>
                            <p className="tw-text-gray-800 tw-font-semibold">Perusahaan</p>
                            <p className="tw-text-gray-600">{data_mhss.tempat_pkl}</p>
                        </div>
                        <div>
                            <p className="tw-text-gray-800 tw-font-semibold">Alamat</p>
                            <p className="tw-text-gray-600">{data_mhss.alamat_perusahaan}</p>
                        </div>
                        <div>
                            <p className="tw-text-gray-800 tw-font-semibold">Role / Divisi</p>
                            <p className="tw-text-gray-600">{data_mhss.role_pkl}</p>
                        </div>
                        <div>
                            <p className="tw-text-gray-800 tw-font-semibold">Tanggal PKL</p>
                            <p className="tw-text-gray-600">{data_mhss.tgl_awal_pkl} - {data_mhss.tgl_akhir_pkl}</p>
                        </div>
                        <div>
                            <p className="tw-text-gray-800 tw-font-semibold">Pembimbing</p>
                            <p className="tw-text-gray-600">{data_mhss.dosen_pembimbing}</p>
                        </div>
                        <div>
                            <p className="tw-text-gray-800 tw-font-semibold">Status</p>
                            {statusUsulan()}
                        </div>
                    </div>
                    <div className="tw-mt-4">
                        <div className="card">
                            <h5>Laporan</h5>
                            <DataTable value={data_laporan} rows={5} paginator responsiveLayout="scroll">
                                <Column field="name" header="Kegiatan" style={{ width: '35%' }} />
                                <Column field="tanggal" header="Tanggal Kegiatan" style={{ width: '25%' }} body={(data) => data.tanggal} />
                                <Column
                                    header="File"
                                    style={{ width: '15%' }}
                                    body={(data) => (
                                        <>
                                            <Button
                                                icon="pi pi-file"
                                                severity="info"
                                                rounded outlined
                                                onClick={() => window.open(`/storage/uploads/pkl/laporan/${data.file}`, '_blank')}
                                                tooltip="Lihat File" tooltipOptions={{ position: 'right', mouseTrack: false, mouseTrackRight: 15 }}
                                            />
                                        </>
                                    )}
                                />
                                <Column field="status" header="Status" style={{ width: '10%' }} body={(data) =>
                                    data.status === '1' ? (
                                        <Tag severity="danger">Ditolak</Tag>
                                    ) : data.status === '2' ? (
                                        <Tag severity="info">Diproses</Tag>
                                    ) : (
                                        <Tag severity="success">Diterima</Tag>
                                    )
                                } />
                                <Column header="Aksi" style={{ width: '10%' }}
                                    body={(data) =>
                                        <Button icon="pi pi-pencil" severity="success" rounded
                                            tooltip="Konfirmasi" tooltipOptions={{ position: 'left', mouseTrack: false, mouseTrackLeft: 15 }} />
                                    } />
                            </DataTable>
                        </div>
                    </div>
                </div>
            </div>
        )
    };

    const Section2 = () => {
        if (data_laporan.length > 4) {
            return (
                <div className="card">
                    <p>Pengajuan Sidang</p>
                </div>
            )
        } else {
            return (
                <div className="card">
                    <p>Detail penilaian laporan</p>
                </div>
            )
        }
    };
    return (
        <Layout>
            <div className="tw-flex tw-flex-col sm:tw-flex-row tw-gap-4">
                <div className="tw-w-full sm:tw-max-w-sm">
                    <div className="tw-rounded-[12px] tw-border tw-bg-white tw-px-4 tw-pt-8 tw-pb-10 tw-shadow-lg">
                        <div className="tw-relative tw-mx-auto tw-w-40 tw-h-40 tw-rounded-full tw-overflow-hidden">
                            <img
                                src={data_mhs[0].foto_mahasiswa}
                                alt="Michael Simbal"
                                className="tw-object-cover tw-w-full tw-h-full"
                            />
                        </div>
                        <div className="tw-text-center tw-mt-4">
                            <h1 className="tw-text-xl tw-font-bold tw-text-gray-900">{data_mhs[0].nama_mahasiswa}</h1>
                            <p className="tw-text-sm tw-text-gray-600">{data_mhs[0].nim_mahasiswa}</p>
                            <p className="tw-mt-2 tw-text-sm tw-text-gray-500">{data_mhs[0].prodi}</p>
                            <ul className="tw-mt-3 tw-divide-y tw-rounded tw-bg-gray-100 tw-py-2 tw-px-3 tw-text-gray-600 tw-shadow-sm hover:tw-text-gray-700 hover:tw-shadow">
                                <li className="tw-flex tw-items-center tw-py-3 tw-text-sm">
                                    <span>Status</span>
                                    <span className="tw-ml-auto">
                                        <span className="tw-rounded-full tw-bg-green-200 tw-py-1 tw-px-2 tw-text-xs tw-font-medium tw-text-green-700">{data_mhs[0].status_pkl}</span>
                                    </span>
                                </li>
                                <li className="tw-flex tw-items-center tw-py-3 tw-text-sm">
                                    <span>Mulai</span>
                                    <span className="tw-ml-auto">{data_mhs[0].tgl_awal_pkl}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="tw-w-full sm:tw-max-w-96">
                    <div className="tw-grid tw-gap-1">
                        <div className="tw-col-12">
                            <Section1 />
                        </div>
                        <div className="tw-col-12">
                            <Section2 />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default MhspklDetail;
