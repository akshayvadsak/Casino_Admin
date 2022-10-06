import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL, InternalAPI, SubRoutes } from 'common/constants';

const user = JSON.parse(localStorage.getItem('MAJESTIC_CASINO'));

// GET AGENT TREE THUNK
export const getAgentTreeData = createAsyncThunk('agent_tree/getAgentTreeData', async ({ pageno, limit, roleId }) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${user.accessToken}`
        },
        body: JSON.stringify({ pageNumber: pageno, pageLimit: limit, ROLE_ID: roleId && roleId })
    };
    return fetch(`${API_URL}${InternalAPI.AGENTTREE}${SubRoutes.LIST}`, requestOptions).then((res) => res.json());
});

// VIEW AGENT DATA THUNK
export const viewAgentData = createAsyncThunk('agent_tree/viewAgentData', async ({ agentId }) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${user.accessToken}`
        },
        body: JSON.stringify({ AGENT_ID: agentId })
    };
    return fetch(`${API_URL}${InternalAPI.AGENTTREE}`, requestOptions).then((res) => res.json());
});
