import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { RadioButton } from "primereact/radiobutton";
import "primeicons/primeicons.css";
import { InputTextarea } from "primereact/inputtextarea";
import { classNames } from "primereact/utils";
import { Dropdown } from "primereact/dropdown";

const UsulanpklForm = ({
    usulanpklDialog,
    usulanpkl,
    submitted,
    usulanpklDialogFooter,
    hideDialog,
    setusulanpkl,
    dosenOptions
}) => {
    const [showAdditionalForm, setShowAdditionalForm] = useState(false);
    const onInputChange = (e, field) => {
        const value = e.target ? e.target.value : e.value;
        setusulanpkl((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };
    console.log(dosenOptions);
    const onStatusChange = (e) => {
        let _usulanpkl = { ...usulanpkl };
        _usulanpkl["status_usulan"] = e.value;

        setusulanpkl(_usulanpkl);

        setShowAdditionalForm(e.value === "3");
    };

    const filteredPengujiOptions = dosenOptions.filter((dosen) => {
        if (usulanpkl.pembimbing_id) {
            return (
                dosen.value !== usulanpkl.pembimbing_id &&
                dosen.golongan >=
                dosenOptions.find((d) => d.value === usulanpkl.pembimbing_id)
                    ?.golongan
            );
        }
        return true;
    });


    const filteredPembimbingOptions = dosenOptions.filter((dosen) => {
        if (usulanpkl.penguji_id) {
            return (
                dosen.value !== usulanpkl.penguji_id &&
                dosen.golongan >=
                dosenOptions.find((d) => d.value === usulanpkl.penguji_id)
                    ?.golongan
            );
        }
        return true;
    });

    return (
        <Dialog
            visible={usulanpklDialog}
            style={{ width: "450px" }}
            header="Verifikasi Usulan Tempat PKL"
            modal
            className="p-fluid"
            footer={usulanpklDialogFooter}
            onHide={hideDialog}
        >
            {/* Status */}
            <div className="field">
                <label className="mb-3">Status *</label>
                <div className="formgrid grid">
                    <div className="field-radiobutton col-4">
                        <RadioButton
                            inputId="status_usulan2"
                            name="status_usulan"
                            value="2"
                            onChange={onStatusChange}
                            checked={usulanpkl.status_usulan === "2"}
                        />
                        <label htmlFor="status_usulan2">Ditolak</label>
                    </div>
                    <div className="field-radiobutton col-4">
                        <RadioButton
                            inputId="status_usulan3"
                            name="status_usulan"
                            value="3"
                            onChange={onStatusChange}
                            checked={usulanpkl.status_usulan === "3"}
                        />
                        <label htmlFor="status_usulan3">Diterima</label>
                    </div>
                </div>
            </div>
            {/* Komentar */}
            <div className="field">
                <label htmlFor="komentar">Komentar *</label>
                <InputTextarea
                    id="komentar"
                    value={usulanpkl.komentar || ''}
                    onChange={(e) => onInputChange(e, "komentar")}
                    required
                    autoFocus
                    className={classNames({
                        "p-invalid": submitted && !usulanpkl.komentar,
                    })}
                />
                {submitted && !usulanpkl.komentar && (
                    <small className="p-invalid">Komentar is required.</small>
                )}
            </div>

            {/* Pembimbing */}
            {showAdditionalForm && (
                <div className="field">
                    <label htmlFor="pembimbing_id">Pembimbing *</label>
                    <Dropdown
                        id="pembimbing_id"
                        value={usulanpkl.pembimbing_id || ""}
                        onChange={(e) => onInputChange(e, "pembimbing_id")}
                        options={filteredPembimbingOptions}
                        placeholder="Select a Pembimbing"
                        optionLabel="label"
                        optionValue="value"
                        required
                    />
                    {submitted && !usulanpkl.pembimbing_id && (
                        <small className="p-invalid"> Pembimbing is required.</small>
                    )}
                </div>
            )}

            {/* Penguji */}
            {showAdditionalForm && (
                <div className="field">
                    <label htmlFor="penguji_id">Penguji *</label>
                    <Dropdown
                        id="penguji_id"
                        value={usulanpkl.penguji_id || ""}
                        onChange={(e) => onInputChange(e, "penguji_id")}
                        options={filteredPengujiOptions}
                        placeholder="Select a Penguji"
                        optionLabel="label"
                        optionValue="value"
                        required
                    />
                    {submitted && !usulanpkl.penguji_id && (
                        <small className="p-invalid"> Penguji is required.</small>
                    )}
                    {submitted && usulanpkl.pembimbing_id === usulanpkl.penguji_id && (
                        <small className="p-invalid"> Pembimbing and Penguji cannot be the same.</small>
                    )}
                </div>
            )}

        </Dialog>
    );
};

export default UsulanpklForm;
