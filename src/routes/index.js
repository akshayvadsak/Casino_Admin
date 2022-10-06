import { useRoutes } from 'react-router-dom';

import { useSelector } from 'react-redux';
// routes
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import CMSRoutes from './CMSRoutes';
import ConfigurationRoutes from './ConfigurationRoutes';
import NetworkRoutes from './NetworkRoutes';
import ErrorRoutes from './ErrorRoutes';
import TransactionRoutes from './TransactionRoutes';
import PermissionRoutes from './PermissionRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    return useRoutes(
        localStorage.getItem('MAJESTIC_CASINO') == 'undefined' || localStorage.getItem('MAJESTIC_CASINO') == null
            ? [AuthenticationRoutes]
            : [MainRoutes, NetworkRoutes, CMSRoutes, ConfigurationRoutes, ErrorRoutes, TransactionRoutes, PermissionRoutes]
    );
    // return useRoutes([
    //     AuthenticationRoutes,
    //     MainRoutes,
    //     NetworkRoutes,
    //     CMSRoutes,
    //     ConfigurationRoutes,
    //     ErrorRoutes,
    //     TransactionRoutes,
    //     PermissionRoutes
    // ]);
}
