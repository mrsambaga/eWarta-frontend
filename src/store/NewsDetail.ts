import { createSlice } from "@reduxjs/toolkit";

// const initialState: NewsDetail = {
//     title: "",
//     summaryDesc: "",
//     imgUrl: "",
//     author: "",
//     content: "",
// }

const newsDetailSlice = createSlice({
    name:'detail',
    initialState: {newsDetail : {
        title: "",
        summaryDesc: "",
        imgUrl: "",
        author: "",
        content: "",
    }},
    reducers:{
        setNewsDetail: (state, action) => {
            state.newsDetail = action.payload
        }
    }
})

export const newsDetailActions = newsDetailSlice.actions;

export default newsDetailSlice;  