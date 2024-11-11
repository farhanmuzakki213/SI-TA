import React from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { useState } from 'react';
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import { MultiSelect } from 'primereact/multiselect';

const UserForm = ({
    userDialog,
    user,
    submitted,
    hideDialog,
    setuser,
    userDialogFooter,
    rolesOptions,
}) => {
    const [passwordError, setPasswordError] = useState('');
    const [passwordsError, setPasswordsError] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [emailError, setEmailError] = useState(null);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [multiselectValue, setMultiselectValue] = useState(null);

    const togglePasswordVisibility = () => {
        setPasswordVisible((prev) => !prev);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible((prev) => !prev);
    };
    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    const onInputChange = (e, field) => {
        const value = e.target ? e.target.value : e.value;
        if (field === 'roles') {
            setuser((prevState) => ({
                ...prevState,
                roles: value,
            }));
        } else {
            setuser((prevState) => ({
                ...prevState,
                [field]: value,
            }));
        }

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
            if (value !== user.password) {
                setPasswordsError("Passwords do not match.");
            } else {
                setPasswordsError(null);
            }
        }
    };


    return (
        <Dialog
            visible={userDialog}
            style={{ width: "450px" }}
            header="User Details"
            modal
            className="p-fluid"
            footer={userDialogFooter}
            onHide={hideDialog}
        >
            {/* Nama User */}
            <div className="field">
                <label htmlFor="name">Nama User</label>
                <InputText
                    id="name"
                    value={user.name || ''}
                    onChange={(e) => onInputChange(e, "name")}
                    required
                    autoFocus
                    className={classNames({
                        "p-invalid": submitted && !user.name,
                    })}
                />
                {submitted && !user.name && (
                    <small className="p-invalid">Nama User is required.</small>
                )}
            </div>

            {/* User email */}
            <div className="field">
                <label htmlFor="email">Email</label>
                <InputText
                    id="email"
                    value={user.email || ''}
                    onChange={(e) => onInputChange(e, "email")}
                    required
                    autoFocus
                    className={classNames({
                        "p-invalid": (submitted && !user.email) || emailError,
                    })}
                />
                {submitted && !user.email && (
                    <small className="p-invalid">Email is required.</small>
                )}
                {emailError && (
                    <small className="p-invalid">{emailError}</small>
                )}
            </div>

            {/* User Password */}
            <div className="field" style={{ position: 'relative' }}>
                <label htmlFor="password">Password</label>
                <div style={{ position: "relative" }}>
                    <InputText
                        id="password"
                        type={passwordVisible ? "text" : "password"} // Toggle tipe input
                        value={user.password}
                        onChange={(e) => onInputChange(e, "password")}
                        required
                        className={classNames({
                            "p-invalid": (submitted && !user.password) || passwordError,
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
                {submitted && !user.password && (
                    <small className="p-invalid">Password is required.</small>
                )}
                {passwordError && (
                    <small className="p-invalid">{passwordError}</small>
                )}
            </div>

            {/* User Password Confirmation */}
            <div className="field" style={{ position: 'relative' }}>
                <label htmlFor="password_confirmation">Confirm Password</label>
                <div style={{ position: "relative" }}>
                    <InputText
                        id="password_confirmation"
                        type={confirmPasswordVisible ? "text" : "password"}
                        value={user.password_confirmation}
                        onChange={(e) => onInputChange(e, "password_confirmation")}
                        required
                        className={classNames({
                            "p-invalid": (submitted && !user.password_confirmation) || passwordsError,
                        })}
                        style={{ paddingRight: "40px" }}
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
                {submitted && !user.password_confirmation && (
                    <small className="p-invalid">Please confirm your password.</small>
                )}
                {passwordsError && (
                    <small className="p-invalid">{passwordsError}</small>
                )}
            </div>
            {/* User Roles */}
            <div className="field">
                <label htmlFor="roles">Roles User</label>
                <MultiSelect
                    id="roles"
                    value={user.roles.name || multiselectValue}
                    options={rolesOptions}
                    onChange={(e) => setMultiselectValue(e.value)}
                    placeholder="Pilih Role"
                    display="chip"
                    className="multiselect-custom"
                />
                {submitted && (!user.roles || user.roles.name === 0) && (
                    <small className="p-invalid">Roles User is required.</small>
                )}
            </div>

        </Dialog>
    );
};

export default UserForm;
