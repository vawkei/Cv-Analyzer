import { createSlice } from "@reduxjs/toolkit";
import type { AuthState } from "../../interface/interface";

const initialAuthState: AuthState = {
  isLoggedIn: false,
  isSuccess: false,
  message: "",
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    SET_REGISTERED_USER(state, action: any) {
      console.log("authSliceRegistered:", action.payload);
      state.message = action.payload.msg;
    },
    SET_LOGGEDIN_USER(state, action: any) {
      console.log("authSliceLoggedIn:", action.payload);
      state.isLoggedIn = true;
      (state.message = action.payload.msg), (state.user = action.payload.user);
    },
    SET_LOGGEDOUT_USER(state, action: any) {
      console.log("authSliceLoggedOut:", action.payload);
      (state.isLoggedIn = false), (state.user = null);
    },
    RESET_USER(state){
      state.isLoggedIn=false;
      state.isSuccess=false;
      state.user=null;
      state.message=""
    }
  },
});

export const { SET_REGISTERED_USER, SET_LOGGEDIN_USER, SET_LOGGEDOUT_USER, RESET_USER } =
  authSlice.actions;
