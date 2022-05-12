import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../hooks/redux";
import { registration } from "../store/userSlice";
import { AuthData } from "../types";

export const Registration: React.FC = () => {
    const [fromData, setFromData] = useState<AuthData>({
        username: "",
        password: "",
    });
    const dispatch = useAppDispatch();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        dispatch(registration(fromData));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFromData({ ...fromData, [e.target.name]: e.target.value });
    };

    return (
        <>
            <h2>Login page</h2>
            <form className='Login' onSubmit={handleSubmit}>
                <input
                    value={fromData.username}
                    onChange={handleChange}
                    name='username'
                    type='text'
                    placeholder='Your username'
                />
                <input
                    value={fromData.password}
                    onChange={handleChange}
                    name='password'
                    type='password'
                    placeholder='password'
                />
                <button>Login</button>
                <Link to='/login'>Already have an account?</Link>
            </form>
        </>
    );
};
