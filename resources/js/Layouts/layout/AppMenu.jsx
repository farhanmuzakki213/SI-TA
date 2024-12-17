import React from 'react';
import AppMenuitem from './AppMenuitem';
import { MenuProvider } from './context/menucontext';
import { usePermission } from './composables/permission';

const AppMenu = () => {
    const { hasRole, hasJenjangProdi, hasJenjangProdiKaprodi, hasJenjangProdiPembimbing } = usePermission();
    return (
        <MenuProvider>
            <ul className="layout-menu">
                {/* Home Menu Item */}
                <AppMenuitem
                    item={{
                        label: 'Home',
                        items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: route('dashboard') }]
                    }}
                    root={true}
                    index={0}
                />

                {/* Data User, Role, Permission */}
                {hasRole('superAdmin') && (<AppMenuitem
                    item={{
                        label: 'Data Master',
                        items: [
                            { label: 'User', icon: 'pi pi-fw pi-user', to: route('user') },
                            { label: 'Role', icon: 'pi pi-fw pi-users', to: route('role') },
                            { label: 'Permission', icon: 'pi pi-fw pi-file', to: route('permission') },
                        ]
                    }}
                    root={true}
                    index={1}
                />
                )}

                {/* Data Master Menu Item */}
                {hasRole('admin') && (<AppMenuitem
                    item={{
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
                            { label: 'Usulan Sidang PKL', icon: 'pi pi-fw pi-file', to: route('usulansidangpkl') },
                            { label: 'Usulan Sidang Sempro', icon: 'pi pi-fw pi-file', to: route('usulansidangsempro') },
                        ]
                    }}
                    root={true}
                    index={1}
                />
                )}
                {/* Data Jadwal Ruangan */}
                {hasRole('pimpinanProdi') && (<AppMenuitem
                    item={{
                        label: 'Penjadwalan Sidang',
                        items: [
                            { label: 'Ruangan', icon: 'pi pi-fw pi-file', to: route('ruangan') },
                            { label: 'Sesi', icon: 'pi pi-fw pi-file', to: route('sesi') },
                            { label: 'Jadwal Ruangan', icon: 'pi pi-fw pi-file', to: route('booking') },
                        ],
                    }}
                    root={true}
                    index={1}
                />

                )}
                {hasRole('pimpinanProdi') && (<AppMenuitem
                    item={{
                        label: 'Kepala Prodi',
                        items: [
                            { label: 'Mahasiswa Pkl', icon: 'pi pi-fw pi-file', to: route('MhsPklKprodi') },
                            ...(hasJenjangProdiKaprodi('D4') ? [
                                { label: 'Mahasiswa Sempro', icon: 'pi pi-fw pi-file', to: route('MhsSemproKprodi') },
                            ] : []),
                            { label: 'Mahasiswa TA', icon: 'pi pi-fw pi-file', to: route('MhsTAKprodi') },
                        ],
                    }}
                    root={true}
                    index={1}
                />

                )}
                {hasRole('dosenPembimbing') && (<AppMenuitem
                    item={{
                        label: 'Pembimbing',
                        items: [
                            { label: 'Mahasiswa PKL', icon: 'pi pi-fw pi-file', to: route('MhsPklPembimbing') },
                            ...(hasJenjangProdiPembimbing('D4') ? [
                                { label: 'Mahasiswa Sempro', icon: 'pi pi-fw pi-file', to: route('MhsSemproPembimbing') },
                            ] : []),
                        ],
                    }}
                    root={true}
                    index={1}
                />
                )}

                {hasRole('dosenPenguji') && (<AppMenuitem
                    item={{
                        label: 'Penguji',
                        items: [
                            { label: 'Mahasiswa PKL', icon: 'pi pi-fw pi-file', to: route('MhsPklPenguji') },
                            { label: 'Mahasiswa Sempro', icon: 'pi pi-fw pi-file', to: route('MhsSemproPenguji') },
                        ],
                    }}
                    root={true}
                    index={1}
                />
                )}

                {/* Data User, Role, Permission */}
                {hasRole('mahasiswa') && (<AppMenuitem
                    item={{
                        label: 'Mahasiswa',
                        items: [
                            { label: 'PKL', icon: 'pi pi-fw pi-file', to: route('MhsPkl') },
                            ...(hasJenjangProdi('D4') ? [
                                { label: 'Sempro', icon: 'pi pi-fw pi-file', to: route('MhsSempro') },
                            ] : []),
                            { label: 'TA', icon: 'pi pi-fw pi-file', to: route('MhsTA') },
                        ]
                    }}
                    root={true}
                    index={1}
                />
                )}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
