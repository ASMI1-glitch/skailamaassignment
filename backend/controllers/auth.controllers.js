import User from "../models/auth.models.js";
import bcrypt from "bcrypt";

// ✅ Login Controller (No JWT)
export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log("🔐 Login Attempt:", { email, password });

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide Email & Password" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User Not Found!" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid Credentials!" });
    }

    // ✅ Simply return user object (no token)
    return res.status(200).json({
      message: "Login Successful",
      user: {
        id: user._id,
        email: user.email,
      }
    });
  } catch (error) {
    console.error("💥 Login Error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Register Controller
export const register = async (req, res) => {
  const { email, password } = req.body;
  console.log("📝 Register Attempt:", { email, password });

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser._id,
        email: newUser.email,
      }
    });
  } catch (error) {
    console.error("💥 Register Error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Logout (no token, just success message)
export const logout = async (req, res) => {
  try {
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("💥 Logout Error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
