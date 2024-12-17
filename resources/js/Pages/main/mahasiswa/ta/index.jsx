import Layout from "@/Layouts/layout/layout.jsx";
import { usePage } from "@inertiajs/react";
import TaForm from "./component/taForm";
import { Toast } from 'primereact/toast';
import React from "react";

const index = () => {
    const { props } = usePage();
    const { data_ta, data_mahasiswa, nextNumber } = props
    const data_mahasiswas = data_mahasiswa[0];
    console.log(data_mahasiswa);
    return (
        <Layout>
            <div className="grid crud-demo">
                <div className="col-12">
                    <div className="card">
                        {data_mahasiswas && data_mahasiswas.jenjang === "D4" ? (
                            <>
                                d4
                            </>
                        ) : (
                            <>
                                d3
                            </>
                        )}
                    </div>
                </div>
            </div>
        </Layout >
    );
};


export default index;
