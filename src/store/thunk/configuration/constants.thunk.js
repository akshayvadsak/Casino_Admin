import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL, InternalAPI, SubRoutes } from 'common/constants';

const user = JSON.parse(localStorage.getItem('MAJESTIC_CASINO'));

// CREATE CONSTANTS THUNK
export const createConstants = createAsyncThunk('constants/createConstants', async ({ id, name, value }) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${user.accessToken}`
        },
        body: JSON.stringify({ CONST_NAME: name, CONST_VALUE: value })
    };
    return fetch(`${API_URL}${InternalAPI.CONSTANTS}`, requestOptions).then((res) => res.json());
});

// GET CONSTANTS THUNK
export const getConstants = createAsyncThunk('constants/getConstants', async ({ pageno, limit }) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${user.accessToken}`
        },
        body: JSON.stringify({ pageNumber: pageno, pageLimit: limit })
    };
    return fetch(`${API_URL}${InternalAPI.CONSTANTS}${SubRoutes.LIST}`, requestOptions).then((res) => res.json());
});

// UPDATE CONSTANTS THUNK
export const updateConstants = createAsyncThunk('constants/updateConstants', async ({ name, value, id }) => {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${user.accessToken}`
        },
        body: JSON.stringify({ CONST_NAME: name, CONST_VALUE: value, CONST_ID: id })
    };
    return fetch(`${API_URL}${InternalAPI.CONSTANTS}/${id}`, requestOptions).then((res) => res.json());
});
