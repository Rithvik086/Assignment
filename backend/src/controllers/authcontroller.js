import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function signup(req, res) {
  const { name, email, password } = req.body;
  const hashpass = await bcrypt.hash(password, 10);
  try {
    const exists = await User.findOne({
      email: email,
    });

    if (exists) {
      throw new Error("email already exists");
    }
    const user = await User.create({
      name: name,
      email: email,
      password: hashpass,
    });

    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ message: "invalid username" });
    }

    const ismatched = await bcrypt.compare(password, user.password);

    if (!ismatched) {
      return res.status(401).json({ message: "invalid credentials" });
    }
    const token = jwt.sign(
      {
        id: user._id.toString(),
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // ✅ CORRECT for cross-origin
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "None", 
      secure: true, 
      maxAge: 86400000,
    });
    return res.status(200).json({ message: "login succesfull" });
  } catch (err) {
    return res.status(500).json({ message: "server error unable to login" });
  }
}
