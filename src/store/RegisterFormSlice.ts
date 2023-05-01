import { createSlice } from "@reduxjs/toolkit";

const registerFormSlice = createSlice({
    name:'registerForm',
    initialState: { name: '', email: '', password: '',  passwordConfirm: '', phone: '', address: '' },
    reducers: {
        updateRegisterForm: (state, actions) => {
            const {name, value } = actions.payload;
            return { ...state, [name] : value}
        },
    },
});

export const registerFormActions = registerFormSlice.actions;

export default registerFormSlice;  