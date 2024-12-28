import React, { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import FileUploadC from '@/Components/FileUploadC';
import { RadioButton } from 'primereact/radiobutton';
import TextAreaEditor from '@/Components/TextAreaEditor';
import { Tooltip } from 'primereact/tooltip';

const bimbinganForm = ({
    bimbinganDialog,
    bimbingan,
    submitted,
    bimbinganDialogFooter,
    hideDialog,
    setbimbingan,
}) => {
    const [editorValue, setEditorValue] = useState("");

    useEffect(() => {
        setEditorValue(bimbingan.komentar ? bimbingan.komentar : "");
    }, [bimbingan]);

    const handleEditorChange = (content) => {
        setEditorValue(content);
        setbimbingan((prev) => ({
            ...prev,
            komentar: content,
        }));
    };

    const onFileSelect = (files) => {
        setbimbingan((prevState) => ({
            ...prevState,
            file_bimbingan: files,
        }));
    };

    const onStatusChange = (e) => {
        let _bimbingan = { ...bimbingan };
        _bimbingan["status_bimbingan_sempro"] = e.value;

        setbimbingan(_bimbingan);
    };
    // console.log(bimbingan);
    return (
        <Dialog
            visible={bimbinganDialog}
            style={{ width: "600px" }}
            header="Bimbingan TA Details"
            modal
            className="p-fluid"
            footer={bimbinganDialogFooter}
            onHide={hideDialog}
        >
            {/* Input Komentar */}
            <div className="field">
                <label htmlFor="komentar">Komentar</label>
                <TextAreaEditor
                    value={editorValue}
                    onChange={handleEditorChange}
                />
                {submitted && !editorValue && (
                    <small className="p-invalid">Komentar wajib diisi.</small>
                )}
            </div>

            {/* Upload File */}
            <div className="field">
                <Tooltip target=".custom-target-icon" />
                <label htmlFor="file_bimbingan">File Bimbingan
                    <i className="custom-target-icon pi pi-info-circle tw-ml-1"
                        data-pr-tooltip="Optional Jika Revisi Menggunakan File"
                        data-pr-position="right"
                        data-pr-at="right+5 top"
                        data-pr-my="left center-2"
                        style={{ fontSize: '1rem' }}></i>
                </label>
                <FileUploadC
                    multiple={false}
                    name="file_bimbingan"
                    onFileSelect={onFileSelect}
                />
                {submitted && !bimbingan?.file_bimbingan && (
                    <small className="p-invalid">File Bimbingan is required.</small>
                )}
            </div>

            {/* Status Bimbingan */}
            <div className="field">
                <label className="mb-3">Status</label>
                <div className="formgrid grid">
                    <div className="field-radiobutton col-6">
                        <RadioButton
                            inputId="status2"
                            name="status"
                            value="2"
                            onChange={onStatusChange}
                            checked={bimbingan.status_bimbingan_sempro === "2"}
                        />
                        <label htmlFor="status2">Diterima</label>
                    </div>
                    <div className="field-radiobutton col-6">
                        <RadioButton
                            inputId="status3"
                            name="status"
                            value="3"
                            onChange={onStatusChange}
                            checked={bimbingan.status_bimbingan_sempro === "3"}
                        />
                        <label htmlFor="status3">Butuh Revisi</label>
                    </div>
                </div>
            </div>

        </Dialog>
    );
};

export default bimbinganForm;
