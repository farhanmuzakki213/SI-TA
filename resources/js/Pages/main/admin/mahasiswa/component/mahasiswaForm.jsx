import React from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { RadioButton } from 'primereact/radiobutton';
import { classNames } from 'primereact/utils';
import { useState } from 'react';
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";

const MahasiswaForm = ({
    mahasiswaDialog,
    mahasiswa,
    submitted,
    kelasOptions,
    mahasiswaDialogFooter,
    hideDialog,
    setmahasiswa,
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
        setmahasiswa((prevState) => ({
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
            if (value !== mahasiswa.password) {
                setPasswordsError("Passwords do not match.");
            } else {
                setPasswordsError(null);
            }
        }
    };
    const onStatusChange = (e) => {
        let _mahasiswa = { ...mahasiswa };
        _mahasiswa['status_mahasiswa'] = e.value;

        setmahasiswa(_mahasiswa);
    };

    return (
        <Dialog
            visible={mahasiswaDialog}
            style={{ width: "450px" }}
            header="Mahasiswa Details"
            modal
            className="p-fluid"
            footer={mahasiswaDialogFooter}
            onHide={hideDialog}
        >
            {/* Nama Mahasiswa */}
            <div className="field">
                <label htmlFor="nama_mahasiswa">Nama Mahasiswa</label>
                <InputText
                    id="nama_mahasiswa"
                    value={mahasiswa.nama_mahasiswa || ''}
                    onChange={(e) => onInputChange(e, "nama_mahasiswa")}
                    required
                    autoFocus
                    className={classNames({
                        "p-invalid": submitted && !mahasiswa.nama_mahasiswa,
                    })}
                />
                {submitted && !mahasiswa.nama_mahasiswa && (
                    <small className="p-invalid">Nama Mahasiswa is required.</small>
                )}
            </div>

            {/* User email */}
            {!mahasiswa.id_mahasiswa && (
                <div className="field">
                    <label htmlFor="email">Email</label>
                    <InputText
                        id="email"
                        value={mahasiswa.email || ''}
                        onChange={(e) => onInputChange(e, "email")}
                        required
                        autoFocus
                        className={classNames({
                            "p-invalid": (submitted && !mahasiswa.email) || emailError,
                        })}
                    />
                    {submitted && !mahasiswa.email && (
                        <small className="p-invalid">Email is required.</small>
                    )}
                    {emailError && (
                        <small className="p-invalid">{emailError}</small>
                    )}
                </div>
            )}

            {/* User Password */}
            {!mahasiswa.id_mahasiswa && (
                <div className="field" style={{ position: 'relative' }}>
                    <label htmlFor="password">Password</label>
                    <div style={{ position: "relative" }}>
                        <InputText
                            id="password"
                            type={passwordVisible ? "text" : "password"} // Toggle tipe input
                            value={mahasiswa.password}
                            onChange={(e) => onInputChange(e, "password")}
                            required
                            className={classNames({
                                "p-invalid": (submitted && !mahasiswa.password) || passwordError,
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
                    {submitted && !mahasiswa.password && (
                        <small className="p-invalid">Password is required.</small>
                    )}
                    {passwordError && (
                        <small className="p-invalid">{passwordError}</small>
                    )}
                </div>
            )}

            {/* User Password Confirmation */}
            {!mahasiswa.id_mahasiswa && (
                <div className="field" style={{ position: 'relative' }}>
                    <label htmlFor="password_confirmation">Confirm Password</label>
                    <div style={{ position: "relative" }}>
                        <InputText
                            id="password_confirmation"
                            type={confirmPasswordVisible ? "text" : "password"} // Toggle tipe input
                            value={mahasiswa.password_confirmation}
                            onChange={(e) => onInputChange(e, "password_confirmation")}
                            required
                            className={classNames({
                                "p-invalid": (submitted && !mahasiswa.password_confirmation) || passwordsError,
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
                    {submitted && !mahasiswa.password_confirmation && (
                        <small className="p-invalid">Please confirm your password.</small>
                    )}
                    {passwordsError && (
                        <small className="p-invalid">{passwordsError}</small>
                    )}
                </div>
            )}

            {/* Kelas ID */}
            <div className="field">
                <label htmlFor="prodi_id">Kelas</label>
                <Dropdown
                    id="kelas_id"
                    value={mahasiswa.kelas_id || ''}
                    onChange={(e) => onInputChange(e, "kelas_id")}
                    options={kelasOptions}
                    placeholder="Select a kelas"
                    optionLabel="label"
                    required
                />
                {submitted && !mahasiswa.kelas_id && (
                    <small className="p-invalid">Kelas is required.</small>
                )}
            </div>

            {/* NIM */}
            <div className="field">
                <label htmlFor="nim_mahasiswa">NIM</label>
                <input
                    type="number"
                    id="nim_mahasiswa"
                    value={mahasiswa.nim_mahasiswa || ''}
                    onChange={(e) => onInputChange(e, "nim_mahasiswa")}
                    required
                    min="0"
                    className="p-inputtext p-component"
                />
                {submitted && !mahasiswa.nim_mahasiswa && (
                    <small className="p-invalid">NIM is required.</small>
                )}
            </div>


            {/* Gender */}
            <div className="field">
                <label htmlFor="gender">Gender</label>
                <Dropdown
                    id="gender"
                    value={mahasiswa.gender || ''}
                    onChange={(e) => onInputChange(e, "gender")}
                    options={[
                        { label: "laki-laki", value: "laki-laki" },
                        { label: "perempuan", value: "perempuan" },
                    ]}
                    placeholder="Select a Gender"
                    required
                />
                {submitted && !mahasiswa.gender && (
                    <small className="p-invalid">Gender is required.</small>
                )}
            </div>

            {/* Status Mahasiswa */}
            <div className="field">
                <label className="mb-3">Status Mahasiswa</label>
                <div className="formgrid grid">
                    <div className="field-radiobutton col-6">
                        <RadioButton
                            inputId="status1"
                            name="status"
                            value="0"
                            onChange={onStatusChange}
                            checked={mahasiswa.status_mahasiswa === "0"}
                        />
                        <label htmlFor="status1">Tidak Aktif</label>
                    </div>
                    <div className="field-radiobutton col-6">
                        <RadioButton
                            inputId="status2"
                            name="status"
                            value="1"
                            onChange={onStatusChange}
                            checked={mahasiswa.status_mahasiswa === "1"}
                        />
                        <label htmlFor="status2">Aktif</label>
                    </div>
                </div>
            </div>
        </Dialog>
    );
};

export default MahasiswaForm;
