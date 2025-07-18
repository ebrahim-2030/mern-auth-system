import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { generetTokenAndSetCookie } from "../utils/generetToken.js";

// signup controller to handle user registration
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
        .json({ message: "Username must be between 3 and 20 characters long" });
    }

    // check if username aleardy exists
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
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
      generetTokenAndSetCookie(newUser._id, newUser.isAdmin, res);

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

// signin controller to handle user login
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if all fields are provided
    if (!email || !password || email === "" || password === "") {
      return res.status(400).json({ message: "All fields are required" });
    }

    // check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // email validation regex
    // check email format{
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // check if user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // compare provided password with stored hashed password
    const isPasswordValid = await bcryptjs.compare(
      password,
      existingUser.password
    );
    // check if password is valid
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // generate token and set cookie
    generetTokenAndSetCookie(existingUser._id, existingUser.isAdmin, res);

    // exclude password from response
    const { password: pass, ...userData } = existingUser._doc;

    // responde with succcess message ans user data
    res.status(200).json({
      message: "Singin Successfull",
      data: userData,
    });
  } catch (err) {
    console.errror("error during signin: ", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

