import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL, InternalAPI, SubRoutes } from 'common/constants';

const user = JSON.parse(localStorage.getItem('MAJESTIC_CASINO'));

// CREATE Games THUNK
export const createSlider = createAsyncThunk('slider/createSlider', async (sliderData) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            authorization: `Bearer ${user.accessToken}`
        },
        body: sliderData
    };
    return fetch(`${API_URL}${InternalAPI.SLIDER}`, requestOptions).then((res) => res.json());
});

// GET Games THUNK
export const getSlider = createAsyncThunk('slider/getSlider', async ({ pageno, limit }) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${user.accessToken}`
        },
        body: JSON.stringify({ pageNumber: pageno, pageLimit: limit })
    };
    return fetch(`${API_URL}${InternalAPI.SLIDER}${SubRoutes.LIST}`, requestOptions).then((res) => res.json());
});

// UPDATE Games THUNK
export const updateSlider = createAsyncThunk('slider/updateSlider', async ({ data, id, isFile }) => {
    if (!isFile) {
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${user.accessToken}`
            },
            body: JSON.stringify(data)
        };

        return fetch(`${API_URL}${InternalAPI.SLIDER}/${id}`, requestOptions).then((res) => res.json());
    } else {
        const requestOptions = {
            method: 'PUT',
            body: data
        };

        return fetch(`${API_URL}${InternalAPI.SLIDER}${SubRoutes.FILE}/${id}`, requestOptions).then((res) => res.json());
    }
});

// DELETE Games THUNK
export const deleteSlider = createAsyncThunk('slider/deleteSlider', async ({ id, image_name }) => {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${user.accessToken}`
        },
        body: JSON.stringify({ SLIDER_ID: id, SLIDER_IMAGE_URL: image_name })
    };
    return fetch(`${API_URL}${InternalAPI.SLIDER}/`, requestOptions).then((res) => res.json());
});
