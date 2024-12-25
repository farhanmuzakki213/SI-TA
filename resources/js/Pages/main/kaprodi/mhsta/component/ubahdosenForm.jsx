import React from "react";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { Tooltip } from "primereact/tooltip";

const DosenSidangForm = ({
    dosensidangDialog,
    dosensidang,
    submitted,
    dosensidangDialogFooter,
    dosensidanghideDialog,
    setdosensidang,
    dosenPengujiOptions,
    dosenPembimbingOptions
}) => {
    // console.log("dosensidang", dosensidang);
    // console.log("dosenpenguji", dosenPengujiOptions);
    // console.log("dosenpembimbing", dosenPembimbingOptions);
    const onInputChange = (e, field) => {
        const value = e.target ? e.target.value : e.value;

        // Perbarui nilai di state
        setdosensidang((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };

    // Data yang dipilih
    const selectedOptions = {
        pembimbing1: dosensidang.pembimbing_1_id,
        pembimbing2: dosensidang.pembimbing_2_id,
        ketua: dosensidang.ketua_id,
        sekretaris: dosensidang.sekretaris_id,
        penguji1: dosensidang.penguji_1_id,
        penguji2: dosensidang.penguji_2_id,
    };

    // Helper untuk mendapatkan golongan
    const getGolongan = (options, value) => {
        return options.find((d) => d.value === value)?.golongan ?? 0;
    };

    // Filter Pembimbing 1
    const filteredPembimbing1Options = dosenPembimbingOptions.filter((dosen) => {
        const pembimbing2Golongan = getGolongan(dosenPembimbingOptions, selectedOptions.pembimbing2);
        const maxGolongan = Math.max(
            getGolongan(dosenPengujiOptions, selectedOptions.ketua),
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
            getGolongan(dosenPengujiOptions, selectedOptions.ketua),
            pembimbing1Golongan
        );

        return (
            dosen.value !== selectedOptions.pembimbing1 &&
            dosen.golongan >= maxGolongan
        );
    });

    // Filter Ketua
    const filteredKetuaOptions = dosenPengujiOptions.filter((dosen) => {
        const maxGolongan = Math.max(
            getGolongan(dosenPembimbingOptions, selectedOptions.pembimbing1),
            getGolongan(dosenPembimbingOptions, selectedOptions.pembimbing2)
        );

        return (
            dosen.value !== selectedOptions.sekretaris &&
            dosen.value !== selectedOptions.penguji1 &&
            dosen.value !== selectedOptions.penguji2 &&
            dosen.golongan >= maxGolongan
        );
    });

    // Filter Sekretaris
    const filteredSekretarisOptions = dosenPengujiOptions.filter((dosen) => {
        const maxGolongan = Math.max(
            getGolongan(dosenPembimbingOptions, selectedOptions.pembimbing1),
            getGolongan(dosenPembimbingOptions, selectedOptions.pembimbing2)
        );

        return (
            dosen.value !== selectedOptions.ketua &&
            dosen.value !== selectedOptions.penguji1 &&
            dosen.value !== selectedOptions.penguji2 &&
            dosen.golongan >= maxGolongan
        );
    });

    // Filter Penguji 1
    const filteredPenguji1Options = dosenPengujiOptions.filter((dosen) => {
        const maxGolongan = Math.max(
            getGolongan(dosenPembimbingOptions, selectedOptions.pembimbing1),
            getGolongan(dosenPembimbingOptions, selectedOptions.pembimbing2)
        );

        return (
            dosen.value !== selectedOptions.ketua &&
            dosen.value !== selectedOptions.sekretaris &&
            dosen.value !== selectedOptions.penguji2 &&
            dosen.value !== selectedOptions.pembimbing1 &&
            dosen.value !== selectedOptions.pembimbing2 &&
            dosen.golongan >= maxGolongan
        );
    });

    // Filter Penguji 2
    const filteredPenguji2Options = dosenPengujiOptions.filter((dosen) => {
        const maxGolongan = Math.max(
            getGolongan(dosenPembimbingOptions, selectedOptions.pembimbing1),
            getGolongan(dosenPembimbingOptions, selectedOptions.pembimbing2)
        );

        return (
            dosen.value !== selectedOptions.ketua &&
            dosen.value !== selectedOptions.sekretaris &&
            dosen.value !== selectedOptions.penguji1 &&
            dosen.value !== selectedOptions.pembimbing1 &&
            dosen.value !== selectedOptions.pembimbing2 &&
            dosen.golongan >= maxGolongan
        );
    });

    return (
        <Dialog
            visible={dosensidangDialog}
            style={{ width: "450px" }}
            header={dosensidang.status_ver_ta === '2' ? "Ubah Pembimbing dan Penguji" : "Ubah Pembimbing"}
            modal
            className="p-fluid"
            footer={dosensidangDialogFooter}
            onHide={dosensidanghideDialog}
        >
            {/* Pembimbing 1*/}
            <div className="field">
                <label htmlFor="pembimbing_1_id">Pembimbing 1*</label>
                <Dropdown
                    id="pembimbing_1_id"
                    value={dosensidang.pembimbing_1_id || ""}
                    onChange={(e) => onInputChange(e, "pembimbing_1_id")}
                    options={filteredPembimbing1Options}
                    placeholder="Select a Pembimbing"
                    optionLabel="label"
                    optionValue="value"
                    required
                />
                {submitted && !dosensidang.pembimbing_1_id && (
                    <small className="p-invalid"> Pembimbing 1 is required.</small>
                )}
            </div>

            {/* Pembimbing 2*/}
            <div className="field">
                <label htmlFor="pembimbing_2_id">Pembimbing 2*</label>
                <Dropdown
                    id="pembimbing_2_id"
                    value={dosensidang.pembimbing_2_id || ""}
                    onChange={(e) => onInputChange(e, "pembimbing_2_id")}
                    options={filteredPembimbing2Options}
                    placeholder="Select a Pembimbing"
                    optionLabel="label"
                    optionValue="value"
                    required
                />
                {submitted && !dosensidang.pembimbing_2_id && (
                    <small className="p-invalid"> Pembimbing 2 is required.</small>
                )}
            </div>
            {dosensidang.status_ver_ta === '2' && (
                <>
                    {/* Ketua */}
                    <div className="field">
                        <label htmlFor="ketua_id">Ketua *</label>
                        <Dropdown
                            id="ketua_id"
                            value={dosensidang.ketua_id || ""}
                            onChange={(e) => onInputChange(e, "ketua_id")}
                            options={filteredKetuaOptions}
                            placeholder="Select a Ketua"
                            optionLabel="label"
                            optionValue="value"
                            required
                        />
                        {submitted && !dosensidang.ketua_id && (
                            <small className="p-invalid"> Ketua is required.</small>
                        )}
                    </div>

                    {/* Sekretaris */}
                    <div className="field">
                        <label htmlFor="sekretaris_id">Sekretaris *</label>
                        <Dropdown
                            id="sekretaris_id"
                            value={dosensidang.sekretaris_id || ""}
                            onChange={(e) => onInputChange(e, "sekretaris_id")}
                            options={filteredSekretarisOptions}
                            placeholder="Select a Sekretaris"
                            optionLabel="label"
                            optionValue="value"
                            required
                        />
                        {submitted && !dosensidang.sekretaris_id && (
                            <small className="p-invalid"> Sekretaris is required.</small>
                        )}
                    </div>

                    {/* Penguji 1 */}
                    <div className="field">
                        <label htmlFor="penguji_1_id">Penguji 1 *</label>
                        <Dropdown
                            id="penguji_1_id"
                            value={dosensidang.penguji_1_id || ""}
                            onChange={(e) => onInputChange(e, "penguji_1_id")}
                            options={filteredPenguji1Options}
                            placeholder="Select a Penguji 1"
                            optionLabel="label"
                            optionValue="value"
                            required
                        />
                        {submitted && !dosensidang.penguji_1_id && (
                            <small className="p-invalid"> Penguji 1 is required.</small>
                        )}
                    </div>

                    {/* Penguji 2 */}
                    <div className="field">
                        <label htmlFor="penguji_2_id">Penguji 2 *</label>
                        <Dropdown
                            id="penguji_2_id"
                            value={dosensidang.penguji_2_id || ""}
                            onChange={(e) => onInputChange(e, "penguji_2_id")}
                            options={filteredPenguji2Options}
                            placeholder="Select a Penguji 2"
                            optionLabel="label"
                            optionValue="value"
                            required
                        />
                        {submitted && !dosensidang.penguji_2_id && (
                            <small className="p-invalid"> Penguji 2 is required.</small>
                        )}
                    </div>
                </>
            )}
        </Dialog>
    );
};

export default DosenSidangForm;
