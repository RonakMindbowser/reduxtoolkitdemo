import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseAuth } from "../../utils/firebase";
import { showCustomToast, toastType } from "../../utils/helpers";

export const loginWithPassword = createAsyncThunk('app/login', async (payload, { getState }) => {
    try {
        const { email, password } = payload
        const response = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        console.log("response :", response);
        return {
            success: true,
            response
        }
    } catch (error) {
        console.log("Error :", error);
        const errorCode = error.code;
        if (errorCode == 'auth/user-not-found') {
            showCustomToast("User not found.Please do sign up", toastType.e)
        }
        else if (errorCode == 'auth/wrong-password') {
            showCustomToast("Password is not correct", toastType.e)
        }
        else {
            showCustomToast("Something went wrong", toastType.e)
        }
        return {
            success: false,
            error,
        }
    }
})

export const loginSlice = createSlice({
    name: "login",
    initialState: {
        loading: false,
        success: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder.addCase(loginWithPassword.pending, (state, action) => {
            state.loading = true;
            state.success = false;
            state.error = null;
        })
        builder.addCase(loginWithPassword.fulfilled, (state, action) => {
            console.log("action :", action);
            state.loading = false;
            if (action?.payload?.success) {
                state.success = true;
                state.error = null;
            }
            else {
                state.success = false;
                state.error = action?.payload?.error;
            }
        })
        builder.addCase(loginWithPassword.rejected, (state, action) => {
            console.log("action :", action);
            state.loading = false;
            state.success = false;
            state.error = action?.payload;
        })
    }
})

const loginReducer = loginSlice.reducer;
export default loginReducer;