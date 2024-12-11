import React from "react";
import { Dialog } from "primereact/dialog";
import "primeicons/primeicons.css";
import { Dropdown } from "primereact/dropdown";

const semproForm = ({
    semproDialog,
    sempro,
    submitted,
    semproDialogFooter,
    hideDialog,
    setsempro,
    dosenOptions
}) => {
    const onInputChange = (e, field) => {
        const value = e.target ? e.target.value : e.value;
        setsempro((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };

    const filteredPengujiOptions = dosenOptions.filter((dosen) => {
        if (sempro.pembimbing_id) {
            return (
                dosen.value !== sempro.pembimbing_id &&
                dosen.golongan >=
                dosenOptions.find((d) => d.value === sempro.pembimbing_id)
                    ?.golongan
            );
        }
        return true;
    });


    const filteredPembimbingOptions = dosenOptions.filter((dosen) => {
        if (sempro.penguji_id) {
            return (
                dosen.value !== sempro.penguji_id &&
                dosen.golongan >=
                dosenOptions.find((d) => d.value === sempro.penguji_id)
                    ?.golongan
            );
        }
        return true;
    });

    return (
        <Dialog
            visible={semproDialog}
            style={{ width: "450px" }}
            header="Ubah Pembimbing dan Penguji"
            modal
            className="p-fluid"
            footer={semproDialogFooter}
            onHide={hideDialog}
        >
            {/* Pembimbing */}
            <div className="field">
                <label htmlFor="pembimbing_id">Pembimbing *</label>
                <Dropdown
                    id="pembimbing_id"
                    value={sempro.pembimbing_id || ""}
                    onChange={(e) => onInputChange(e, "pembimbing_id")}
                    options={filteredPembimbingOptions}
                    placeholder="Select a Pembimbing"
                    optionLabel="label"
                    optionValue="value"
                    required
                />
                {submitted && !sempro.pembimbing_id && (
                    <small className="p-invalid"> Pembimbing is required.</small>
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
                {submitted && sempro.pembimbing_id === sempro.penguji_id && (
                    <small className="p-invalid"> Pembimbing and Penguji cannot be the same.</small>
                )}
            </div>

        </Dialog>
    );
};

export default semproForm;
