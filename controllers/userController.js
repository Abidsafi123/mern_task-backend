import userModel from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// generate token
const genearateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: "4d" });
};

// REGISTER USER
export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // validation
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  // check existing user
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error("User already exists!");
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create user
  const createUser = await userModel.create({
    username,
    email,
    password: hashedPassword,
  });

  // response
  res.status(201).json({
    success: true,
    message: "User registered successfully ✅",
    _id: createUser._id,
    username: createUser.username,
    email: createUser.email,
    token: genearateToken(createUser._id),
  });
});

// LOGIN USER
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // validation
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  // check user
  const user = await userModel.findOne({ email });
  if (!user) {
    res.status(401);
    throw new Error("User does not exist!");
  }

  // compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(401);
    throw new Error("Invalid password!");
  }

  // response
  res.status(200).json({
    success: true,
    message: "User login successfully ✅",
    _id: user._id,
    username: user.username,
    email: user.email,
    token: genearateToken(user._id),
  });
});


// CURRENT USER
export const currentUser = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.user.id).select("-password");

  if (!user) {
    res.status(404);
    throw new Error("User not found!");
  }

  res.status(200).json({
    success: true,
    message: "User found successfully ✅",
    id: user._id,
    username: user.username,
    email: user.email,
  });
});
