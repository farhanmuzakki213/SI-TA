import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { RadioButton } from 'primereact/radiobutton';
import { InputText } from 'primereact/inputtext';

const pimpinanJForm = ({
    pimpinan_jurusanDialog,
    pimpinan_jurusan,
    submitted,
    dosenOptions,
    jabatan_pimpinanOptions,
    pimpinan_jurusanDialogFooter,
    hideDialog,
    setpimpinan_jurusan,
}) => {

    const onInputChange = (e, field) => {
        const value = e.target ? e.target.value : e.value;
        setpimpinan_jurusan((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };
    const onStatusChange = (e) => {
        let _pimpinan_jurusan = { ...pimpinan_jurusan };
        _pimpinan_jurusan['status_pimpinan_jurusan'] = e.value;

        setpimpinan_jurusan(_pimpinan_jurusan);
    };

    return (
        <Dialog
            visible={pimpinan_jurusanDialog}
            style={{ width: "450px" }}
            header="pimpinan_jurusan Details"
            modal
            className="p-fluid"
            footer={pimpinan_jurusanDialogFooter}
            onHide={hideDialog}
        >
            {/* Dosen ID */}
            <div className="field">
                <label htmlFor="dosen_id">Nama Dosen</label>
                <Dropdown
                    id="dosen_id"
                    value={pimpinan_jurusan.dosen_id || ''}
                    onChange={(e) => onInputChange(e, "dosen_id")}
                    options={dosenOptions}
                    placeholder="Select a Dosen"
                    optionLabel="label"
                    required
                />
                {submitted && !pimpinan_jurusan.dosen_id && (
                    <small className="p-invalid">Dosen is required.</small>
                )}
            </div>

            {/* Jabatan ID */}
            <div className="field">
                <label htmlFor="jabatan_pimpinan_id">Jabatan Dosen</label>
                <Dropdown
                    id="jabatan_pimpinan_id"
                    value={pimpinan_jurusan.jabatan_pimpinan_id || ''}
                    onChange={(e) => onInputChange(e, "jabatan_pimpinan_id")}
                    options={jabatan_pimpinanOptions}
                    placeholder="Select a Jabatan Pimpinan"
                    optionLabel="label"
                    required
                />
                {submitted && !pimpinan_jurusan.jabatan_pimpinan_id && (
                    <small className="p-invalid">Jabatan Pimpinan is required.</small>
                )}
            </div>

            {/* Periode */}
            <div className="field">
                <label htmlFor="periode">Periode</label>
                <InputText
                    id="periode"
                    value={pimpinan_jurusan.periode || ''}
                    onChange={(e) => onInputChange(e, "periode")}
                    required
                    className="p-inputtext p-component"
                />
                {submitted && !pimpinan_jurusan.periode && (
                    <small className="p-invalid">Periode is required.</small>
                )}
            </div>

            {/* Status pimpinan_jurusan */}
            {pimpinan_jurusan.status_pimpinan_jurusan &&(
            <div className="field">
                <label className="mb-3">Status</label>
                <div className="formgrid grid">
                    <div className="field-radiobutton col-6">
                        <RadioButton
                            inputId="status1"
                            name="status"
                            value="0"
                            onChange={onStatusChange}
                            checked={pimpinan_jurusan.status_pimpinan_jurusan === "0"}
                        />
                        <label htmlFor="status1">Tidak Aktif</label>
                    </div>
                    <div className="field-radiobutton col-6">
                        <RadioButton
                            inputId="status2"
                            name="status"
                            value="1"
                            onChange={onStatusChange}
                            checked={pimpinan_jurusan.status_pimpinan_jurusan === "1"}
                        />
                        <label htmlFor="status2">Aktif</label>
                    </div>
                </div>
            </div>
            )}
        </Dialog>
    );
};

export default pimpinanJForm;
