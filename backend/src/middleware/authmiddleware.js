import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
export async function verifytoken(req, res, next) {
  if (req.path === "/login" || req.path === "signup") {
    return next();
  }

  let token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: "no token" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    if (await User.findById(req.user.id)) {
      next();
    } else {
      res.clearCookie("token");
      return res.status(401).json({ message: "invalid token" });
    }
  } catch (err) {
    res.clearCookie("token");
    return res.status(401).json({ message: "expired or invalid" });
  }
}
