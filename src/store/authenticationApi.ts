import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AuthData } from "../types";

export const authenticationApi = createApi({
    reducerPath: "authenticationApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
    endpoints: (builder) => ({
        registration: builder.query<void, AuthData>({
            query: (authData) => ({
                url: "/registration",
                method: "POST",
                body: authData,
            }),
        }),
    }),
});
