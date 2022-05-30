import { createSlice } from "@reduxjs/toolkit";
import { ICartItem } from "../model/cart-model";



interface State {
    cart: ICartItem[]
}

const initialState: State = {
    cart: []
};

export const userSlice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {
        addToCart: (state, action) => {
            state.cart.push(action.payload);
        }
    }

})

export default userSlice.reducer;
export const { addToCart } = userSlice.actions