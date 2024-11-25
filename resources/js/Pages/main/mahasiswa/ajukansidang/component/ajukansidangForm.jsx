import React from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import FileUploadC from '@/Components/FileUploadC';

const AjukansidangForm = ({
    ajukansidangDialog,
    ajukansidang,
    submitted,
    ajukansidangDialogFooter,
    hideDialog,
    setajukansidang,
}) => {
    const onInputChange = (e, field) => {
        const value = e.target ? e.target.value : e.value;
        setajukansidang((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };

    const onFileSelect = (files) => {
        setajukansidang((prevState) => ({
            ...prevState,
            dokumen_pendukung: files,
        }));
    };

    return (
        <Dialog
            visible={ajukansidangDialog}
            style={{ width: "450px" }}
            header="Laporan PKL Details"
            modal
            className="p-fluid"
            footer={ajukansidangDialogFooter}
            onHide={hideDialog}
        >
            {/* Judul */}
            <div className="field">
                <label htmlFor="judul">Judul</label>
                <InputText
                    id="judul"
                    value={ajukansidang.judul || ''}
                    onChange={(e) => onInputChange(e, "judul")}
                    required
                    autoFocus
                    className={classNames({
                        "p-invalid": submitted && !ajukansidang.judul,
                    })}
                />
                {submitted && !ajukansidang.judul && (
                    <small className="p-invalid">Judul is required.</small>
                )}
            </div>

            {/* Nama Pembimbing PKL */}
            <div className="field">
                <label htmlFor="pembimbing_pkl">Nama Pembimbing PKL</label>
                <InputText
                    id="pembimbing_pkl"
                    value={ajukansidang.pembimbing_pkl || ''}
                    onChange={(e) => onInputChange(e, "pembimbing_pkl")}
                    required
                    autoFocus
                    className={classNames({
                        "p-invalid": submitted && !ajukansidang.pembimbing_pkl,
                    })}
                />
                {submitted && !ajukansidang.pembimbing_pkl && (
                    <small className="p-invalid">Nama Pembimbing PKL is required.</small>
                )}
            </div>

            {/* Upload Dokumen PKL dan Nilai*/}
            <div className="field">
                <label htmlFor="dokumen_pendukung">Dokumen PKL & Nilai</label>
                <FileUploadC
                    multiple={true}
                    name="dokumen_pendukung"
                    onFileSelect={onFileSelect}
                />
                {submitted && !ajukansidang?.dokumen_pendukung && (
                    <small className="p-invalid">Dokumen PKL & Nilai is required.</small>
                )}
            </div>
        </Dialog>
    );
};

export default AjukansidangForm;
