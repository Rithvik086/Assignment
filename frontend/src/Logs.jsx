import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { io } from 'socket.io-client';
import axios from './utils/axionsInstance.js';

const Logs = () => {
    const [logs, setlogs] = useState([])
    const socket = useRef(null);

    async function getLogs() {
        try {
            const res = await axios.get('/getlogs');
            setlogs(res.data.logs);
        } catch (err) {
            console.error("Error fetching logs", err);
        }
    }

    useEffect(() => {
        getLogs();

        // ✅ Enhanced socket configuration for better reliability
        socket.current = io('https://assignment-backend-bgnl.onrender.com', {
            withCredentials: true,
            transports: ['websocket', 'polling'],
            forceNew: true,
            reconnection: true,
            timeout: 5000,
        });

        // ✅ Add connection event listeners for debugging
        socket.current.on('connect', () => {
            console.log('Logs: Connected to server:', socket.current.id);
        });

        socket.current.on('disconnect', (reason) => {
            console.log('Logs: Disconnected from server:', reason);
        });

        socket.current.on('connect_error', (error) => {
            console.error('Logs: Socket connection error:', error);
        });

        socket.current.on('task_created', () => {
            console.log("Logs: Received task_created");
            getLogs();
        });

        socket.current.on('task_updated', () => {
            console.log("Logs: Received task_updated");
            getLogs();
        });

        return () => {
            if (socket.current) {
                socket.current.disconnect();
            }
        };
    }, [])

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-2">Logs</h2>
            <ul className="space-y-1">
                {logs && logs.length > 0 ? (
                    logs.map((log) => (
                        <li key={log._id} className="bg-gray-100 p-2 rounded">
                            {log.detail} — <span className="text-gray-500 text-sm">
                                {new Date(log.timestamp).toLocaleString()}
                            </span>
                        </li>
                    ))
                ) : (
                    <li className="text-gray-500">No logs available</li>
                )}
            </ul>
        </div>
    )
}

export default Logs