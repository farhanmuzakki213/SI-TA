import React from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';

const SesiForm = ({
    sesiDialog,
    sesi,
    submitted,
    sesiDialogFooter,
    hideDialog,
    setsesi,
}) => {

    const onInputChange = (e, field) => {
        const value = e.target ? e.target.value : e.value;
        setsesi((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };

    return (
        <Dialog
            visible={sesiDialog}
            style={{ width: "450px" }}
            header="Sesi Details"
            modal
            className="p-fluid"
            footer={sesiDialogFooter}
            onHide={hideDialog}
        >
            {/* Nama Sesi */}
            <div className="field">
                <label htmlFor="periode_sesi">Periode Sesi</label>
                <InputText
                    id="periode_sesi"
                    value={sesi.periode_sesi || ''}
                    onChange={(e) => onInputChange(e, "periode_sesi")}
                    required
                    autoFocus
                    className={classNames({
                        "p-invalid": submitted && !sesi.periode_sesi,
                    })}
                />
                {submitted && !sesi.periode_sesi && (
                    <small className="p-invalid">Periode Sesi is required.</small>
                )}
            </div>

        </Dialog>
    );
};

export default SesiForm;
