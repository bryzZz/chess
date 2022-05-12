import { configureStore } from "@reduxjs/toolkit";
import { gameSlice } from "./gameSlice";
import { userSlice } from "./userSlice";
// import { authenticationApi } from "./authenticationApi";

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        game: gameSlice.reducer,
        //     [authenticationApi.reducerPath]: authenticationApi.reducer,
    },
    // middleware: (getDefaultMiddleware) =>
    //     getDefaultMiddleware().concat(authenticationApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
