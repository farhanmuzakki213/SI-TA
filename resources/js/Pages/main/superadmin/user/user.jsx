import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import React, { useEffect, useRef, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import Layout from "@/Layouts/layout/layout.jsx";
import UserDataTable from './component/UserDataTable';
import UserForm from './component/UserForm';

const user = () => {
    let emptyuser = {
        id: null,
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        roles: [],
    };

    const { props } = usePage();
    const { data_user, data_userRoles,  rolesOptions: initialRolesOptions, } = props;
    const [users, setusers] = useState(null);
    const [selectedusers, setSelectedusers] = useState(null);
    const [rolesOptions, setRolesOptions] = useState([]);
    const [userrolesOptions, setUserRolesOptions] = useState([]);
    const [userDialog, setuserDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [user, setuser] = useState(emptyuser);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        setRolesOptions(initialRolesOptions);
        setusers(data_user);
        setUserRolesOptions(data_userRoles);
        displaySuccessMessage(props.flash?.success);
        displayErrorMessage(props.flash?.error);
    }, [initialRolesOptions, data_userRoles,  data_user, props.flash]);

    const hideDialog = () => {
        setSubmitted(false);
        setuserDialog(false);
    };
    console.log(props.data_userRoles)

    const saveUser = async () => {
        setSubmitted(true);

        const requiredFieldsForUpdate = [
            user.name,
            user.email,
            user.password,
            user.password_confirmation,
            user.roles,
        ];

        let isValid = requiredFieldsForUpdate.every(field => field && field.length > 0);

        if (!isValid) {
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: "Please fill in all required fields.",
                life: 3000,
            });
            return;
        }

        if (user.password !== user.password_confirmation) {
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: "Passwords do not match.",
                life: 3000,
            });
            return;
        }

        let _user = { ...user };
        delete _user.password;
        delete _user.password_confirmation;

        try {
            await router.put(`/user/${user.id}/update`, _user);

            setUsers(prevUsers =>
                prevUsers.map(existingUser =>
                    existingUser.id === user.id ? _user : existingUser
                )
            );

            toast.current?.show({
                severity: "success",
                summary: "Success",
                detail: "User updated successfully.",
                life: 3000,
            });

        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to save user.";
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: errorMessage,
                life: 3000,
            });
        } finally {
            setuser(emptyuser);
            setuserDialog(false);
        }
    };

    const displaySuccessMessage = (successMessage) => {
        if (successMessage !== null) {
            const message = successMessage || "Operation successful";
            toast.current?.show({
                severity: "success",
                summary: "Successful",
                detail: message,
                life: 3000,
            });
        }
    };

    const displayErrorMessage = (errorMessage) => {
        if (errorMessage !== null) {
            const message = errorMessage || "Operation failed";
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: message,
                life: 3000,
            });
        }
    };

    const edituser = (user) => {
        setuser({ ...user });
        setuserDialog(true);
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">User</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText
                    type="search"
                    value={globalFilter || ''}
                    onInput={(e) => setGlobalFilter(e.target.value || '')}
                    placeholder="Search..."
                />
            </span>
        </div>
    );

    const userDialogFooter = (
        <>
            <Button
                label="Cancel"
                icon="pi pi-times"
                text
                onClick={hideDialog}
            />
            <Button label="Save" icon="pi pi-check" text onClick={saveUser} />
        </>
    );

    return (
        <Layout>
            <div className="grid crud-demo">
                <div className="col-12">
                    <div className="card">
                        <Toast ref={toast} />
                        <Toolbar
                            className="mb-4"
                        ></Toolbar>

                        <UserDataTable
                            dt={dt}
                            users={users}
                            selectedusers={selectedusers}
                            setSelectedusers={setSelectedusers}
                            globalFilter={globalFilter}
                            header={header}
                            edituser={edituser}
                        />

                        <UserForm
                            userDialog={userDialog}
                            user={user}
                            setuser={setuser}
                            submitted={submitted}
                            userDialogFooter={userDialogFooter}
                            rolesOptions={rolesOptions}
                            hideDialog={hideDialog}
                        />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default user;
