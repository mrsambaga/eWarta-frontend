import { createSlice } from "@reduxjs/toolkit";

const newsHighlightSlice = createSlice({
    name:'highlight',
    initialState: { newsHighlight: [] },
    reducers:{
        setNewsHighlight: (state, action) => {
            state.newsHighlight = action.payload
        }
    }
})

export const newsHighlightActions = newsHighlightSlice.actions;

export default newsHighlightSlice;  