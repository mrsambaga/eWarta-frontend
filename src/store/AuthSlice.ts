import { createSlice } from "@reduxjs/toolkit";
import { GetCookie, SetCookie } from "../utils/Cookies/Cookies";

const authSlice = createSlice({
    name:'auth',
    initialState: { isAuthenticated: GetCookie('token') ? true : false },
    reducers: {
        login(state, actions) {
            const { token, expiredHour } = actions.payload
            SetCookie("token", token, expiredHour)
            state.isAuthenticated = true;
        },
        logout(state) {
            SetCookie('token', '', 0);
            state.isAuthenticated = false;
        },
    }
})

export const authActions = authSlice.actions;

export default authSlice;  