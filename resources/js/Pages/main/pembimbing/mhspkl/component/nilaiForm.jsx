import React from 'react';
import { Dialog } from 'primereact/dialog';
import { InputNumber } from 'primereact/inputnumber';
import { classNames } from 'primereact/utils';

const NilaipklForm = ({
    nilaipklDialog,
    nilaipkl,
    submitted,
    nilaipklDialogFooter,
    hideDialog,
    setnilaipkl,
}) => {

    const setValue = (e, field) => {
        const value = e.value;
        setnilaipkl((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };
    console.log("form nilai",nilaipkl);

    return (
        <Dialog
            visible={nilaipklDialog}
            style={{ width: "450px" }}
            header="Nilai PKL Details"
            modal
            className="p-fluid"
            footer={nilaipklDialogFooter}
            onHide={hideDialog}
        >
            {/* Keaktifan */}
            <div className="field">
                <label htmlFor="keaktifan">Keaktifan *</label>
                <InputNumber
                    inputId="keaktifan"
                    value={nilaipkl.keaktifan || ''}
                    onValueChange={(e) => setValue(e, "keaktifan")}
                    required
                    mode="decimal"
                    showButtons
                    min={0}
                    max={100}
                    minFractionDigits={2}
                    className={classNames({
                        "p-invalid": submitted && !nilaipkl.keaktifan,
                    })}
                />
                {submitted && !nilaipkl.keaktifan && (
                    <small className="p-invalid">Keaktifan is required.</small>
                )}
            </div>

            {/* Komunikasi */}
            <div className="field">
                <label htmlFor="komunikasi">Komunikasi *</label>
                <InputNumber
                    inputId="komunikasi"
                    value={nilaipkl.komunikasi || ''}
                    onValueChange={(e) => setValue(e, "komunikasi")}
                    required
                    mode="decimal"
                    showButtons
                    min={0}
                    max={100}
                    minFractionDigits={2}
                    className={classNames({
                        "p-invalid": submitted && !nilaipkl.komunikasi,
                    })}
                />
                {submitted && !nilaipkl.komunikasi && (
                    <small className="p-invalid">Komunikasi is required.</small>
                )}
            </div>

            {/* Problem Solving */}
            <div className="field">
                <label htmlFor="problem">Problem Solving *</label>
                <InputNumber
                    inputId="problem_solving"
                    value={nilaipkl.problem_solving || ''}
                    onValueChange={(e) => setValue(e, "problem_solving")}
                    required
                    mode="decimal"
                    showButtons
                    min={0}
                    max={100}
                    minFractionDigits={2}
                    className={classNames({
                        "p-invalid": submitted && !nilaipkl.problem_solving,
                    })}
                />
                {submitted && !nilaipkl.problem_solving && (
                    <small className="p-invalid">Problem Solving is required.</small>
                )}
            </div>
            
        </Dialog>
    );
};

export default NilaipklForm;
