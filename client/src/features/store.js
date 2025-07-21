import { configureStore } from "@reduxjs/toolkit";

// import reducers
import authSlice from "./authSlice";

// configure store
export const store = configureStore({
    reducer: {
        auth: authSlice,
    },
});
