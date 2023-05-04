import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from "./AuthSlice";
import loginFormSlice from "./LoginFormSlice";
import registerFormSlice from "./RegisterFormSlice";
import newsDetailSlice from "./NewsDetailSlice";
import adminAuthSlice from "./AdminAuthSlice";
import newsSlice from "./NewsSlice";

const rootReducer = combineReducers({
    auth: authSlice.reducer,
    loginForm: loginFormSlice.reducer,
    registerForm: registerFormSlice.reducer,
    news: newsSlice.reducer,
    newsDetail: newsDetailSlice.reducer,
    authAdmin: adminAuthSlice.reducer
})

export type RootState = ReturnType<typeof rootReducer>

const Store = configureStore({
    reducer : rootReducer
})

export default Store
