
import React from "react";
import { usePage } from "@inertiajs/react";
import Layout from "@/Layouts/layout/layout.jsx";

const index = () => {


    const { props } = usePage();
    const { data_ta, data_dosen } = props;
    console.log(data_dosen)
;
    return (
        <Layout>
            <div className="grid crud-demo">
                <div className="col-12">
                    <div className="card">
                        {data_dosen?.r_prodi?.jenjang === 'D4' ? (
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
        </Layout>
    );
};

export default index;
