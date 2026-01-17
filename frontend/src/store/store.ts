import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./authStore/authIndex";

export const store = configureStore({
    reducer:{
        auth:authSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AddDispatch = typeof store.dispatch;