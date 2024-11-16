import React, { useEffect, useRef, useState } from "react";
import Layout from "@/Layouts/layout/layout.jsx";
import JobItem from "./component/jobItem";
import JobDetails from "./component/jobdetail";
import CompanyDetail from "./component/companydetail";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { router, usePage } from "@inertiajs/react";
import TempatPklForm from "./component/TempatPklForm";
import { Scrollbar } from 'react-scrollbars-custom';


const tempatpkl = () => {
    let emptytempatpkl = {
        id_usulan: null,
        role_tempat_pkl_id: null,
        mahasiswa_id: null,
        status_usulan: "",
    };


    const { props } = usePage();
    const { data_usulan, data_tempats, roleOptions: initialRoleOptions, tempatOptions: initialTempatOptions, mahasiswaOptions: initialMahasiswaOptions, nextNumber } = props;
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
    const detailsRef = useRef(null);
    const companyRef = useRef(null);
    // console.log(props.data_usulan);

    useEffect(() => {
        setRoleOptions(initialRoleOptions);
        setTempatOptions(initialTempatOptions);
        settempatpkls(data_tempats);
        displaySuccessMessage(props.flash?.success);
        displayErrorMessage(props.flash?.error);
    }, [initialRoleOptions, initialTempatOptions, initialMahasiswaOptions, data_tempats, props.flash]);

    const openNew = () => {
        settempatpkl(emptytempatpkl);
        setSubmitted(false);
        settempatpklDialog(true);
    };
    // console.log(props);
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

        const isValid = requiredFieldsForCreate.every(field => field);

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
            _tempatpkl.id_usulan = nextNumber;
            await router.post('/tempatpkl/store', _tempatpkl);
            settempatpkls((prevtempatpkls) => {
                const tempatpklsArray = Array.isArray(prevtempatpkls) ? prevtempatpkls : [];
                return [...tempatpklsArray, _tempatpkl];
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

    const calculateMonthDifference = (startDateString, endDateString) => {
        const startDate = new Date(startDateString);
        const endDate = new Date(endDateString);

        const yearsDifference = endDate.getFullYear() - startDate.getFullYear();
        const monthsDifference = endDate.getMonth() - startDate.getMonth();
        const totalMonths = yearsDifference * 12 + monthsDifference;

        return totalMonths;
    };


    // const jobs = [
    //     {
    //         id: 1,
    //         title: "Quality Control & Gemstone Production",
    //         company: "PT Sehat Jaya Selalu",
    //         location: "Kota Surakarta (WFO)",
    //         duration: "6 bulan",
    //         type: "Mandiri",
    //         new: true,
    //         type: "Teknologi Informasi",
    //         link: "www.SehatJayaSelalu.com",
    //         employe: "10-20",
    //         logo: "https://placehold.co/50x50?text=Logo+1"
    //     },
    //     {
    //         id: 2,
    //         title: "Curriculum Development Internship",
    //         company: "CV DB KLIK",
    //         location: "Kota Surabaya (WFO)",
    //         duration: "3 bulan",
    //         type: "Mandiri",
    //         new: true,
    //         type: "Teknologi Informasi",
    //         link: "www.DBKLIK.com",
    //         employe: "10-30",
    //         logo: "https://placehold.co/50x50?text=Logo+2"
    //     },
    //     {
    //         id: 3,
    //         title: "Digital Marketing (Copy Writer)",
    //         company: "CV DB KLIK",
    //         location: "Kota Surabaya (WFO)",
    //         duration: "3 bulan",
    //         type: "Mandiri",
    //         new: true,
    //         type: "Edukasi",
    //         link: "www.DBKLIK.com",
    //         employe: "30-50",
    //         logo: "https://placehold.co/50x50?text=Logo+3"
    //     },
    //     {
    //         id: 4,
    //         title: "Cyber Security",
    //         company: "PT Menara Indonesia",
    //         location: "Kota Tangerang Selatan (HYBRID)",
    //         duration: "5 bulan",
    //         type: "Mandiri",
    //         new: true,
    //         type: "Teknologi Informasi",
    //         link: "www.MenaraIndonesia.com",
    //         employe: "30-60",
    //         logo: "https://placehold.co/50x50?text=Logo+4"
    //     },
    //     {
    //         id: 5,
    //         title: "Server Jaringan",
    //         company: "PT Menara Indonesia",
    //         location: "Kota Tangerang Selatan (HYBRID)",
    //         duration: "5 bulan",
    //         type: "Mandiri",
    //         new: true,
    //         type: "Teknologi Informasi",
    //         link: "www.MenaraIndonesia.com",
    //         employe: "50-60",
    //         logo: "https://placehold.co/50x50?text=Logo+5"
    //     },
    //     {
    //         id: 6,
    //         title: "Digital Marketing (Desain Grafis)",
    //         company: "CV DB KLIK",
    //         location: "Kota Surabaya (WFO)",
    //         duration: "3 bulan",
    //         type: "Mandiri",
    //         new: true,
    //         type: "Lainnya",
    //         link: "www.DBKLIK.com",
    //         employe: "30-50",
    //         logo: "https://placehold.co/50x50?text=Logo+6"
    //     },
    //     {
    //         id: 7,
    //         title: "Admin Trade Promo Intern",
    //         company: "PT Borden Eagle Indonesia",
    //         location: "Kota Tangerang Selatan (WFO)",
    //         duration: "6 bulan",
    //         type: "Mandiri",
    //         new: true,
    //         type: "Teknologi Informasi",
    //         link: "www.BordenEagleIndonesia.com",
    //         employe: "10-20",
    //         logo: "https://placehold.co/50x50?text=Logo+7"
    //     }
    // ];

    const [selectedJob, setSelectedJob] = useState(data_tempats[0]);

    return (
        <Layout>
            <div className="grip">
                <div className="col-12">
                    <div className="card">
                        <Toast ref={toast} />
                        <h5>Lowongan</h5>
                        <Button
                            label="Tambah Lowongan"
                            className="p-button-primary mr-2 mb-2"
                            icon="pi pi-plus"
                            severity="primary"
                            onClick={openNew} />
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
            <div className="flex justify-between">
                <JobItemContainer
                    data_tempats={data_tempats}
                    calculateMonthDifference={calculateMonthDifference}
                    setSelectedJob={setSelectedJob}
                    selectedJob={selectedJob}
                    detailsRef={detailsRef}
                    companyRef={companyRef}
                />
                <JobDetailsContainer
                    selectedJob={selectedJob}
                    calculateMonthDifference={calculateMonthDifference}
                    detailsRef={detailsRef}
                    companyRef={companyRef}
                    nextNumber={nextNumber}
                    data_usulan={data_usulan}
                    toast={toast}
                />
            </div>
        </Layout >
    );
};

const JobItemContainer = ({ data_tempats, calculateMonthDifference, setSelectedJob, selectedJob, detailsRef, companyRef }) => {
    const [jobItemHeight, setJobItemHeight] = useState('auto');

    useEffect(() => {
        const updateHeight = () => {
            const combinedHeight = (detailsRef.current?.clientHeight || 0) + (companyRef.current?.clientHeight || 0);
            setJobItemHeight(combinedHeight);
        };
        updateHeight();
        window.addEventListener('resize', updateHeight);
        return () => window.removeEventListener('resize', updateHeight);
    }, [detailsRef, companyRef]);

    console.log(data_tempats);

    return (
        <div className="col-12 xl:col-5">
            <Scrollbar style={{ height: jobItemHeight, width: 'auto' }}>
                <div className="card">
                    {data_tempats.map(data_tempat => (
                        <JobItem
                            key={data_tempat.id_role_tempat_pkl}
                            calculateMonthDifference={calculateMonthDifference}
                            data_tempat={data_tempat}
                            onSelect={setSelectedJob}
                            isSelected={data_tempat.id_role_tempat_pkl === selectedJob.id_role_tempat_pkl}
                        />
                    ))}
                </div>
            </Scrollbar>
        </div>
    );
};

const JobDetailsContainer = ({ selectedJob, calculateMonthDifference, detailsRef, companyRef, nextNumber, data_usulan, toast }) => (
    <div className="col-12 xl:col-7">
        <div className="grid gap-2">
            <div className="col-12" ref={detailsRef}>
                <div className="card">
                    <JobDetails job={selectedJob} calculateMonthDifference={calculateMonthDifference} nextNumber={nextNumber} data_usulan={data_usulan} toast={toast}/>
                </div>
            </div>
            <div className="col-12" ref={companyRef}>
                <div className="card">
                    <CompanyDetail job={selectedJob} />
                </div>
            </div>
        </div>
    </div>
);

export default tempatpkl;
