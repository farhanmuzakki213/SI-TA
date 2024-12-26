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
        _ta["status_ver_proposal"] = e.value;

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
                            inputId="status_ver_proposal0"
                            name="status_ver_proposal"
                            value="0"
                            onChange={onStatusChange}
                            checked={ta.status_ver_proposal === "0"}
                        />
                        <label htmlFor="status_ver_proposal0">Ditolak</label>
                    </div>
                    <div className="field-radiobutton col-4">
                        <RadioButton
                            inputId="status_ver_proposal3"
                            name="status_ver_proposal"
                            value="3"
                            onChange={onStatusChange}
                            checked={ta.status_ver_proposal === "3"}
                        />
                        <label htmlFor="status_ver_proposal3">Butuh Revisi</label>
                    </div>
                    <div className="field-radiobutton col-4">
                        <RadioButton
                            inputId="status_ver_proposal2"
                            name="status_ver_proposal"
                            value="2"
                            onChange={onStatusChange}
                            checked={ta.status_ver_proposal === "2"}
                        />
                        <label htmlFor="status_ver_proposal2">Diterima</label>
                    </div>
                </div>
            </div>
            {/* Komentar */}
            <div className="field">
                <label htmlFor="komentar_proposal">Komentar *</label>
                <InputTextarea
                    id="komentar_proposal"
                    value={ta.komentar_proposal || ''}
                    onChange={(e) => onInputChange(e, "komentar_proposal")}
                    required
                    autoFocus
                    className={classNames({
                        "p-invalid": submitted && !ta.komentar_proposal,
                    })}
                />
                {submitted && !ta.komentar_proposal && (
                    <small className="p-invalid">Komentar is required.</small>
                )}
            </div>

        </Dialog>
    );
};

export default TaForm;
