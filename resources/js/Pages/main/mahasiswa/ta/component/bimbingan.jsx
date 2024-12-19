import React, { useEffect, useRef, useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { router, usePage } from "@inertiajs/react";
import { Toolbar } from "primereact/toolbar";

const bimbingan = ({
    data_ta
}) => {
    const { props } = usePage();
    const data_tas  = data_ta[0];
    console.log(data_tas);
    return (
        <div className="card">
            <h1 className="tw-text-2xl tw-font-bold tw-text-gray-900">PKL Details</h1>
            <hr className="tw-my-4" />
            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4">
                <div>
                    <p className="tw-text-gray-800 tw-font-semibold">Perusahaan</p>
                    <p className="tw-text-gray-600">{data_tas.tempat_pkl}</p>
                </div>
                <div>
                    <p className="tw-text-gray-800 tw-font-semibold">Alamat</p>
                    <p className="tw-text-gray-600">{data_tas.alamat_perusahaan}</p>
                </div>
                <div>
                    <p className="tw-text-gray-800 tw-font-semibold">Role / Divisi</p>
                    <p className="tw-text-gray-600">{data_tas.role_pkl}</p>
                </div>
                <div>
                    <p className="tw-text-gray-800 tw-font-semibold">Tanggal PKL</p>
                    <p className="tw-text-gray-600">{data_tas.tgl_awal_pkl} - {data_tas.tgl_akhir_pkl}</p>
                </div>
                <div>
                    <p className="tw-text-gray-800 tw-font-semibold">Dosen Pembimbing</p>
                    <p className="tw-text-gray-600">{data_tas.dosen_pembimbing}</p>
                </div>
                <div>
                    <p className="tw-text-gray-800 tw-font-semibold">Status</p>
                    <p className="tw-text-gray-600">{data_tas.status_pkl}</p>
                </div>
            </div>
            <hr className="tw-my-2" />
            <div className="tw-mt-4">
                <div className="card">
                    {/* <DataTable value={data_tas} rows={1} paginator responsiveLayout="scroll">
                        <Column field="tanggal" header="Tanggal Kegiatan" style={{ width: '20%' }}  />
                        <Column field="kegiatan" header="Kegiatan" style={{ width: '65%' }} />
                        <Column
                            header="File"
                            style={{ width: '5%' }}
                        />
                        <Column field="status" header="Status" style={{ width: '5%' }} />
                        <Column header="Aksi" style={{ width: '5%' }} />
                    </DataTable> */}
                </div>
            </div>
        </div>
    )
};

export default bimbingan;
