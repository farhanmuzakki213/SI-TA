import React, { useRef } from 'react';
import { FileUpload } from 'primereact/fileupload';

const CSVImportComponent = ({ onImport, toast, headers = [], delimiter = ',', maxFileSize = 1000000 }) => {
    const fileUploadRef = useRef(null);

    const handleFileUpload = (event) => {
        const file = event.files[0];
        if (!file) {
            toast.current?.show({
                severity: "warn",
                summary: "Warning",
                detail: "No file selected for import.",
                life: 3000,
            });
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const csv = e.target.result;
            const rows = csv.split('\n').slice(1); // Remove the header row
            const data = rows.map(row => {
                const values = row.split(delimiter);
                const record = {};
                headers.forEach((header, index) => {
                    record[header] = values[index];
                });
                return record;
            });
            onImport(data); // Callback to send imported data
            toast.current?.show({
                severity: "success",
                summary: "Import Successful",
                detail: `${data.length} records imported.`,
                life: 3000,
            });
            fileUploadRef.current.clear(); // Clear file input after import
        };
        reader.onerror = () => {
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: "Failed to read file.",
                life: 3000,
            });
        };
        reader.readAsText(file); // Read the file content as text
    };

    return (
        <FileUpload
            ref={fileUploadRef}
            mode="basic"
            accept=".csv"
            maxFileSize={maxFileSize}
            label="Import"
            chooseLabel="Import CSV"
            customUpload={true}
            uploadHandler={handleFileUpload}
            className="mr-2 inline-block"
        />
    );
};

export default CSVImportComponent;
