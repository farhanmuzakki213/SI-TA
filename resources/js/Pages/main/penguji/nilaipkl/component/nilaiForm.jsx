import React from 'react';
import { Dialog } from 'primereact/dialog';
import { InputNumber } from 'primereact/inputnumber';
import { classNames } from 'primereact/utils';
import { Dropdown } from 'primereact/dropdown';

const NilaipklForm = ({
    nilaipklDialog,
    nilaipkl,
    submitted,
    nilaipklDialogFooter,
    hideDialog,
    setnilaipkl,
    mahasiswaPklOptions,
}) => {
    const onInputChange = (e, field) => {
        const value = e.target ? e.target.value : e.value;
        setnilaipkl((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };

    const setValue = (e, field) => {
        const value = e.value;
        setnilaipkl((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };

    return (
        <Dialog
            visible={nilaipklDialog}
            style={{ width: "450px" }}
            header="Laporan PKL Details"
            modal
            className="p-fluid"
            footer={nilaipklDialogFooter}
            onHide={hideDialog}
        >
            {/* PKL MHS ID */}
            <div className="field">
                <label htmlFor="pkl_mhs_id">Nama Mahasiswa</label>
                <Dropdown
                    id="pkl_mhs_id"
                    value={nilaipkl.pkl_mhs_id || ''}
                    onChange={(e) => onInputChange(e, "pkl_mhs_id")}
                    options={mahasiswaPklOptions}
                    placeholder="Select a mahasiswa"
                    optionLabel="label"
                    required
                />
                {submitted && !nilaipkl.pkl_mhs_id && (
                    <small className="p-invalid">Nama Mahasiswa is required.</small>
                )}
            </div>

            {/* Bahasa */}
            <div className="field">
                <label htmlFor="bahasa">Bahasa</label>
                <InputNumber
                    inputId="bahasa"
                    value={nilaipkl.bahasa || ''}
                    onValueChange={(e) => setValue(e, "bahasa")}
                    required
                    mode="decimal"
                    showButtons
                    min={0}
                    max={100}
                    minFractionDigits={2}
                    className={classNames({
                        "p-invalid": submitted && !nilaipkl.bahasa,
                    })}
                />
                {submitted && !nilaipkl.bahasa && (
                    <small className="p-invalid">Bahasa is required.</small>
                )}
            </div>

            {/* Analisis */}
            <div className="field">
                <label htmlFor="analisis">Analisis</label>
                <InputNumber
                    inputId="analisis"
                    value={nilaipkl.analisis || ''}
                    onValueChange={(e) => setValue(e, "analisis")}
                    required
                    mode="decimal"
                    showButtons
                    min={0}
                    max={100}
                    minFractionDigits={2}
                    className={classNames({
                        "p-invalid": submitted && !nilaipkl.analisis,
                    })}
                />
                {submitted && !nilaipkl.analisis && (
                    <small className="p-invalid">Analisis is required.</small>
                )}
            </div>

            {/* Sikap */}
            <div className="field">
                <label htmlFor="sikap">Sikap</label>
                <InputNumber
                    inputId="sikap"
                    value={nilaipkl.sikap || ''}
                    onValueChange={(e) => setValue(e, "sikap")}
                    required
                    mode="decimal"
                    showButtons
                    min={0}
                    max={100}
                    minFractionDigits={2}
                    className={classNames({
                        "p-invalid": submitted && !nilaipkl.sikap,
                    })}
                />
                {submitted && !nilaipkl.sikap && (
                    <small className="p-invalid">Sikap is required.</small>
                )}
            </div>


            {/* Komunikasi */}
            <div className="field">
                <label htmlFor="komunikasi">Komunikasi</label>
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


            {/* Penyajian */}
            <div className="field">
                <label htmlFor="penyajian">Penyajian</label>
                <InputNumber
                    inputId="penyajian"
                    value={nilaipkl.penyajian || ''}
                    onValueChange={(e) => setValue(e, "penyajian")}
                    required
                    mode="decimal"
                    showButtons
                    min={0}
                    max={100}
                    minFractionDigits={2}
                    className={classNames({
                        "p-invalid": submitted && !nilaipkl.penyajian,
                    })}
                />
                {submitted && !nilaipkl.penyajian && (
                    <small className="p-invalid">Penyajian is required.</small>
                )}
            </div>


            {/* Penguasaan */}
            <div className="field">
                <label htmlFor="penguasaan">Penguasaan</label>
                <InputNumber
                    inputId="penguasaan"
                    value={nilaipkl.penguasaan || ''}
                    onValueChange={(e) => setValue(e, "penguasaan")}
                    required
                    mode="decimal"
                    showButtons
                    min={0}
                    max={100}
                    minFractionDigits={2}
                    className={classNames({
                        "p-invalid": submitted && !nilaipkl.penguasaan,
                    })}
                />
                {submitted && !nilaipkl.penguasaan && (
                    <small className="p-invalid">Penguasaan is required.</small>
                )}
            </div>
        </Dialog>
    );
};

export default NilaipklForm;
