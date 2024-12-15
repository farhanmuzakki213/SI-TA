import { usePage } from '@inertiajs/react';
import React from 'react';
import Layout from '@/Layouts/layout/layout.jsx';
import DetailSidang from './component/detailSidang';

const MhsSemproDetail = () => {
    const { props } = usePage();
    const { data_mhs,
        dosenOptions,
        ruanganOptions,
        sesiOptions,
        nextNumber,
        bookingused,
        jambookingused} = props;
    // console.log("data_mhs", data_mhs);
    // console.log("data_laporan", data_laporan);
    // console.log("data_nilai", data_nilai);
    const data_mhss = data_mhs[0];


    return (
        <Layout>
            <div className="tw-flex tw-flex-col sm:tw-flex-row tw-gap-4">
                <div className="tw-w-full sm:tw-max-w-sm">
                    <div className="tw-rounded-[12px] tw-border tw-bg-white tw-px-4 tw-pt-8 tw-pb-10 tw-shadow-lg">
                        <div className="tw-relative tw-mx-auto tw-w-40 tw-h-40 tw-rounded-full tw-overflow-hidden">
                            <img
                                src={data_mhss.foto_mahasiswa}
                                alt="Michael Simbal"
                                className="tw-object-cover tw-w-full tw-h-full"
                            />
                        </div>
                        <div className="tw-text-center tw-mt-4">
                            <h1 className="tw-text-xl tw-font-bold tw-text-gray-900">{data_mhss.nama_mahasiswa}</h1>
                            <p className="tw-text-sm tw-text-gray-600">{data_mhss.nim_mahasiswa}</p>
                            <p className="tw-mt-2 tw-text-sm tw-text-gray-500">{data_mhss.prodi}</p>
                        </div>
                    </div>
                </div>
                <div className="tw-w-full sm:tw-max-w-96">
                    <div className="tw-grid tw-gap-1">
                        <div className="tw-col-12">
                            <DetailSidang
                            data_mhs={data_mhs}
                            dosenOptions={dosenOptions}
                            sesiOptions={sesiOptions}
                            ruanganOptions={ruanganOptions}
                            nextNumber={nextNumber}
                            bookingused={bookingused}
                            jambookingused={jambookingused} />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default MhsSemproDetail;
