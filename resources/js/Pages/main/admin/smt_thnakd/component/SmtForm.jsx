import React from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { RadioButton } from 'primereact/radiobutton';

const SmtForm = ({
    smt_thnakdDialog,
    smt_thnakd,
    submitted,
    smt_thnakdDialogFooter,
    hideDialog,
    setsmt_thnakd,
}) => {

    const onInputChange = (e, field) => {
        const value = e.target ? e.target.value : e.value;
        setsmt_thnakd((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };

    const onStatusChange = (e) => {
        let _smt_thnakd = { ...smt_thnakd };
        _smt_thnakd['status_smt_thnakd'] = e.value;

        setsmt_thnakd(_smt_thnakd);
    };

    return (
        <Dialog
            visible={smt_thnakdDialog}
            style={{ width: "450px" }}
            header="Semester dam Tahun Akademik Details"
            modal
            className="p-fluid"
            footer={smt_thnakdDialogFooter}
            onHide={hideDialog}
        >
            {/* Nama smt_thnakd */}
            <div className="field">
                <label htmlFor="nama_smt_thnakd">Nama Semester dan Tahun Akademik</label>
                <InputText
                    id="nama_smt_thnakd"
                    value={smt_thnakd.nama_smt_thnakd || ''}
                    onChange={(e) => onInputChange(e, "nama_smt_thnakd")}
                    required
                    autoFocus
                    className={classNames({
                        "p-invalid": submitted && !smt_thnakd.nama_smt_thnakd,
                    })}
                />
                {submitted && !smt_thnakd.nama_smt_thnakd && (
                    <small className="p-invalid">Nama Semester dan Tahun Akademik is required.</small>
                )}
            </div>

            {/* Kode smt_thnakd */}
            <div className="field">
                <label htmlFor="kode_smt_thnakd">Kode Semester dan Tahun Akademik</label>
                <InputText
                    id="kode_smt_thnakd"
                    value={smt_thnakd.kode_smt_thnakd || ''}
                    onChange={(e) => onInputChange(e, "kode_smt_thnakd")}
                    required
                    autoFocus
                    className={classNames({
                        "p-invalid": submitted && !smt_thnakd.nama_smt_thnakd,
                    })}
                />
                {submitted && !smt_thnakd.kode_smt_thnakd && (
                    <small className="p-invalid">Kode Semester dan Tahun Akademik is required.</small>
                )}
            </div>

            {/* Status Semester */}
            <div className="field">
                <label className="mb-3">Status Semester</label>
                <div className="formgrid grid">
                    <div className="field-radiobutton col-6">
                        <RadioButton
                            inputId="status1"
                            name="status"
                            value="0"
                            onChange={onStatusChange}
                            checked={smt_thnakd.status_smt_thnakd === "0"}
                        />
                        <label htmlFor="status1">Tidak Aktif</label>
                    </div>
                    <div className="field-radiobutton col-6">
                        <RadioButton
                            inputId="status2"
                            name="status"
                            value="1"
                            onChange={onStatusChange}
                            checked={smt_thnakd.status_smt_thnakd === "1"}
                        />
                        <label htmlFor="status2">Aktif</label>
                    </div>
                </div>
            </div>
        </Dialog>
    );
};

export default SmtForm;
