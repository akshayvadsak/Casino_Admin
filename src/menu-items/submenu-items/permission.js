import { IconCertificate as PermissionIcon, IconMenu2 as MenuIcon, IconLicense as MenuPermissionIcon } from '@tabler/icons';

const icons = { PermissionIcon, MenuIcon, MenuPermissionIcon };

const permissionMenuItems = [
    {
        id: 'menu',
        title: 'Menu',
        type: 'item',
        url: '/permission/menu',
        breadcrumbs: false,
        icon: icons.MenuIcon
    },
    {
        id: 'menu_permissions',
        title: 'Menu Permissions',
        type: 'item',
        url: '/permission/menu-permissions',
        breadcrumbs: false,
        icon: icons.MenuPermissionIcon
    }
    // {
    //     id: 'permissions',
    //     title: 'Permissions',
    //     type: 'item',
    //     url: '/permission/permissions',
    //     breadcrumbs: false,
    //     icon: icons.PermissionIcon
    // }
];

export default permissionMenuItems;
