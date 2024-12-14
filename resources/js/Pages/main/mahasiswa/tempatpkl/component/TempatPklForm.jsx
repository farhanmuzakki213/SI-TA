import { React, useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import "primeicons/primeicons.css";

const TempatPklForm = ({
    tempatpklDialog,
    tempatpkl,
    submitted,
    roleOptions,
    tempatOptions,
    tempatpklDialogFooter,
    hideDialog,
    settempatpkl,
}) => {
    const today = new Date();
    const parseDate = (dateString) => {
        if (!dateString) return null;
        const [year, month, day] = dateString.split("-");
        return new Date(year, month - 1, day);
    };

    const [tglAwalPkl, setTglAwalPkl] = useState(tempatpkl.tgl_awal_pkl ? parseDate(tempatpkl.tgl_awal_pkl) : null);
    const [tglAkhirPkl, setTglAkhirPkl] = useState(tempatpkl.tgl_akhir_pkl ? parseDate(tempatpkl.tgl_akhir_pkl) : null);
    const [filteredRoleOptions, setFilteredRoleOptions] = useState([]);

    const minDate = new Date(today);
    minDate.setDate(minDate.getDate() + 1);

    useEffect(() => {
        // Filter dan urutkan opsi berdasarkan tempat PKL
        const filteredRoles = roleOptions
            .filter((role) => role.tempat_pkl_id === tempatpkl.tempat_pkl_id)
            .sort((a, b) => a.label.localeCompare(b.label));
        setFilteredRoleOptions(filteredRoles);
    }, [tempatpkl.tempat_pkl_id, roleOptions]);

    const handleAwalChange = (e) => {
        const selectedDate = e.value;
        setTglAwalPkl(selectedDate);
        settempatpkl((prev) => ({
            ...prev,
            tgl_awal_pkl: formatDate(selectedDate),
        }));

        // Reset tglAkhirPkl jika tanggal awal berubah dan akhir jadi tidak valid
        if (tglAkhirPkl && selectedDate > tglAkhirPkl) {
            setTglAkhirPkl(null);
            settempatpkl((prev) => ({
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
            settempatpkl((prev) => ({
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
        settempatpkl((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };

    return (
        <Dialog
            visible={tempatpklDialog}
            style={{ width: "450px" }}
            header="Usulan Tempat Pkl Details"
            modal
            className="p-fluid"
            footer={tempatpklDialogFooter}
            onHide={hideDialog}
        >
            {/* Tempat Pkl ID */}
            <div className="field">
                <label htmlFor="tempat_pkl_id">Tempat PKL</label>
                <Dropdown
                    id="tempat_pkl_id"
                    value={tempatpkl.tempat_pkl_id || ""}
                    onChange={(e) => onInputChange(e, "tempat_pkl_id")}
                    options={tempatOptions}
                    placeholder="Select a Tempat Pkl"
                    optionLabel="label"
                    required
                />
                {submitted && !tempatpkl.tempat_pkl_id && (
                    <small className="p-invalid"> Tempat Pkl is required.</small>
                )}
            </div>

            {/* Role Pkl ID */}
            <div className="field">
                <label htmlFor="role_tempat_pkl_id">Role PKL</label>
                <Dropdown
                    id="role_tempat_pkl_id"
                    value={tempatpkl.role_tempat_pkl_id || ""}
                    onChange={(e) => onInputChange(e, "role_tempat_pkl_id")}
                    options={filteredRoleOptions}
                    placeholder="Select a Role Pkl"
                    optionLabel="label"
                    required
                />
                {submitted && !tempatpkl.role_tempat_pkl_id && (
                    <small className="p-invalid"> Role Pkl is required.</small>
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

export default TempatPklForm;
