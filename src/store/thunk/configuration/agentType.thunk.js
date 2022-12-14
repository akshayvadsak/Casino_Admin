import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL, InternalAPI, SubRoutes } from 'common/constants';

const user = JSON.parse(localStorage.getItem('MAJESTIC_CASINO'));

// CREATE AGENT TYPE THUNK
export const createAgentType = createAsyncThunk('agent_type/createAgentType', async ({ name, parentRole, description }) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${user.accessToken}`
        },
        body: JSON.stringify({ ROLE_NAME: name, ROLE_PARENT_ID: parentRole, DESCRIPTION: description })
    };
    return fetch(`${API_URL}${InternalAPI.AGENTTYPE}`, requestOptions).then((res) => res.json());
});

// GET AGENT TYPES THUNK
export const getAgentType = createAsyncThunk('agent_type/getAgentType', async ({ pageno, limit }) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${user.accessToken}`
        },
        body: JSON.stringify({ pageNumber: pageno, pageLimit: limit })
    };
    return fetch(`${API_URL}${InternalAPI.AGENTTYPE}${SubRoutes.LIST}`, requestOptions).then((res) => res.json());
});

// GET AGENT TYPES LIST THUNK
export const getAgentTypesList = createAsyncThunk('agent_type/getAgentTypesList', async () => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${user.accessToken}`
        }
    };
    return fetch(`${API_URL}${InternalAPI.AGENTTYPE}`, requestOptions).then((res) => res.json());
});

// GET AGENT TYPES LIST WITH ID THUNK
export const getAgentTypesWithIdList = createAsyncThunk('agent_type/getAgentTypesWithIdList', async (id) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${user.accessToken}`
        }
    };
    return fetch(`${API_URL}${InternalAPI.AGENTTYPE}/${id}`, requestOptions).then((res) => res.json());
});

// UPDATE AGENT TYPE THUNK
export const updateAgentType = createAsyncThunk('agent_type/updateAgentType', async ({ name, parentRole, description, id }) => {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${user.accessToken}`
        },
        body: JSON.stringify({ ROLE_NAME: name, ROLE_PARENT_ID: parentRole, DESCRIPTION: description.length > 0 && description })
    };
    return fetch(`${API_URL}${InternalAPI.AGENTTYPE}/${id}`, requestOptions).then((res) => res.json());
});

// DELETE AGENT TYPE THUNK
export const deleteAgentType = createAsyncThunk('agent_type/deleteAgentType', async ({ id }) => {
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${user.accessToken}`
        }
    };
    return fetch(`${API_URL}${InternalAPI.AGENTTYPE}/${id}`, requestOptions).then((res) => res.json());
});
