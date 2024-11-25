import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { RadioButton } from 'primereact/radiobutton';
import { InputText } from 'primereact/inputtext';

const pimpinanForm = ({
    pimpinanDialog,
    pimpinan,
    submitted,
    dosenOptions,
    jabatan_pimpinanOptions,
    pimpinanDialogFooter,
    hideDialog,
    setpimpinan,
    prodiOptions,
}) => {

    const onInputChange = (e, field) => {
        const value = e.target ? e.target.value : e.value;
        setpimpinan((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };
    const onStatusChange = (e) => {
        let _pimpinan = { ...pimpinan };
        _pimpinan['status_pimpinan'] = e.value;

        setpimpinan(_pimpinan);
    };

    return (
        <Dialog
            visible={pimpinanDialog}
            style={{ width: "450px" }}
            header="pimpinan Details"
            modal
            className="p-fluid"
            footer={pimpinanDialogFooter}
            onHide={hideDialog}
        >
            {/* Dosen ID */}
            <div className="field">
                <label htmlFor="dosen_id">Nama Dosen</label>
                <Dropdown
                    id="dosen_id"
                    value={pimpinan.dosen_id || ''}
                    onChange={(e) => onInputChange(e, "dosen_id")}
                    options={dosenOptions}
                    placeholder="Select a Dosen"
                    optionLabel="label"
                    required
                />
                {submitted && !pimpinan.dosen_id && (
                    <small className="p-invalid">Dosen is required.</small>
                )}
            </div>

            {/* Jabatan ID */}
            <div className="field">
                <label htmlFor="jabatan_pimpinan_id">Jabatan Dosen</label>
                <Dropdown
                    id="jabatan_pimpinan_id"
                    value={pimpinan.jabatan_pimpinan_id || ''}
                    onChange={(e) => onInputChange(e, "jabatan_pimpinan_id")}
                    options={jabatan_pimpinanOptions}
                    placeholder="Select a Jabatan Pimpinan"
                    optionLabel="label"
                    required
                />
                {submitted && !pimpinan.jabatan_pimpinan_id && (
                    <small className="p-invalid">Jabatan Pimpinan is required.</small>
                )}
            </div>

            {/* Prodi ID */}
            <div className="field">
                <label htmlFor="prodi_id">Prodi Dosen</label>
                <Dropdown
                    id="prodi_id"
                    value={pimpinan.prodi_id || ''}
                    onChange={(e) => onInputChange(e, "prodi_id")}
                    options={jabatan_pimpinanOptions}
                    placeholder="Select a Prodi"
                    optionLabel="label"
                    required
                />
                {submitted && !pimpinan.prodi_id && (
                    <small className="p-invalid">Prodi is required.</small>
                )}
            </div>

            {/* Periode */}
            <div className="field">
                <label htmlFor="periode">Periode</label>
                <InputText
                    id="periode"
                    value={pimpinan.periode || ''}
                    onChange={(e) => onInputChange(e, "periode")}
                    required
                    className="p-inputtext p-component"
                />
                {submitted && !pimpinan.periode && (
                    <small className="p-invalid">Periode is required.</small>
                )}
            </div>

            {/* Status pimpinan */}
            {pimpinan.status_pimpinan &&(
            <div className="field">
                <label className="mb-3">Status</label>
                <div className="formgrid grid">
                    <div className="field-radiobutton col-6">
                        <RadioButton
                            inputId="status1"
                            name="status"
                            value="0"
                            onChange={onStatusChange}
                            checked={pimpinan.status_pimpinan === "0"}
                        />
                        <label htmlFor="status1">Tidak Aktif</label>
                    </div>
                    <div className="field-radiobutton col-6">
                        <RadioButton
                            inputId="status2"
                            name="status"
                            value="1"
                            onChange={onStatusChange}
                            checked={pimpinan.status_pimpinan === "1"}
                        />
                        <label htmlFor="status2">Aktif</label>
                    </div>
                </div>
            </div>
            )}
        </Dialog>
    );
};

export default pimpinanForm;
