import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { router } from "./routes/routes.js";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import path from "path";
import {fileURLToPath} from 'url';
dotenv.config({ path: "server/.env" });
export const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 8989;
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

mongoose
  .connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => console.log(`db is connected ${res.connection.host}`))
  .catch((err) => console.log(err));

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API,
  api_secret: process.env.CLOUD_API_SECERET,
});
app.use("/api/v1", router);

app.use(express.static(path.join(__dirname, "../client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
