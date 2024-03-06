import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      window.localStorage.setItem('user', JSON.stringify(action.payload));
    },
    removeUser: (state) => {
      state.user = null;
      window.localStorage.removeItem('user');
    },
    setUserFromLocalStorage: (state) => {
      const user = window.localStorage.getItem('user');
      if (user) {
        state.user = JSON.parse(user);
      } else {
        state.user = null;
      }
    },
  },
});

export const { setUser, removeUser, setUserFromLocalStorage } = authSlice.actions;

const persistedAuthReducer = persistReducer(persistConfig, authSlice.reducer);

export default persistedAuthReducer;
