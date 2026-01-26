import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./authStore/authIndex";
import { analyzeSlice } from "./analyzeStore/analyzeIndex";

export const store = configureStore({
    reducer:{
        auth:authSlice.reducer,
        analyze:analyzeSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AddDispatch = typeof store.dispatch;