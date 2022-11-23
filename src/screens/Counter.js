import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment, incrementAmount, multiplication } from '../redux/slices/counterSlice'
import { fetchAllPosts } from '../redux/slices/postSlice'

export function Counter() {
    const count = useSelector((state) => state?.counter?.value)
    const example = useSelector((state) => state?.example)
    const posts = useSelector((state) => state.post)
    const dispatch = useDispatch()
    console.log("example :: ", example);
    console.log("posts :: ", posts);

    useEffect(() => {
        dispatch(fetchAllPosts())
    }, [])

    return (
        <div style={{ padding: '20px' }}>
            <div>
                <button
                    aria-label="Increment value"
                    onClick={() => {
                        dispatch(increment())
                    }}
                >
                    Increment
                </button>
                <span>{count}</span>
                <button
                    aria-label="Decrement value"
                    onClick={() => dispatch(decrement())}
                >
                    Decrement
                </button>

                <h4>Multiply example</h4>
                <span>{example?.value}</span>

                <button
                    aria-label="Multiply value"
                    onClick={() => {
                        dispatch(multiplication())
                    }}
                >
                    Multiply
                </button>
                <button
                    aria-label="Amount value"
                    onClick={() => {
                        dispatch(incrementAmount(5))
                    }}
                >
                    Add 5 Amount
                </button>
            </div>
        </div>
    )
}