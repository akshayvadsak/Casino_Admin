import { configureStore, createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL, InternalAPI, SubRoutes } from 'common/constants';

const user = JSON.parse(localStorage.getItem('MAJESTIC_CASINO'));

// CREATE GAME TYPE THUNK
export const createCoinPack = createAsyncThunk(
    'coin_type/createCoinPack',
    async ({ name, coins, diamonds, price, discount, percentage }) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${user.accessToken}`
            },
            body: JSON.stringify({
                PACK_NAME: name,
                MAGESTIC_COINS: coins,
                MAGESTIC_POINTS: diamonds,
                BUY_AMOUNT: price,
                ISOFFER: discount == 'true' ? true : false,
                DISCOUNT: percentage ? percentage : 0.0
            })
        };
        return fetch(`${API_URL}${InternalAPI.COINPACK}`, requestOptions).then((res) => res.json());
    }
);

// GET GAME TYPES THUNK
export const getCoinPack = createAsyncThunk('coin_pack/getCoinPack', async ({ pageno, limit }) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${user.accessToken}`
        },
        body: JSON.stringify({ pageNumber: pageno, pageLimit: limit })
    };
    return fetch(`${API_URL}${InternalAPI.COINPACK}${SubRoutes.LIST}`, requestOptions).then((res) => res.json());
});

// GET COIN PACKS LIST THUNK
export const getCoinPackList = createAsyncThunk('coin_pack/getCoinPackList', async ({ pageno, limit }) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${user.accessToken}`
        }
    };
    return fetch(`${API_URL}${InternalAPI.COINPACK}`, requestOptions).then((res) => res.json());
});

// UPDATE GAME TYPE THUNK
export const updateCoinPack = createAsyncThunk(
    'coin_pack/updateCoinPack',
    async ({ name, coins, diamonds, price, discount, percentage, id }) => {
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${user.accessToken}`
            },
            body: JSON.stringify({
                PACK_NAME: name,
                MAGESTIC_COINS: coins,
                MAGESTIC_POINTS: diamonds,
                BUY_AMOUNT: price,
                ISOFFER: discount == 'true' ? true : false,
                DISCOUNT: percentage ? percentage : 0.0
            })
        };
        return fetch(`${API_URL}${InternalAPI.COINPACK}/${id}`, requestOptions).then((res) => res.json());
    }
);

// DELETE GAME TYPE THUNK
export const deleteCoinPack = createAsyncThunk('coin_pack/deleteCoinPack', async ({ id }) => {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${user.accessToken}`
        },
        body: JSON.stringify({ PACK_ID: id })
    };
    return fetch(`${API_URL}${InternalAPI.COINPACK}/`, requestOptions).then((res) => res.json());
});
