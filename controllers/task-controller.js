const Task = require("../models/Task");
const { StatusCodes } = require("http-status-codes"); // here we import http code from http-status-codes and use the constant names into it library

const getAllTasks = async (req, res) => {
  try {
    const userId = req.user.userId;
    const tasks = await Task.find({ userId });

    res.status(StatusCodes.OK).json(tasks);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Something went wrong");
  }
};

const createTask = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { task, completed } = req.body;
    const newTask = { userId, task, completed };

    const result = await Task.create(newTask);
    console.dir(result);
    res.status(StatusCodes.CREATED).json(result);
  } catch (error) {
    console.dir(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Something went wrong");
  }
};

const getTask = async (req, res) => {
  try {
    const {
      params: { id: taskId },
    } = req;
    const task = await Task.findOne({
      _id: taskId,
    });

    if (!task) {
      throw new Error(StatusCodes.NOT_FOUND).send("Please Provide Task");
    } else {
      res.status(StatusCodes.OK).json(task);
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Something went wrong");
  }
};

const deleteTask = async (req, res) => {
  try {
    const {
      user: { userId },
      params: { id: taskId },
    } = req;

    const result = await Task.findByIdAndRemove({
      _id: taskId,
      userId: userId,
    });
    if (!result) {
      throw new Error(`No Task with id ${taskId}`);
    }
    res.status(StatusCodes.OK).json({ msg: "Task has been deleted!" });
  } catch (error) {
    if (error.message.includes("No Task")) {
      res.status(StatusCodes.NOT_FOUND).send({ msg: error.message });
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send("Something went wrong");
    }
  }
};

const updateTask = async (req, res) => {
  try {
    const {
      body: { task, completed },
      params: { id: taskId },
      user: { userId },
    } = req;
    console.log("Body:", req.body);
    if (task === "") {
      throw new Error(StatusCodes.BAD_REQUEST).send("Please Provide Task");
    }
    const updatedTask = await Task.findByIdAndUpdate(
      { _id: taskId, userId },
      { task, completed },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedTask) {
      throw new Error(StatusCodes.BAD_REQUEST).send(`No job with id ${taskId}`);
    }
    console.log(updatedTask);
    res.status(StatusCodes.OK).json(updatedTask);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Something went wrong");
  }
};

module.exports = { createTask, getAllTasks, getTask, updateTask, deleteTask };
