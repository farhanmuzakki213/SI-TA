import React from 'react';
import { Dialog } from 'primereact/dialog';
import FileUploadC from '@/Components/FileUploadC';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';

const semproForm = ({
    semproDialog,
    sempro,
    submitted,
    semproDialogFooter,
    hideDialog,
    setsempro,
}) => {
    const onInputChange = (e, field) => {
        const value = e.target ? e.target.value : e.value;
        setsempro((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };

    const onFileSelect = (files) => {
        setsempro((prevState) => ({
            ...prevState,
            file_sempro: files,
        }));
    };

    return (
        <Dialog
            visible={semproDialog}
            style={{ width: "450px" }}
            header="Sempro PKL Details"
            modal
            className="p-fluid"
            footer={semproDialogFooter}
            onHide={hideDialog}
        >
            {/* Judul */}
            <div className="field">
                <label htmlFor="judul_sempro">Judul</label>
                <InputText
                    id="judul_sempro"
                    value={sempro.judul_sempro || ''}
                    onChange={(e) => onInputChange(e, "judul_sempro")}
                    required
                    autoFocus
                    className={classNames({
                        "p-invalid": submitted && !sempro.judul_sempro,
                    })}
                />
                {submitted && !sempro.judul_sempro && (
                    <small className="p-invalid">Judul is required.</small>
                )}
            </div>

            {/* Upload Dokumen */}
            <div className="field">
                <label htmlFor="file_sempro">Dokumen Sempro</label>
                <FileUploadC
                    multiple={false}
                    name="file_sempro"
                    onFileSelect={onFileSelect}
                />
                {submitted && !sempro?.file_sempro && (
                    <small className="p-invalid">Dokumen Sempro is required.</small>
                )}
            </div>
        </Dialog>
    );
};

export default semproForm;
