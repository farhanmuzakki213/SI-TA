import React from "react";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";

const SemproForm = ({
    semproDialog,
    sempro,
    submitted,
    semproDialogFooter,
    semprohideDialog,
    setsempro,
    dosenOptions,
    dosenPembimbingOptions
}) => {
    const onInputChange = (e, field) => {
        const value = e.target ? e.target.value : e.value;

        // Perbarui nilai di state
        setsempro((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };

    // Data yang dipilih
    const selectedOptions = {
        penguji: sempro.penguji_id,
        pembimbing1: sempro.pembimbing_1_id,
        pembimbing2: sempro.pembimbing_2_id,
    };

    // Helper untuk mendapatkan golongan
    const getGolongan = (options, value) => {
        return options.find((d) => d.value === value)?.golongan ?? 0;
    };

    // Filter Penguji
    const filteredPengujiOptions = dosenOptions.filter((dosen) => {
        const pembimbing1Golongan = getGolongan(dosenPembimbingOptions, selectedOptions.pembimbing1);
        const pembimbing2Golongan = getGolongan(dosenPembimbingOptions, selectedOptions.pembimbing2);

        return (
            dosen.value !== selectedOptions.pembimbing1 &&
            dosen.value !== selectedOptions.pembimbing2 &&
            dosen.golongan >= Math.max(pembimbing1Golongan, pembimbing2Golongan)
        );
    });

    // Filter Pembimbing 1
    const filteredPembimbing1Options = dosenPembimbingOptions.filter((dosen) => {
        const pengujiGolongan = getGolongan(dosenOptions, selectedOptions.penguji);
        const pembimbing2Golongan = getGolongan(dosenPembimbingOptions, selectedOptions.pembimbing2);

        return (
            dosen.value !== selectedOptions.penguji &&
            dosen.value !== selectedOptions.pembimbing2 &&
            dosen.golongan >= Math.max(pengujiGolongan, pembimbing2Golongan)
        );
    });

    // Filter Pembimbing 2
    const filteredPembimbing2Options = dosenPembimbingOptions.filter((dosen) => {
        const pengujiGolongan = getGolongan(dosenOptions, selectedOptions.penguji);
        const pembimbing1Golongan = getGolongan(dosenPembimbingOptions, selectedOptions.pembimbing1);

        return (
            dosen.value !== selectedOptions.penguji &&
            dosen.value !== selectedOptions.pembimbing1 &&
            dosen.golongan >= Math.max(pengujiGolongan, pembimbing1Golongan)
        );
    });

    return (
        <Dialog
            visible={semproDialog}
            style={{ width: "450px" }}
            header="Verifikasi Usulan Tempat PKL"
            modal
            className="p-fluid"
            footer={semproDialogFooter}
            onHide={semprohideDialog}
        >

            {/* Pembimbing 1*/}
            <div className="field">
                <label htmlFor="pembimbing_1_id">Pembimbing 1*</label>
                <Dropdown
                    id="pembimbing_1_id"
                    value={sempro.pembimbing_1_id || ""}
                    onChange={(e) => onInputChange(e, "pembimbing_1_id")}
                    options={filteredPembimbing1Options}
                    placeholder="Select a Pembimbing"
                    optionLabel="label"
                    optionValue="value"
                    required
                />
                {submitted && !sempro.pembimbing_1_id && (
                    <small className="p-invalid"> Pembimbing 1 is required.</small>
                )}
                {submitted && sempro.pembimbing_1_id === sempro.penguji_id && (
                    <small className="p-invalid"> Pembimbing 1 and Penguji cannot be the same.</small>
                )}
                {submitted && sempro.pembimbing_1_id === sempro.pembimbing_2_id && (
                    <small className="p-invalid"> Pembimbing 1 and Pembimbing 2 cannot be the same.</small>
                )}
            </div>

            {/* Pembimbing 2*/}
            <div className="field">
                <label htmlFor="pembimbing_2_id">Pembimbing 2*</label>
                <Dropdown
                    id="pembimbing_2_id"
                    value={sempro.pembimbing_2_id || ""}
                    onChange={(e) => onInputChange(e, "pembimbing_2_id")}
                    options={filteredPembimbing2Options}
                    placeholder="Select a Pembimbing"
                    optionLabel="label"
                    optionValue="value"
                    required
                />
                {submitted && !sempro.pembimbing_2_id && (
                    <small className="p-invalid"> Pembimbing 2 is required.</small>
                )}
                {submitted && sempro.pembimbing_2_id === sempro.penguji_id && (
                    <small className="p-invalid"> Pembimbing 2 and Penguji cannot be the same.</small>
                )}
                {submitted && sempro.pembimbing_1_id === sempro.pembimbing_2_id && (
                    <small className="p-invalid"> Pembimbing 1 and Pembimbing 2 cannot be the same.</small>
                )}
            </div>

            {/* Penguji */}
            <div className="field">
                <label htmlFor="penguji_id">Penguji *</label>
                <Dropdown
                    id="penguji_id"
                    value={sempro.penguji_id || ""}
                    onChange={(e) => onInputChange(e, "penguji_id")}
                    options={filteredPengujiOptions}
                    placeholder="Select a Penguji"
                    optionLabel="label"
                    optionValue="value"
                    required
                />
                {submitted && !sempro.penguji_id && (
                    <small className="p-invalid"> Penguji is required.</small>
                )}
                {submitted && sempro.pembimbing_1_id === sempro.penguji_id && (
                    <small className="p-invalid"> Pembimbing and Penguji cannot be the same.</small>
                )}
                {submitted && sempro.pembimbing_2_id === sempro.penguji_id && (
                    <small className="p-invalid"> Pembimbing and Penguji cannot be the same.</small>
                )}
            </div>

        </Dialog>
    );
};

export default SemproForm;
