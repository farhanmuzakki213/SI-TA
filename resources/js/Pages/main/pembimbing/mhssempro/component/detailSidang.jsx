import React, { useEffect, useRef, useState } from "react";
import { Button } from "primereact/button";
// import SemproForm from "./ubahsemproForm";
import { router, usePage } from "@inertiajs/react";
import { Toast } from "primereact/toast";
// import BookingForm from "./BookingForm";

const detailSidang = ({
    data_mhs,
}) => {
    const data_mhss = data_mhs[0];
    const openFile = async () => {
        try {
            const url = `/SuratTugas/sempro/${data_mhss.id_sempro_mhs}`;
            window.open(url, '_blank');
        } catch (error) {
            console.error(error);
        }
    };
    console.log(data_mhss);
    return (
        <div className="card">
            {/* <Toast ref={toast} /> */}
            <h1 className="tw-text-2xl tw-font-bold tw-text-gray-900">Sidang Details</h1>
            <hr className="tw-my-4" />
            <div className="card">
                <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6 tw-bg-white tw-p-4 tw-rounded-lg tw-shadow-sm">
                    <div>
                        <p className="tw-text-gray-800 tw-font-semibold">Judul</p>
                        <p className="tw-text-gray-600">{!data_mhss.judul_sempro ? '-' : data_mhss.judul_sempro}</p>
                    </div>
                    <div>
                        <p className="tw-text-gray-800 tw-font-semibold">Tanggal Sidang</p>
                        <p className="tw-text-gray-600">{!data_mhss.tgl_sidang ? '-' : data_mhss.tgl_sidang}</p>
                    </div>
                    <div>
                        <p className="tw-text-gray-800 tw-font-semibold">Ruangan</p>
                        <p className="tw-text-gray-600">{!data_mhss.ruangan_sidang ? '-' : data_mhss.ruangan_sidang}</p>
                    </div>
                    <div>
                        <p className="tw-text-gray-800 tw-font-semibold">Sesi</p>
                        <p className="tw-text-gray-600">{!data_mhss.sesi_sidang ? '-' : data_mhss.sesi_sidang}</p>
                    </div>
                </div>
            </div>
            <div className="card">
                <p className="tw-text-lg tw-font-semibold tw-text-gray-800">Penilaian Tugas Akhir</p>
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
                            <p className="tw-text-gray-600">-</p>
                        </div>
                        <div className="tw-w-1/3">
                            <p className="tw-text-gray-600">Pembimbing Program Studi</p>
                        </div>
                        <div className="tw-w-1/3 tw-text-right">
                            <p className="tw-text-gray-600">-</p>
                        </div>
                    </div>
                    <div className="tw-flex tw-justify-between tw-items-center tw-border-b tw-pb-2">
                        <div className="tw-w-1/3">
                            <p className="tw-text-gray-600">-</p>
                        </div>
                        <div className="tw-w-1/3">
                            <p className="tw-text-gray-600">Pembimbing dari Industri</p>
                        </div>
                        <div className="tw-w-1/3 tw-text-right">
                            <p className="tw-text-gray-600">-</p>
                        </div>
                    </div>
                    <div className="tw-flex tw-justify-between tw-items-center tw-border-b tw-pb-2">
                        <div className="tw-w-1/3">
                            <p className="tw-text-gray-600">-</p>
                        </div>
                        <div className="tw-w-1/3">
                            <p className="tw-text-gray-600">Penguji 1</p>
                        </div>
                        <div className="tw-w-1/3 tw-text-right">
                            <p className="tw-text-gray-600">-</p>
                        </div>
                    </div>
                    <div className="tw-flex tw-justify-between tw-items-center tw-border-b tw-pb-2">
                        <div className="tw-w-1/3">
                            <p className="tw-text-gray-600">-</p>
                        </div>
                        <div className="tw-w-1/3">
                            <p className="tw-text-gray-600">Penguji 2</p>
                        </div>
                        <div className="tw-w-1/3 tw-text-right">
                            <p className="tw-text-gray-600">-</p>
                        </div>
                    </div>
                    <hr className="tw-my-2" />
                    <div className="tw-flex tw-justify-between tw-items-center tw-border-b tw-pb-2">
                        <div className="tw-w-1/2">
                            <p className="tw-text-gray-800 tw-font-medium">Total Nilai</p>
                        </div>
                        <div className="tw-w-1/2 tw-text-right">
                            <p className="tw-text-gray-800 tw-font-medium">nilai akhir</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="tw-mt-6">
                <div className="card">
                    <p className="tw-text-lg tw-font-semibold tw-text-gray-800">Files</p>
                    <div className="tw-mt-4 tw-space-y-4">
                        {data_mhss.id_booking && (
                            <div className="tw-flex tw-justify-between tw-items-center tw-py-2">
                                <div className="tw-flex tw-items-center">
                                    <span className="tw-text-gray-800">Surat Tugas</span>
                                </div>
                                <Button icon="pi pi-file" severity="primary" outlined label="File"
                                    tooltip="Lihat File" tooltipOptions={{ position: 'left', mouseTrack: false, mouseTrackLeft: 15 }}
                                    onClick={openFile} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default detailSidang;
