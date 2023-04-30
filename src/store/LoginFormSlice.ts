import { createSlice } from "@reduxjs/toolkit";

const loginFormSlice = createSlice({
    name:'loginForm',
    initialState: { email: '', password: '' },
    reducers: {
        updateLoginForm: (state, actions) => {
            const {name, value } = actions.payload;
            return { ...state, [name] : value}
        },
    },
});

export const loginFormActions = loginFormSlice.actions;

export default loginFormSlice;  