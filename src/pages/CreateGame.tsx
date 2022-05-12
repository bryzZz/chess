import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { io } from "socket.io-client";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { createGame } from "../store/gameSlice";
import { PlayerColor } from "../types";

export const CreateGame: React.FC = () => {
    const [color, setColor] = useState<PlayerColor>("white");
    // const { current: socket } = useRef(
    //     io("http://localhost:5000/", {
    //         path: "/sockets/",
    //         autoConnect: false,
    //     })
    // );
    // const { id: userId } = useAppSelector((state) => state.user.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        // if (!socket) return;
        // fetch("http://localhost:5000")
        //     .then((res) => res.text())
        //     .then(console.log);
        // socket.on("connect_error", (err) => {
        //     if (err.message === "invalid username") {
        //         setUsername("");
        //     }
        // });
        // socket.on("gameCreated", (gameId) => {
        //     navigate("/game/" + gameId);
        // });
        // () => {
        //     socket.off("connect_error");
        //     socket.off("gameCreated");
        // };
    }, []);

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault();

        dispatch(createGame(color));
    };

    return (
        <div className='CreateGame'>
            <form onSubmit={submitHandler}>
                <select
                    value={color}
                    onChange={(e) => setColor(e.target.value as PlayerColor)}
                    name='color'
                >
                    <option value='white'>White</option>
                    <option value='black'>Black</option>
                </select>

                <button>Create</button>
            </form>
        </div>
    );
};
