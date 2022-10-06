import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL, InternalAPI, SubRoutes } from "common/constants";

const user = JSON.parse(localStorage.getItem("MAJESTIC_CASINO"));

// GET DASHBOARD DATA THUNK
export const getDashboardData = createAsyncThunk(
  "dashboard/getDashboardData",
  async ({ pageno, limit }) => {
    // window.location.reload();
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${user.accessToken}`,
      },
      body: JSON.stringify({ pageNumber: pageno, pageLimit: limit }),
    };
    return fetch(
      `${API_URL}${InternalAPI.DASHBOARD}${SubRoutes.LIST}`,
      requestOptions
    ).then((res) => res.json());
  }
);
