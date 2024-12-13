import { React, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import EditableDropdown from "@/Components/EditableDropdown";

const PklForm = ({
    pklDialog,
    pkl,
    submitted,
    roleOptions,
    tempatOptions,
    pklDialogFooter,
    hideDialog,
    setpkl,
}) => {
    console.log(pkl);
    const today = new Date();
    const parseDate = (dateString) => {
        if (!dateString) return null;
        const [year, month, day] = dateString.split("-");
        return new Date(year, month - 1, day);
    };
    const minDate = new Date(today);
    minDate.setDate(minDate.getDate() + 1);
    const [tglAwalPkl, setTglAwalPkl] = useState(pkl.tgl_awal_pkl ? parseDate(pkl.tgl_awal_pkl) : null);
    const [tglAkhirPkl, setTglAkhirPkl] = useState(pkl.tgl_akhir_pkl ? parseDate(pkl.tgl_akhir_pkl) : null);

    const handleAwalChange = (e) => {
        const selectedDate = e.value;
        setTglAwalPkl(selectedDate);
        setpkl((prev) => ({
            ...prev,
            tgl_awal_pkl: formatDate(selectedDate),
        }));

        // Reset tglAkhirPkl jika tanggal awal berubah dan akhir jadi tidak valid
        if (tglAkhirPkl && selectedDate > tglAkhirPkl) {
            setTglAkhirPkl(null);
            setpkl((prev) => ({
                ...prev,
                tgl_akhir_pkl: "",
            }));
        }
    };

    const handleAkhirChange = (e) => {
        const selectedDate = e.value;
        if (tglAwalPkl && selectedDate < tglAwalPkl) {
            alert("Tanggal akhir tidak boleh kurang dari tanggal awal.");
        } else {
            setTglAkhirPkl(selectedDate);
            setpkl((prev) => ({
                ...prev,
                tgl_akhir_pkl: formatDate(selectedDate),
            }));
        }
    };

    const formatDate = (date) => {
        if (!date) return "";
        return date.toLocaleDateString("en-CA", {
            timeZone: "Asia/Jakarta",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
    };
    const onInputChange = (e, field) => {
        const value = e.target ? e.target.value : e.value;
        setpkl((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };

    const onInputDrChange = (value, field) => {
        setpkl((prevState) => ({
            ...prevState,
            [field]: value, // Update the pkl state with the new value
        }));
    };
    return (
        <Dialog
            visible={pklDialog}
            style={{ width: "450px" }}
            header="Usulan Tempat Pkl Details"
            modal
            className="p-fluid"
            footer={pklDialogFooter}
            onHide={hideDialog}
        >
            {/* Tempat Pkl ID */}
            <div className="field">
                <label htmlFor="nama_tempat_pkl">Tempat PKL</label>
                <EditableDropdown
                    id="nama_tempat_pkl"
                    value={pkl.nama_tempat_pkl || ""}
                    onChange={(value) => onInputDrChange(value, "nama_tempat_pkl")}
                    options={tempatOptions}
                    placeholder="Select or type a Tempat PKL"
                    required={true}
                />
                {submitted && !pkl.nama_tempat_pkl && (
                    <small className="p-invalid">Tempat PKL is required.</small>
                )}
            </div>


            {/* Role Pkl ID */}
            <div className="field">
                <label htmlFor="nama_role">Role PKL</label>
                <EditableDropdown
                    id="nama_role"
                    value={pkl.nama_role || ""}
                    onChange={(value) => onInputDrChange(value, "nama_role")}
                    options={roleOptions}
                    placeholder="Select or type a Role PKL"
                    required={true}
                />
                {submitted && !pkl.nama_role && (
                    <small className="p-invalid">Role PKL is required.</small>
                )}
            </div>


            {/* Alamat Perusahaan */}
            <div className="field">
                <label htmlFor="alamat_tempat_pkl">Alamat Perusahaan</label>
                <InputText
                    id="alamat_tempat_pkl"
                    value={pkl.alamat_tempat_pkl || ''}
                    onChange={(e) => onInputChange(e, "alamat_tempat_pkl")}
                    required
                    autoFocus
                    className={classNames({
                        "p-invalid": submitted && !pkl.alamat_tempat_pkl,
                    })}
                />
                {submitted && !pkl.alamat_tempat_pkl && (
                    <small className="p-invalid">Alamat Perusahaan is required.</small>
                )}
            </div>

            {/* Kota Perusahaan */}
            <div className="field">
                <label htmlFor="kota_perusahaan">Kota Perusahaan</label>
                <InputText
                    id="kota_perusahaan"
                    value={pkl.kota_perusahaan || ''}
                    onChange={(e) => onInputChange(e, "kota_perusahaan")}
                    required
                    autoFocus
                    className={classNames({
                        "p-invalid": submitted && !pkl.kota_perusahaan,
                    })}
                />
                {submitted && !pkl.kota_perusahaan && (
                    <small className="p-invalid">Kota Perusahaan is required.</small>
                )}
            </div>

            {/* Tanggal Awal Pkl */}
            <div className="field">
                <label htmlFor="tgl_awal_pkl">Tanggal Awal Pkl</label>
                <Calendar
                    id="tgl_awal_pkl"
                    showIcon
                    showButtonBar
                    dateFormat="dd/mm/yy"
                    value={tglAwalPkl}
                    onChange={handleAwalChange}
                    placeholder="Pilih Tanggal"
                    minDate={minDate}
                />
            </div>

            {/* Tanggal Akhir Pkl */}
            <div className="field">
                <label htmlFor="tgl_akhir_pkl">Tanggal Akhir Pkl</label>
                <Calendar
                    id="tgl_akhir_pkl"
                    showIcon
                    showButtonBar
                    dateFormat="dd/mm/yy"
                    value={tglAkhirPkl}
                    onChange={handleAkhirChange}
                    placeholder="Pilih Tanggal"
                    minDate={tglAwalPkl || minDate}
                />
            </div>
        </Dialog>
    );
};

export default PklForm;
