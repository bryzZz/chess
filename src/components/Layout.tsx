import React from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { logout } from "../store/userSlice";

export const Layout: React.FC = () => {
    const { user } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    return (
        <div className='Layout'>
            <header className='header'>
                <span>{user.username}</span>
                <button onClick={() => dispatch(logout())}>Logout</button>
            </header>
            <Outlet />
        </div>
    );
};
