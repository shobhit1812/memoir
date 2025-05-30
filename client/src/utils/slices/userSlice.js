import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { createSlice } from "@reduxjs/toolkit";

const userPersistConfig = {
  key: "user",
  storage,
};

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    addUser: (_, action) => action.payload,
    removeUser: () => null,
  },
});

export const { addUser, removeUser } = userSlice.actions;

// Wrap with persistReducer to enable persistent configuration
export default persistReducer(userPersistConfig, userSlice.reducer);
