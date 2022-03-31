const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    task: {
      type: String,

      required: [true, "must provide name"],
      trim: true,
      maxlength: [100, "must be no more than 100 characters"],
    },
    completed: {
      type: Boolean,
      completed: false,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Task", TaskSchema);
