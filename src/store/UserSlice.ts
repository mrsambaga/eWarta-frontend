import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: { user: {
        name: "",
        email: "",
        phone: "",
        address: "",
        quota: 0,
        referral: ""
    }},
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        }
    }
})

export const userActions = userSlice.actions;

export default userSlice;  