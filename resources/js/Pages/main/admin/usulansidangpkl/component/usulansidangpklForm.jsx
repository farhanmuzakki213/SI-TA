import { React } from "react";
import { Dialog } from "primereact/dialog";
import { RadioButton } from "primereact/radiobutton";
import "primeicons/primeicons.css";
import { InputTextarea } from "primereact/inputtextarea";
import { classNames } from "primereact/utils";

const UsulansidangpklForm = ({
    usulansidangpklDialog,
    usulansidangpkl,
    submitted,
    usulansidangpklDialogFooter,
    hideDialog,
    setusulansidangpkl,
}) => {
    const onInputChange = (e, field) => {
        const value = e.target ? e.target.value : e.value;
        setusulansidangpkl((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };
    const onStatusChange = (e) => {
        let _usulansidangpkl = { ...usulansidangpkl };
        _usulansidangpkl["status_ver_pkl"] = e.value;

        setusulansidangpkl(_usulansidangpkl);
    };

    return (
        <Dialog
            visible={usulansidangpklDialog}
            style={{ width: "450px" }}
            header="Usulan Tempat PKL Details"
            modal
            className="p-fluid"
            footer={usulansidangpklDialogFooter}
            onHide={hideDialog}
        >
            {/* Status */}
            <div className="field">
                <label className="mb-3">Status *</label>
                <div className="formgrid grid">
                    <div className="field-radiobutton col-4">
                        <RadioButton
                            inputId="status_ver_pkl1"
                            name="status_ver_pkl"
                            value="1"
                            onChange={onStatusChange}
                            checked={usulansidangpkl.status_ver_pkl === "1"}
                        />
                        <label htmlFor="status_ver_pkl1">Ditolak</label>
                    </div>
                    <div className="field-radiobutton col-4">
                        <RadioButton
                            inputId="status_ver_pkl3"
                            name="status_ver_pkl"
                            value="3"
                            onChange={onStatusChange}
                            checked={usulansidangpkl.status_ver_pkl === "3"}
                        />
                        <label htmlFor="status_ver_pkl3">Diterima</label>
                    </div>
                </div>
            </div>

        </Dialog>
    );
};

export default UsulansidangpklForm;
