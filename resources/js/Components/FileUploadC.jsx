import React, { useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import { Button } from 'primereact/button';

const FileUploadC = ({ multiple = false, name = 'file', onFileSelect }) => {
    const toast = useRef(null);
    const [totalSize, setTotalSize] = useState(0);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const fileUploadRef = useRef(null);

    const onTemplateSelect = (e) => {
        let _totalSize = totalSize;
        let files = Array.from(e.files);

        files.forEach((file) => {
            _totalSize += file.size || 0;
        });

        setTotalSize(_totalSize);

        if (multiple) {
            setSelectedFiles((prev) => [...prev, ...files]);
            if (onFileSelect) onFileSelect([...selectedFiles, ...files]); // Kirim semua file yang dipilih
        } else {
            const file = files[0];
            setSelectedFiles([file]);
            if (onFileSelect) onFileSelect(file); // Kirim hanya satu file
        }
    };

    const onTemplateRemove = (file, callback) => {
        setTotalSize(totalSize - file.size);
        setSelectedFiles((prev) => prev.filter((f) => f !== file));
        if (onFileSelect) {
            const updatedFiles = selectedFiles.filter((f) => f !== file);
            onFileSelect(multiple ? updatedFiles : null);
        }
        callback();
    };

    const onTemplateClear = () => {
        setTotalSize(0);
        setSelectedFiles([]);
        if (onFileSelect) onFileSelect(multiple ? [] : null);
    };

    const headerTemplate = (options) => {
        const { className, chooseButton, cancelButton } = options;
        const value = totalSize / 100000; // Representasi progress bar
        const formattedValue = fileUploadRef?.current?.formatSize(totalSize) || '0 B';

        return (
            <div className={className} style={{ display: 'flex', alignItems: 'center' }}>
                {chooseButton}
                {cancelButton}
                <div className="ml-auto flex align-items-center gap-3">
                    <span>{formattedValue} / 10 MB</span>
                    <ProgressBar value={value} showValue={false} style={{ width: '10rem', height: '12px' }} />
                </div>
            </div>
        );
    };

    const itemTemplate = (file, props) => (
        <div className="flex align-items-center flex-wrap">
            <div className="flex align-items-center" style={{ width: '40%' }}>
                <i className="pi pi-file" style={{ fontSize: '1.5rem', marginRight: '1rem' }}></i>
                <span className="flex flex-column text-left">
                    {file.name}
                    <small>{new Date().toLocaleDateString()}</small>
                </span>
            </div>
            <Button
                type="button"
                icon="pi pi-times"
                className="p-button-rounded p-button-danger ml-auto"
                style={{ width: '2rem', height: '2rem' }}
                onClick={() => onTemplateRemove(file, props.onRemove)}
            />
        </div>
    );

    const emptyTemplate = () => (
        <div className="flex align-items-center flex-column">
            <i className="pi pi-upload" style={{ fontSize: '5em', marginBottom: '1rem' }}></i>
            <span style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }}>Drag and Drop File Here</span>
        </div>
    );

    return (
        <div>
            <Toast ref={toast} />
            <FileUpload
                ref={fileUploadRef}
                name={name}
                multiple={multiple}
                maxFileSize={10000000}
                onSelect={onTemplateSelect}
                onClear={onTemplateClear}
                headerTemplate={headerTemplate}
                itemTemplate={itemTemplate}
                emptyTemplate={emptyTemplate}
                chooseOptions={{
                    icon: 'pi pi-fw pi-images',
                    iconOnly: true,
                    className: 'p-button-rounded p-button-outlined',
                    style: { fontSize: '1.5rem', width: '2.5rem', height: '2.5rem' }
                }}
                cancelOptions={{
                    icon: 'pi pi-fw pi-times',
                    iconOnly: true,
                    className: 'p-button-rounded p-button-danger',
                    style: { fontSize: '1.5rem', width: '2.5rem', height: '2.5rem' }
                }}
            />
        </div>
    );
};

export default FileUploadC;
