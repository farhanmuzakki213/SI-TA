import React from 'react';
import { Card } from 'primereact/card';
import { Avatar } from 'primereact/avatar';
import { Tag } from 'primereact/tag';

const JobItem = ({ data_tempat, onSelect, isSelected, calculateMonthDifference }) => {

    const address = data_tempat.r_tempat_pkls.alamat_tempat_pkl;
    const kota = address.substring(address.lastIndexOf(',') + 1).trim();
    // console.log(data_tempat);
    return (
        <Card
            className={`p-1 mb-3 hover:bg-gray-100 cursor-pointer relative ${isSelected ? 'bg-blue-200' : ''}`}
            onClick={() => onSelect(data_tempat)}
        >
            <div className="flex items-start">
                <Avatar image={data_tempat.r_tempat_pkls.logo_tempat_pkl} className="flex align-items-center justify-content-center mr-4" size="xlarge" />
                <div className="flex-1">
                    <div className="font-bold text-sm mb-1">{data_tempat.nama_role}</div>
                    <div className="text-gray-600 text-sm">{data_tempat.r_tempat_pkls.kode_tempat_pkl}</div>
                    <div className="text-gray-600 text-sm">{kota}</div>
                    <div className="text-gray-600 text-sm"> {calculateMonthDifference(data_tempat.tgl_awal_pkl, data_tempat.tgl_akhir_pkl)} Bulan - {data_tempat.r_tempat_pkls.tipe_tempat_pkl}</div>
                </div>
            </div>
            {data_tempat.new && <Tag severity="primary" value="Baru" className="absolute top-0 right-0 mt-1 mr-1" />}
        </Card>
    );
};

export default JobItem;
