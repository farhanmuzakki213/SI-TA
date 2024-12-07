import React from "react";
import { Button } from "primereact/button";

const detailSidang = ({
    data_mhs,
    data_nilai,
}) => {
    const data_mhss = data_mhs[0];
    console.log("data_nilai", data_nilai);

    const nilaiPenguji = JSON.parse(data_mhss.nilai_penguji?.nilai || '{}');
    const nilaiPembimbing = JSON.parse(data_mhss.nilai_pembimbing?.nilai || '{}');
    const nilaiAkhir = () => {
        if (nilaiPembimbing != null && nilaiPenguji != null) {
            return ((data_mhss.nilai_industri + nilaiPenguji.total_nilai + nilaiPembimbing.total_nilai) / 3);
        }
        return null;
    };
    return (
        <div className="card">
            <h1 className="tw-text-2xl tw-font-bold tw-text-gray-900">Sidang Details</h1>
            <hr className="tw-my-4" />
            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4">
                <div>
                    <p className="tw-text-gray-800 tw-font-semibold">Judul Laporan</p>
                    <p className="tw-text-gray-600">{!data_mhss.judul ? '-' : data_mhss.judul}</p>
                </div>
                <div>
                    <p className="tw-text-gray-800 tw-font-semibold">Tanggal Sidang</p>
                    <p className="tw-text-gray-600">{!data_mhss.tgl_sidang ? '-' : data_mhss.tgl_sidang}</p>
                </div>
                <div>
                    <p className="tw-text-gray-800 tw-font-semibold">Pembimbing Industri</p>
                    <p className="tw-text-gray-600">{!data_mhss.pkl_pembimbing ? '-' : data_mhss.pkl_pembimbing}</p>
                </div>
                <div>
                    <p className="tw-text-gray-800 tw-font-semibold">Ruangan</p>
                    <p className="tw-text-gray-600">{!data_mhss.ruangan_sidang ? '-' : data_mhss.ruangan_sidang}</p>
                </div>
                <div>
                    <p className="tw-text-gray-800 tw-font-semibold">Dosen Penguji</p>
                    <p className="tw-text-gray-600">{data_mhss.dosen_penguji}</p>
                </div>
                <div>
                    <p className="tw-text-gray-800 tw-font-semibold">Sesi</p>
                    <p className="tw-text-gray-600">{!data_mhss.sesi_sidang ? '-' : data_mhss.sesi_sidang}</p>
                </div>
            </div>
            <hr className="tw-my-3" />
            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4">
                <div>
                    <p className="tw-text-gray-800 tw-font-semibold">Nilai Industri</p>
                    <p className="tw-flex tw-items-center tw-text-gray-600">{!data_mhss.nilai_industri ? '-' : data_mhss.nilai_industri}</p>
                </div>
                <div>
                    <p className="tw-text-gray-800 tw-font-semibold">Nilai Pembimbing</p>
                    <p className="tw-text-gray-600">{!nilaiPenguji.total_nilai ? '-' : nilaiPenguji.total_nilai}</p>
                </div>
                <div>
                    <p className="tw-text-gray-800 tw-font-semibold">Nilai Penguji</p>
                    <p className="tw-text-gray-600">{!nilaiPembimbing.total_nilai ? '-' :nilaiPembimbing.total_nilai}</p>
                </div>
                <div>
                    <p className="tw-text-gray-800 tw-font-semibold">Nilai Akhir</p>
                    <p className="tw-text-gray-600">{!nilaiAkhir() ? '-' : nilaiAkhir()}</p>
                </div>
            </div>
            <div className="tw-mt-4">
                <p className="tw-text-gray-800 tw-font-semibold">Files</p>
                <hr className="tw-my-2" />
                <div className="tw-flex tw-justify-between tw-items-center tw-py-2">
                    <div className="tw-flex tw-items-center">
                        <span className="tw-ml-2 tw-text-gray-800">Nilai Industri</span>
                    </div>
                    <Button icon="pi pi-file" severity="primary" outlined label="File"
                        tooltip="Lihat File" tooltipOptions={{ position: 'left', mouseTrack: false, mouseTrackLeft: 15 }} />
                </div>
                <hr />
                <div className="tw-flex tw-justify-between tw-items-center tw-py-2">
                    <div className="tw-flex tw-items-center">
                        <span className="tw-ml-2 tw-text-gray-800">Laporan Akhir</span>
                    </div>
                    <Button icon="pi pi-file" severity="primary" outlined label="File"
                        tooltip="Lihat File" tooltipOptions={{ position: 'left', mouseTrack: false, mouseTrackLeft: 15 }} />
                </div>
                <hr />
                <div className="tw-flex tw-justify-between tw-items-center tw-py-2">
                    <div className="tw-flex tw-items-center">
                        <span className="tw-ml-2 tw-text-gray-800">Surat Tugas</span>
                    </div>
                    <Button icon="pi pi-file" severity="primary" outlined label="File"
                        tooltip="Lihat File" tooltipOptions={{ position: 'left', mouseTrack: false, mouseTrackLeft: 15 }} />
                </div>
                <hr />
            </div>
        </div>
    )
};

export default detailSidang;
