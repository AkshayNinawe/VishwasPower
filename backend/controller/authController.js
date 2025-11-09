import User from "../model/User.js";
import jwt from "jsonwebtoken";

// Include full user info in the token payload
const generateToken = (user) =>
  jwt.sign(
    { id: user._id, name: user.name, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

// @desc   Register new user
// @route  POST /api/auth/register
export const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ name, email, password, role });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user),
    });
  } catch (err) {
    console.error("Registration error:", err.message);
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
};

// @desc   Login user
// @route  POST /api/auth/login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user),
    });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

// @desc   Get all users (for admin)
// @route  GET /api/auth/users
export const allUsers = async (req, res) => {
  try {
    const allUsers = await User.find().select('-password');
    res.status(200).json(allUsers);
  } catch (error) {
    console.error("Fetch users error:", error.message);
    res.status(500).json({ message: "Failed to fetch users", error: error.message });
  }
};

// @desc   Validate JWT token
// @route  GET /api/auth/validate-token
export const validateToken = async (req, res) => {
  try {
    // If we reach here, the protect middleware has already validated the token
    // and attached the user to req.user
    res.status(200).json({
      valid: true,
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role
      }
    });
  } catch (error) {
    console.error("Token validation error:", error.message);
    res.status(401).json({ valid: false, message: "Invalid token" });
  }
};
