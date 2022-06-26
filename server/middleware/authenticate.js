import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../model/User.js";
dotenv.config();
export const Auth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res
        .status(400)
        .json({ success: false, message: "Login to continue" });
    }
    const decode = jsonwebtoken.verify(token, process.env.JWT_SECERET);
    const user = await User.findById(decode.id);
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
