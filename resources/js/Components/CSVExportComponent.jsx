import React from 'react';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

const CSVExportComponent = ({ data, toast, fileName = 'export.csv', columns }) => {
    const exportCSV = () => {
        if (!data || data.length === 0) {
            toast.current.show({
                severity: "warn",
                summary: "Warning",
                detail: "No data available for export.",
                life: 3000,
            });
            return;
        }

        // Prepare the data for CSV export
        const csvData = data.map(item => {
            const row = {};
            columns.forEach(col => {
                row[col.header] = typeof col.field === 'function' ? col.field(item) : getFieldValue(item, col.field);
            });
            return row;
        });

        // Create CSV content
        const csvHeaders = columns.map(col => col.header).join(","); // Get the headers from columns
        const csvRows = csvData.map(row => Object.values(row).join(",")); // Convert each row to a comma-separated string
        const csvString = [csvHeaders, ...csvRows].join("\n"); // Combine headers and rows

        // Create a blob and link to download the file
        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", fileName); // Use the fileName prop for the download file name
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    function getFieldValue(obj, field) {
        return field.split('.').reduce((o, i) => o ? o[i] : null, obj);
    }

    return (
        <Button
            label="Export CSV"
            icon="pi pi-upload"
            severity="help"
            onClick={exportCSV}
        />
    );
};

export default CSVExportComponent;
