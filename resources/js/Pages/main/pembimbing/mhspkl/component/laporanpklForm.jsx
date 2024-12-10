import { React } from "react";
import { Dialog } from "primereact/dialog";
import { RadioButton } from "primereact/radiobutton";
import "primeicons/primeicons.css";
import { InputTextarea } from "primereact/inputtextarea";
import { classNames } from "primereact/utils";
import { InputNumber } from "primereact/inputnumber";

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

    return (
        <Dialog
            visible={laporanpklDialog}
            style={{ width: "450px" }}
            header="Nilai Laporan Details"
            modal
            className="p-fluid"
            footer={laporanpklDialogFooter}
            onHide={hideDialog}
        >
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
