import React from 'react'
import Task from './Task'


const TaskList = ({ tasks, status }) => {
    const filtered = tasks.filter(task => task.status == status)
    return (
        <>
            {filtered.length > 0 ?
                filtered.map((task) => (
                    <Task
                        key={task._id}
                        task={task} />
                )) : <p>No {status} task</p>}

        </>
    )
}

export default TaskList