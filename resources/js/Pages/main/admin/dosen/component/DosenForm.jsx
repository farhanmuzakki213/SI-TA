import React from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { RadioButton } from 'primereact/radiobutton';
import { classNames } from 'primereact/utils';
import { useState } from 'react';
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";

const DosenForm = ({
    dosenDialog,
    dosen,
    submitted,
    prodiOptions,
    dosenDialogFooter,
    hideDialog,
    setdosen,
}) => {
    const [passwordError, setPasswordError] = useState('');
    const [passwordsError, setPasswordsError] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [emailError, setEmailError] = useState(null);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible((prev) => !prev);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible((prev) => !prev);
    };
    // Validasi email dengan regex
    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Validasi password dengan syarat minimal 8 karakter, ada huruf besar, huruf kecil, angka, dan karakter spesial
    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    const onInputChange = (e, field) => {
        const value = e.target ? e.target.value : e.value;
        setdosen((prevState) => ({
            ...prevState,
            [field]: value,
        }));

        if (field === 'email') {
            if (!validateEmail(value)) {
                setEmailError("Invalid email format");
            } else {
                setEmailError(null);
            }
        }

        if (field === 'password') {
            if (!validatePassword(value)) {
                setPasswordError(
                    <>
                        <div>Password must:</div>
                        <ul>
                            <li>Be at least 8 characters long</li>
                            <li>Include an uppercase letter</li>
                            <li>Include a lowercase letter</li>
                            <li>Include a number</li>
                            <li>Include a special character</li>
                        </ul>
                    </>
                );
            } else {
                setPasswordError(null);
            }
        }

        if (field === 'password_confirmation') {
            // Validasi password konfirmasi
            if (value !== dosen.password) {
                setPasswordsError("Passwords do not match.");
            } else {
                setPasswordsError(null);
            }
        }
    };
    const onStatusChange = (e) => {
        let _dosen = { ...dosen };
        _dosen['status_dosen'] = e.value;

        setdosen(_dosen);
    };

    return (
        <Dialog
            visible={dosenDialog}
            style={{ width: "450px" }}
            header="Dosen Details"
            modal
            className="p-fluid"
            footer={dosenDialogFooter}
            onHide={hideDialog}
        >
            {/* Nama Dosen */}
            <div className="field">
                <label htmlFor="nama_dosen">Nama Dosen</label>
                <InputText
                    id="nama_dosen"
                    value={dosen.nama_dosen || ''}
                    onChange={(e) => onInputChange(e, "nama_dosen")}
                    required
                    autoFocus
                    className={classNames({
                        "p-invalid": submitted && !dosen.nama_dosen,
                    })}
                />
                {submitted && !dosen.nama_dosen && (
                    <small className="p-invalid">Nama Dosen is required.</small>
                )}
            </div>

            {/* User email */}
            {!dosen.id_dosen && (
            <div className="field">
                <label htmlFor="email">Email</label>
                <InputText
                    id="email"
                    value={dosen.email || ''}
                    onChange={(e) => onInputChange(e, "email")}
                    required
                    autoFocus
                    className={classNames({
                        "p-invalid": (submitted && !dosen.email) || emailError,
                    })}
                />
                {submitted && !dosen.email && (
                    <small className="p-invalid">Email is required.</small>
                )}
                {emailError && (
                    <small className="p-invalid">{emailError}</small>
                )}
            </div>
            )}

            {/* User Password */}
            {!dosen.id_dosen && (
            <div className="field" style={{ position: 'relative' }}>
                <label htmlFor="password">Password</label>
                <div style={{ position: "relative" }}>
                    <InputText
                        id="password"
                        type={passwordVisible ? "text" : "password"} // Toggle tipe input
                        value={dosen.password}
                        onChange={(e) => onInputChange(e, "password")}
                        required
                        className={classNames({
                            "p-invalid": (submitted && !dosen.password) || passwordError,
                        })}
                        style={{ paddingRight: "40px" }} // Add padding to make space for the icon
                    />
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        style={{
                            position: "absolute",
                            right: "15px",
                            top: "55%",
                            transform: "translateY(-50%)",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            fontSize: "18px",
                            color: "inherit",
                            padding: 0,
                        }}
                    >
                        {passwordVisible ? <FaRegEyeSlash /> : <FaRegEye />}
                    </button>
                </div>
                {submitted && !dosen.password && (
                    <small className="p-invalid">Password is required.</small>
                )}
                {passwordError && (
                    <small className="p-invalid">{passwordError}</small>
                )}
            </div>
            )}

            {/* User Password Confirmation */}
            {!dosen.id_dosen && (
            <div className="field" style={{ position: 'relative' }}>
                <label htmlFor="password_confirmation">Confirm Password</label>
                <div style={{ position: "relative" }}>
                    <InputText
                        id="password_confirmation"
                        type={confirmPasswordVisible ? "text" : "password"} // Toggle tipe input
                        value={dosen.password_confirmation}
                        onChange={(e) => onInputChange(e, "password_confirmation")}
                        required
                        className={classNames({
                            "p-invalid": (submitted && !dosen.password_confirmation) || passwordsError,
                        })}
                        style={{ paddingRight: "40px" }} // Add padding to make space for the icon
                    />
                    <button
                        type="button"
                        onClick={toggleConfirmPasswordVisibility}
                        style={{
                            position: "absolute",
                            right: "15px",
                            top: "55%",
                            transform: "translateY(-50%)",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            fontSize: "18px",
                            color: "inherit",
                            padding: 0,
                        }}
                    >
                        {confirmPasswordVisible ? <FaRegEyeSlash /> : <FaRegEye />}
                    </button>
                </div>
                {submitted && !dosen.password_confirmation && (
                    <small className="p-invalid">Please confirm your password.</small>
                )}
                {passwordsError && (
                    <small className="p-invalid">{passwordsError}</small>
                )}
            </div>
            )}

            {/* Prodi ID */}
            <div className="field">
                <label htmlFor="prodi_id">Prodi</label>
                <Dropdown
                    id="prodi_id"
                    value={dosen.prodi_id || ''}
                    onChange={(e) => onInputChange(e, "prodi_id")}
                    options={prodiOptions}
                    placeholder="Select a Prodi"
                    optionLabel="label"
                    required
                />
                {submitted && !dosen.prodi_id && (
                    <small className="p-invalid">Prodi is required.</small>
                )}
            </div>

            {/* NIDN */}
            <div className="field">
                <label htmlFor="nidn_dosen">NIDN</label>
                <input
                    type="number"
                    id="nidn_dosen"
                    value={dosen.nidn_dosen || ''}
                    onChange={(e) => onInputChange(e, "nidn_dosen")}
                    required
                    min="0"
                    className="p-inputtext p-component"
                />
                {submitted && !dosen.nidn_dosen && (
                    <small className="p-invalid">NIDN is required.</small>
                )}
            </div>

            {/* Gender */}
            <div className="field">
                <label htmlFor="gender">Gender</label>
                <Dropdown
                    id="gender"
                    value={dosen.gender || ''}
                    onChange={(e) => onInputChange(e, "gender")}
                    options={[
                        { label: "laki-laki", value: "laki-laki" },
                        { label: "perempuan", value: "perempuan" },
                    ]}
                    placeholder="Select a Gender"
                    required
                />
                {submitted && !dosen.gender && (
                    <small className="p-invalid">Gender is required.</small>
                )}
            </div>

            {/* Status Dosen */}
            <div className="field">
                <label className="mb-3">Status Dosen</label>
                <div className="formgrid grid">
                    <div className="field-radiobutton col-6">
                        <RadioButton
                            inputId="status1"
                            name="status"
                            value="0"
                            onChange={onStatusChange}
                            checked={dosen.status_dosen === "0"}
                        />
                        <label htmlFor="status1">Tidak Aktif</label>
                    </div>
                    <div className="field-radiobutton col-6">
                        <RadioButton
                            inputId="status2"
                            name="status"
                            value="1"
                            onChange={onStatusChange}
                            checked={dosen.status_dosen === "1"}
                        />
                        <label htmlFor="status2">Aktif</label>
                    </div>
                </div>
            </div>
        </Dialog>
    );
};

export default DosenForm;
