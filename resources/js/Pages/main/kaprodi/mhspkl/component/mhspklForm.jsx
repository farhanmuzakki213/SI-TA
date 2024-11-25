import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';

const MhspklForm = ({
    mhspklDialog,
    mhspkl,
    mhspkls,
    submitted,
    mhspklDialogFooter,
    hideDialog,
    setmhspkl,
    dosenOptions,
    usulanOptions
}) => {
    const onInputChange = (e, field) => {
        const value = e.target ? e.target.value : e.value;
        setmhspkl((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };

    const filteredOptions = usulanOptions.filter(
        (option) =>
            !mhspkls.some((mhspkl) => mhspkl.usulan_tempat_pkl_id === option.value)
    );

    return (
        <Dialog
            visible={mhspklDialog}
            style={{ width: "450px" }}
            header="Mahasiswa PKL Details"
            modal
            className="p-fluid"
            footer={mhspklDialogFooter}
            onHide={hideDialog}
        >

            {/* Mahasiswa ID */}
            <div className="field">
                <label htmlFor="usulan_tempat_pkl_id">Mahasiswa</label>
                <Dropdown
                    id="usulan_tempat_pkl_id"
                    value={mhspkl.usulan_tempat_pkl_id || ""}
                    onChange={(e) => onInputChange(e, "usulan_tempat_pkl_id")}
                    options={filteredOptions}
                    placeholder="Select a Mahasiswa"
                    optionLabel="label"
                    required
                />
                {submitted && !mhspkl.usulan_tempat_pkl_id && (
                    <small className="p-invalid"> Mahasiswa is required.</small>
                )}
            </div>

            {/* Pembimbing */}
            <div className="field">
                <label htmlFor="pembimbing_id">Pembimbing</label>
                <Dropdown
                    id="pembimbing_id"
                    value={mhspkl.pembimbing_id || ""}
                    onChange={(e) => onInputChange(e, "pembimbing_id")}
                    options={dosenOptions}
                    placeholder="Select a Pembimbing"
                    optionLabel="label"
                    optionValue="value" // Pastikan value adalah 'id'
                    required
                />
                {submitted && !mhspkl.pembimbing_id && (
                    <small className="p-invalid"> Pembimbing is required.</small>
                )}
            </div>

            {/* Penguji */}
            <div className="field">
                <label htmlFor="penguji_id">Penguji</label>
                <Dropdown
                    id="penguji_id"
                    value={mhspkl.penguji_id || ""}
                    onChange={(e) => onInputChange(e, "penguji_id")}
                    options={dosenOptions}
                    placeholder="Select a Penguji"
                    optionLabel="label"
                    optionValue="value" // Pastikan value adalah 'id'
                    required
                />
                {submitted && !mhspkl.penguji_id && (
                    <small className="p-invalid"> Penguji is required.</small>
                )}
                {submitted && mhspkl.pembimbing_id === mhspkl.penguji_id && (
                    <small className="p-invalid"> Pembimbing and Penguji cannot be the same.</small>
                )}
            </div>
        </Dialog>
    );
};

export default MhspklForm;
