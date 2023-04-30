import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from "./AuthSlice";
import loginFormSlice from "./LoginFormSlice";

const rootReducer = combineReducers({
    auth: authSlice.reducer,
    loginForm: loginFormSlice.reducer
})

export type RootState = ReturnType<typeof rootReducer>

const Store = configureStore({
    reducer : rootReducer
})

export default Store
