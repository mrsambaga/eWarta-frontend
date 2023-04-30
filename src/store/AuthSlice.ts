import { createSlice } from "@reduxjs/toolkit";
import { GetCookie } from "../utils/Cookies/Cookies";

const authSlice = createSlice({
    name:'auth',
    initialState: { isAuthenticated: GetCookie('token') ? true : false },
    reducers: {
        login(state) {
            state.isAuthenticated = true;
        },
        logout(state) {
            state.isAuthenticated = false;
        },
    }
})

export const authActions = authSlice.actions;

export default authSlice;  