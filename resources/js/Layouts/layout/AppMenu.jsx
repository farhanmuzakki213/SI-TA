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
                { label: 'Button', icon: 'pi pi-fw pi-id-card', to: route('button') },
                { label: 'chart', icon: 'pi pi-fw pi-apple', to: route('chart') },
                { label: 'file', icon: 'pi pi-fw pi-file', to: route('file') },
                { label: 'table', icon: 'pi pi-fw pi-table', to: route('table') },
            ]
        },
        {
            label: 'Data Master',
            items: [
                { label: 'Dosen', icon: 'pi pi-fw pi-user', to: route('dosen') },
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
