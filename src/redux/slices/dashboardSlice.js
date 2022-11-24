import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signOut } from "firebase/auth";
import { FirebaseAuth } from "../../utils/firebase";

export const singout = createAsyncThunk("dashboard/signout", async () => {
    try {
        const response = await signOut(FirebaseAuth);
        console.log("response :", response);
        return {
            success: true,
            response
        }
    } catch (error) {
        console.log("Error :", error);
        return {
            success: false,
            error,
        }
    }
})

export const dashboardSlice = createSlice({
    name: "dashboard",
    initialState: {
        success: false,
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder.addCase(singout.pending, (state, action) => {
            state.loading = true;
            state.success = false;
            state.error = null;
        });
        builder.addCase(singout.fulfilled, (state, action) => {
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
        });
        builder.addCase(singout.rejected, (state, action) => {
            console.log("action :", action);
            state.loading = false;
            state.success = false;
            state.error = action?.payload;
        });
    }
})

const dashboardReducer = dashboardSlice.reducer;
export default dashboardReducer;