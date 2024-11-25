import { React } from "react";
import { Dialog } from "primereact/dialog";
import { RadioButton } from "primereact/radiobutton";
import "primeicons/primeicons.css";
import { InputTextarea } from "primereact/inputtextarea";
import { classNames } from "primereact/utils";

const LaporanpklForm = ({
    laporanpklDialog,
    laporanpkl,
    submitted,
    laporanpklDialogFooter,
    hideDialog,
    setlaporanpkl,
}) => {
    const onInputChange = (e, field) => {
        const value = e.target ? e.target.value : e.value;
        setlaporanpkl((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };
    const onStatusChange = (e) => {
        let _laporanpkl = { ...laporanpkl };
        _laporanpkl["status"] = e.value;

        setlaporanpkl(_laporanpkl);
    };

    return (
        <Dialog
            visible={laporanpklDialog}
            style={{ width: "450px" }}
            header="Laporan Tempat PKL Details"
            modal
            className="p-fluid"
            footer={laporanpklDialogFooter}
            onHide={hideDialog}
        >
            {/* Status */}
            <div className="field">
                <label className="mb-3">Status *</label>
                <div className="formgrid grid">
                    <div className="field-radiobutton col-4">
                        <RadioButton
                            inputId="status2"
                            name="status"
                            value="2"
                            onChange={onStatusChange}
                            checked={laporanpkl.status === "2"}
                        />
                        <label htmlFor="status2">Ditolak</label>
                    </div>
                    <div className="field-radiobutton col-4">
                        <RadioButton
                            inputId="status3"
                            name="status"
                            value="3"
                            onChange={onStatusChange}
                            checked={laporanpkl.status === "3"}
                        />
                        <label htmlFor="status3">Diterima</label>
                    </div>
                </div>
            </div>
            {/* Komentar */}
            <div className="field">
                <label htmlFor="komentar">Komentar *</label>
                <InputTextarea
                    id="komentar"
                    value={laporanpkl.komentar || ''}
                    onChange={(e) => onInputChange(e, "komentar")}
                    required
                    autoFocus
                    className={classNames({
                        "p-invalid": submitted && !laporanpkl.komentar,
                    })}
                />
                {submitted && !laporanpkl.komentar && (
                    <small className="p-invalid">Komentar is required.</small>
                )}
            </div>

        </Dialog>
    );
};

export default LaporanpklForm;
