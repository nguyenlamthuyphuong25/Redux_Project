import { configureStore } from '@reduxjs/toolkit';

import userSlice from '../slices/UserSlice'



const store = configureStore({
    reducer: {
        users: userSlice,
    },
})

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;

export default store;