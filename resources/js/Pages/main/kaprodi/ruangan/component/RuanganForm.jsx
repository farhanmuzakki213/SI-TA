import React from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';

const RuanganForm = ({
    ruanganDialog,
    ruangan,
    submitted,
    ruanganDialogFooter,
    hideDialog,
    setruangan,
}) => {

    const onInputChange = (e, field) => {
        const value = e.target ? e.target.value : e.value;
        setruangan((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };

    return (
        <Dialog
            visible={ruanganDialog}
            style={{ width: "450px" }}
            header="Ruangan Details"
            modal
            className="p-fluid"
            footer={ruanganDialogFooter}
            onHide={hideDialog}
        >

            {/* Kode Ruangan */}
            <div className="field">
                <label htmlFor="kode_ruangan">Kode Ruangan</label>
                <InputText
                    id="kode_ruangan"
                    value={ruangan.kode_ruangan || ''}
                    onChange={(e) => onInputChange(e, "kode_ruangan")}
                    required
                    autoFocus
                    className={classNames({
                        "p-invalid": submitted && !ruangan.nama_ruangan,
                    })}
                />
                {submitted && !ruangan.kode_ruangan && (
                    <small className="p-invalid">Kode Ruangan is required.</small>
                )}
            </div>
        </Dialog>
    );
};

export default RuanganForm;
