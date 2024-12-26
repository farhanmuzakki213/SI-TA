
import React, { useEffect, useRef, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import Layout from "@/Layouts/layout/layout.jsx";
import UsulanDataTable from "./component/taDataTable";
import { InputText } from "primereact/inputtext";
import UsulanForm from "./component/usulantaForm";
import { Toast } from "primereact/toast";
import CSVExportComponent from '@/Components/CSVExportComponent';
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";

const index = () => {
    let emptyusulan = {
        id_ta_mhs: null,
        komentar_judul: "",
        status_judul: "",
        pembimbing_1_id: null,
        pembimbing_2_id: null,
    };
    const { props } = usePage();
    const { data_ta, dosenPembimbingOptions: initialDosenPembimbingOptions } = props;
    const [globalFilter, setGlobalFilter] = useState('');
    const [usulans, setusulans] = useState(null);
    const [dosenPembimbingOptions, setDosenPembimbingOptions] = useState([]);
    const [usulanDialog, setusulanDialog] = useState(false);
    const [usulan, setusulan] = useState(emptyusulan);
    const [selectedusulans, setSelectedusulans] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const toast = useRef(null);
    const dt = useRef(null);
    useEffect(() => {
        setusulans(data_ta);
        setDosenPembimbingOptions(initialDosenPembimbingOptions);
        displaySuccessMessage(props.flash?.success);
        displayErrorMessage(props.flash?.error);
    }, [data_ta, props.flash, initialDosenPembimbingOptions]);

    const hideDialog = () => {
        setSubmitted(false);
        setusulanDialog(false);
    };

    // console.log(data_dosen)
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

    const saveusulan = async () => {
        setSubmitted(true);

        const requiredFieldsForUpdate = [
            usulan.id_ta_mhs,
            usulan.komentar_judul,
            usulan.status_judul,
        ];
        if (usulan.status_judul === "2") {
            requiredFieldsForUpdate.push(usulan.pembimbing_1_id, usulan.pembimbing_2_id);
        }
        const isValid = requiredFieldsForUpdate.every(field => field);


        if (!isValid) {
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: "Please fill in all required fields.",
                life: 3000,
            });
            return;
        }

        let _usulan = { ...usulan };

        try {
            await router.put(`/Kprodi/MhsTA/Penugasan/${usulan.id_ta_mhs}/update`, _usulan);

            setusulans(prevusulans =>
                prevusulans.map(d => d.id_ta_mhs === usulan.id_ta_mhs ? _usulan : d)
            );
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to update data.";
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: errorMessage,
                life: 3000,
            });
        } finally {
            setusulan(emptyusulan);
            setusulanDialog(false);
        }
    };

    const editusulan = (usulan) => {
        setusulan({ ...usulan });
        setusulanDialog(true);
    };

    const columns = [
        { header: 'ID', field: 'id_usulan' },
        {
            header: 'Name',
            field: (usulan) => `"${usulan.nama_usulan}"`
        },
        { header: 'Nim', field: 'nim_usulan' },
        { header: 'Kelas', field: 'r_kelas.nama_kelas' },
        { header: 'Gender', field: 'gender' },
        {
            header: 'Status',
            field: (usulan) => usulan.status_usulan === "1" ? "Aktif" : "Tidak Aktif"
        }
    ];

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <CSVExportComponent data={usulans} toast={toast} fileName="Jadwal_Ruangan_data.csv" columns={columns} />
            </React.Fragment>
        );
    };

    const usulanDialogFooter = (
        <>
            <Button
                label="Cancel"
                icon="pi pi-times"
                text
                onClick={hideDialog}
            />
            <Button label="Save" icon="pi pi-check" text onClick={saveusulan} />
        </>
    );

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
                        <Toast ref={toast} />
                        <Toolbar
                            className="mb-4"
                            right={rightToolbarTemplate}
                        ></Toolbar>

                        <UsulanDataTable
                            dt={dt}
                            usulans={usulans}
                            selectedusulans={selectedusulans}
                            setSelectedusulans={setSelectedusulans}
                            globalFilter={globalFilter}
                            header={header}
                            editusulan={editusulan}
                        />

                        <UsulanForm
                            usulanDialog={usulanDialog}
                            usulan={usulan}
                            setusulan={setusulan}
                            submitted={submitted}
                            usulanDialogFooter={usulanDialogFooter}
                            hideDialog={hideDialog}
                            dosenPembimbingOptions={dosenPembimbingOptions}
                        />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default index;
