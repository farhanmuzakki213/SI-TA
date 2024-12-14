import React from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import FileUploadC from '@/Components/FileUploadC';
import { InputNumber } from 'primereact/inputnumber';

const AjukansidangForm = ({
    ajukansidangDialog,
    ajukansidang,
    submitted,
    ajukansidangDialogFooter,
    hideDialog,
    setajukansidang,
}) => {
    console.log(ajukansidang);
    const onInputChange = (e, field) => {
        const value = e.target ? e.target.value : e.value;
        setajukansidang((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };

    const onFileSelect1 = (files) => {
        setajukansidang((prevState) => ({
            ...prevState,
            file_nilai: files,
        }));
    };

    const onFileSelect2 = (files) => {
        setajukansidang((prevState) => ({
            ...prevState,
            file_laporan: files,
        }));
    };

    const setValue = (e, field) => {
        const value = e.value;
        setajukansidang((prevState) => ({
            ...prevState,
            [field]: value,
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
                <label htmlFor="judul">Judul Laporan *</label>
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
                <label htmlFor="pkl_pembimbing">Nama Pembimbing Industri *</label>
                <InputText
                    id="pkl_pembimbing"
                    value={ajukansidang.pkl_pembimbing || ''}
                    onChange={(e) => onInputChange(e, "pkl_pembimbing")}
                    required
                    autoFocus
                    className={classNames({
                        "p-invalid": submitted && !ajukansidang.pkl_pembimbing,
                    })}
                />
                {submitted && !ajukansidang.pkl_pembimbing && (
                    <small className="p-invalid">Nama Pembimbing PKL is required.</small>
                )}
            </div>

            {/* Nilai Industri */}
            <div className="field">
                <label htmlFor="nilai_industri">Nilai Industri *</label>
                <InputNumber
                    inputId="nilai_industri"
                    value={ajukansidang.nilai_industri || ''}
                    onValueChange={(e) => setValue(e, "nilai_industri")}
                    required
                    mode="decimal"
                    showButtons
                    min={0}
                    max={100}
                    minFractionDigits={2}
                    className={classNames({
                        "p-invalid": submitted && !ajukansidang.nilai_industri,
                    })}
                />
                {submitted && !ajukansidang.nilai_industri && (
                    <small className="p-invalid">Nilai Industri is required.</small>
                )}
            </div>

            {/* Upload Dokumen Nilai*/}
            <div className="field">
                <label htmlFor="file_nilai">File Nilai Industri *</label>
                <FileUploadC
                    multiple={false}
                    name="file_nilai"
                    onFileSelect={onFileSelect1}
                />
                {submitted && !ajukansidang?.file_nilai && (
                    <small className="p-invalid">File Nilai is required.</small>
                )}
            </div>

            {/* Upload Dokumen Laporan*/}
            <div className="field">
                <label htmlFor="file_laporan">File Laporan Akhir *</label>
                <FileUploadC
                    multiple={false}
                    name="file_laporan"
                    onFileSelect={onFileSelect2}
                />
                {submitted && !ajukansidang?.file_laporan && (
                    <small className="p-invalid">File Laporan is required.</small>
                )}
            </div>
        </Dialog>
    );
};

export default AjukansidangForm;
