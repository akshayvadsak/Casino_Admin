import { createSlice } from "@reduxjs/toolkit";
import {
  getTransaction,
  createTransaction,
  getPlayerTransaction,
  getPlayerData,
  playerDeposit,
  getAgentData,
  agentDeposit,
} from "store/thunk/transaction/transaction.thunk";

const TransactionSlice = createSlice({
  name: "transaction",
  initialState: {
    status: null,
    msg: "",
    totalRecords: 0,
    data: [],
    playerData: [],
    agentData: [],
    dataIndex: "",
  },
  reducers: {
    setDataIndex: (state, { payload }) => {
      state.dataIndex = payload;
    },
  },
  extraReducers: {
    // Get Agent Type Reducers
    [getTransaction.pending]: (state) => {
      state.status = "loading";
    },
    [getTransaction.fulfilled]: (state, { payload }) => {
      if (payload.status === true) {
        state.msg = payload.msg;
        state.data = payload.data;
        state.totalRecords = payload.total;
        state.status = "success";
      }
      if (payload.status === false) {
        state.msg = payload.msg || "Network Error";
        state.status = "failed";
      }
    },
    [getTransaction.rejected]: (state) => {
      state.status = "failed";
      state.msg = "Something went wrong. Please try again.";
    },

    // Get Agent Type Reducers
    [getPlayerTransaction.pending]: (state) => {
      state.status = "loading";
    },
    [getPlayerTransaction.fulfilled]: (state, { payload }) => {
      if (payload.status === true) {
        state.msg = payload.msg;
        state.data = payload.data;
        state.totalRecords = payload.total;
        state.status = "success";
      }
      if (payload.status === false) {
        state.msg = payload.msg || "Network Error";
        state.status = "failed";
      }
    },
    [getPlayerTransaction.rejected]: (state) => {
      state.status = "failed";
      state.msg = "Something went wrong. Please try again.";
    },

    // Get Agent Type Reducers
    [getPlayerData.pending]: (state) => {
      state.status = "loading";
    },
    [getPlayerData.fulfilled]: (state, { payload }) => {
      if (payload.status === true) {
        state.msg = payload.msg;
        state.playerData = payload.data;
        state.totalRecords = payload.total;
        state.status = "success";
      }
      if (payload.status === false) {
        state.msg = payload.msg || "Network Error";
        state.status = "failed";
      }
    },
    [getPlayerData.rejected]: (state) => {
      state.status = "failed";
      state.msg = "Something went wrong. Please try again.";
    },

    // Get Agent Type Reducers
    [getAgentData.pending]: (state) => {
      state.status = "loading";
    },
    [getAgentData.fulfilled]: (state, { payload }) => {
      if (payload.status === true) {
        state.msg = payload.msg;
        state.agentData = payload.data;
        state.totalRecords = payload.total;
        state.status = "success";
      }
      if (payload.status === false) {
        state.msg = payload.msg || "Network Error";
        state.status = "failed";
      }
    },
    [getAgentData.rejected]: (state) => {
      state.status = "failed";
      state.msg = "Something went wrong. Please try again.";
    },

    // Get Agent Type Reducers
    [playerDeposit.pending]: (state) => {
      state.status = "loading";
    },
    [playerDeposit.fulfilled]: (state, { payload }) => {
      if (payload.status === true) {
        state.msg = payload.msg;
        state.totalRecords = payload.total;
        state.status = "success";
      }
      if (payload.status === false) {
        state.msg = payload.msg || "Network Error";
        state.status = "failed";
      }
    },
    [playerDeposit.rejected]: (state) => {
      state.status = "failed";
      state.msg = "Something went wrong. Please try again.";
    },

    // Get Agent Type Reducers
    [agentDeposit.pending]: (state) => {
      state.status = "loading";
    },
    [agentDeposit.fulfilled]: (state, { payload }) => {
      if (payload.status === true) {
        state.msg = payload.msg;
        state.totalRecords = payload.total;
        state.status = "success";
      }
      if (payload.status === false) {
        state.msg = payload.msg || "Network Error";
        state.status = "failed";
      }
    },
    [agentDeposit.rejected]: (state) => {
      state.status = "failed";
      state.msg = "Something went wrong. Please try again.";
    },

    // Create Agent Type Reducers
    [createTransaction.pending]: (state) => {
      state.status = "loading";
    },
    [createTransaction.fulfilled]: (state, { payload }) => {
      if (payload.status === true) {
        state.msg = payload.msg;
        state.data.unshift(payload.data);
        if (state.data.length >= 10) {
          state.data.pop();
        }
        state.status = "success";
      }
      if (payload.status === false) {
        state.msg = payload.msg || "Network Error";
        state.status = "failed";
      }
    },
    [createTransaction.rejected]: (state) => {
      state.status = "failed";
      state.msg = "Something went wrong. Please try again.";
    },
  },
});

export const { setDataIndex, clearAgentList, removeLastAgentType } =
  TransactionSlice.actions;

export default TransactionSlice.reducer;
