import React, { useState, useEffect } from 'react'
import TaskList from './TaskList'
import { useForm } from 'react-hook-form'

import { io } from 'socket.io-client';
import { useRef } from 'react';
import axios from './utils/axionsInstance';

const TaskPage = () => {
    const [smart, setsmart] = useState(null)
    const [tasks, setTasks] = useState([])
    const [newTask, setNewTask] = useState({ title: '', status: 'Todo' })
    const [users, setUsers] = useState([])
    async function fetchTasks() {
        try {
            const res = await axios.get('/api/tasks/getTasks');
            setTasks(res.data);
        } catch (err) {
            console.error("Error fetching tasks", err);
        }
    }


    async function getUsers() {
        try {
            const res = await axios.get('/getUsers');
            setUsers(res.data);
        } catch (err) {
            console.error("Error fetching users", err);
        }
    }




    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()
    async function getLeastloaded() {
        try {
            const res = await axios.get('/smartassign');
            setsmart(res.data.smart);
        } catch (err) {
            console.error("Error getting least loaded user", err);
        }
    }

    const socket = useRef(null);

    useEffect(() => {
        fetchTasks()
        getUsers()
        getLeastloaded();
        socket.current = io('http://localhost:3000', {
            withCredentials: true,
        });
        socket.current.on('task_updated', () => {
            fetchTasks();
        });

        socket.current.on('task_created', () => {
            fetchTasks();
        });

        return () => {
            socket.current.disconnect()
        }

    }, [])



    const onSubmit = async (data) => {
        try {
            await axios.post('/api/tasks/createtask', data);
            alert('Task added');
            fetchTasks();
            getLeastloaded();
        } catch (err) {
            console.error("Error submitting task", err);
        }
    };




    return (
        <div className="p-6 h-screen w-screen flex flex-col space-y-6 bg-gray-100">
            {/* Task Adding Form */}

            <form onSubmit={handleSubmit(onSubmit)} >
                <input {...register("title")} type='text' placeholder='Title' />
                <input {...register("desc")} type='text' placeholder='description' />
                <select {...register("assigneduser", { required: true })} defaultValue="">

                    <option value="" disabled>
                        Select User
                    </option>

                    {users.map((user) => (
                        <option
                            key={user._id}
                            value={user._id}>
                            {user.name}
                        </option>
                    ))}

                    {smart && (
                        <option value={smart._id}>
                            Smart Assign
                        </option>
                    )}






                </select>
                <select {...register("priority", { required: true })} defaultValue="Low">
                    <option value="" disabled>
                        Select Priority
                    </option>

                    <option value="Low" >Low</option>
                    <option value="Medium" >Medium</option>
                    <option value="High" >High</option>
                    <option value="Critical" >Critical</option>


                </select>



                <select {...register("status", { required: true })} defaultValue="Todo">

                    <option value="Todo">Todo</option>
                    <option value="InProgress">InProgress</option>
                    <option value="Done">Done</option>

                </select>
                <input type='submit' />


            </form>













            {/* Task Columns */}
            <div className="grid grid-cols-3 gap-4 flex-grow">
                <div className="bg-white p-4 rounded shadow border border-black">
                    <h2 className="font-bold text-xl mb-2">Todo</h2>
                    {Array.isArray(tasks) ? (
                        <TaskList tasks={tasks} status={'Todo'} />
                    ) : (
                        <p className="text-red-500">Error loading tasks.</p>
                    )}

                </div>
                <div className="bg-green-100 p-4 rounded shadow border border-black">
                    <h2 className="font-bold text-xl mb-2">In Progress</h2>
                    {Array.isArray(tasks) ? (
                        <TaskList tasks={tasks} status={'InProgress'} />
                    ) : (
                        <p className="text-red-500">Error loading tasks.</p>
                    )}

                </div>
                <div className="bg-blue-100 p-4 rounded shadow border border-black">
                    <h2 className="font-bold text-xl mb-2">Done</h2>
                    {Array.isArray(tasks) ? (
                        <TaskList tasks={tasks} status={'Done'} />
                    ) : (
                        <p className="text-red-500">Error loading tasks.</p>
                    )}

                </div>
            </div>
        </div>
    )
}

export default TaskPage
