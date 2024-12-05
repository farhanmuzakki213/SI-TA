import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";
import { usePage } from "@inertiajs/react";
import Layout from "@/Layouts/layout/layout.jsx";
import MhspklDataTable from './component/mhspklDataTable';

const mhspkl = () => {
    let emptymhspkl = {
        id_log_book_pkl: null,
        komentar: "",
        status: "",
    };


    const { props } = usePage();
    const { data_mhspkl } = props;
    const [mhspkls, setmhspkls] = useState(null);
    const [mhspklDialog, setmhspklDialog] = useState(false);
    const [mhspkl, setmhspkl] = useState(emptymhspkl);
    const [selectedmhspkls, setSelectedmhspkls] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        setmhspkls(data_mhspkl);
    }, [data_mhspkl]);

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Mahasiswa PKL</h5>
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
                        <Toast ref={toast} />

                        <MhspklDataTable
                            dt={dt}
                            mhspkls={mhspkls}
                            selectedmhspkls={selectedmhspkls}
                            setSelectedmhspkls={setSelectedmhspkls}
                            globalFilter={globalFilter}
                            header={header}
                        />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default mhspkl;
