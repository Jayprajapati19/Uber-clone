import React, { createContext, useEffect, useContext } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

const socket = io(`${import.meta.env.VITE_BASE_URL}`, {
    autoConnect: false,
    reconnection: true
});

export const SocketProvider = ({ children }) => {
    useEffect(() => {
        // Connect to socket server
        socket.connect();

        // Connection event handlers
        socket.on('connect', () => {
            console.log('Connected to socket server');
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from socket server');
        });

        socket.on('connect_error', (error) => {
            console.log('Connection error:', error);
        });

        // Cleanup on unmount
        return () => {
            socket.disconnect();
        };
    }, []);

    // Utility function to emit events
    const emit = (eventName, data) => {
        if (socket.connected) {
            socket.emit(eventName, data);
        }
    };

    // Utility function to listen to events
    const on = (eventName, callback) => {
        socket.on(eventName, callback);
        return () => socket.off(eventName, callback);
    };

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};

// Custom hook for using socket context
export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error('useSocket must be used within a SocketProvider');
    }
    return context;
};
