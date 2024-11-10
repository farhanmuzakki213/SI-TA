import React, { useState } from "react";
import Layout from "@/Layouts/layout/layout.jsx";
import JobItem from "./component/jobItem";
import JobDetails from "./component/jobdetail";
import CompanyDetail from "./component/companydetail";
import { Button } from "primereact/button";

const Lowongan = () => {
    const jobs = [
        {
            id: 1,
            title: "Quality Control & Gemstone Production",
            company: "PT Sehat Jaya Selalu",
            location: "Kota Surakarta (WFO)",
            duration: "6 bulan",
            type: "Mandiri",
            new: true,
            type: "Teknologi Informasi",
            link: "www.SehatJayaSelalu.com",
            employe: "10-20",
            logo: "https://placehold.co/50x50?text=Logo+1"
        },
        {
            id: 2,
            title: "Curriculum Development Internship",
            company: "CV DB KLIK",
            location: "Kota Surabaya (WFO)",
            duration: "3 bulan",
            type: "Mandiri",
            new: true,
            type: "Teknologi Informasi",
            link: "www.DBKLIK.com",
            employe: "10-30",
            logo: "https://placehold.co/50x50?text=Logo+2"
        },
        {
            id: 3,
            title: "Digital Marketing (Copy Writer)",
            company: "CV DB KLIK",
            location: "Kota Surabaya (WFO)",
            duration: "3 bulan",
            type: "Mandiri",
            new: true,
            type: "Edukasi",
            link: "www.DBKLIK.com",
            employe: "30-50",
            logo: "https://placehold.co/50x50?text=Logo+3"
        },
        {
            id: 4,
            title: "Cyber Security",
            company: "PT Menara Indonesia",
            location: "Kota Tangerang Selatan (HYBRID)",
            duration: "5 bulan",
            type: "Mandiri",
            new: true,
            type: "Teknologi Informasi",
            link: "www.MenaraIndonesia.com",
            employe: "30-60",
            logo: "https://placehold.co/50x50?text=Logo+4"
        },
        {
            id: 5,
            title: "Server Jaringan",
            company: "PT Menara Indonesia",
            location: "Kota Tangerang Selatan (HYBRID)",
            duration: "5 bulan",
            type: "Mandiri",
            new: true,
            type: "Teknologi Informasi",
            link: "www.MenaraIndonesia.com",
            employe: "50-60",
            logo: "https://placehold.co/50x50?text=Logo+5"
        },
        {
            id: 6,
            title: "Digital Marketing (Desain Grafis)",
            company: "CV DB KLIK",
            location: "Kota Surabaya (WFO)",
            duration: "3 bulan",
            type: "Mandiri",
            new: true,
            type: "Lainnya",
            link: "www.DBKLIK.com",
            employe: "30-50",
            logo: "https://placehold.co/50x50?text=Logo+6"
        },
        {
            id: 7,
            title: "Admin Trade Promo Intern",
            company: "PT Borden Eagle Indonesia",
            location: "Kota Tangerang Selatan (WFO)",
            duration: "6 bulan",
            type: "Mandiri",
            new: true,
            type: "Teknologi Informasi",
            link: "www.BordenEagleIndonesia.com",
            employe: "10-20",
            logo: "https://placehold.co/50x50?text=Logo+7"
        }
    ];

    const [selectedJob, setSelectedJob] = useState(jobs[0]);

    return (
        <Layout>
            <div className="grip">
                <div className="col-10">
                    <div className="card">
                        <h5>Lowongan</h5>
                        <Button label="Tambah Lowongan" className="p-button-success mr-2 mb-2" />
                    </div>
                </div>
            </div>
            <div className="flex justify-between">
                <div class="col-12 xl:col-4">
                    <div className="card">
                        {jobs.map(job => (
                            <JobItem key={job.id} job={job} onSelect={setSelectedJob} isSelected={job.id === selectedJob.id}/>
                        ))}
                    </div>
                </div>
                <div class="col-12 xl:col-6">
                    <div className="grid gap-2">
                        <div className="col-12">
                            <div className="card">
                                <JobDetails job={selectedJob} />
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="card">
                                <CompanyDetail job={selectedJob} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </Layout >
    );
};

export default Lowongan;
