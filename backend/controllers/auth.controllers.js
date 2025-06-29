import User from "../models/auth.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log("🔐 Login Attempt:", { email, password });

  try {
    if (!email || !password) {
      console.log("❌ Missing email or password");
      return res.status(400).json({
        message: "Please provide Email & Password",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ User not found for email:", email);
      return res.status(401).json({
        message: "User Not Found!",
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    console.log("✅ Password Match:", isValidPassword);

    if (!isValidPassword) {
      console.log("❌ Invalid credentials");
      return res.status(401).json({
        message: "Invalid Credentials!",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log("✅ Login Successful. Token:", token);

    res.status(200).json({
      user: {
        id: user._id,
        email: user.email,
      },
      token,
      message: "Login Successfully",
    });
  } catch (error) {
    console.error("💥 Login Error:", error.message);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const register = async (req, res) => {
  const { email, password } = req.body;
  console.log("📝 Register Attempt:", { email, password });

  try {
    if (!email || !password) {
      console.log("❌ Missing email or password");
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("❌ User already exists:", email);
      return res.status(400).json({
        message: "User is already Existing",
      });
    }

    const hashpassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashpassword,
    });

    await newUser.save();
    console.log("✅ New User Created:", newUser);

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser._id,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("💥 Register Error:", error.message);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    console.log("🚪 Logged out successfully");
    return res.status(200).json({ message: "Logged Out Successfully" });
  } catch (error) {
    console.error("💥 Logout Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
