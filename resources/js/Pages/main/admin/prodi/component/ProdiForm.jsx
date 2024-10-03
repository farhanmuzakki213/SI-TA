import React from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Dropdown } from 'primereact/dropdown';

const ProdiForm = ({
    prodiDialog,
    prodi,
    submitted,
    prodiDialogFooter,
    hideDialog,
    setprodi,
    jurusanOptions,
}) => {

    const onInputChange = (e, field) => {
        const value = e.target ? e.target.value : e.value;
        setprodi((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };

    return (
        <Dialog
            visible={prodiDialog}
            style={{ width: "450px" }}
            header="Prodi Details"
            modal
            className="p-fluid"
            footer={prodiDialogFooter}
            onHide={hideDialog}
        >
            {/* Nama Prodi */}
            <div className="field">
                <label htmlFor="nama_prodi">Nama Prodi</label>
                <InputText
                    id="nama_prodi"
                    value={prodi.nama_prodi || ''}
                    onChange={(e) => onInputChange(e, "nama_prodi")}
                    required
                    autoFocus
                    className={classNames({
                        "p-invalid": submitted && !prodi.nama_prodi,
                    })}
                />
                {submitted && !prodi.nama_prodi && (
                    <small className="p-invalid">Nama Prodi is required.</small>
                )}
            </div>

            {/* Kode Prodi */}
            <div className="field">
                <label htmlFor="kode_prodi">Kode Prodi</label>
                <InputText
                    id="kode_prodi"
                    value={prodi.kode_prodi || ''}
                    onChange={(e) => onInputChange(e, "kode_prodi")}
                    required
                    autoFocus
                    className={classNames({
                        "p-invalid": submitted && !prodi.nama_prodi,
                    })}
                />
                {submitted && !prodi.kode_prodi && (
                    <small className="p-invalid">Kode Prodi is required.</small>
                )}
            </div>

            {/* Jurusan ID */}
            <div className="field">
                <label htmlFor="jurusan_id">Jurusan</label>
                <Dropdown
                    id="jurusan_id"
                    value={prodi.jurusan_id || ''}
                    onChange={(e) => onInputChange(e, "jurusan_id")}
                    options={jurusanOptions}
                    placeholder="Select a jurusan"
                    optionLabel="label"
                    required
                />
                {submitted && !prodi.jurusan_id && (
                    <small className="p-invalid">Jurusan is required.</small>
                )}
            </div>
        </Dialog>
    );
};

export default ProdiForm;
