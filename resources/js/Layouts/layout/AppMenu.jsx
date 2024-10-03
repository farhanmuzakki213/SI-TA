import React, { useContext } from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import {Link} from "@inertiajs/react";

const AppMenu = () => {
    const { layoutConfig } = useContext(LayoutContext);

    const model = [
        {
            label: 'Home',
            items: [
                { label: 'Dashboard', icon: 'pi pi-fw pi-home', to: route('dashboard') },
            ]
        },
        {
            label: 'Data Master',
            items: [
                { label: 'Dosen', icon: 'pi pi-fw pi-user', to: route('dosen') },
                { label: 'Mahasiswa', icon: 'pi pi-fw pi-users', to: route('mahasiswa') },
                { label: 'Jurusan', icon: 'pi pi-fw pi-users', to: route('jurusan') },
                { label: 'Prodi', icon: 'pi pi-fw pi-users', to: route('prodi') },
            ]
        },
    ];

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}


            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
