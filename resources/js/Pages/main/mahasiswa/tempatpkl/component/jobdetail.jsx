import { useState } from "react";
import { Button } from 'primereact/button';
import { Avatar } from "primereact/avatar";

const JobDetails = ({ job }) => {
    const [isJobSaved, setIsJobSaved] = useState(false);

    const handleSaveJob = () => {
        setIsJobSaved(!isJobSaved);
    };

    return (
        <>
            <div className="flex items-center mb-4">
                <Avatar image={job.logo} className="flex align-items-center justify-content-center mr-4" size="xlarge" />
                <div>
                    <div className="font-bold text-lg">{job.title}</div>
                    <div className="text-gray-600">{job.company}</div>
                    <div className="text-gray-600">{job.location}</div>
                </div>
            </div>
            <div className="flex flex-wrap mb-4">
                <Button label="Ajukan" className="p-button-primary mr-2 mb-2" />
            </div>
            <div className="mb-4">
                <div className="font-bold mb-2">Tentang Posisi</div>
                <div className="flex items-center text-gray-600 mb-2">
                    <i className="far fa-clock mr-2"></i>
                    <span>{job.duration} (01 Nov 2024 - 01 Mei 2025)</span>
                </div>
            </div>
            <div className="mb-4">
                <div className="font-bold mb-2">Rincian Kegiatan</div>
                <div className="mb-2">
                    <div className="font-bold">{job.title}</div>
                    <div className="text-gray-600">Qc & memproduksi perhiasan</div>
                </div>
                <div className="mb-2">
                    <div className="font-bold">Kompetensi yang akan dikembangkan</div>
                    <ul className="list-disc list-inside text-gray-600">
                        <li>Administrasi</li>
                        <li>Komunikasi</li>
                        <li>Operasional</li>
                        <li>Kreatif</li>
                    </ul>
                </div>
                <div className="mb-2">
                    <div className="font-bold">Kriteria Akademik</div>
                    <ul className="list-decimal list-inside text-gray-600">
                        <li>Mahasiswa perguruan tinggi aktif</li>
                        <li>Terbuka untuk semua program studi</li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default JobDetails;
