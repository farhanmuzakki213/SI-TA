import React from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';

const JabatanForm = ({
    jabatan_pimpinanDialog,
    jabatan_pimpinan,
    submitted,
    jabatan_pimpinanDialogFooter,
    hideDialog,
    setjabatan_pimpinan,
}) => {

    const onInputChange = (e, field) => {
        const value = e.target ? e.target.value : e.value;
        setjabatan_pimpinan((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };

    return (
        <Dialog
            visible={jabatan_pimpinanDialog}
            style={{ width: "450px" }}
            header="jabatan_pimpinan Details"
            modal
            className="p-fluid"
            footer={jabatan_pimpinanDialogFooter}
            onHide={hideDialog}
        >
            {/* Nama Jabatan */}
            <div className="field">
                <label htmlFor="nama_jabatan_pimpinan">Nama Jabatan</label>
                <InputText
                    id="nama_jabatan_pimpinan"
                    value={jabatan_pimpinan.nama_jabatan_pimpinan || ''}
                    onChange={(e) => onInputChange(e, "nama_jabatan_pimpinan")}
                    required
                    autoFocus
                    className={classNames({
                        "p-invalid": submitted && !jabatan_pimpinan.nama_jabatan_pimpinan,
                    })}
                />
                {submitted && !jabatan_pimpinan.nama_jabatan_pimpinan && (
                    <small className="p-invalid">Nama Jabatan is required.</small>
                )}
            </div>

            {/* Kode Jabatan */}
            <div className="field">
                <label htmlFor="kode_jabatan_pimpinan">Kode Jabatan</label>
                <InputText
                    id="kode_jabatan_pimpinan"
                    value={jabatan_pimpinan.kode_jabatan_pimpinan || ''}
                    onChange={(e) => onInputChange(e, "kode_jabatan_pimpinan")}
                    required
                    autoFocus
                    className={classNames({
                        "p-invalid": submitted && !jabatan_pimpinan.nama_jabatan_pimpinan,
                    })}
                />
                {submitted && !jabatan_pimpinan.kode_jabatan_pimpinan && (
                    <small className="p-invalid">Kode Jabatan is required.</small>
                )}
            </div>
        </Dialog>
    );
};

export default JabatanForm;
