import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { RadioButton } from "primereact/radiobutton";
import { InputTextarea } from "primereact/inputtextarea";
import { classNames } from "primereact/utils";

const UsulanForm = ({
    usulanDialog,
    usulan,
    submitted,
    usulanDialogFooter,
    hideDialog,
    setusulan,
    dosenPembimbingOptions
}) => {
    // console.log("usulan", usulan);
    // console.log("dosenpenguji", dosenPengujiOptions);
    // console.log("dosenpembimbing", dosenPembimbingOptions);
    const onInputChange = (e, field) => {
        const value = e.target ? e.target.value : e.value;
        setusulan((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };

    const [showAdditionalForm, setShowAdditionalForm] = useState(false);
    // console.log(dosenOptions);
    const onStatusChange = (e) => {
        let _usulan = { ...usulan };
        _usulan["status_judul"] = e.value;

        setusulan(_usulan);

        setShowAdditionalForm(e.value === "2");
    };

    // Data yang dipilih
    const selectedOptions = {
        pembimbing1: usulan.pembimbing_1_id,
        pembimbing2: usulan.pembimbing_2_id,
    };

    // Helper untuk mendapatkan golongan
    const getGolongan = (options, value) => {
        return options.find((d) => d.value === value)?.golongan ?? 0;
    };

    // Filter Pembimbing 1
    const filteredPembimbing1Options = dosenPembimbingOptions.filter((dosen) => {
        const pembimbing2Golongan = getGolongan(dosenPembimbingOptions, selectedOptions.pembimbing2);
        const maxGolongan = Math.max(
            pembimbing2Golongan
        );

        return (
            dosen.value !== selectedOptions.pembimbing2 &&
            dosen.golongan >= maxGolongan
        );
    });

    // Filter Pembimbing 2
    const filteredPembimbing2Options = dosenPembimbingOptions.filter((dosen) => {
        const pembimbing1Golongan = getGolongan(dosenPembimbingOptions, selectedOptions.pembimbing1);
        const maxGolongan = Math.max(
            pembimbing1Golongan
        );

        return (
            dosen.value !== selectedOptions.pembimbing1 &&
            dosen.golongan >= maxGolongan
        );
    });

    return (
        <Dialog
            visible={usulanDialog}
            style={{ width: "450px" }}
            header="Usulan Judul"
            modal
            className="p-fluid"
            footer={usulanDialogFooter}
            onHide={hideDialog}
        >
            {/* Status */}
            <div className="field">
                <label className="mb-3">Status *</label>
                <div className="formgrid grid">
                    <div className="field-radiobutton col-4">
                        <RadioButton
                            inputId="status_judul0"
                            name="status_judul"
                            value="0"
                            onChange={onStatusChange}
                            checked={usulan.status_judul === "0"}
                        />
                        <label htmlFor="status_judul0">Ditolak</label>
                    </div>
                    <div className="field-radiobutton col-4">
                        <RadioButton
                            inputId="status_judul3"
                            name="status_judul"
                            value="3"
                            onChange={onStatusChange}
                            checked={usulan.status_judul === "3"}
                        />
                        <label htmlFor="status_judul3">Butuh Revisi</label>
                    </div>
                    <div className="field-radiobutton col-4">
                        <RadioButton
                            inputId="status_judul2"
                            name="status_judul"
                            value="2"
                            onChange={onStatusChange}
                            checked={usulan.status_judul === "2"}
                        />
                        <label htmlFor="status_judul2">Diterima</label>
                    </div>
                </div>
            </div>
            {/* Komentar */}
            <div className="field">
                <label htmlFor="komentar_judul">Komentar *</label>
                <InputTextarea
                    id="komentar_judul"
                    value={usulan.komentar_judul || ''}
                    onChange={(e) => onInputChange(e, "komentar_judul")}
                    required
                    autoFocus
                    className={classNames({
                        "p-invalid": submitted && !usulan.komentar_judul,
                    })}
                />
                {submitted && !usulan.komentar_judul && (
                    <small className="p-invalid">Komentar is required.</small>
                )}
            </div>
            {showAdditionalForm && (
                <>
                    {/* Pembimbing 1*/}
                    <div className="field">
                        <label htmlFor="pembimbing_1_id">Pembimbing 1*</label>
                        <Dropdown
                            id="pembimbing_1_id"
                            value={usulan.pembimbing_1_id || ""}
                            onChange={(e) => onInputChange(e, "pembimbing_1_id")}
                            options={filteredPembimbing1Options}
                            placeholder="Select a Pembimbing"
                            optionLabel="label"
                            optionValue="value"
                            required
                        />
                        {submitted && !usulan.pembimbing_1_id && (
                            <small className="p-invalid"> Pembimbing 1 is required.</small>
                        )}
                    </div>

                    {/* Pembimbing 2*/}
                    <div className="field">
                        <label htmlFor="pembimbing_2_id">Pembimbing 2*</label>
                        <Dropdown
                            id="pembimbing_2_id"
                            value={usulan.pembimbing_2_id || ""}
                            onChange={(e) => onInputChange(e, "pembimbing_2_id")}
                            options={filteredPembimbing2Options}
                            placeholder="Select a Pembimbing"
                            optionLabel="label"
                            optionValue="value"
                            required
                        />
                        {submitted && !usulan.pembimbing_2_id && (
                            <small className="p-invalid"> Pembimbing 2 is required.</small>
                        )}
                    </div>
                </>
            )}
        </Dialog>
    );
};

export default UsulanForm;
