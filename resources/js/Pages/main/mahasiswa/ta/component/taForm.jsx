import React from 'react';
import { Dialog } from 'primereact/dialog';
import FileUploadC from '@/Components/FileUploadC';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';

const taForm = ({
    taDialog,
    ta,
    submitted,
    taDialogFooter,
    hideDialog,
    setta,
}) => {
    const onInputChange = (e, field) => {
        const value = e.target ? e.target.value : e.value;
        setta((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };

    const onFileSelect = (files) => {
        setta((prevState) => ({
            ...prevState,
            file_ta: files,
        }));
    };
    // console.log(ta);
    return (
        <Dialog
            visible={taDialog}
            style={{ width: "450px" }}
            header="Ta PKL Details"
            modal
            className="p-fluid"
            footer={taDialogFooter}
            onHide={hideDialog}
        >
            {/* Judul */}
            <div className="field">
                <label htmlFor="judul_ta">Judul</label>
                <InputText
                    id="judul_ta"
                    value={ta.judul_ta || ''}
                    onChange={(e) => onInputChange(e, "judul_ta")}
                    required
                    autoFocus
                    className={classNames({
                        "p-invalid": submitted && !ta.judul_ta,
                    })}
                />
                {submitted && !ta.judul_ta && (
                    <small className="p-invalid">Judul is required.</small>
                )}
            </div>

            {/* Upload Dokumen */}
            {ta.id_ta_mhs && ta.status_judul_ta === '3' && (
                <div className="field">
                    <label htmlFor="file_ta">Dokumen Ta</label>
                    <FileUploadC
                        multiple={false}
                        name="file_ta"
                        onFileSelect={onFileSelect}
                    />
                    {submitted && !ta?.file_ta && (
                        <small className="p-invalid">Dokumen Ta is required.</small>
                    )}
                </div>
            )}

        </Dialog>
    );
};

export default taForm;
