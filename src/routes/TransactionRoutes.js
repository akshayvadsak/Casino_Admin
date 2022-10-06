import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// configuration routing
const AgentTransactionPage = Loadable(lazy(() => import('views/pages/transaction/Agent')));
const PlayerTransactionPage = Loadable(lazy(() => import('views/pages/transaction/Player')));

// ==============================|| MAIN ROUTING ||============================== //

const TransactionRoutes = {
    path: '/transaction',
    element: <MainLayout />,
    children: [
        {
            path: '/agent',
            element: <AgentTransactionPage />
        },
        {
            path: '/player',
            element: <PlayerTransactionPage />
        }
    ]
};

export default TransactionRoutes;
