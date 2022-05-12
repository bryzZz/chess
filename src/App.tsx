import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Login, Registration, CreateGame, JoinGame } from "./pages";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { checkAuth } from "./store/userSlice";
import { Layout } from "./components/Layout";

export const App: React.FC = () => {
    const { isAuth } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(checkAuth());
    }, []);

    return (
        <>
            {isAuth ? (
                <>
                    <Routes>
                        <Route path='/' element={<Layout />}>
                            <Route path='game'>
                                <Route path='start' element={<CreateGame />} />
                                <Route path='join' element={<JoinGame />} />
                                {/* <Route path=':gameId' element={<Game />} /> */}
                            </Route>
                        </Route>
                        <Route
                            path='*'
                            element={<Navigate to='/game/start' replace />}
                        />
                    </Routes>
                    {/* <Route path='/' element={<Home />}>
                        <Route index element={<DashBoard />} />
                        <Route path='game'>
                            <Route path='start' element={<CreateGame />} />
                            <Route path='join' element={<JoinGame />} />
                            <Route path=':gameId' element={<Game />} />
                        </Route>
                    </Route>
                    <Route path='*' element={<Navigate to='/' replace />} /> */}
                </>
            ) : (
                <Routes>
                    <Route path='/registration' element={<Registration />} />
                    <Route path='/login' element={<Login />} />
                    <Route
                        path='*'
                        element={<Navigate to='/login' replace />}
                    />
                </Routes>
            )}
        </>
    );
};
