import React, { useContext } from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';

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
                { label: 'Jurusan', icon: 'pi pi-fw pi-file', to: route('jurusan') },
                { label: 'Prodi', icon: 'pi pi-fw pi-file', to: route('prodi') },
                { label: 'Kelas', icon: 'pi pi-fw pi-file', to: route('kelas') },
                { label: 'Semester', icon: 'pi pi-fw pi-file', to: route('semester') },
                { label: 'Jabatan Pimpinan', icon: 'pi pi-fw pi-file', to: route('jabatanpimpinan') },
                { label: 'Pimpinan', icon: 'pi pi-fw pi-file', to: route('pimpinan') },
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
