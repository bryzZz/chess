export interface AuthData {
    username: string;
    password: string;
}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: User;
}

export interface User {
    id: string;
    username: string;
}

export type PlayerColor = "white" | "black";
