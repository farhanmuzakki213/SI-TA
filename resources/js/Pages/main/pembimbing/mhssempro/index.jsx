import { InputText } from "primereact/inputtext";
import React, { useEffect, useRef, useState } from "react";
import { usePage } from "@inertiajs/react";
import Layout from "@/Layouts/layout/layout.jsx";
import SemproDataTable from "./component/semproDataTable";

const index = () => {

    const { props } = usePage();
    const { data_sempro, dosen_id } = props;
    const [sempros, setsempros] = useState(null);
    const [globalFilter, setGlobalFilter] = useState('');
    const [selectedsempros, setSelectedsempros] = useState(null);
    const dt = useRef(null);

    useEffect(() => {
        setsempros(data_sempro);
    }, [data_sempro]);

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Mahasiswa Sempro</h5>
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

                        <SemproDataTable
                            dt={dt}
                            sempros={sempros}
                            selectedsempros={selectedsempros}
                            setSelectedsempros={setSelectedsempros}
                            globalFilter={globalFilter}
                            header={header}
                        />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default index;
