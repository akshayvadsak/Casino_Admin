import {
    IconSitemap as RoleIcon,
    IconPercentage as CommissionIcon,
    IconCertificate as PermissionIcon,
    IconBoxMultiple2 as LoyaltyPointsIcon,
    IconMenu2 as MenuIcon,
    IconLicense as MenuPermissionIcon,
    IconPackage as GamePackIcon,
    IconAB as ConstantsIcon,
    IconBusinessplan as RedeemIcon
} from '@tabler/icons';

const icons = {
    RoleIcon,
    CommissionIcon,
    PermissionIcon,
    LoyaltyPointsIcon,
    MenuIcon,
    MenuPermissionIcon,
    GamePackIcon,
    ConstantsIcon,
    RedeemIcon
};

const configurationMenuItems = [
    {
        id: 'agent_type',
        title: 'Agent Type',
        type: 'item',
        url: '/configuration/roles',
        breadcrumbs: false,
        icon: icons.RoleIcon
    },

    {
        id: 'game_pack',
        title: 'Game Pack',
        type: 'item',
        url: '/configuration/game-pack',
        breadcrumbs: false,
        icon: icons.GamePackIcon
    },
    {
        id: 'loyalty_points',
        title: 'Loyalty Points',
        type: 'item',
        url: '/configuration/loyalty-points',
        breadcrumbs: false,
        icon: icons.LoyaltyPointsIcon
    },
    {
        id: 'loyalty_points_redeem',
        title: 'Loyalty Points Redeem',
        type: 'item',
        url: '/configuration/loyalty-redeem',
        breadcrumbs: false,
        icon: icons.RedeemIcon
    },
    {
        id: 'keywords',
        title: 'Game Constant',
        type: 'item',
        url: '/configuration/constants',
        breadcrumbs: false,
        icon: icons.ConstantsIcon
    }
];

export default configurationMenuItems;
