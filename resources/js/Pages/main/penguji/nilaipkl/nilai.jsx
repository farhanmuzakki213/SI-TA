import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import React, { useEffect, useRef, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import Layout from "@/Layouts/layout/layout.jsx";
import NilaipklDataTable from './component/nilaiDataTable';
import NilaipklForm from './component/nilaiForm';
import CSVExportComponent from '@/Components/CSVExportComponent';
import CSVImportComponent from '@/Components/CSVImportComponent';

const nilaipkl = () => {
    let emptynilaipkl = {
        id_pkl_nilai: null,
        pkl_mhs_id: null,
        bahasa: '',
        analisis: '',
        sikap: '',
        komunikasi: '',
        penyajian: '',
        penguasaan: '',
    };

    const { props } = usePage();
    const { data_nilaipkl, nextNumber, mahasiswaPklOptions: initialMahasiswaPklOptions } = props;
    const [nilaipkls, setnilaipkls] = useState(null);
    const [mahasiswaPklOptions, setMahasiswaPklOptions] = useState([]);
    const [nilaipklDialog, setnilaipklDialog] = useState(false);
    const [nilaipkl, setnilaipkl] = useState(emptynilaipkl);
    const [selectednilaipkls, setSelectednilaipkls] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        setnilaipkls(data_nilaipkl);
        setMahasiswaPklOptions(initialMahasiswaPklOptions);
        displaySuccessMessage(props.flash?.success);
        displayErrorMessage(props.flash?.error);
    }, [data_nilaipkl, props.flash, mahasiswaPklOptions]);

    const openNew = () => {
        setnilaipkl(emptynilaipkl);
        setSubmitted(false);
        setnilaipklDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setnilaipklDialog(false);
    };

    const displaySuccessMessage = (successMessage) => {
        if (successMessage !== null) {
            const message = successMessage || "Operation successful";
            toast.current?.show({
                severity: "success",
                summary: "Successful",
                detail: message,
                life: 3000,
            });
        }
    };

    const displayErrorMessage = (errorMessage) => {
        if (errorMessage !== null) {
            const message = errorMessage || "Operation failed";
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: message,
                life: 3000,
            });
        }
    };

    const savenilaipkl = async () => {
        setSubmitted(true);

        const requiredFieldsForCreate = [
            nilaipkl.pkl_mhs_id,
            nilaipkl.bahasa,
            nilaipkl.analisis,
            nilaipkl.sikap,
            nilaipkl.komunikasi,
            nilaipkl.penyajian,
            nilaipkl.penguasaan,
        ];

        const requiredFieldsForUpdate = [
            nilaipkl.pkl_mhs_id,
            nilaipkl.bahasa,
            nilaipkl.analisis,
            nilaipkl.sikap,
            nilaipkl.komunikasi,
            nilaipkl.penyajian,
            nilaipkl.penguasaan,
        ];

        const isCreating = !nilaipkl.id_pkl_nilai;
        let isValid = true;

        if (isCreating) {
            isValid = requiredFieldsForCreate.every(field => field);
        } else {
            isValid = requiredFieldsForUpdate.every(field => field);
        }

        if (!isValid) {
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: "Please fill in all required fields.",
                life: 3000,
            });
            return;
        }
        console.log(nilaipkl);

        try {

            const formData = new FormData();
            formData.append("pkl_mhs_id", nilaipkl.pkl_mhs_id);
            formData.append("bahasa", nilaipkl.bahasa);
            formData.append("analisis", nilaipkl.analisis);
            formData.append("sikap", nilaipkl.sikap);
            formData.append("komunikasi", nilaipkl.komunikasi);
            formData.append("penyajian", nilaipkl.penyajian);
            formData.append("penguasaan", nilaipkl.penguasaan);

            if (isCreating) {
                formData.append("id_pkl_nilai", nextNumber);
                await router.post("/nilaipklpenguji/store", formData);
            } else {
                await router.put(`/nilaipklpenguji/${nilaipkl.id_pkl_nilai}/update`, formData);
            }

            if (isCreating) {
                setnilaipkls((prev) => [...prev, nilaipkl]);
            } else {
                setnilaipkls((prev) =>
                    prev.map((item) =>
                        item.id_pkl_nilai === nilaipkl.id_pkl_nilai ? nilaipkl : item
                    )
                );
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to save nilaipkl.";
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: errorMessage,
                life: 3000,
            });
        } finally {
            setnilaipkl(emptynilaipkl);
            setnilaipklDialog(false);
        }
    };

    const editnilaipkl = (nilaipkl) => {
        setnilaipkl({ ...nilaipkl });
        setnilaipklDialog(true);
    };
    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button
                        label="New"
                        icon="pi pi-plus"
                        severity="sucess"
                        className="mr-2"
                        onClick={openNew}
                    />
                </div>
            </React.Fragment>
        );
    };

    // const columns = [
    //     { header: 'ID', field: 'id_pkl_nilai' },
    //     {
    //         header: 'Nama nilaipkl',
    //         field: (nilaipkl) => `"${nilaipkl.nama_nilaipkl}"`
    //     },
    //     { header: 'Kode nilaipkl', field: 'pembimbing_id' },
    // ];
    // const handleImport = (importedData) => {
    //     setNilaipkls(prevNilaipkls => [...prevNilaipkls, ...importedData]);
    // };

    // const rightToolbarTemplate = () => {
    //     return (
    //         <React.Fragment>
    //             <CSVImportComponent onImport={handleImport} toast={toast} />
    //             <CSVExportComponent data={nilaipkls} toast={toast} fileName="nilaipkl_data.csv" columns={columns} />
    //         </React.Fragment>
    //     );
    // };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Laporan PKL</h5>
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

    const nilaipklDialogFooter = (
        <>
            <Button
                label="Cancel"
                icon="pi pi-times"
                text
                onClick={hideDialog}
            />
            <Button label="Save" icon="pi pi-check" text onClick={savenilaipkl} />
        </>
    );

    return (
        <Layout>
            <div className="grid crud-demo">
                <div className="col-12">
                    <div className="card">
                        <Toast ref={toast} />
                        <Toolbar
                            className="mb-4"
                            left={leftToolbarTemplate}
                            // right={rightToolbarTemplate}
                        ></Toolbar>

                        <NilaipklDataTable
                            dt={dt}
                            nilaipkls={nilaipkls}
                            selectednilaipkls={selectednilaipkls}
                            setSelectednilaipkls={setSelectednilaipkls}
                            globalFilter={globalFilter}
                            header={header}
                            editnilaipkl={editnilaipkl}
                        />

                        <NilaipklForm
                            nilaipklDialog={nilaipklDialog}
                            nilaipkl={nilaipkl}
                            setnilaipkl={setnilaipkl}
                            submitted={submitted}
                            nilaipklDialogFooter={nilaipklDialogFooter}
                            hideDialog={hideDialog}
                            mahasiswaPklOptions={mahasiswaPklOptions}
                        />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default nilaipkl;
