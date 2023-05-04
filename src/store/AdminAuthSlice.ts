import { createSlice } from "@reduxjs/toolkit";
import { GetCookie, SetCookie } from "../utils/Cookies/Cookies";

const adminAuthSlice = createSlice({
    name:'adminAuth',
    initialState: { isAdminAuthenticated: GetCookie('admin-token') ? true : false },
    reducers: {
        login(state, actions) {
            const { token, expiredHour } = actions.payload
            SetCookie("admin-token", token, expiredHour)
            SetCookie('token', '', 0);
            state.isAdminAuthenticated = true;
        },
        logout(state) {
            SetCookie('admin-token', '', 0);
            state.isAdminAuthenticated = false;
        },
    }
})

export const adminAuthActions = adminAuthSlice.actions;

export default adminAuthSlice;  