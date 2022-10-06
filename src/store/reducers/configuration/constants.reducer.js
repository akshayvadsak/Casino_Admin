import { createSlice } from '@reduxjs/toolkit';
import { getConstants, createConstants, updateConstants, deleteConstants } from 'store/thunk/configuration/constants.thunk';

const ConstantsSlice = createSlice({
    name: 'constants',
    initialState: {
        status: null,
        msg: '',
        totalRecords: 0,
        data: [],
        dataIndex: ''
    },
    reducers: {
        setDataIndex: (state, { payload }) => {
            state.dataIndex = payload;
        }
    },
    extraReducers: {
        // Get faq Reducers
        [getConstants.pending]: (state) => {
            state.status = 'loading';
        },
        [getConstants.fulfilled]: (state, { payload }) => {
            if (payload.status === true) {
                state.msg = payload.msg;
                state.data = payload.data;
                state.totalRecords = payload.total;
                state.status = 'success';
            }
            if (payload.status === false) {
                state.msg = payload.msg || 'Network Error';
                state.status = 'failed';
            }
        },
        [getConstants.rejected]: (state) => {
            state.status = 'failed';
            state.msg = 'Something went wrong. Please try again.';
        },

        // Create faq Reducers
        [createConstants.pending]: (state) => {
            state.status = 'loading';
        },
        [createConstants.fulfilled]: (state, { payload }) => {
            if (payload.status === true) {
                state.msg = payload.msg;
                state.data.unshift(payload.data);
                if (state.data.length >= 10) {
                    state.data.pop();
                }
                state.status = 'success';
            }
            if (payload.status === false) {
                state.msg = payload.msg || 'Network Error';
                state.status = 'failed';
            }
        },
        [createConstants.rejected]: (state) => {
            state.status = 'failed';
            state.msg = 'Something went wrong. Please try again.';
        },

        // Update faq Reducers
        [updateConstants.pending]: (state) => {
            state.status = 'loading';
        },
        [updateConstants.fulfilled]: (state, { payload }) => {
            if (payload.status === true) {
                state.msg = payload.msg;
                state.data[parseInt(state.dataIndex)] = payload.data;
                if (state.data.length >= 10) {
                    state.data.pop();
                }
                state.status = 'success';
            }
            if (payload.status === false) {
                state.msg = payload.msg;
                state.status = 'failed';
            }
        },
        [updateConstants.rejected]: (state) => {
            state.status = 'failed';
            state.msg = 'Something went wrong. Please try again.';
        }
    }
});

export const { setDataIndex } = ConstantsSlice.actions;

export default ConstantsSlice.reducer;
