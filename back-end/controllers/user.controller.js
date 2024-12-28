import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

// REGISTER FUNCTION
export const register = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    // Check for missing fields
    if (!fullname || !email || !password) {
      return res
        .status(400)
        .json({ msg: "All fields are required", success: false });
    }

    // Check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ msg: "User already exists with this email", success: false });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Default profile photo
    const profilePhoto = `https://avatar.iran.liara.run/public/boy`;

    // Create new user
    const newUser = await User.create({
      fullname,
      email,
      password: hashedPassword,
      profilePhoto,
    });

    return res.status(201).json({
      message: "Account created successfully.",
      success: true,
      user: newUser,
    });
  } catch (err) {
    console.error("Error during registration:", err);
    return res.status(500).json({ msg: "Server error", success: false });
  }
};

// LOGIN FUNCTION
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for missing fields
    if (!email || !password) {
      return res
        .status(400)
        .json({ msg: "All fields are required", success: false });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ msg: "Incorrect email or password", success: false });
    }

    // Compare passwords
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ msg: "Incorrect email or password", success: false });
    }

    // Generate JWT token
    const tokenData = {
      userId: user._id,
    };

    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    // Set cookie with JWT token
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `${user.fullname} logged in successfully`,
        user,
        success: true,
        token,
      });
  } catch (err) {
    console.error("Error during login:", err);
    return res.status(500).json({ msg: "Server error", success: false });
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      msg: "Logged out successfully.",
      success: true, // Ensure success is returned here
    });
  } catch (err) {
    console.error("Logout error:", err);
    return res
      .status(500)
      .json({ msg: "Server error during logout", success: false });
  }
};
