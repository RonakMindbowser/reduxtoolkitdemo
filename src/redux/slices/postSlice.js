import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
//Creating an action

export const fetchAllPosts = createAsyncThunk('post/list', async (payload, { getState, rejectWithValue, dispatch }) => {
    try {
        const { data } = await axios.get("https://jsonplaceholder.typicode.com/posts");
        return data
    } catch (error) {
        return error
    }
})

export const postSlice = createSlice({
    name: "post",
    initialState: {
        loading: false,
        postList: null,
        error: null
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllPosts.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(fetchAllPosts.fulfilled, (state, action) => {
            state.loading = false;
            state.postList = action.payload;
        })
        builder.addCase(fetchAllPosts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})
const postReducer = postSlice.reducer;
export default postReducer;

// export const { } = postSlice.actions
