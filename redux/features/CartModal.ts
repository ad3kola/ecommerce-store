import { createSlice } from "@reduxjs/toolkit";

export type InitialStateProps = {
    value: {
        cartState: boolean;
    }
}

const initialState = {
    value: {
        cartState: false
    }
} as InitialStateProps

export const cartmodalslice = createSlice({
    name: 'cartmodal',
    initialState,
    reducers: {
        openCart: (state) => {
            state.value.cartState = true
        },
        closeCart: (state) => {
            state.value.cartState = false
        }
    }
})

export const {openCart, closeCart} = cartmodalslice.actions
export default cartmodalslice.reducer