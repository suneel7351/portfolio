import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./loginSlice";
import UserSlice from "./user";

const store = configureStore({
  reducer: {
    login: loginSlice,
    user: UserSlice,
  },
});

export default store;
