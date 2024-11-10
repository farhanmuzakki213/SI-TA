import React from 'react';
import { Card } from 'primereact/card';
import { Avatar } from 'primereact/avatar';
import { Tag } from 'primereact/tag';

const JobItem = ({ job, onSelect, isSelected }) => {
    return (
        <Card
            className={`p-1 mb-3 hover:bg-gray-100 cursor-pointer relative ${isSelected ? 'bg-blue-200' : ''}`}
            onClick={() => onSelect(job)}
        >
            <div className="flex items-start">
                <Avatar image={job.logo} className="flex align-items-center justify-content-center mr-4" size="xlarge" />
                <div className="flex-1">
                    <div className="font-bold text-sm mb-1">{job.title}</div>
                    <div className="text-gray-600 text-sm">{job.company}</div>
                    <div className="text-gray-600 text-sm">{job.location}</div>
                    <div className="text-gray-600 text-sm">{job.duration} - {job.type}</div>
                </div>
            </div>
            {job.new && <Tag severity="success" value="Baru" className="absolute top-0 right-0 mt-4 mr-4" />}
        </Card>
    );
};

export default JobItem;
