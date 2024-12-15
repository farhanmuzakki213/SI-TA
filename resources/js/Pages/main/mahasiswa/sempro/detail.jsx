import { usePage } from '@inertiajs/react';
import React from 'react';
import Layout from '@/Layouts/layout/layout.jsx';
import DetailSidang from './component/detailSidang';

const MhsSemproDetail = () => {
    const { props } = usePage();
    const { data_sempro } = props;
    // console.log("data_sempro", data_sempro);
    const data_sempros = data_sempro[0];
    return (
        <div className="tw-flex tw-flex-col sm:tw-flex-row tw-gap-4">
            <div className="tw-w-full sm:tw-max-w-sm">
                <div className="tw-rounded-[12px] tw-border tw-bg-white tw-px-4 tw-pt-8 tw-pb-10 tw-shadow-lg">
                    <div className="tw-relative tw-mx-auto tw-w-40 tw-h-40 tw-rounded-full tw-overflow-hidden">
                        <img
                            src={data_sempros.foto_mahasiswa}
                            alt="Michael Simbal"
                            className="tw-object-cover tw-w-full tw-h-full"
                        />
                    </div>
                    <div className="tw-text-center tw-mt-4">
                        <h1 className="tw-text-xl tw-font-bold tw-text-gray-900">{data_sempros.nama_mahasiswa}</h1>
                        <p className="tw-text-sm tw-text-gray-600">{data_sempros.nim_mahasiswa}</p>
                        <p className="tw-mt-2 tw-text-sm tw-text-gray-500">{data_sempros.prodi}</p>

                        <ul className="tw-mt-3 tw-divide-y tw-rounded tw-bg-gray-100 tw-py-2 tw-px-3 tw-text-gray-600 tw-shadow-sm hover:tw-text-gray-700 hover:tw-shadow">
                            <li className="tw-flex tw-items-center tw-py-3 tw-text-sm">
                                <span>Status Proposal</span>
                                <span className="tw-ml-auto">
                                    <span className="tw-rounded-full tw-bg-green-200 tw-py-1 tw-px-2 tw-text-xs tw-font-medium tw-text-green-700">{data_sempros?.status ? data_sempros.status : "Belum Pengajuan"}</span>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="tw-w-full sm:tw-max-w-96">
                <div className="tw-grid tw-gap-4">
                    <div className="tw-w-full sm:tw-max-w-96">
                        <div className="tw-grid tw-gap-4">
                            <div className="tw-col-12">
                                <DetailSidang data_sempro={data_sempro} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MhsSemproDetail;
