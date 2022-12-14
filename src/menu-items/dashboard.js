// assets
import {
    IconDashboard as DashboardIcon,
    IconDatabase as CMSIcon,
    IconSettings as ConfigIcon,
    IconTournament as AgentTreeIcon,
    IconUsers as NetworkIcon,
    IconCurrencyDollar as TransactionIcon,
    IconUser as PlayerIcon,
    IconLockAccess as PermissionIcon
} from '@tabler/icons';

// submenu items
import { configurationMenuItems, cmsMenuItems, networkMenuItems, transactionMenuItems, permissionMenuItems } from './submenu-items';

// constant
const icons = { DashboardIcon, CMSIcon, ConfigIcon, AgentTreeIcon, TransactionIcon, PlayerIcon, NetworkIcon, PermissionIcon };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Dashboard',
            type: 'item',
            url: '/dashboard',
            icon: icons.DashboardIcon,
            breadcrumbs: false
        },
        {
            id: 'network',
            title: 'Network',
            type: 'collapse',
            icon: icons.ConfigIcon,
            children: [...networkMenuItems]
        },
        {
            id: 'transaction',
            title: 'Transaction',
            type: 'collapse',
            icon: icons.TransactionIcon,
            children: [...transactionMenuItems]
        },
        {
            id: 'players',
            title: 'Players',
            type: 'item',
            url: '/player',
            icon: icons.PlayerIcon,
            breadcrumbs: false
        },
        {
            id: 'configuration',
            title: 'Configuration',
            type: 'collapse',
            icon: icons.ConfigIcon,
            children: [...configurationMenuItems]
        },
        {
            id: 'permission',
            title: 'Permission',
            type: 'collapse',
            icon: icons.PermissionIcon,
            children: [...permissionMenuItems]
        },
        {
            id: 'cms',
            title: 'CMS',
            type: 'collapse',
            icon: icons.CMSIcon,
            children: [...cmsMenuItems]
        }
    ]
};

export default dashboard;
