import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface AppState {
  isAuthenticated: boolean;
  access_token: string;
  userData: object;
  currentPageTitle: string;
  isWebView: boolean;
}

const initialState: AppState = {
  isAuthenticated: false,
  access_token: "",
  userData: {},
  currentPageTitle: "",
  isWebView: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<any>) => {
      state.access_token = action.payload.token;
      state.userData = action.payload.userData;
      state.isAuthenticated = true;
      state.currentPageTitle = "Home";
      state.isWebView = action.payload.isWebView;
      //console.log(action);
    },
    logOut: (state) => {
      state.isAuthenticated = false;
      state.access_token = "";
      state.userData = {};
      state.currentPageTitle = "MPS";
    },
    chagePageTitle: (state, action: PayloadAction<any>) => {
      state.currentPageTitle = action.payload;
    },
  },
});

export const { login, logOut, chagePageTitle } = appSlice.actions;

export default appSlice.reducer;
