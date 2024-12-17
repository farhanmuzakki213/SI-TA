import { usePage } from '@inertiajs/react'

export function usePermission() {
    const hasRole = (name) =>
        usePage().props.auth.user.roles.includes(name);
    const hasPermission = (name) =>
        usePage().props.auth.user.permission.includes(name);
    const hasJenjangProdi = (jenjang) =>
        usePage().props.auth.user.jenjangProdi === jenjang;
    const hasJenjangProdiKaprodi = (jenjang) =>
        usePage().props.auth.user.jenjangProdiKaprodi === jenjang;
    const hasJenjangProdiPembimbing = (jenjang) =>
        usePage().props.auth.user.jenjangProdiPembimbing === jenjang;
    return { hasRole, hasPermission, hasJenjangProdi, hasJenjangProdiKaprodi, hasJenjangProdiPembimbing };
}
