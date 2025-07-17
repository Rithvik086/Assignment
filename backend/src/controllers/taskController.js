import Task from "../models/taskModel.js";
import User from "../models/userModel.js";
import Action from "../models/actioModel.js";
import { io } from "../server.js";
export async function createTask(req, res) {
  const { title, desc, assigneduser, priority, status } = req.body;

  try {
    const task = await Task.create({
      title: title,
      desc: desc,
      assigneduser: assigneduser,
      priority: priority,
      status: status,
    });
    await User.findByIdAndUpdate(task.assigneduser, {
      $push: { assignedtasks: task._id },
    });
    await Action.create({
      user: req.user.id,
      task: task.id,
      detail: `created task ${task.title}`,
    });

    io.emit("task_created", task);
    return res.status(200).json({ task });
  } catch (err) {
    console.error("Task creation error:", err);
    return res
      .status(400)
      .json({ messge: "error creating task", error: err.message });
  }
}

export async function updateTask(req, res) {
  const { taskid, updates } = req.body;

  try {
    const oldTask = await Task.findById(taskid);
    if (!oldTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    const updatedTask = await Task.findByIdAndUpdate(taskid, updates, {
      new: true,
    });

    
    if (
      updates.assigneduser &&
      updates.assigneduser !== oldTask.assigneduser.toString()
    ) {
      await User.findByIdAndUpdate(oldTask.assigneduser, {
        $pull: { assignedtasks: taskid },
      });

      await User.findByIdAndUpdate(updates.assigneduser, {
        $push: { assignedtasks: taskid },
      });
    }

  
    const changedFields = Object.keys(updates)
      .map((key) => `${key} to ${updates[key]}`)
      .join(", ");

    await Action.create({
      user: req.user.id,
      task: taskid,
      detail: `updated ${changedFields}`,
    });

    io.emit("task_updated", updatedTask);

    return res.status(200).json({ message: "Task updated", task: updatedTask });
  } catch (err) {
    console.error("Error updating task:", err);
    return res
      .status(400)
      .json({ message: "Error updating task", error: err.message });
  }
}

export async function getTasks(req, res) {
  try {
    const tasks = await Task.find().populate("assigneduser", "name");
    return res.status(200).json(tasks);
  } catch (err) {
    console.log("error fetching tasks");
  }
}

export async function getUsers(req, res) {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users", err);
  }
}
