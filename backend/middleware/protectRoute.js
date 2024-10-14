import User from "../model/user.model.js";
import jwt from "jsonwebtoken";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token)
      return res
        .status(401)
        .json({ message: "Unauthorized", authenticated: false });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");
    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message, authenticated: false });
    console.log("Error in protected route", err.message);
  }
};

export default protectRoute;
