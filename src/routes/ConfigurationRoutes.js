import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// configuration routing
const RolesPage = Loadable(lazy(() => import('views/pages/configuration/roles')));
const LoyaltyPointsPage = Loadable(lazy(() => import('views/pages/configuration/loyaltyPoints')));
const GamePackPage = Loadable(lazy(() => import('views/pages/configuration/gamingPack')));
const LoyaltyRedeemPage = Loadable(lazy(() => import('views/pages/configuration/loyaltyRedeem')));
const ConstantsPage = Loadable(lazy(() => import('views/pages/configuration/constants')));

// ==============================|| MAIN ROUTING ||============================== //

const ConfigurationRoutes = {
    path: '/configuration',
    element: <MainLayout />,
    children: [
        {
            path: '/roles',
            element: <RolesPage />
        },
        {
            path: '/loyalty-points',
            element: <LoyaltyPointsPage />
        },
        {
            path: '/loyalty-redeem',
            element: <LoyaltyRedeemPage />
        },
        {
            path: '/game-pack',
            element: <GamePackPage />
        },
        {
            path: '/constants',
            element: <ConstantsPage />
        }
    ]
};

export default ConfigurationRoutes;
