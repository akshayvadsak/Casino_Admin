import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// configuration routing
const PermissionsPage = Loadable(lazy(() => import('views/pages/permission/permissions')));
const MenuPermissionsPage = Loadable(lazy(() => import('views/pages/permission/menuPermission')));
const MenuPage = Loadable(lazy(() => import('views/pages/permission/menu')));

// ==============================|| MAIN ROUTING ||============================== //

const PermissionRoutes = {
    path: '/permission',
    element: <MainLayout />,
    children: [
        // {
        //     path: '/permissions',
        //     element: <PermissionsPage />
        // },
        {
            path: '/menu-permissions',
            element: <MenuPermissionsPage />
        },
        {
            path: '/menu',
            element: <MenuPage />
        }
    ]
};

export default PermissionRoutes;
