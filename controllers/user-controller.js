const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Please try again later");
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Please provide email and password");
    }
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Please provide valid credentials");
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      throw new Error("Invalid Credentials");
    }
    // compare password
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
  } catch (error) {
    if (error.message === "Invalid Credentials") {
      res.status(StatusCodes.UNAUTHORIZED).send(error.message);
    } else if (error.message === "Please provide valid credentials") {
      res.status(StatusCodes.UNAUTHORIZED).send(error.message);
    } else if (error.message === "Please provide email and password") {
      res.status(StatusCodes.BAD_REQUEST).send(error.message);
    } else {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .send("Something went wrong. Please try again");
    }
  }
};

module.exports = {
  register,
  login,
};
