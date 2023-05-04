import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from "./AuthSlice";
import loginFormSlice from "./LoginFormSlice";
import registerFormSlice from "./RegisterFormSlice";
import newsHighlightSlice from "./NewsHighlightSlice";
import newsDetailSlice from "./NewsDetail";

const rootReducer = combineReducers({
    auth: authSlice.reducer,
    loginForm: loginFormSlice.reducer,
    registerForm: registerFormSlice.reducer,
    newsHighlight: newsHighlightSlice.reducer,
    newsDetail: newsDetailSlice.reducer
})

export type RootState = ReturnType<typeof rootReducer>

const Store = configureStore({
    reducer : rootReducer
})

export default Store
