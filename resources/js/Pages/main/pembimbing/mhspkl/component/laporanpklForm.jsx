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
    console.log("Data form: ",laporanpkl);
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

    const setValue = (e, field) => {
        const value = e.value;
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
            {/* Keaktifan */}
            <div className="field">
                <label htmlFor="keaktifan">Keaktifan *</label>
                <InputNumber
                    inputId="keaktifan"
                    value={laporanpkl.keaktifan || ''}
                    onValueChange={(e) => setValue(e, "keaktifan")}
                    required
                    mode="decimal"
                    showButtons
                    min={0}
                    max={100}
                    minFractionDigits={2}
                    className={classNames({
                        "p-invalid": submitted && !laporanpkl.keaktifan,
                    })}
                />
                {submitted && !laporanpkl.keaktifan && (
                    <small className="p-invalid">Keaktifan is required.</small>
                )}
            </div>

            {/* Komunikasi */}
            <div className="field">
                <label htmlFor="komunikasi">Komunikasi *</label>
                <InputNumber
                    inputId="komunikasi"
                    value={laporanpkl.komunikasi || ''}
                    onValueChange={(e) => setValue(e, "komunikasi")}
                    required
                    mode="decimal"
                    showButtons
                    min={0}
                    max={100}
                    minFractionDigits={2}
                    className={classNames({
                        "p-invalid": submitted && !laporanpkl.komunikasi,
                    })}
                />
                {submitted && !laporanpkl.komunikasi && (
                    <small className="p-invalid">Komunikasi is required.</small>
                )}
            </div>

            {/* Problem Solving */}
            <div className="field">
                <label htmlFor="problem">Problem Solving *</label>
                <InputNumber
                    inputId="problem_solving"
                    value={laporanpkl.problem_solving || ''}
                    onValueChange={(e) => setValue(e, "problem_solving")}
                    required
                    mode="decimal"
                    showButtons
                    min={0}
                    max={100}
                    minFractionDigits={2}
                    className={classNames({
                        "p-invalid": submitted && !laporanpkl.problem_solving,
                    })}
                />
                {submitted && !laporanpkl.problem_solving && (
                    <small className="p-invalid">Problem Solving is required.</small>
                )}
            </div>

            {/* Status */}
            <div className="field">
                <label className="mb-3">Status *</label>
                <div className="formgrid grid">
                    <div className="field-radiobutton col-4">
                        <RadioButton
                            inputId="status2"
                            name="status"
                            value="1"
                            onChange={onStatusChange}
                            checked={laporanpkl.status === "1"}
                        />
                        <label htmlFor="status2">Butuh Revisi</label>
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
