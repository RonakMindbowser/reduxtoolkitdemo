import { configureStore } from '@reduxjs/toolkit'
import bookReducer from '../slices/bookSlice'
import counterReducer, { exampleSlice } from '../slices/counterSlice'
import dashboardReducer from '../slices/dashboardSlice'
import loginReducer from '../slices/loginSlice'
import postReducer from '../slices/postSlice'

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        example: exampleSlice,
        post: postReducer,
        login: loginReducer,
        dashboard: dashboardReducer,
        book: bookReducer,
    },
})