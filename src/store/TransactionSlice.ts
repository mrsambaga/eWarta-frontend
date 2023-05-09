import { createSlice } from "@reduxjs/toolkit";

const transactionSlice = createSlice({
    name:'transaction',
    initialState: { transactions : [] },
    reducers: {

    }
})

export const transactionActions = transactionSlice.actions;

export default transactionSlice;  