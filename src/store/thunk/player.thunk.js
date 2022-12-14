import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL, InternalAPI, SubRoutes } from 'common/constants';

const user = JSON.parse(localStorage.getItem('MAJESTIC_CASINO'));

// CREATE PLAYER THUNK
export const createPlayer = createAsyncThunk('players/createPlayer', async (data) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${user.accessToken}`
        },
        body: JSON.stringify(data)
    };
    return fetch(`${API_URL}${InternalAPI.PLAYER}`, requestOptions).then((res) => res.json());
});

// GET PLAYERS LIST THUNK
export const getPlayers = createAsyncThunk('players/getPlayers', async ({ pageno, limit }) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${user.accessToken}`
        },
        body: JSON.stringify({ pageNumber: pageno, pageLimit: limit })
    };
    return fetch(`${API_URL}${InternalAPI.PLAYER}${SubRoutes.LIST}`, requestOptions).then((res) => res.json());
});

// GET STORE LIST THUNK
export const getStoreList = createAsyncThunk('players/getStoreList', async () => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${user.accessToken}`
        }
    };
    return fetch(`${API_URL}${InternalAPI.AGENT}${SubRoutes.AGENTLIST}/5`, requestOptions).then((res) => res.json());
});

// UPDATE PLAYER THUNK
export const updatePlayer = createAsyncThunk('players/updatePlayer', async ({ data, id }) => {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${user.accessToken}`
        },
        body: JSON.stringify(data)
    };
    return fetch(`${API_URL}${InternalAPI.PLAYER}/${id}`, requestOptions).then((res) => res.json());
});

// BLOCK PLAYER THUNK
export const blockPlayer = createAsyncThunk('players/blockPlayer', async ({ id, playerStatus }) => {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${user.accessToken}`
        },
        body: JSON.stringify({ PLAYER_ID: id, ISACTIVE: playerStatus })
    };
    return fetch(`${API_URL}${InternalAPI.PLAYER}/`, requestOptions).then((res) => res.json());
});
