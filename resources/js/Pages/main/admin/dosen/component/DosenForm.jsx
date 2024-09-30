import React from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { RadioButton } from 'primereact/radiobutton';
import { classNames } from 'primereact/utils';

const DosenForm = ({
    dosenDialog,
    dosen,
    submitted,
    userOptions,
    prodiOptions,
    dosenDialogFooter,
    hideDialog,
    setdosen,
}) =>{
    const onInputChange = (e, field) => {
        const value = e.target ? e.target.value : e.value;
        setdosen((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };



    const onStatusChange = (e) => {
        let _dosen = { ...dosen };
        _dosen['status_dosen'] = e.value;

        setdosen(_dosen);
    };

    return (
        <Dialog
            visible={dosenDialog}
            style={{ width: "450px" }}
            header="Dosen Details"
            modal
            className="p-fluid"
            footer={dosenDialogFooter}
            onHide={hideDialog}
        >
            {/* Nama Dosen */}
            <div className="field">
                <label htmlFor="nama_dosen">Nama Dosen</label>
                <InputText
                    id="nama_dosen"
                    value={dosen.nama_dosen || ''}  // Using state dosen
                    onChange={(e) => onInputChange(e, "nama_dosen")}
                    required
                    autoFocus
                    className={classNames({
                        "p-invalid": submitted && !dosen.nama_dosen,
                    })}
                />
                {submitted && !dosen.nama_dosen && (
                    <small className="p-invalid">Nama Dosen is required.</small>
                )}
            </div>

            {/* User ID */}
            <div className="field">
                <label htmlFor="user_id">User</label>
                <Dropdown
                    id="user_id"
                    value={dosen.user_id || ''} // Using state dosen
                    options={userOptions}
                    onChange={(e) => onInputChange(e, "user_id")}
                    placeholder="Select a User"
                    required
                />
                {submitted && !dosen.user_id && (
                    <small className="p-invalid">User is required.</small>
                )}
            </div>

            {/* Prodi ID */}
            <div className="field">
                <label htmlFor="prodi_id">Prodi</label>
                <Dropdown
                    id="prodi_id"
                    value={dosen.prodi_id || ''} // Using state dosen
                    onChange={(e) => onInputChange(e, "prodi_id")}
                    options={prodiOptions}
                    placeholder="Select a Prodi"
                    optionLabel="label"
                    required
                />
                {submitted && !dosen.prodi_id && (
                    <small className="p-invalid">Prodi is required.</small>
                )}
            </div>

            {/* NIDN */}
            <div className="field">
                <label htmlFor="nidn_dosen">NIDN</label>
                <input
                    type="number"
                    id="nidn_dosen"
                    value={dosen.nidn_dosen || ''}
                    onChange={(e) => onInputChange(e, "nidn_dosen")}
                    required
                    min="0"
                    className="p-inputtext p-component"
                />
                {submitted && !dosen.nidn_dosen && (
                    <small className="p-invalid">NIDN is required.</small>
                )}
            </div>

            {/* Gender */}
            <div className="field">
                <label htmlFor="gender">Gender</label>
                <Dropdown
                    id="gender"
                    value={dosen.gender || ''} // Using state dosen
                    onChange={(e) => onInputChange(e, "gender")}
                    options={[
                        { label: "laki-laki", value: "laki-laki" },
                        { label: "perempuan", value: "perempuan" },
                    ]}
                    placeholder="Select a Gender"
                    required
                />
                {submitted && !dosen.gender && (
                    <small className="p-invalid">Gender is required.</small>
                )}
            </div>

            {/* Status Dosen */}
            <div className="field">
                <label className="mb-3">Status Dosen</label>
                <div className="formgrid grid">
                    <div className="field-radiobutton col-6">
                        <RadioButton
                            inputId="status1"
                            name="status"
                            value="0"
                            onChange={onStatusChange}
                            checked={dosen.status_dosen === "0"}
                        />
                        <label htmlFor="status1">Tidak Aktif</label>
                    </div>
                    <div className="field-radiobutton col-6">
                        <RadioButton
                            inputId="status2"
                            name="status"
                            value="1"
                            onChange={onStatusChange}
                            checked={dosen.status_dosen === "1"}
                        />
                        <label htmlFor="status2">Aktif</label>
                    </div>
                </div>
            </div>
        </Dialog>
    );
};

export default DosenForm;
