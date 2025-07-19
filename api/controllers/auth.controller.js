import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { generetTokenAndSetCookie } from "../utils/generetToken.js";

// signup controller to handle user registration
export const signup = async (req, res) => {
  // destructure the request body
  const { username, email, password } = req.body;

  try {
    // check if all fields are provided
    if (
      !username ||
      !email ||
      !password ||
      username === "" ||
      email === "" ||
      password === ""
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // check if username is valid
    if (username.length < 3 || username.length > 20) {
      return res.status(400).json({
        success: false,
        message: "Username must be between 3 and 20 characters long",
      });
    }

    // check if username aleardy exists
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res
        .status(400)
        .json({ success: false, message: "Username is aleardy taken" });
    }

    // check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // email validation regex
    // check email format
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format" });
    }

    // check if email aleardy exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res
        .status(400)
        .json({ success: false, message: "Email is already taken" });
    }

    // check if password is valid
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 charecter long",
      });
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

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
        success: true,
        message: "Signup successful",
        data: userData,
      });
    } else {
      return res.status(400).json({ message: "Invalid creadentials" });
    }
  } catch (err) {
    // log the error and respond with internal server error
    console.error("error during signup: ", err.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// signin controller to handle user login
export const signin = async (req, res) => {
  // destructure the request body
  const { email, password } = req.body;
  try {
    // check if all fields are provided
    if (!email || !password || email === "" || password === "") {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // email validation regex
    // check email format{
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format" });
    }

    // check if user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // compare provided password with stored hashed password
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    // check if password is valid
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });
    }

    // generate token and set cookie
    generetTokenAndSetCookie(existingUser._id, existingUser.isAdmin, res);

    // exclude password from response
    const { password: pass, ...userData } = existingUser._doc;

    // responde with succcess message ans user data
    res.status(200).json({
      success: true,
      message: "Singin Successfull",
      data: userData,
    });
  } catch (err) {
    // log the error and respond with internal server error
    console.errror("error during signin: ", err.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// googleAuth auth controller to handle user registration or login via google
export const googleAuth = async (req, res) => {
  // destructure the request body
  const { name, email, googlePhotoUrl } = req.body;
  try {
    // check if user exists
    const user = await User.findOne({ email });

    // if user exists: generate token, set cookie and respond with user data
    if (user) {
      // generate token and set cookie
      generetTokenAndSetCookie(user._id, user.isAdmin, res);

      // exclude password from respose
      const { password, ...userData } = user._doc;

      // respond with success message and user data
      return res.status(200).json({
        success: true,
        message: "Google auth successful ",
        data: userData,
      });
    }
    // if user not exist: create new user
    else {
      // generate random password
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      // hash the password
      const hashedPassword = await bcrypt.hash(generatedPassword, 10);

      // modify username to be unique
      const username =
        name.toLowerCase().replace(/\s+/g, "") +
        Math.floor(Math.random() * 1000);

      // create new user instance
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });

      // save the new user
      await newUser.save();

      // generate token and set cookie
      generetTokenAndSetCookie(newUser._id, newUser.isAdmin, res);

      // exclude password from response
      const { password, ...userData } = newUser._doc;

      // respond with success message and user data
      res.status(201).json({
        success: true,
        message: "Google auth successful",
        data: userData,
      });
    }
  } catch (error) {
    // log the error and respond with internal server error
    console.error("error during google auth: ", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// signout controller to handle user logout
export const signout = async (req, res) => {
  try {
    // clear the access token cookie
    res.clearCookie("access_token", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development", // use https in production
    });

    // respond with success message
    res.status(200).json({
      success: true,
      message: "Signout successfull",
    });
  } catch (err) {
    // log the error and respond with internal server error
    console.error("Error during signout: ", err.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// getMe controller to handle user auth check
export const getMe =  (req, res) => {
  res.status(200).json({
    success: true,
    message: "User authenticated successfully",
    data: req.user, // user data is attached to req by the auth middleware
  });
};
