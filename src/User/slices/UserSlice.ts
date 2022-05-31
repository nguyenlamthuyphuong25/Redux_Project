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
            if (state.numberCard === 0) {
                let cart = {
                    id: action.payload.id,
                    quantity: 1,
                    name: action.payload.name,
                    imgUrl: action.payload.imgUrl,
                    price: action.payload.price,
                    imgName: action.payload.imgName
                }
                state.cart.push(cart);
            }
            else {
                let check = false;
                state.cart.map((item, key) => {
                    if (item.id == action.payload.id) {
                        state.cart[key].quantity++;
                        check = true;
                    }
                });
                if (!check) {
                    let _cart = {
                        id: action.payload.id,
                        quantity: 1,
                        name: action.payload.name,
                        imgUrl: action.payload.imgUrl,
                        price: action.payload.price,
                        imgName: action.payload.imgName
                    }
                    state.cart.push(_cart);
                }
            }
    },
    increaseQuantity: (state, action) => {
        state.numberCard = state.numberCard + 1;
        state.cart[action.payload].quantity = state.cart[action.payload].quantity + 1
    },
    decreaseQuantity: (state, action) => {
        let quantity = state.cart[action.payload].quantity;
        if (quantity > 1) {
            state.numberCard--;
            state.cart[action.payload].quantity--;
        }
    },
    delCart: (state, action) => {
        let quantityCart = state.cart[action.payload].quantity;
        state.numberCard = state.numberCard - quantityCart
        state.cart = state.cart.filter(item => {
            return item.id !== state.cart[action.payload].id
        })
    }
}
});

export default userSlice.reducer;
export const { addToCart, increaseQuantity, decreaseQuantity, delCart } = userSlice.actions;
