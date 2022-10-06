import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL, InternalAPI, SubRoutes } from 'common/constants';

const user = JSON.parse(localStorage.getItem('MAJESTIC_CASINO'));

// CREATE PERMISSIONS THUNK
export const createMenuPermissions = createAsyncThunk('menu_permissions/createMenuPermissions', async ({ question, answer }) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${user.accessToken}`
        },
        body: JSON.stringify({ QUESTION: question, ANSWER: answer })
    };
    return fetch(`${API_URL}${InternalAPI.MENUPERMISSIONS}`, requestOptions).then((res) => res.json());
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

// GET PERMISSIONS THUNK
export const getMenuPermissions = createAsyncThunk('menu_permissions/getMenuPermissions', async ({ roleId, pageno, limit }) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${user.accessToken}`
        },
        body: JSON.stringify({ ROLE_ID: roleId, pageNumber: pageno, pageLimit: limit })
    };
    return fetch(`${API_URL}${InternalAPI.MENUPERMISSIONS}${SubRoutes.LIST}`, requestOptions).then((res) => res.json());
});

// GET PERMISSIONS THUNK
export const refreshMenuPermissions = createAsyncThunk('menu_permissions/refreshMenuPermissions', async ({ roleId, slug, agentId }) => {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${user.accessToken}`
        },
        body: JSON.stringify({ ROLE_ID: roleId, MENU_SLUG: slug, AGENT_ID: agentId })
    };
    return fetch(`${API_URL}${InternalAPI.MENUPERMISSIONS}`, requestOptions).then((res) => res.json());
});

// UPDATE PERMISSIONS THUNK
export const updateMenuPermissions = createAsyncThunk(
    'menu_permissions/updateMenuPermissions',
    async ({ menuPermissionId, key, value, agentId, permissionName }) => {
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${user.accessToken}`
            },
            body: JSON.stringify({
                MENU_PERMISSION_ID: menuPermissionId,
                KEY: permissionName,
                [key.toUpperCase()]: value
            })
        };
        return fetch(`${API_URL}${InternalAPI.MENUPERMISSIONS}/${menuPermissionId}`, requestOptions).then((res) => res.json());
    }
);

// DELETE PERMISSIONS THUNK
export const deleteMenuPermissions = createAsyncThunk('menu_permissions/deleteMenuPermissions', async ({ id }) => {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${user.accessToken}`
        },
        body: JSON.stringify({ FAQ_ID: id })
    };
    return fetch(`${API_URL}${InternalAPI.MENUPERMISSIONS}/`, requestOptions).then((res) => res.json());
});
