import { createSlice } from '@reduxjs/toolkit';

const userReducer = createSlice({
    name: 'user',
    initialState: {
        data: [],
        userLoggedIn: false,
        allowedRoutes: [
            '/',
            '/network/agents',
            '/cms/notification',
            '/network/agent-tree',
            '/cms/faq',
            '/cms/terms-conditions',
            '/cms/privacy-policy',
            '/cms/disclaimer',
            '/cms/about',
            '/cms/payment-terms',
            '/cms/game',
            '/cms/game-group',
            '/cms/slider',
            '/configuration/roles',
            '/permission/permissions',
            '/player',
            '/password',
            '/configuration/loyalty-points',
            '/permission/menu',
            '/permission/menu-permissions',
            '/configuration/game-pack',
            '/transaction/agent',
            '/transaction/player',
            '/configuration/constants'
        ]
    }
});

export default userReducer.reducer;
