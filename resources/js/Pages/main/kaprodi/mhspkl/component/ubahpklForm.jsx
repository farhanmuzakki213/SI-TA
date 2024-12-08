import React from "react";
import { Dialog } from "primereact/dialog";
import "primeicons/primeicons.css";
import { Dropdown } from "primereact/dropdown";

const pklForm = ({
    pklDialog,
    pkl,
    submitted,
    pklDialogFooter,
    hideDialog,
    setpkl,
    dosenOptions
}) => {
    const onInputChange = (e, field) => {
        const value = e.target ? e.target.value : e.value;
        setpkl((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };

    const filteredPengujiOptions = dosenOptions.filter((dosen) => {
        if (pkl.pembimbing_id) {
            return (
                dosen.value !== pkl.pembimbing_id &&
                dosen.golongan >=
                dosenOptions.find((d) => d.value === pkl.pembimbing_id)
                    ?.golongan
            );
        }
        return true;
    });


    const filteredPembimbingOptions = dosenOptions.filter((dosen) => {
        if (pkl.penguji_id) {
            return (
                dosen.value !== pkl.penguji_id &&
                dosen.golongan >=
                dosenOptions.find((d) => d.value === pkl.penguji_id)
                    ?.golongan
            );
        }
        return true;
    });

    return (
        <Dialog
            visible={pklDialog}
            style={{ width: "450px" }}
            header="Ubah Pembimbing dan Penguji"
            modal
            className="p-fluid"
            footer={pklDialogFooter}
            onHide={hideDialog}
        >
            {/* Pembimbing */}
            {showAdditionalForm && (
                <div className="field">
                    <label htmlFor="pembimbing_id">Pembimbing *</label>
                    <Dropdown
                        id="pembimbing_id"
                        value={pkl.pembimbing_id || ""}
                        onChange={(e) => onInputChange(e, "pembimbing_id")}
                        options={filteredPembimbingOptions}
                        placeholder="Select a Pembimbing"
                        optionLabel="label"
                        optionValue="value"
                        required
                    />
                    {submitted && !pkl.pembimbing_id && (
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
                        value={pkl.penguji_id || ""}
                        onChange={(e) => onInputChange(e, "penguji_id")}
                        options={filteredPengujiOptions}
                        placeholder="Select a Penguji"
                        optionLabel="label"
                        optionValue="value"
                        required
                    />
                    {submitted && !pkl.penguji_id && (
                        <small className="p-invalid"> Penguji is required.</small>
                    )}
                    {submitted && pkl.pembimbing_id === pkl.penguji_id && (
                        <small className="p-invalid"> Pembimbing and Penguji cannot be the same.</small>
                    )}
                </div>
            )}

        </Dialog>
    );
};

export default pklForm;
