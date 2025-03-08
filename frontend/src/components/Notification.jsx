// src/components/Notification.js

import React, { useEffect } from 'react';
import { io } from 'socket.io-client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


//This is not used anywhere
const Notification = () => {
    useEffect(() => {
        const socket = io("http://localhost:5000"); // Ensure this matches your server URL
s
        socket.on("notification", (data) => {
            toast(data.message); // Display the toast notification
        });

        return () => {
            socket.off("notification");
            socket.disconnect();
        };
    }, []);

    return (
        <div>
            <ToastContainer />
        </div>
    );
};

export default Notification;