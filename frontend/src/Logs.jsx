import React from 'react'
import { useState, useEffect, useRef } from 'react'

import { io } from 'socket.io-client';
import axios from './utils/axionsInstance.js';

const Logs = () => {

    const [logs, setlogs] = useState([])
    const socket = useRef(null);
    async function getLogs() {
        try {
            const res = await axios.get('/getlogs'

            )
            setlogs(res.data.logs)
        } catch (err) {
            console.error("Error fetching logs", err)
        }
    }

    useEffect(() => {
        getLogs()
        socket.current = io('http://localhost:3000', {
            withCredentials: true,
        });
        socket.current.on('task_created', () => {
            console.log("Received task_created");
            getLogs();
        });
        socket.current.on('task_updated', () => {
            console.log("Received task_updated");
            getLogs();
        });

        return () => {
            socket.current.disconnect();
        };
    }, [])

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-2">Logs</h2>
            <ul className="space-y-1">
                {logs.map((log) => (
                    <li key={log._id} className="bg-gray-100 p-2 rounded">
                        {log.detail} — <span className="text-gray-500 text-sm">{new Date(log.timestamp).toLocaleString()}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Logs