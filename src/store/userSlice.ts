import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { $api, API_BASE_URL } from "../http";
import { AuthData, AuthResponse, User } from "../types";

interface InitialState {
    user: User;
    isAuth: boolean;
}
const initialState = {} as InitialState;

export const registration = createAsyncThunk<AuthResponse, AuthData>(
    "user/registration",
    async (authData, { rejectWithValue }) => {
        const res = await $api.post<AuthResponse>("/registration", authData);
        return res.data;
    }
);

export const login = createAsyncThunk<AuthResponse, AuthData>(
    "user/login",
    async (authData, { rejectWithValue }) => {
        const res = await $api.post<AuthResponse>("/login", authData);
        return res.data;
    }
);

export const logout = createAsyncThunk<AuthResponse, void>(
    "user/logout",
    async (_, { rejectWithValue }) => {
        const res = await $api.post<AuthResponse>("/logout");
        return res.data;
    }
);

export const checkAuth = createAsyncThunk<AuthResponse, void>(
    "user/checkAuth",
    async (_, { rejectWithValue }) => {
        if (localStorage.getItem("token")) {
            const res = await axios.get<AuthResponse>(
                `${API_BASE_URL}/refresh`,
                {
                    withCredentials: true,
                }
            );
            return res.data;
        } else {
            return rejectWithValue("no token");
        }
    }
);

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registration.fulfilled, (state, action) => {
                localStorage.setItem("token", action.payload.accessToken);
                state.isAuth = true;
                state.user = action.payload.user;
            })
            .addCase(login.fulfilled, (state, action) => {
                localStorage.setItem("token", action.payload.accessToken);
                state.isAuth = true;
                state.user = action.payload.user;
            })
            .addCase(logout.fulfilled, (state) => {
                localStorage.removeItem("token");
                state.isAuth = false;
                state.user = {} as User;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                localStorage.setItem("token", action.payload.accessToken);
                state.isAuth = true;
                state.user = action.payload.user;
            });
    },
});
