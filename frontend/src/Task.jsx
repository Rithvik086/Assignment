import React, { useState } from 'react';
import axios from 'axios';

const Task = ({ task }) => {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: task.title,
    desc: task.desc,
    priority: task.priority,
    status: task.status,
    assigneduser: task.assigneduser._id,
  });

  const handleUpdate = async () => {
    try {
      await axios.put("https://assignment-backend-bgnl.onrender.com/api/tasks/updatetask", {
        taskid: task._id,
        updates: formData,
      }, { withCredentials: true });

      alert("Task updated!");
      setEditing(false);
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  return (
    <div className='border border-black border-2 p-2 m-2 rounded text-black'>
      {editing ? (
        <>
          <input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
          <input value={formData.desc} onChange={(e) => setFormData({ ...formData, desc: e.target.value })} />
          <select value={formData.priority} onChange={(e) => setFormData({ ...formData, priority: e.target.value })}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
          <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
            <option value="Todo">Todo</option>
            <option value="InProgress">InProgress</option>
            <option value="Done">Done</option>
          </select>
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <h1>{task.title}</h1>
          <p>{task.desc}</p>
          <div className='text-sm mt-1'>
            <p>Assigned to: {task.assigneduser.name}</p>
            <p>Priority: {task.priority}</p>
            <p>Status: {task.status}</p>
          </div>
          <button className="mt-2 text-blue-500 underline" onClick={() => setEditing(true)}>Edit</button>
        </>
      )}
    </div>
  );
};

export default Task;
