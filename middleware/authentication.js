const jwt = require("jsonwebtoken");
const StatusCodes = require("http-status-codes").StatusCodes;
const authenticationMiddleware = async (req, res, next) => {
  // check header
   try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      throw new Error("Authentication invalid");
    }
    const token = authHeader.split(" ")[1];

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // attach the user to the job routes
    req.user = {
      userId: payload.userId,
      name: payload.name,
      role: payload.role,
    };
    next();
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).send("Authentication invalid");
  }
};

module.exports = authenticationMiddleware;
