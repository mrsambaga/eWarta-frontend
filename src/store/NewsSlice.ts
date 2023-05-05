import { createSlice } from "@reduxjs/toolkit";
import { News } from "../constant/NewsProps";

type NewsState = {
    news: News[];
};
  
const initialState: NewsState = {
    news: [],
};
  
const newsSlice = createSlice({
    name: "news",
    initialState,
    reducers: {
        setNews: (state, action) => {
            state.news = action.payload;
        },
    },
});

export const newsActions = newsSlice.actions;

export default newsSlice;  