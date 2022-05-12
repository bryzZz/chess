import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { $api, API_BASE_URL } from "../http";
import { AuthData, AuthResponse, User } from "../types";
// import { io, Socket } from "socket.io-client";
import { PlayerColor } from "../types";

// export interface ServerToClientEvents {
// gameCreated: (gameId: GameId) => void;
// gameJoined: (gameId: GameId) => void;
// userJoinedTheGame: (username: Player["username"]) => void;
// }
// export interface ClientToServerEvents {
// createGame: (color: PlayerColor) => void;
// joinGame: (gameId: GameId) => void;
// getGameFEN: (gameId: GameId, callback: (FEN: FEN) => void) => void;
// getUserGameSettings: (
//     gameId: GameId,
//     username: Player["username"],
//     callback: (settings: { FEN: FEN; color: Color }) => void
// ) => void;
// message: (gameId: GameId, text: string) => void;
// }

interface CreateGameResponse {
    id: string;
    FEN: string;
}

export const createGame = createAsyncThunk<CreateGameResponse, PlayerColor>(
    "user/registration",
    async (color, { rejectWithValue }) => {
        const res = await $api.post<CreateGameResponse>("/game/create", {
            color,
        });
        return res.data;
    }
);

interface InitialState {
    color: PlayerColor;
    FEN: string;
    gameId: string;
}
const initialState = {} as InitialState;

export const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createGame.fulfilled, (state, action) => {
            state.FEN = action.payload.FEN;
            state.gameId = action.payload.id;
        });
    },
});
