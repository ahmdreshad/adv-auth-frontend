import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth/authSlice'
import emailReducer from '../features/email/emailSlice'
import filterReducer from '../features/filter/filterSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        email: emailReducer,
        filter: filterReducer
    }
})


