import React from 'react';
import { Dialog } from 'primereact/dialog';
import { InputNumber } from 'primereact/inputnumber';
import { classNames } from 'primereact/utils';

const NilaisemproForm = ({
    nilaisemproDialog,
    nilaisempro,
    submitted,
    nilaisemproDialogFooter,
    hideDialog,
    setnilaisempro,
}) => {

    const setValue = (e, field) => {
        const value = e.value;
        setnilaisempro((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };
    // console.log("form nilai",nilaisempro);

    return (
        <Dialog
            visible={nilaisemproDialog}
            style={{ width: "450px" }}
            header="Nilai SEMPRO Details"
            modal
            className="p-fluid"
            footer={nilaisemproDialogFooter}
            onHide={hideDialog}
        >
            {/* Pendahuluan */}
            <div className="field">
                <label htmlFor="pendahuluan">Pendahuluan *</label>
                <InputNumber
                    inputId="pendahuluan"
                    value={nilaisempro.pendahuluan || ''}
                    onValueChange={(e) => setValue(e, "pendahuluan")}
                    required
                    mode="decimal"
                    showButtons
                    min={0}
                    max={100}
                    minFractionDigits={2}
                    className={classNames({
                        "p-invalid": submitted && !nilaisempro.pendahuluan,
                    })}
                />
                {submitted && !nilaisempro.pendahuluan && (
                    <small className="p-invalid">Pendahuluan is required.</small>
                )}
            </div>

            {/* Tinjauan Pustaka */}
            <div className="field">
                <label htmlFor="tinjauan_pustaka">Tinjauan Pustaka *</label>
                <InputNumber
                    inputId="tinjauan_pustaka"
                    value={nilaisempro.tinjauan_pustaka || ''}
                    onValueChange={(e) => setValue(e, "tinjauan_pustaka")}
                    required
                    mode="decimal"
                    showButtons
                    min={0}
                    max={100}
                    minFractionDigits={2}
                    className={classNames({
                        "p-invalid": submitted && !nilaisempro.tinjauan_pustaka,
                    })}
                />
                {submitted && !nilaisempro.tinjauan_pustaka && (
                    <small className="p-invalid">Tinjauan Pustaka is required.</small>
                )}
            </div>

            {/* Metodologi Penelitian */}
            <div className="field">
                <label htmlFor="metodologi_penelitian">Metodologi Penelitian *</label>
                <InputNumber
                    inputId="metodologi_penelitian"
                    value={nilaisempro.metodologi_penelitian || ''}
                    onValueChange={(e) => setValue(e, "metodologi_penelitian")}
                    required
                    mode="decimal"
                    showButtons
                    min={0}
                    max={100}
                    minFractionDigits={2}
                    className={classNames({
                        "p-invalid": submitted && !nilaisempro.metodologi_penelitian,
                    })}
                />
                {submitted && !nilaisempro.metodologi_penelitian && (
                    <small className="p-invalid">Metodologi Penelitian is required.</small>
                )}
            </div>

            {/* Penggunaan Bahasa dan Tata tulis */}
            <div className="field">
                <label htmlFor="bahasa_dan_tata_tulis">Penggunaan Bahasa dan Tata tulis *</label>
                <InputNumber
                    inputId="bahasa_dan_tata_tulis"
                    value={nilaisempro.bahasa_dan_tata_tulis || ''}
                    onValueChange={(e) => setValue(e, "bahasa_dan_tata_tulis")}
                    required
                    mode="decimal"
                    showButtons
                    min={0}
                    max={100}
                    minFractionDigits={2}
                    className={classNames({
                        "p-invalid": submitted && !nilaisempro.bahasa_dan_tata_tulis,
                    })}
                />
                {submitted && !nilaisempro.bahasa_dan_tata_tulis && (
                    <small className="p-invalid">Penggunaan Bahasa dan Tata tulis is required.</small>
                )}
            </div>

            {/* Presentasi */}
            <div className="field">
                <label htmlFor="presentasi">Presentasi *</label>
                <InputNumber
                    inputId="presentasi"
                    value={nilaisempro.presentasi || ''}
                    onValueChange={(e) => setValue(e, "presentasi")}
                    required
                    mode="decimal"
                    showButtons
                    min={0}
                    max={100}
                    minFractionDigits={2}
                    className={classNames({
                        "p-invalid": submitted && !nilaisempro.presentasi,
                    })}
                />
                {submitted && !nilaisempro.presentasi && (
                    <small className="p-invalid">Presentasi is required.</small>
                )}
            </div>

        </Dialog>
    );
};

export default NilaisemproForm;
