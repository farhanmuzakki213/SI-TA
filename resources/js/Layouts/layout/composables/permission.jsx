import { usePage } from '@inertiajs/react'

export function usePermission() {
    const hasRole = (name) =>
        usePage().props.auth.user.roles.includes(name);
    const hasPermission = (name) =>
        usePage().props.auth.user.permission.includes(name);
    return { hasRole, hasPermission }
}
