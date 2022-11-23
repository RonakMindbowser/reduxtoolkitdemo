import { configureStore } from '@reduxjs/toolkit'
import counterReducer, { exampleSlice } from '../slices/counterSlice'
import postReducer from '../slices/postSlice'

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        example: exampleSlice,
        post: postReducer,
    },
})