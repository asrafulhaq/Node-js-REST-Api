import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/**
 * @DESC Login User
 * @ROUTE /api/v1/auth/login
 * @method POST
 * @access public
 */
export const login = asyncHandler(async (req, res) => {
  // get values
  const { email, password } = req.body;

  // validation
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // find login user
  const loginUser = await User.findOne({ email });
  if (!loginUser) {
    return res.status(404).json({ message: "User not found" });
  }

  // check password
  const passCheck = await bcrypt.compare(password, loginUser.password);

  if (!passCheck) {
    return res.status(404).json({ message: "Wrong password" });
  }

  // create access token
  const token = jwt.sign(
    { email: loginUser.email },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE_IN,
    }
  );

  // set token
  res.cookie("accessToken", token);

  // response login user token
  res.status(200).json({ token });
});

/**
 * @DESC Login User
 * @ROUTE /api/v1/auth/login
 * @method POST
 * @access public
 */
export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("accessToken").json({ message: "Logout successful" });
});
