import React, { useEffect, useState } from "react";
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
    dosenOptions,
    dosenPembimbingOptions
}) => {
    const [filteredPengujiOptions, setFilteredPengujiOptions] = useState([]);
    const [filteredPembimbingOptions, setFilteredPembimbingOptions] = useState([]);

    const updateFilteredOptions = (key, value) => {
        if (key === "pembimbing_id") {
            const pengujiOptions = dosenOptions.filter((dosen) => {
                if (value) {
                    return (
                        dosen.value !== value &&
                        dosen.golongan >=
                        dosenPembimbingOptions.find((d) => d.value === value)?.golongan
                    );
                }
                return true;
            });
            setFilteredPengujiOptions(pengujiOptions);
        }

        if (key === "penguji_id") {
            const pembimbingOptions = dosenPembimbingOptions.filter((dosen) => {
                if (value) {
                    return (
                        dosen.value !== value &&
                        dosen.golongan >=
                        dosenOptions.find((d) => d.value === value)?.golongan
                    );
                }
                return true;
            });
            setFilteredPembimbingOptions(pembimbingOptions);
        }
    };

    const onInputChange = (e, key) => {
        const value = e.target.value;

        // Update PKL state here (assume there's a `setpkl` function)
        setpkl((prevPkl) => ({ ...prevPkl, [key]: value }));

        // Update filtered options
        updateFilteredOptions(key, value);
    };

    useEffect(() => {
        // Initial filter setup
        setFilteredPengujiOptions(dosenOptions);
        setFilteredPembimbingOptions(dosenPembimbingOptions);
    }, [dosenOptions, dosenPembimbingOptions]);

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

            {/* Penguji */}
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

        </Dialog>
    );
};

export default pklForm;
