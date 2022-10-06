import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL, InternalAPI, SubRoutes } from "common/constants";
import AgentDeposit from "views/pages/transaction/Agent/components/Forms/AgentDepositForm";

const user = JSON.parse(localStorage.getItem("MAJESTIC_CASINO"));

// CREATE TRANSACTIONS THUNK
export const createTransaction = createAsyncThunk(
  "transaction/createTransaction",
  async (data) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${user.accessToken}`,
      },
      body: JSON.stringify(data),
    };
    return fetch(`${API_URL}${InternalAPI.TRANSACTION}`, requestOptions).then(
      (res) => res.json()
    );
  }
);

// GET TRANSACTIONS THUNK
export const getTransaction = createAsyncThunk(
  "transaction/getTransaction",
  async ({ pageno, limit, isActive }) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${user.accessToken}`,
      },
      body: JSON.stringify({
        pageNumber: pageno,
        pageLimit: limit,
        ISACTIVE: isActive,
      }),
    };
    return fetch(
      `${API_URL}${InternalAPI.AGENTTRANSACTION}${SubRoutes.LIST}`,
      requestOptions
    ).then((res) => res.json());
  }
);

// GET Player TRANSACTIONS THUNK
export const getPlayerTransaction = createAsyncThunk(
  "transaction/getPlayerTransaction",
  async ({ pageno, limit, isActive }) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${user.accessToken}`,
      },
      body: JSON.stringify({
        pageNumber: pageno,
        pageLimit: limit,
        ISACTIVE: isActive,
      }),
    };
    return fetch(
      `${API_URL}${InternalAPI.PLAYERTRANSACTION}${SubRoutes.LIST}`,
      requestOptions
    ).then((res) => res.json());
  }
);

// GET Player TRANSACTIONS THUNK
export const getPlayerData = createAsyncThunk(
  "transaction/getPlayerData",
  async ({ value }) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${user.accessToken}`,
      },
      body: JSON.stringify({
        search: value,
      }),
    };
    return fetch(
      `${API_URL}${InternalAPI.PLAYERTRANSACTION}${SubRoutes.GETPLAYER}`,
      requestOptions
    ).then((res) => res.json());
  }
);

// GET AGENT TRANSACTIONS THUNK
export const getAgentData = createAsyncThunk(
  "transaction/getAgentData",
  async ({ value }) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${user.accessToken}`,
      },
      body: JSON.stringify({
        search: value,
      }),
    };
    return fetch(
      `${API_URL}${InternalAPI.AGENTTRANSACTION}${SubRoutes.GETAGENT}`,
      requestOptions
    ).then((res) => res.json());
  }
);

// GET Player TRANSACTIONS THUNK
export const playerDeposit = createAsyncThunk(
  "transaction/playerDeposit",
  async ({
    majestic_coins,
    majestic_points,
    transaction_type,
    agentId,
    playerId,
  }) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${user.accessToken}`,
      },
      body: JSON.stringify({
        MAGESTIC_COINS: majestic_coins,
        MAGESTIC_POINTS: majestic_points,
        TYPE: transaction_type,
        AGENT_ID: agentId,
        PLAYER_ID: playerId,
      }),
    };
    return fetch(
      `${API_URL}${InternalAPI.PLAYERTRANSACTION}`,
      requestOptions
    ).then((res) => res.json());
  }
);

// GET Player TRANSACTIONS THUNK
export const agentDeposit = createAsyncThunk(
  "transaction/agentDeposit",
  async ({
    majestic_coins,
    majestic_points,
    buy_amount,
    agentId,
    senderId,
  }) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${user.accessToken}`,
      },
      body: JSON.stringify({
        MAGESTIC_COINS: majestic_coins,
        MAGESTIC_POINTS: majestic_points,
        BUY_AMOUNT: buy_amount,
        AGENT_ID: agentId,
        UPDATED_BY: senderId,
      }),
    };
    return fetch(
      `${API_URL}${InternalAPI.AGENTTRANSACTION}`,
      requestOptions
    ).then((res) => res.json());
  }
);
