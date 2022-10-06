import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL, InternalAPI, SubRoutes } from 'common/constants';

const user = JSON.parse(localStorage.getItem('MAJESTIC_CASINO'));

// CREATE GAME TYPE THUNK
export const createLoyaltyRedeemPack = createAsyncThunk(
    'loyalty_redeem/createLOYALTYREDEEM',
    async ({ name, points, amount, discount, percentage }) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${user.accessToken}`
            },
            body: JSON.stringify({
                PACK_NAME: name,
                LOYALTY_POINTS: points,
                BUY_AMOUNT: amount,
                ISOFFER: discount == 'true' ? true : false
            })
        };
        return fetch(`${API_URL}${InternalAPI.LOYALTYREDEEM}`, requestOptions).then((res) => res.json());
    }
);

// GET GAME TYPES THUNK
export const getRedemptionPack = createAsyncThunk('loyalty_redeem/getRedemptionPack', async ({ pageno, limit }) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${user.accessToken}`
        },
        body: JSON.stringify({ pageNumber: pageno, pageLimit: limit })
    };
    return fetch(`${API_URL}${InternalAPI.LOYALTYREDEEM}${SubRoutes.LIST}`, requestOptions).then((res) => res.json());
});

// GET COIN PACKS LIST THUNK
export const getRedemptionPackList = createAsyncThunk('loyalty_redeem/getRedemptionPackList', async ({ pageno, limit }) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${user.accessToken}`
        }
    };
    return fetch(`${API_URL}${InternalAPI.LOYALTYREDEEM}`, requestOptions).then((res) => res.json());
});

// UPDATE GAME TYPE THUNK
export const updateRedemptionPack = createAsyncThunk(
    'loyalty_redeem/updateRedemptionPack',
    async ({ name, points, amount, discount, percentage, id }) => {
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${user.accessToken}`
            },
            body: JSON.stringify({
                PACK_NAME: name,
                LOYALTY_POINTS: points,
                BUY_AMOUNT: amount
            })
        };
        return fetch(`${API_URL}${InternalAPI.LOYALTYREDEEM}/${id}`, requestOptions).then((res) => res.json());
    }
);

// DELETE GAME TYPE THUNK
export const deleteRedemptionPack = createAsyncThunk('loyalty_redeem/deleteRedemptionPack', async ({ id }) => {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${user.accessToken}`
        },
        body: JSON.stringify({ PACK_ID: id })
    };
    return fetch(`${API_URL}${InternalAPI.LOYALTYREDEEM}/`, requestOptions).then((res) => res.json());
});
