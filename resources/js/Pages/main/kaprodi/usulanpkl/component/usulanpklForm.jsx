import { React } from "react";
import { Dialog } from "primereact/dialog";
import { RadioButton } from "primereact/radiobutton";
import "primeicons/primeicons.css";
import { InputTextarea } from "primereact/inputtextarea";
import { classNames } from "primereact/utils";

const UsulanpklForm = ({
    usulanpklDialog,
    usulanpkl,
    submitted,
    usulanpklDialogFooter,
    hideDialog,
    setusulanpkl,
}) => {
    const onInputChange = (e, field) => {
        const value = e.target ? e.target.value : e.value;
        setusulanpkl((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };
    const onStatusChange = (e) => {
        let _usulanpkl = { ...usulanpkl };
        _usulanpkl["status_usulan"] = e.value;

        setusulanpkl(_usulanpkl);
    };

    return (
        <Dialog
            visible={usulanpklDialog}
            style={{ width: "450px" }}
            header="Usulan Tempat PKL Details"
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

        </Dialog>
    );
};

export default UsulanpklForm;
