
import React, { useEffect, useRef, useState } from "react";
import { usePage } from "@inertiajs/react";
import Layout from "@/Layouts/layout/layout.jsx";
import TugasAkhirDataTable from "./component/taDataTable";
import { InputText } from "primereact/inputtext";

const index = () => {


    const { props } = usePage();
    const { data_ta, data_dosen } = props;
    const [tugasakhirs, settugasakhirs] = useState(null);
    const [globalFilter, setGlobalFilter] = useState('');
    const [selectedtugasakhirs, setSelectedtugasakhirs] = useState(null);
    const dt = useRef(null);

    useEffect(() => {
        settugasakhirs(data_ta);
    }, [data_ta]);
    // console.log(data_dosen)

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Mahasiswa Tugas Akhir</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText
                    type="search"
                    value={globalFilter || ''}
                    onInput={(e) => setGlobalFilter(e.target.value || '')}
                    placeholder="Search..."
                />
            </span>
        </div>
    );
    return (
        <Layout>
            <div className="grid crud-demo">
                <div className="col-12">
                    <div className="card">
                        {data_dosen?.r_prodi?.jenjang === 'D4' ? (
                            <TugasAkhirDataTable
                                dt={dt}
                                tugasakhirs={tugasakhirs}
                                selectedtugasakhirs={selectedtugasakhirs}
                                setSelectedtugasakhirs={setSelectedtugasakhirs}
                                globalFilter={globalFilter}
                                header={header}
                            />
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
