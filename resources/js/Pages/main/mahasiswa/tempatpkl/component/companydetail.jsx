import { Avatar } from "primereact/avatar";
import { useState } from "react";

const CompanyDetail = ({ job }) => {
    const [isJobSaved, setIsJobSaved] = useState(false);

    const handleSaveJob = () => {
        setIsJobSaved(!isJobSaved);
    };

    return (
        <div className="flex justify-center items-center">
            <div className="p-6 rounded-lg">
                <h1 className="text-xl font-bold mb-4">Tentang Perusahaan</h1>
                <div className="flex items-center mb-4">
                    <Avatar image={job.r_tempat_pkls.logo_tempat_pkl} className="mr-3" size="xlarge" />
                    <div>
                        <p className="text-lg font-semibold">{job.title}</p>
                        <p className="text-gray-600">{job.company}</p>
                    </div>
                </div>

                <div className="grid gap-4 grid-cols-2 mb-4 max-w-6xl mx-auto">
                    <div className="flex items-center w-full">
                        <i className="pi pi-briefcase mr-2"></i>
                        <span>{job.r_tempat_pkls.tipe_tempat_pkl}</span>
                    </div>
                </div>

                <div className="grid gap-3 grid-cols-2 mb-4 max-w-6xl mx-auto">
                    <div className="flex items-center w-full">
                        <i className="pi pi-map-marker mr-2"></i>
                        <span>{job.r_tempat_pkls.alamat_tempat_pkl}</span>
                    </div>
                    <div className="flex items-center w-full">
                        <i className="pi pi-globe mr-2"></i>
                        <a href="http://www.elinorjewelry.id" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                            {job.r_tempat_pkls.detail_info_tempat_pkl}
                        </a>
                    </div>
                </div>


            </div>
        </div>

    );
};

export default CompanyDetail;

