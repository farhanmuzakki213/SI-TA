import React from "react";
import { Tag } from 'primereact/tag';

const detailPkl = ({
    data_mhs,
}) => {
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
                    <p className="tw-text-gray-800 tw-font-semibold">Dosen Pembimbing</p>
                    <p className="tw-text-gray-600">{data_mhss.dosen_pembimbing}</p>
                </div>
                <div>
                    <p className="tw-text-gray-800 tw-font-semibold">Status</p>
                    {statusUsulan()}
                </div>
            </div>
        </div>
    )
};

export default detailPkl;
