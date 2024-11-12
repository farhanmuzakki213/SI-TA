import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import React, { useEffect, useRef, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import Layout from "@/Layouts/layout/layout.jsx";
import TempatPklDataTable from './component/TempatPklDataTable';
import TempatPklForm from './component/TempatPklForm';

const tempatpkl = () => {
    let emptytempatpkl = {
        id_usulan: null,
        role_tempat_pkl_id: null,
        tempat_pkl_id: null,
        tgl_awal_pkl: "",
        tgl_akhir_pkl: "",
        status_usulan: "",
    };


    const { props } = usePage();
    const { data_usulan, roleOptions: initialRoleOptions, tempatOptions: initialTempatOptions, mahasiswaOptions: initialMahasiswaOptions, nextNumber } = props;
    const [tempatpkls, settempatpkls] = useState(null);
    const [roleOptions, setRoleOptions] = useState([]);
    const [tempatOptions, setTempatOptions] = useState([]);
    const [tempatpklDialog, settempatpklDialog] = useState(false);
    const [tempatpkl, settempatpkl] = useState(emptytempatpkl);
    const [selectedtempatpkls, setSelectedtempatpkls] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        setRoleOptions(initialRoleOptions);
        setTempatOptions(initialTempatOptions);
        settempatpkls(data_usulan);
        displaySuccessMessage(props.flash?.success);
        displayErrorMessage(props.flash?.error);
    }, [initialRoleOptions, initialTempatOptions, initialMahasiswaOptions, data_usulan, props.flash]);

    const openNew = () => {
        settempatpkl(emptytempatpkl);
        setSubmitted(false);
        settempatpklDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        settempatpklDialog(false);
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

    const savetempatpkl = async () => {
        setSubmitted(true);

        const requiredFieldsForCreate = [
            tempatpkl.role_tempat_pkl_id,
            tempatpkl.tgl_awal_pkl,
            tempatpkl.tgl_akhir_pkl,
        ];

        const requiredFieldsForUpdate = [
            tempatpkl.role_tempat_pkl_id,
            tempatpkl.tgl_awal_pkl,
            tempatpkl.tgl_akhir_pkl,
        ];

        const isCreating = !tempatpkl.id_usulan;
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

        let _tempatpkl = { ...tempatpkl };

        try {

            if (isCreating) {
                _tempatpkl.id_usulan = nextNumber;
                await router.post('/tempatpkl/store', _tempatpkl);
            } else {

                await router.put(`/tempatpkl/${tempatpkl.id_usulan}/update`, _tempatpkl);
            }

            settempatpkls((prevtempatpkls) => {
                const tempatpklsArray = Array.isArray(prevtempatpkls) ? prevtempatpkls : [];

                if (isCreating) {
                    return [...tempatpklsArray, _tempatpkl];
                } else {
                    return tempatpklsArray.map((d) =>
                        d.id_usulan === tempatpkl.id_usulan ? _tempatpkl : d
                    );
                }
            });
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to save Jadwal Ruangan.";
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: errorMessage,
                life: 3000,
            });
        } finally {
            settempatpkl(emptytempatpkl);
            settempatpklDialog(false);
        }
    };
    const edittempatpkl = (tempatpkl) => {
        settempatpkl({ ...tempatpkl });
        settempatpklDialog(true);
    };
    // console.log(props.data_usulan[0]?.status_usulan);
    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button
                        label="New"
                        icon="pi pi-plus"
                        severity="success"
                        className="mr-2"
                        onClick={openNew}
                    />
                </div>
            </React.Fragment>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Jadwal Ruangan</h5>
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

    const tempatpklDialogFooter = (
        <>
            <Button
                label="Cancel"
                icon="pi pi-times"
                text
                onClick={hideDialog}
            />
            <Button label="Save" icon="pi pi-check" text onClick={savetempatpkl} />
        </>
    );

    return (
        <Layout>
            <div className="grid crud-demo">
                <div className="col-12">
                    <div className="card">
                        <Toast ref={toast} />
                        {data_usulan[0]?.status_usulan === "0" && (
                        <Toolbar
                            className="mb-4"
                            left={leftToolbarTemplate}
                        ></Toolbar>
                        )}

                        <TempatPklDataTable
                            dt={dt}
                            tempatpkls={tempatpkls}
                            selectedtempatpkls={selectedtempatpkls}
                            setSelectedtempatpkls={setSelectedtempatpkls}
                            globalFilter={globalFilter}
                            header={header}
                            edittempatpkl={edittempatpkl}
                        />

                        <TempatPklForm
                            tempatpklDialog={tempatpklDialog}
                            tempatpkl={tempatpkl}
                            settempatpkl={settempatpkl}
                            submitted={submitted}
                            roleOptions={roleOptions}
                            tempatOptions={tempatOptions}
                            tempatpklDialogFooter={tempatpklDialogFooter}
                            hideDialog={hideDialog}
                        />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default tempatpkl;
