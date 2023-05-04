import { createSlice } from "@reduxjs/toolkit";

const newsSlice = createSlice({
    name:'news',
    initialState: { news: [] },
    reducers:{
        setNews: (state, action) => {
            state.news = action.payload
        }
    }
})

export const newsActions = newsSlice.actions;

export default newsSlice;  