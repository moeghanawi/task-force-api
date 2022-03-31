const express = require("express");

const router = express.Router();

const {
  createTask,
  getAllTasks,
  getTask,
  updateTask,
  deleteTask,
} = require("../controllers/task-controller");

// router.route("/").get(getAllTasks);
router.post("/create-task", createTask);
router.get("/get-tasks", getAllTasks);
router.get("/get-task/:id", getTask);
router.put("/update-task/:id", updateTask);
router.delete("/delete-task/:id", deleteTask);

module.exports = router;
