import { createAction, createReducer, createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: 0,
}

const initialStateForExample = {
    value: 1
}

export const multiplication = createAction("counter/multiply");
export const incrementAmount = createAction("counter/incrementAmount");

// //reducer
// //way1 using builder callback notation
// export const exampleSlice = createReducer(initialStateForExample, (builder) => {
//     builder.addCase(multiplication, (state, action) => {
//         state.value = state.value * 2
//     });
//     builder.addCase(incrementAmount, (state, action) => {
//         state.value = state.value + action.payload;
//     });
// })

// way2 using map object notation
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