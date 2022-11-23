import { createAction, createReducer, createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: 0,
}

const initialStateForExample = {
    value: 1
}

export const multiplication = createAction("multiply/counter");
export const incrementAmount = createAction("incrementAmount/counter");

//reducer
//way1 using builder callback notation
// export const exampleSlice = createReducer(initialStateForExample, (builder) => {
//     builder.addCase(multiplication, (state, action) => {
//         state.value = state.value * 2
//     });
//     builder.addCase(incrementAmount, (state, action) => {
//         state.value = state.value + action.payload;
//     });
//     builder.addDefaultCase((state, action) => {
//         state.value = 1
//     })
// })
//way2 using map object notation
export const exampleSlice = createReducer(initialStateForExample, {
    [multiplication]: (state, action) => {
        state.value = state.value * 2
    },
    [incrementAmount]: (state, action) => {
        state.value = state.value + action.payload;
    }
})

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions

const counterReducer = counterSlice.reducer
export default counterReducer