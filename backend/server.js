// Future Optimization
// add login either using email or username
// add email validation
// forgot password/email/username
// add user profile picture
// manual address validation

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.routes.js";
import locationRoutes from "./routes/location.route.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/location", locationRoutes);

app.listen(PORT, () => {
  console.log(`server running on port http:localhost:${PORT}`);
  connectDB();
});
