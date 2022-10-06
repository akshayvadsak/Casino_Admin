import { createSlice } from '@reduxjs/toolkit';
import { getDashboardData } from 'store/thunk/dashboard.thunk';

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        status: null,
        msg: '',
        totalRecords: 0,
        countNetwork: '',
        countTotalplayer: '',
        countActiveplayer: '',
        dataIndex: ''
    },
    reducers: {
        setDataIndex: (state, { payload }) => {
            state.dataIndex = payload;
        }
    },
    extraReducers: {
        // Get Players Reducers
        [getDashboardData.pending]: (state) => {
            state.status = 'loading';
        },
        [getDashboardData.fulfilled]: (state, { payload }) => {
            if (payload.status === true) {
                state.msg = payload.msg;
                state.countNetwork = payload.countNetwork;
                state.countTotalplayer = payload.countTotalplayer;
                state.countActiveplayer = payload.countActiveplayer;
                state.totalRecords = payload.total;
                state.status = 'success';
            }
            if (payload.status === false) {
                state.msg = payload.msg || 'Network Error';
                state.status = 'failed';
            }
        },
        [getDashboardData.rejected]: (state) => {
            state.status = 'failed';
            state.msg = 'Something went wrong. Please try again.';
        }
    }
});

export const { setDataIndex } = dashboardSlice.actions;

export default dashboardSlice.reducer;
