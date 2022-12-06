import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { FirestoreDb } from "../../utils/firebase";
import { v4 as uuidv4 } from 'uuid';

export const addNewBook = createAsyncThunk("book/addbook", async (payload,) => {
    try {
        let id = uuidv4()
        const bookRef = doc(FirestoreDb, "books", id);
        const response = await setDoc(bookRef, { ...payload, id });
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

export const getAllBooks = createAsyncThunk("book/getBookList", async (payload) => {
    try {
        const bookListRef = collection(FirestoreDb, "books");
        const docSnap = await getDocs(bookListRef);
        let mappedList = docSnap.docs.map((obj) => obj.data())
        console.log("mappedList: ", mappedList);
        return {
            success: true,
            bookList: mappedList,
        }
    } catch (error) {
        console.log("Error :", error);
        return {
            success: false,
            error,
        }
    }
})

export const editBook = createAsyncThunk("book/editBook", async (payload) => {
    try {
        let id = payload?.id
        const bookRef = doc(FirestoreDb, "books", id);
        const response = await updateDoc(bookRef, { ...payload, id });
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

export const deleteBook = createAsyncThunk("book/deleteBook", async (payload) => {
    try {
        let id = payload?.id
        const bookRef = doc(FirestoreDb, "books", id);
        const response = await deleteDoc(bookRef);
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

let initialState = {
    loading: false,
    bookList: [],
    error: null,
    success: false,
}

export const bookSlice = createSlice({
    name: "book",
    initialState: initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        //add new book Case
        builder.addCase(addNewBook.pending, (state, action) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        })
        builder.addCase(addNewBook.fulfilled, (state, action) => {
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
        builder.addCase(addNewBook.rejected, (state, action) => {
            console.log("action :", action);
            state.loading = false;
            state.success = false;
            state.error = action?.payload;
        });

        //Get all book Case
        builder.addCase(getAllBooks.pending, (state, action) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        })
        builder.addCase(getAllBooks.fulfilled, (state, action) => {
            console.log("action :", action);
            state.loading = false;
            if (action?.payload?.success) {
                state.success = true;
                state.error = null;
                state.bookList = action?.payload?.bookList;
            }
            else {
                state.success = false;
                state.error = action?.payload?.error;
            }
        })
        builder.addCase(getAllBooks.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action?.payload;
        })

        //Edit Case
        builder.addCase(editBook.pending, (state, action) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        })
        builder.addCase(editBook.fulfilled, (state, action) => {
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
        builder.addCase(editBook.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action?.payload;
        })

        //Delete Case
        builder.addCase(deleteBook.pending, (state, action) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        })
        builder.addCase(deleteBook.fulfilled, (state, action) => {
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
        builder.addCase(deleteBook.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action?.payload;
        })

        //Default Case
        builder.addDefaultCase((state, action) => {
            state.error = null;
            state.success = false;
            state.bookList = [];
            state.loading = false;
        })
    }
})

const bookReducer = bookSlice.reducer;
export const { reset: bookReset } = bookSlice.actions;
export default bookReducer;