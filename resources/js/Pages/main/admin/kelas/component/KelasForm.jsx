import React from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Dropdown } from 'primereact/dropdown';

const KelasForm = ({
    kelasDialog,
    kelas,
    submitted,
    kelasDialogFooter,
    hideDialog,
    setkelas,
    prodiOptions,
    smt_thnakdOptions,
}) => {

    const onInputChange = (e, field) => {
        const value = e.target ? e.target.value : e.value;
        setkelas((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };

    return (
        <Dialog
            visible={kelasDialog}
            style={{ width: "450px" }}
            header="kelas Details"
            modal
            className="p-fluid"
            footer={kelasDialogFooter}
            onHide={hideDialog}
        >
            {/* Nama Kelas */}
            <div className="field">
                <label htmlFor="nama_kelas">Nama Kelas</label>
                <InputText
                    id="nama_kelas"
                    value={kelas.nama_kelas || ''}
                    onChange={(e) => onInputChange(e, "nama_kelas")}
                    required
                    autoFocus
                    className={classNames({
                        "p-invalid": submitted && !kelas.nama_kelas,
                    })}
                />
                {submitted && !kelas.nama_kelas && (
                    <small className="p-invalid">Nama Kelas is required.</small>
                )}
            </div>

            {/* Kode Kelas */}
            <div className="field">
                <label htmlFor="kode_kelas">Kode Kelas</label>
                <InputText
                    id="kode_kelas"
                    value={kelas.kode_kelas || ''}
                    onChange={(e) => onInputChange(e, "kode_kelas")}
                    required
                    autoFocus
                    className={classNames({
                        "p-invalid": submitted && !kelas.nama_kelas,
                    })}
                />
                {submitted && !kelas.kode_kelas && (
                    <small className="p-invalid">Kode Kelas is required.</small>
                )}
            </div>

            {/* Prodi ID */}
            <div className="field">
                <label htmlFor="prodi_id">Prodi</label>
                <Dropdown
                    id="prodi_id"
                    value={kelas.prodi_id || ''}
                    onChange={(e) => onInputChange(e, "prodi_id")}
                    options={prodiOptions}
                    placeholder="Select a prodi"
                    optionLabel="label"
                    required
                />
                {submitted && !kelas.prodi_id && (
                    <small className="p-invalid">Prodi is required.</small>
                )}
            </div>

            {/* Semester dan Tahun Akademi ID */}
            {kelas.smt_thnakd_id && (
                <div className="field">
                    <label htmlFor="smt_thnakd_id">Semester dan Tahun Akademi</label>
                    <Dropdown
                        id="smt_thnakd_id"
                        value={kelas.smt_thnakd_id || ''}
                        onChange={(e) => onInputChange(e, "smt_thnakd_id")}
                        options={smt_thnakdOptions}
                        placeholder="Select a Semester dan Tahun Akademi"
                        optionLabel="label"
                        required
                    />
                    {submitted && !kelas.smt_thnakd_id && (
                        <small className="p-invalid">Semester dan Tahun Akademi is required.</small>
                    )}
                </div>
            )}
        </Dialog>
    );
};

export default KelasForm;
