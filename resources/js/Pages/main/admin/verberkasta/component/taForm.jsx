import React from "react";
import { Dialog } from "primereact/dialog";
import { RadioButton } from "primereact/radiobutton";
import { InputTextarea } from "primereact/inputtextarea";
import { classNames } from "primereact/utils";

const TaForm = ({
    taDialog,
    ta,
    submitted,
    taDialogFooter,
    hideDialog,
    setta,
}) => {
    const onInputChange = (e, field) => {
        const value = e.target ? e.target.value : e.value;
        setta((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };
    // console.log(dosenOptions);
    const onStatusChange = (e) => {
        let _ta = { ...ta };
        _ta["status_ver_ta"] = e.value;

        setta(_ta);

        setShowAdditionalForm(e.value === "3");
    };

    return (
        <Dialog
            visible={taDialog}
            style={{ width: "450px" }}
            header="Verifikasi Berkas TA"
            modal
            className="p-fluid"
            footer={taDialogFooter}
            onHide={hideDialog}
        >
            {/* Status */}
            <div className="field">
                <label className="mb-3">Status *</label>
                <div className="formgrid grid">
                    <div className="field-radiobutton col-4">
                        <RadioButton
                            inputId="status_ver_ta0"
                            name="status_ver_ta"
                            value="0"
                            onChange={onStatusChange}
                            checked={ta.status_ver_ta === "0"}
                        />
                        <label htmlFor="status_ver_ta0">Ditolak</label>
                    </div>
                    <div className="field-radiobutton col-4">
                        <RadioButton
                            inputId="status_ver_ta3"
                            name="status_ver_ta"
                            value="3"
                            onChange={onStatusChange}
                            checked={ta.status_ver_ta === "3"}
                        />
                        <label htmlFor="status_ver_ta3">Butuh Revisi</label>
                    </div>
                    <div className="field-radiobutton col-4">
                        <RadioButton
                            inputId="status_ver_ta2"
                            name="status_ver_ta"
                            value="2"
                            onChange={onStatusChange}
                            checked={ta.status_ver_ta === "2"}
                        />
                        <label htmlFor="status_ver_ta2">Diterima</label>
                    </div>
                </div>
            </div>
            {/* Komentar */}
            <div className="field">
                <label htmlFor="komentar_ta">Komentar *</label>
                <InputTextarea
                    id="komentar_ta"
                    value={ta.komentar_ta || ''}
                    onChange={(e) => onInputChange(e, "komentar_ta")}
                    required
                    autoFocus
                    className={classNames({
                        "p-invalid": submitted && !ta.komentar_ta,
                    })}
                />
                {submitted && !ta.komentar_ta && (
                    <small className="p-invalid">Komentar is required.</small>
                )}
            </div>

        </Dialog>
    );
};

export default TaForm;
