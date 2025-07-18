import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { generetTokenAndSetCookie } from "../utils/generetToken.js";

export const signup = async (req, res) => {
  try {
    // destructure the request body
    const { username, email, password } = req.body;

    // check if all fields are provided
    if (
      !username ||
      !email ||
      !password ||
      username === "" ||
      email === "" ||
      password === ""
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // check if username is valid
    if (username.length < 3 || username.length > 20) {
      return res
        .status(400)
        .json({ message: "Username must be between 3 and 30 characters long" });
    }

    // check if username aleardy exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username is aleardy taken" });
    }

    // check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // email validation regex
    // check email format
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // check if email aleardy exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email is already taken" });
    }

    // check if password is valid
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 charecter long" });
    }

    // hash the password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // create a new user instance
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      await newUser.save();
      generetTokenAndSetCookie(newUser._id, res);

      // exclude password from response
      const { password, ...userData } = newUser._doc;

      // respond with success message
      return res.status(201).json({
        message: "Signup successful",
        data: userData,
      });
    } else {
      return res.status(400).json({ message: "Invalid creadentials" });
    }
  } catch (err) {
    console.error("error during signup: ", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
