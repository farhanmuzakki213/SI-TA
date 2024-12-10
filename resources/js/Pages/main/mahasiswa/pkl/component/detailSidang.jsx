import React from "react";
import { Button } from "primereact/button";

const detailSidang = ({
    data_mhs,
    data_nilai,
}) => {
    const data_mhss = data_mhs[0];
    console.log("data_nilai", data_nilai);

    const nilaiPenguji_1 = JSON.parse(data_mhss.nilai_penguji_1?.nilai || null);
    const nilaiPenguji_2 = JSON.parse(data_mhss.nilai_penguji_2?.nilai || null);
    const nilaiPembimbing = JSON.parse(data_mhss.nilai_pembimbing?.nilai || '{}');
    const nilaiAkhir = () => {
        if (nilaiPembimbing != null && nilaiPenguji_1 != null && nilaiPenguji_2 != null) {
            const totalNilai =
                (data_mhss.nilai_industri * 0.30) +
                (nilaiPembimbing.total_nilai * 0.35) +
                (((nilaiPenguji_1.total_nilai + nilaiPenguji_2.total_nilai) / 2) * 0.35);
            return parseFloat(totalNilai.toFixed(2));
        }
        return null;
    };
    return (
        <div className="card">
            <h1 className="tw-text-2xl tw-font-bold tw-text-gray-900">Sidang Details</h1>
            <hr className="tw-my-4" />
            <div class="card">
                <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6 tw-bg-white tw-p-4 tw-rounded-lg tw-shadow-sm">
                    <div>
                        <p class="tw-text-gray-800 tw-font-semibold">Judul</p>
                        <p class="tw-text-gray-600">{!data_mhss.judul ? '-' : data_mhss.judul}</p>
                    </div>
                    <div>
                        <p class="tw-text-gray-800 tw-font-semibold">Tanggal Sidang</p>
                        <p class="tw-text-gray-600">{!data_mhss.tgl_sidang ? '-' : data_mhss.tgl_sidang}</p>
                    </div>
                    <div>
                        <p class="tw-text-gray-800 tw-font-semibold">Ruangan</p>
                        <p class="tw-text-gray-600">{!data_mhss.ruangan_sidang ? '-' : data_mhss.ruangan_sidang}</p>
                    </div>
                    <div>
                        <p class="tw-text-gray-800 tw-font-semibold">Sesi</p>
                        <p class="tw-text-gray-600">{!data_mhss.sesi_sidang ? '-' : data_mhss.sesi_sidang}</p>
                    </div>
                </div>
            </div>
            <hr className="tw-my-3" />
            {/* <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4">
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
            </div> */}
            <div class="card">
                <p class="tw-text-lg tw-font-semibold tw-text-gray-800">Penilaian Tugas Akhir</p>
                <div class="tw-mt-4 tw-space-y-4">
                    <div class="tw-flex tw-justify-between tw-items-center tw-border-b tw-pb-2">
                        <div class="tw-w-1/3">
                            <p class="tw-text-gray-800 tw-font-medium">Nama Dosen</p>
                        </div>
                        <div class="tw-w-1/3">
                            <p class="tw-text-gray-800 tw-font-medium">Jabatan</p>
                        </div>
                        <div class="tw-w-1/3 tw-text-right">
                            <p class="tw-text-gray-800 tw-font-medium">Nilai</p>
                        </div>
                    </div>
                    <div class="tw-flex tw-justify-between tw-items-center tw-border-b tw-pb-2">
                        <div class="tw-w-1/3">
                            <p class="tw-text-gray-600">{data_mhss.dosen_pembimbing}</p>
                        </div>
                        <div class="tw-w-1/3">
                            <p class="tw-text-gray-600">Pembimbing Program Studi</p>
                        </div>
                        <div class="tw-w-1/3 tw-text-right">
                            {!nilaiPembimbing ? (
                                <p class="tw-text-gray-600">-</p>
                            ) : (
                                <p class="tw-text-gray-600">{nilaiPembimbing.total_nilai}</p>
                            )}
                        </div>
                    </div>
                    <div class="tw-flex tw-justify-between tw-items-center tw-border-b tw-pb-2">
                        <div class="tw-w-1/3">
                            <p class="tw-text-gray-600">{!data_mhss.pkl_pembimbing ? '-' : data_mhss.pkl_pembimbing}</p>
                        </div>
                        <div class="tw-w-1/3">
                            <p class="tw-text-gray-600">Pembimbing dari Industri</p>
                        </div>
                        <div class="tw-w-1/3 tw-text-right">
                            <p class="tw-text-gray-600">{!data_mhss.nilai_industri ? '-' : data_mhss.nilai_industri}</p>
                        </div>
                    </div>
                    <div class="tw-flex tw-justify-between tw-items-center tw-border-b tw-pb-2">
                        <div class="tw-w-1/3">
                            <p class="tw-text-gray-600">{data_mhss.dosen_pembimbing}</p>
                        </div>
                        <div class="tw-w-1/3">
                            <p class="tw-text-gray-600">Penguji 1</p>
                        </div>
                        <div class="tw-w-1/3 tw-text-right">
                            {!nilaiPenguji_1 ? (
                                <p className="tw-text-gray-600">-</p>
                            ) : (
                                <p className="tw-text-gray-600">{nilaiPenguji_1.total_nilai}</p>
                            )}
                        </div>
                    </div>
                    <div class="tw-flex tw-justify-between tw-items-center tw-border-b tw-pb-2">
                        <div class="tw-w-1/3">
                            <p class="tw-text-gray-600">{data_mhss.dosen_penguji}</p>
                        </div>
                        <div class="tw-w-1/3">
                            <p class="tw-text-gray-600">Penguji 2</p>
                        </div>
                        <div class="tw-w-1/3 tw-text-right">
                            {!nilaiPenguji_2 ? (
                                <p className="tw-text-gray-600">-</p>
                            ) : (
                                <p className="tw-text-gray-600">{nilaiPenguji_2.total_nilai}</p>
                            )}
                        </div>
                    </div>
                    <hr className="tw-my-2" />
                    <div class="tw-flex tw-justify-between tw-items-center tw-border-b tw-pb-2">
                        <div class="tw-w-1/2">
                            <p class="tw-text-gray-800 tw-font-medium">Total Nilai</p>
                        </div>
                        <div class="tw-w-1/2 tw-text-right">
                            <p class="tw-text-gray-800 tw-font-medium">{!nilaiAkhir() ? '-' : nilaiAkhir()}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tw-mt-6">
                <div className="card">
                    <p class="tw-text-lg tw-font-semibold tw-text-gray-800">Files</p>
                    <div class="tw-mt-4 tw-space-y-4">
                        <div class="tw-flex tw-justify-between tw-items-center tw-py-2">
                            <div class="tw-flex tw-items-center">
                                <span class="tw-text-gray-800">Nilai Industri</span>
                            </div>
                            <Button icon="pi pi-file" severity="primary" outlined label="File"
                                tooltip="Lihat File" tooltipOptions={{ position: 'left', mouseTrack: false, mouseTrackLeft: 15 }}
                                onClick={() => window.open(`/storage/uploads/pkl/nilai_industri/${data_mhss.file_nilai}`, '_blank')} />
                        </div>
                        <div class="tw-flex tw-justify-between tw-items-center tw-py-2">
                            <div class="tw-flex tw-items-center">
                                <span class="tw-text-gray-800">Laporan Akhir</span>
                            </div>
                            <Button icon="pi pi-file" severity="primary" outlined label="File"
                                tooltip="Lihat File" tooltipOptions={{ position: 'left', mouseTrack: false, mouseTrackLeft: 15 }}
                                onClick={() => window.open(`/storage/uploads/pkl/laporan_akhir/${data_mhss.file_laporan}`, '_blank')} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default detailSidang;
