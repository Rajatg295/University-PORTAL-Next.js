import { combineReducers, configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice";
import storage from "redux-persist/lib/storage/session";
import { persistReducer, persistStore } from "redux-persist";

const presistConfig = {
  timeout: 1000,
  key: "mpskey",
  storage,
};

const reducer = combineReducers({
  appState: appSlice,
});

const presistedReducer = persistReducer(presistConfig, reducer);

export const store = configureStore({
  reducer: presistedReducer,
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
