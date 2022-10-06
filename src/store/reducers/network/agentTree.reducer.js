import { createSlice } from '@reduxjs/toolkit';
import { getAgentTreeData, viewAgentData } from 'store/thunk/network/agentTree.thunk';

const AgentSlice = createSlice({
    name: 'agent_tree',
    initialState: {
        status: null,
        msg: '',
        totalRecords: 0,
        data: [],
        agentData: [],
        dataIndex: ''
    },
    reducers: {
        setDataIndex: (state, { payload }) => {
            state.dataIndex = payload;
        }
    },
    extraReducers: {
        // Get Agent Type Reducers
        [getAgentTreeData.pending]: (state) => {
            state.status = 'loading';
        },
        [getAgentTreeData.fulfilled]: (state, { payload }) => {
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
        [getAgentTreeData.rejected]: (state) => {
            state.status = 'failed';
            state.msg = 'Something went wrong. Please try again.';
        },

        // View Agent Type Reducers
        [viewAgentData.pending]: (state) => {
            state.status = 'loading';
        },
        [viewAgentData.fulfilled]: (state, { payload }) => {
            if (payload.status === true) {
                state.msg = payload.msg;
                state.agentData = payload.data;
                state.status = 'success';
            }
            if (payload.status === false) {
                state.msg = payload.msg || 'Network Error';
                state.status = 'failed';
            }
        },
        [viewAgentData.rejected]: (state) => {
            state.status = 'failed';
            state.msg = 'Something went wrong. Please try again.';
        }
    }
});

export const { setDataIndex } = AgentSlice.actions;

export default AgentSlice.reducer;
