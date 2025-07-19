import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const verifyToken = async (req, res, next) => {
  // get token from cookies
  const token = req.cookies.access_token;

  try {
    // if no token, respond with unauthorized error
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No token provided",
      });
    }

    // verify token useing jwt seceret
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // find user by decoded userId and exclude password
    const user = await User.findById(decoded.userId).select("-password");

    // if user not found, respond not found error
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // attach user to request object
    req.user = user;

    // proceed to next middleware or route handler
    next();
  } catch (err) {
    console.error("Error in verifyToken middleware", err.message);

    // if token expired, respond unauthorized
    if (err.message === "jwt expired") {
      return res.status(401).json({
        error: "Unauthorized: Token expired",
      });
    }

    // if token is invalid or any other error, respond unauthorized
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token" });
    }
  }
};
