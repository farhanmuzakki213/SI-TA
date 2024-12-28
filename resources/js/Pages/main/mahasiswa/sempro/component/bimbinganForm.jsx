import React, { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import FileUploadC from '@/Components/FileUploadC';
import { RadioButton } from 'primereact/radiobutton';
import TextAreaEditor from '@/Components/TextAreaEditor';

const bimbinganForm = ({
    bimbinganDialog,
    bimbingan,
    submitted,
    bimbinganDialogFooter,
    hideDialog,
    setbimbingan,
    data_mhs_sempro,
}) => {
    const [editorValue, setEditorValue] = useState("");

    useEffect(() => {
        setEditorValue(bimbingan.pembahasan ? bimbingan.pembahasan : "");
    }, [bimbingan]);

    const handleEditorChange = (content) => {
        setEditorValue(content);
        setbimbingan((prev) => ({
            ...prev,
            pembahasan: content,
        }));
    };

    const onFileSelect = (files) => {
        setbimbingan((prevState) => ({
            ...prevState,
            file_bimbingan: files,
        }));
    };

    const onSebagaiChange = (e, dosenId) => {
        let _bimbingan = { ...bimbingan };
        _bimbingan["sebagai"] = e.value;
        _bimbingan["dosen_id"] = dosenId;

        setbimbingan(_bimbingan);
    };
    // console.log(data_mhs_sempro);
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
            {/* Input Pembahasan */}
            <div className="field">
                <label htmlFor="pembahasan">Pembahasan</label>
                <TextAreaEditor
                    value={editorValue}
                    onChange={handleEditorChange}
                />
                {submitted && !editorValue && (
                    <small className="p-invalid">Pembahasan wajib diisi.</small>
                )}
            </div>

            {/* Upload File */}
            <div className="field">
                <label htmlFor="file_bimbingan">File Bimbingan</label>
                <FileUploadC
                    multiple={false}
                    name="file_bimbingan"
                    onFileSelect={onFileSelect}
                />
                {submitted && !bimbingan?.file_bimbingan && (
                    <small className="p-invalid">File Bimbingan is required.</small>
                )}
            </div>

            {/* Dosen Pembimbing */}
            <div className="field">
                <label className="mb-3">Dosen Pembimbing</label>
                <div className="formgrid grid">
                    <div className="field-radiobutton col-6">
                        <RadioButton
                            inputId="sebagai1"
                            name="sebagai"
                            value="pembimbing_1"
                            onChange={(e) => onSebagaiChange(e, data_mhs_sempro.pembimbing_1_id)}
                            checked={bimbingan.sebagai === "pembimbing_1"}
                        />
                        <label htmlFor="sebagai1">{data_mhs_sempro.nama_pembimbing_1}</label>
                    </div>
                    <div className="field-radiobutton col-6">
                        <RadioButton
                            inputId="sebagai2"
                            name="sebagai"
                            value="pembimbing_2"
                            onChange={(e) => onSebagaiChange(e, data_mhs_sempro.pembimbing_2_id)}
                            checked={bimbingan.sebagai === "pembimbing_2"}
                        />
                        <label htmlFor="sebagai2">{data_mhs_sempro.nama_pembimbing_2}</label>
                    </div>
                </div>
            </div>

        </Dialog>
    );
};

export default bimbinganForm;
