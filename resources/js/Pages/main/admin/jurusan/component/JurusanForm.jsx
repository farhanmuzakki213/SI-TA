import React from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';

const JurusanForm = ({
    jurusanDialog,
    jurusan,
    submitted,
    jurusanDialogFooter,
    hideDialog,
    setjurusan,
}) => {

    const onInputChange = (e, field) => {
        const value = e.target ? e.target.value : e.value;
        setjurusan((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };

    return (
        <Dialog
            visible={jurusanDialog}
            style={{ width: "450px" }}
            header="Jurusan Details"
            modal
            className="p-fluid"
            footer={jurusanDialogFooter}
            onHide={hideDialog}
        >
            {/* Nama Jurusan */}
            <div className="field">
                <label htmlFor="nama_jurusan">Nama Jurusan</label>
                <InputText
                    id="nama_jurusan"
                    value={jurusan.nama_jurusan || ''}
                    onChange={(e) => onInputChange(e, "nama_jurusan")}
                    required
                    autoFocus
                    className={classNames({
                        "p-invalid": submitted && !jurusan.nama_jurusan,
                    })}
                />
                {submitted && !jurusan.nama_jurusan && (
                    <small className="p-invalid">Nama Jurusan is required.</small>
                )}
            </div>

            {/* Kode Jurusan */}
            <div className="field">
                <label htmlFor="kode_jurusan">Kode Jurusan</label>
                <InputText
                    id="kode_jurusan"
                    value={jurusan.kode_jurusan || ''}
                    onChange={(e) => onInputChange(e, "kode_jurusan")}
                    required
                    autoFocus
                    className={classNames({
                        "p-invalid": submitted && !jurusan.nama_jurusan,
                    })}
                />
                {submitted && !jurusan.kode_jurusan && (
                    <small className="p-invalid">Kode Jurusan is required.</small>
                )}
            </div>
        </Dialog>
    );
};

export default JurusanForm;
