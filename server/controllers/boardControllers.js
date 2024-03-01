// src/controllers/boardController.js
const Task = require("../models/taskModels");
const User = require("../models/usersModel");
const mongoose = require("mongoose");
const moment = require("moment");

exports.createTask = async (req, res) => {
  try {
    const { title, priority, checklist, dueDate } = req.body;
    const userId = req.body.userId;
    const newTask = new Task({
      title,
      priority,
      checklist,
      dueDate,
      status: "todo",
      userId,
    });
    await newTask.save();
    res.json(newTask);
  } catch (error) {
    
    res.status(500).send("Server Error");
  }
};

exports.editTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const { title, priority, checklist, dueDate, status } = req.body;
    let task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    task.title = title;
    task.priority = priority;
    task.checklist = checklist;
    task.dueDate = dueDate;
    task.status = status;
    await task.save();
    res.json(task);
  } catch (error) {
 
    res.status(500).send("Server Error");
  }
};
exports.getTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const { title, priority, checklist, dueDate, status } = req.body;
    let task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (error) {
   
    res.status(500).send("Server Error");
  }
};
exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    await task.deleteOne();
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
   
    res.status(500).send("Server Error");
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const userId = req.body.userId;
    const { filterOption } = req.query;

    let startDate, endDate;

    switch (filterOption) {
      case "This week":
        startDate = moment().startOf("isoWeek").toDate();
        endDate = moment().endOf("day").toDate();
        break;
      case "This Month":
        startDate = moment().startOf("month").toDate();
        endDate = moment().endOf("day").toDate(); 
        break;
      case "Today":
        startDate = moment().startOf("day").toDate();
        endDate = moment().endOf("day").toDate();
        break;
      case "All":
        startDate = moment(0).toDate(); 
        endDate = new Date();
        break;
      default:
        return res.status(400).json({ message: "Invalid filterOption" });
    }

    let query = { createdAt: { $gte: startDate, $lte: endDate } };

    if (userId) {
      query.userId = userId;
    }

    const tasks = await Task.find(query);
    res.json(tasks);
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

