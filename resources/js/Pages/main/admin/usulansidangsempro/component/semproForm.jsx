import React from "react";
import { Dialog } from "primereact/dialog";
import { RadioButton } from "primereact/radiobutton";
import { InputTextarea } from "primereact/inputtextarea";
import { classNames } from "primereact/utils";

const SemproForm = ({
    semproDialog,
    sempro,
    submitted,
    semproDialogFooter,
    hideDialog,
    setsempro,
}) => {
    const onInputChange = (e, field) => {
        const value = e.target ? e.target.value : e.value;
        setsempro((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };
    // console.log(dosenOptions);
    const onStatusChange = (e) => {
        let _sempro = { ...sempro };
        _sempro["status_ver_sempro"] = e.value;

        setsempro(_sempro);

        setShowAdditionalForm(e.value === "3");
    };

    return (
        <Dialog
            visible={semproDialog}
            style={{ width: "450px" }}
            header="Verifikasi Usulan Tempat PKL"
            modal
            className="p-fluid"
            footer={semproDialogFooter}
            onHide={hideDialog}
        >
            {/* Status */}
            <div className="field">
                <label className="mb-3">Status *</label>
                <div className="formgrid grid">
                    <div className="field-radiobutton col-4">
                        <RadioButton
                            inputId="status_ver_sempro1"
                            name="status_ver_sempro"
                            value="1"
                            onChange={onStatusChange}
                            checked={sempro.status_ver_sempro === "1"}
                        />
                        <label htmlFor="status_ver_sempro1">Ditolak</label>
                    </div>
                    <div className="field-radiobutton col-4">
                        <RadioButton
                            inputId="status_ver_sempro4"
                            name="status_ver_sempro"
                            value="4"
                            onChange={onStatusChange}
                            checked={sempro.status_ver_sempro === "4"}
                        />
                        <label htmlFor="status_ver_sempro4">Butuh Revisi</label>
                    </div>
                    <div className="field-radiobutton col-4">
                        <RadioButton
                            inputId="status_ver_sempro3"
                            name="status_ver_sempro"
                            value="3"
                            onChange={onStatusChange}
                            checked={sempro.status_ver_sempro === "3"}
                        />
                        <label htmlFor="status_ver_sempro3">Diterima</label>
                    </div>
                </div>
            </div>
            {/* Komentar */}
            <div className="field">
                <label htmlFor="komentar">Komentar *</label>
                <InputTextarea
                    id="komentar"
                    value={sempro.komentar || ''}
                    onChange={(e) => onInputChange(e, "komentar")}
                    required
                    autoFocus
                    className={classNames({
                        "p-invalid": submitted && !sempro.komentar,
                    })}
                />
                {submitted && !sempro.komentar && (
                    <small className="p-invalid">Komentar is required.</small>
                )}
            </div>

        </Dialog>
    );
};

export default SemproForm;
