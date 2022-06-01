import { createSlice } from "@reduxjs/toolkit";
import { ICartItem } from "../model/cart-model";

interface State {
    cart: ICartItem[];
    numberCard: number
}

const initialState: State = {
    cart: [],
    numberCard: 0
};

export const userSlice = createSlice({
    name: "users",
    initialState: initialState,
    reducers: {
        addToCart: (state, action) => {
            let check = false;
            state.cart.map((item, key) => {
                if (item.id == action.payload.id) {
                    state.cart[key].quantity++;
                    check = true;

                }
            });
            if (!check) {
                let cart = {
                    id: action.payload.id,
                    quantity: 1,
                    name: action.payload.name,
                    imgUrl: action.payload.imgURL,
                    price: action.payload.price,
                    imgName: action.payload.imgName
                }
                state.cart.push(cart);

            }
        },
        increaseQuantity: (state, action) => {

            state.cart[action.payload].quantity = state.cart[action.payload].quantity + 1
        },
        decreaseQuantity: (state, action) => {
            let quantity = state.cart[action.payload].quantity;
            if (quantity > 1) {

                state.cart[action.payload].quantity = state.cart[action.payload].quantity - 1;
            }
        },
        delCart: (state, action) => {
            let quantityCart = state.cart[action.payload].quantity;

            state.cart = state.cart.filter(item => {
                return item.id !== state.cart[action.payload].id
            })
        }
    }
});

export default userSlice.reducer;
export const { addToCart, increaseQuantity, decreaseQuantity, delCart } = userSlice.actions;
