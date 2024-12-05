import { usePage } from '@inertiajs/react';
import React from 'react';
import Layout from '@/Layouts/layout/layout.jsx';

const MhspklDetail = () => {
//     const { props } = usePage();
//     const { data_mhs, data_laporan, data_nilai } = props;

    return (
        <Layout>
            <div className="grid crud-demo">
                <div className="col-12">
                    <div className="card">
                        <h1 className="text-xl font-bold">Detail Mahasiswa PKL</h1>
                        {/* <p><strong>Nama Mahasiswa:</strong> {data_mhs?.r_usulan?.r_mahasiswa?.nama_mahasiswa || 'N/A'}</p>
                        <p><strong>NIM:</strong> {data_mhs?.r_usulan?.r_mahasiswa?.nim_mahasiswa || 'N/A'}</p>
                        <p><strong>Role / Divisi:</strong> {data_mhs?.r_usulan?.r_role_tempat_pkls?.nama_role || 'N/A'}</p>
                        <h2 className="text-lg font-semibold mt-4">Laporan</h2>
                        {data_laporan.length > 0 ? (
                            <ul>
                                {data_laporan.map((laporan, index) => (
                                    <li key={index}>{laporan.judul || 'N/A'}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>Tidak ada laporan.</p>
                        )}
                        <h2 className="text-lg font-semibold mt-4">Nilai</h2>
                        {data_nilai.length > 0 ? (
                            <ul>
                                {data_nilai.map((nilai, index) => (
                                    <li key={index}>Nilai: {nilai.nilai || 'N/A'}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>Tidak ada nilai.</p>
                        )} */}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default MhspklDetail;
