import { IconUsers as PlayerIcon, IconUser as AgentIcon } from '@tabler/icons';

const icons = {
    PlayerIcon,
    AgentIcon
};

const transactionMenuItems = [
    {
        id: 'agent',
        title: 'Agent',
        type: 'item',
        url: '/transaction/agent',
        breadcrumbs: false,
        icon: icons.AgentIcon
    },
    {
        id: 'player',
        title: 'Player',
        type: 'item',
        url: '/transaction/player',
        breadcrumbs: false,
        icon: icons.PlayerIcon
    }
];

export default transactionMenuItems;
