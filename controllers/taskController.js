import asyncHandler from "express-async-handler";
import taskModel from "../models/taskModel.js";
import userModel from "../models/userModel.js"
import colors from "colors";

// GET ALL TASKS

export const getTask = asyncHandler(async (req, res) => {
  const tasks = await taskModel.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    count: tasks.length,
    tasks,
  });
});


// CREATE TASK

export const setTask = asyncHandler(async (req, res) => {
  const { text } = req.body;

  if (!text) {
    res.status(400);
    throw new Error("Please enter a task!");
  }

  const task = await taskModel.create({
    text,
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    task,
  });
});


// UPDATE TASK

export const updateTask = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const task = await taskModel.findById({ _id: id   });
 

  if (!task) {
    res.status(404);
    throw new Error("Task not found!");
  }

  const user = await userModel.findById(req.user.id);
  if(!user){
    res.status(404)
    throw new Error("No such user found ❌")
  }
  if(task.user.toString() !== user.id){
    res.status(401);
    throw new Error("User is not authorized to update this task 🚫")
  }
  const updateTask = await taskModel.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    message: "Task updated successfully!",
    updateTask: updateTask,
  });
});

// DELETE TASK

export const deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const task = await taskModel.findById(id);

  if (!task) {
    res.status(404);
    throw new Error("Task not found!");
  }
  const user = await userModel.findById(req.user.id);
  if(!user){
    res.status(404);
    throw new Error("No such user found ❌")
  }

  if(task.user.toString() !== user.id){
    res.status(401)
    throw new Error("User is not authorized to delete this task 🚫")
  }
  const del = await taskModel.findByIdAndDelete({ _id: id });
  if (!del) {
    res.status(400);
    throw new Error("Task not deleted!");
  }

  res.status(200).json({
    success: true,
    message: "Task deleted successfully",
    del: del,
  });
});
