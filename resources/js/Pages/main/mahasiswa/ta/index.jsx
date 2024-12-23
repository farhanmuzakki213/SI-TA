import Layout from "@/Layouts/layout/layout.jsx";
import { usePage } from "@inertiajs/react";
import DetailTa from "./detail";
import React from "react";

const index = () => {
    const { props } = usePage();
    const { data_ta, data_sempro, data_mahasiswa, data_bimbingan_1, data_bimbingan_2, data_bimbingan } = props
    const data_mahasiswas = data_mahasiswa[0];
    const data_sempros = data_sempro[0];
    console.log(data_ta);
    return (
        <Layout>

            {data_mahasiswas && data_mahasiswas.jenjang === "D4" ? (
                <>
                    {data_sempros && data_sempros.status_sempro === '3' ? (
                        <>
                            <DetailTa data_ta={data_ta} data_bimbingan_1={data_bimbingan_1} data_bimbingan_2={data_bimbingan_2} data_bimbingan={data_bimbingan}/>
                        </>
                    ) : (
                        <>
                            <div className="grid crud-demo">
                                <div className="col-12">
                                    <div className="card">
                                        Anda Belum Melakukan Sempro / Belum Menyelesaikan Sempro
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </>
            ) : (
                <>
                    d3
                </>
            )}

        </Layout >
    );
};


export default index;
