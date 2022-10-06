import { createSlice } from '@reduxjs/toolkit';
import {
    createLoyaltyRedeemPack,
    getRedemptionPack,
    updateRedemptionPack,
    deleteRedemptionPack,
    getRedemptionPackList
} from 'store/thunk/configuration/loyaltyRedeem.thunk';

const LoyaltyRedeemSlice = createSlice({
    name: 'loyalty_redeem',
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
        // Get Agent Type Reducers
        [getRedemptionPack.pending]: (state) => {
            state.status = 'loading';
        },
        [getRedemptionPack.fulfilled]: (state, { payload }) => {
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
        [getRedemptionPack.rejected]: (state) => {
            state.status = 'failed';
            state.msg = 'Something went wrong. Please try again.';
        },

        // Get Coin Packs List Reducers
        [getRedemptionPackList.pending]: (state) => {
            state.status = 'loading';
        },
        [getRedemptionPackList.fulfilled]: (state, { payload }) => {
            if (payload.status === true) {
                state.msg = payload.msg;
                state.coinPackList = payload.data;
                state.status = 'success';
            }
            if (payload.status === false) {
                state.msg = payload.msg || 'Network Error';
                state.status = 'failed';
            }
        },
        [getRedemptionPackList.rejected]: (state) => {
            state.status = 'failed';
            state.msg = 'Something went wrong. Please try again.';
        },

        // Create Agent Type Reducers
        [createLoyaltyRedeemPack.pending]: (state) => {
            state.status = 'loading';
        },
        [createLoyaltyRedeemPack.fulfilled]: (state, { payload }) => {
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
        [createLoyaltyRedeemPack.rejected]: (state) => {
            state.status = 'failed';
            state.msg = 'Something went wrong. Please try again.';
        },

        // Update Agent Type Reducers
        [updateRedemptionPack.pending]: (state) => {
            state.status = 'loading';
        },
        [updateRedemptionPack.fulfilled]: (state, { payload }) => {
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
        [updateRedemptionPack.rejected]: (state) => {
            state.status = 'failed';
            state.msg = 'Something went wrong. Please try again.';
        },

        // Delete Agent Type Reducers
        [deleteRedemptionPack.pending]: (state) => {
            state.status = 'loading';
        },
        [deleteRedemptionPack.fulfilled]: (state, { payload }) => {
            if (payload.status === true) {
                state.msg = payload.msg;
                state.data.splice(state.dataIndex, 1);
                state.status = 'success';
            }
            if (payload.status === false) {
                state.msg = payload.msg || 'Network not available';
                state.status = 'failed';
            }
        },
        [deleteRedemptionPack.rejected]: (state) => {
            state.status = 'failed';
            state.msg = 'Something went wrong. Please try again.';
        }
    }
});

export const { setDataIndex } = LoyaltyRedeemSlice.actions;

export default LoyaltyRedeemSlice.reducer;
