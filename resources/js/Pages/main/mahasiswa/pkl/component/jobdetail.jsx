import { useState } from "react";
import { Button } from 'primereact/button';
import { Avatar } from "primereact/avatar";
import { router } from "@inertiajs/react";

const JobDetails = ({ job, calculateMonthDifference, nextNumber, data_usulan, toast }) => {
    const [isJobSaved, setIsJobSaved] = useState(false);

    const handleSaveJob = () => {
        setIsJobSaved(!isJobSaved);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }).format(date);
    };

    const handleAjukan = async () => {
        await router.post('/tempatpkl/storeAjuan', {
            job_id: job.id_role_tempat_pkl,
            id_usulan: nextNumber
        });
    };
    const handleAjukanCancel = async (id_usulan, id_role_tempat_pkl) => {
        // console.log(id_usulan, id_role_tempat_pkl);
        try {
            await router.delete(route('tempatpkl.destroy'), {
                preserveState: true,
                data: {
                    id_usulan,
                    id_role_tempat_pkl,
                },
            });
        } catch (error) {
            console.error("Error deleting Usulan Tempat PKL:", error);
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: "Failed to delete Usulan Tempat PKL.",
                life: 3000,
            });
        }
    };

    const address = job.r_tempat_pkls.alamat_tempat_pkl;
    const kota = address.substring(address.lastIndexOf(',') + 1).trim();

    // console.log(data_usulan);
    // console.log(job);
    const renderButton = () => {
        const usulan = data_usulan.find(usulan => usulan.role_tempat_pkl_id === job.id_role_tempat_pkl);
        // console.log(usulan);
        if (!usulan) {
            return <Button label="Ajukan" className="p-button-primary mr-2 mb-2" onClick={handleAjukan} />;
        }

        switch (usulan.status_usulan) {
            case "1":
                return <Button
                    label="Cancel"
                    className="p-button-danger mr-2 mb-2"
                    onClick={() => handleAjukanCancel(usulan.id_usulan, usulan.role_tempat_pkl_id)} />;
            case "0":
                return <Button label="Ditolak" className="p-button-danger mr-2 mb-2" disabled />;
            case "3":
                return <Button label="Pengajuan Diterima" className="p-button-success mr-2 mb-2" disabled />;
            default:
                return null;
        }
    };

    return (
        <>
            <div className="flex items-center mb-4">
                <Avatar image={job.r_tempat_pkls.logo_tempat_pkl} className="flex align-items-center justify-content-center mr-4" size="xlarge" />
                <div>
                    <h1 className="font-bold text-lg">{job.nama_role}</h1>
                    <div className="text-gray-600">{job.r_tempat_pkls.nama_tempat_pkl}</div>
                    <div className="text-gray-600">{kota}</div>
                </div>
            </div>
            <div className="flex flex-wrap mb-4">
                {renderButton()}
            </div>
            <div className="mb-4">
                <div className="font-bold mb-2">Tentang Posisi</div>
                <div className="flex items-center text-gray-600 mb-2">
                    <i className="far fa-clock mr-2"></i>
                    <span>{calculateMonthDifference(job.tgl_awal_pkl, job.tgl_akhir_pkl)} Bulan ({formatDate(job.tgl_awal_pkl)} - {formatDate(job.tgl_akhir_pkl)})</span>
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
