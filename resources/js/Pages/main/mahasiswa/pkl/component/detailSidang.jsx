import React from "react";
import { Button } from "primereact/button";

const detailSidang = ({
    data_mhs,
}) => {
    const data_mhss = data_mhs[0];
    console.log("data_mhs", data_mhss);

    const nilaiPenguji_1 = JSON.parse(data_mhss.nilai_penguji_1?.nilai || null);
    const nilaiPenguji_2 = JSON.parse(data_mhss.nilai_penguji_2?.nilai || null);
    const nilaiPembimbing = JSON.parse(data_mhss.nilai_pembimbing?.nilai || null);
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
            <div className="tw-flex tw-justify-between tw-items-center tw-py-2">
                <div className="tw-flex tw-items-center">
                    <h1 className="tw-text-2xl tw-font-bold tw-text-gray-900">Sidang Details</h1>
                </div>
                {data_mhss.status_ver_pkl === "3" && (
                    <Button
                        label="Jadwal"
                        icon="pi pi-plus"
                        severity="sucess"
                        className="mr-2"
                        tooltip="Tambah Jadwal"
                        tooltipOptions={{ position: 'left', mouseTrack: false, mouseTrackLeft: 15 }}
                        onClick={bookingopenNew}
                    />
                )}
                {data_mhss.status_ver_pkl === "3" && data_mhss.tgl_sidang != null && (
                    <Button
                        label="Jadwal"
                        icon="pi pi-pencil"
                        severity="success"
                        className="mr-2"
                        tooltip="Ubah Jadwal"
                        tooltipOptions={{ position: 'left', mouseTrack: false, mouseTrackLeft: 15 }}
                        onClick={() => editbooking(bookings)}
                    />
                )}
            </div>
            <hr className="tw-my-4" />
            <div className="card">
                <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6 tw-bg-white tw-p-4 tw-rounded-lg tw-shadow-sm">
                    <div>
                        <p className="tw-text-gray-800 tw-font-semibold">Judul</p>
                        {!data_mhss.judul ? (
                            <p className="tw-text-gray-600">Belum Ada Judul</p>
                        ) : (
                            data_mhss.status_ver_pkl === "3" ? (
                                <p className="tw-text-gray-600">{data_mhss.judul}</p>
                            ) : (
                                <p className="tw-text-gray-600">Judul Belum Diverifikasi</p>
                            )
                        )}
                    </div>
                    <div>
                        <p className="tw-text-gray-800 tw-font-semibold">Tanggal Sidang</p>
                        <p className="tw-text-gray-600">{!data_mhss.tgl_sidang ? 'Belum Dijadwalkan' : data_mhss.tgl_sidang}</p>
                    </div>
                    <div>
                        <p className="tw-text-gray-800 tw-font-semibold">Ruangan</p>
                        <p className="tw-text-gray-600">{!data_mhss.ruangan_sidang ? 'Belum Dijadwalkan' : data_mhss.ruangan_sidang}</p>
                    </div>
                    <div>
                        <p className="tw-text-gray-800 tw-font-semibold">Sesi</p>
                        <p className="tw-text-gray-600">{!data_mhss.sesi_sidang ? 'Belum Dijadwalkan' : data_mhss.sesi_sidang}</p>
                    </div>
                </div>
            </div>
            <div className="card">
                <p className="tw-text-lg tw-font-semibold tw-text-gray-800">Penilaian Tugas Akhir</p>
                <hr className="tw-my-3" />
                <div className="tw-mt-4 tw-space-y-4">
                    <div className="tw-flex tw-justify-between tw-items-center tw-border-b tw-pb-2">
                        <div className="tw-w-1/3">
                            <p className="tw-text-gray-800 tw-font-medium">Nama Dosen</p>
                        </div>
                        <div className="tw-w-1/3">
                            <p className="tw-text-gray-800 tw-font-medium">Jabatan</p>
                        </div>
                        <div className="tw-w-1/3 tw-text-right">
                            <p className="tw-text-gray-800 tw-font-medium">Nilai</p>
                        </div>
                    </div>
                    <div className="tw-flex tw-justify-between tw-items-center tw-border-b tw-pb-2">
                        <div className="tw-w-1/3">
                            <p className="tw-text-gray-600">{data_mhss.dosen_pembimbing}</p>
                        </div>
                        <div className="tw-w-1/3">
                            <p className="tw-text-gray-600">Pembimbing Program Studi</p>
                        </div>
                        <div className="tw-w-1/3 tw-text-right">
                            {!nilaiPembimbing ? (
                                <p className="tw-text-gray-600">Belum Dinilai</p>
                            ) : (
                                <p className="tw-text-gray-600">{nilaiPembimbing.total_nilai}</p>
                            )}
                        </div>
                    </div>
                    <div className="tw-flex tw-justify-between tw-items-center tw-border-b tw-pb-2">
                        <div className="tw-w-1/3">
                            {!data_mhss.pkl_pembimbing ? (
                                <p className="tw-text-gray-600">Belum Ada Pembimbing Industri</p>
                            ) : (
                                data_mhss.status_ver_pkl === "3" ? (
                                    <p className="tw-text-gray-600">{data_mhss.pkl_pembimbing}</p>
                                ) : (
                                    <p className="tw-text-gray-600">Pembimbing Industri Belum Diverifikasi</p>
                                )
                            )}
                        </div>
                        <div className="tw-w-1/3">
                            <p className="tw-text-gray-600">Pembimbing dari Industri</p>
                        </div>
                        <div className="tw-w-1/3 tw-text-right">
                            {!data_mhss.nilai_industri ? (
                                <p className="tw-text-gray-600">Belum Dinilai</p>
                            ) : (
                                data_mhss.status_ver_pkl === "3" ? (
                                    <p className="tw-text-gray-600">{data_mhss.nilai_industri}</p>
                                ) : (
                                    <p className="tw-text-gray-600">Nilai Belum Diverifikasi</p>
                                )
                            )}
                        </div>
                    </div>
                    <div className="tw-flex tw-justify-between tw-items-center tw-border-b tw-pb-2">
                        <div className="tw-w-1/3">
                            <p className="tw-text-gray-600">{data_mhss.dosen_pembimbing}</p>
                        </div>
                        <div className="tw-w-1/3">
                            <p className="tw-text-gray-600">Penguji 1</p>
                        </div>
                        <div className="tw-w-1/3 tw-text-right">
                            {!nilaiPenguji_1 ? (
                                <p className="tw-text-gray-600">Belum Dinilai</p>
                            ) : (
                                <p className="tw-text-gray-600">{nilaiPenguji_1.total_nilai}</p>
                            )}
                        </div>
                    </div>
                    <div className="tw-flex tw-justify-between tw-items-center tw-border-b tw-pb-2">
                        <div className="tw-w-1/3">
                            <p className="tw-text-gray-600">{data_mhss.dosen_penguji}</p>
                        </div>
                        <div className="tw-w-1/3">
                            <p className="tw-text-gray-600">Penguji 2</p>
                        </div>
                        <div className="tw-w-1/3 tw-text-right">
                            {!nilaiPenguji_2 ? (
                                <p className="tw-text-gray-600">Belum Dinilai</p>
                            ) : (
                                <p className="tw-text-gray-600">{nilaiPenguji_2.total_nilai}</p>
                            )}
                        </div>
                    </div>
                    <hr className="tw-my-2" />
                    <div className="tw-flex tw-justify-between tw-items-center tw-border-b tw-pb-2">
                        <div className="tw-w-1/2">
                            <p className="tw-text-gray-800 tw-font-medium">Total Nilai</p>
                        </div>
                        <div className="tw-w-1/2 tw-text-right">
                            <p className="tw-text-gray-800 tw-font-medium">{!nilaiAkhir() ? 'Nilai Belum Lengkap' : nilaiAkhir()}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="tw-mt-6">
                <div className="card">
                    <p className="tw-text-lg tw-font-semibold tw-text-gray-800">Files</p>
                    <div className="tw-mt-4 tw-space-y-4">
                        <div className="tw-flex tw-justify-between tw-items-center tw-py-2">
                            <div className="tw-flex tw-items-center">
                                <span className="tw-text-gray-800">Nilai Industri</span>
                            </div>
                            {data_mhss.file_nilai ? (
                                data_mhss.status_ver_pkl === "3" ? (
                                    <Button icon="pi pi-file" severity="primary" outlined label="File"
                                        tooltip="Lihat File" tooltipOptions={{ position: 'left', mouseTrack: false, mouseTrackLeft: 15 }}
                                        onClick={() => window.open(`/storage/uploads/pkl/nilai_industri/${data_mhss.file_nilai}`, '_blank')} />
                                ) : (
                                    <span className="tw-text-gray-800">File Belum Diverifikasi</span>
                                )
                            ) : (
                                <span className="tw-text-gray-800">File Belum Tersedia</span>
                            )}
                        </div>
                        <div className="tw-flex tw-justify-between tw-items-center tw-py-2">
                            <div className="tw-flex tw-items-center">
                                <span className="tw-text-gray-800">Laporan Akhir</span>
                            </div>
                            {data_mhss.file_laporan ? (
                                data_mhss.status_ver_pkl === "3" ? (
                                    <Button icon="pi pi-file" severity="primary" outlined label="File"
                                        tooltip="Lihat File" tooltipOptions={{ position: 'left', mouseTrack: false, mouseTrackLeft: 15 }}
                                        onClick={() => window.open(`/storage/uploads/pkl/laporan_akhir/${data_mhss.file_laporan}`, '_blank')} />
                                ) : (
                                    <span className="tw-text-gray-800">File Belum Diverifikasi</span>
                                )
                            ) : (
                                <span className="tw-text-gray-800">File Belum Tersedia</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default detailSidang;
