import express from "express";
import dotenv from "dotenv";
import connectDb from "./db/connectDb.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoute from "./routes/user.route.js";
import emailRoute from "./routes/email.route.js";

dotenv.config(); // dotenv is configured directly

// Connect to Database
connectDb();

const PORT = process.env.PORT || 8080;
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// CORS Options (fixed Credentials to lowercase 'credentials')
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true, // Fixed typo
};
app.use(cors(corsOptions));

// Routes

app.use("/api/v1/user", userRoute);
app.use("/api/v1/email", emailRoute);

// Global Error Handler (Optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: "Internal Server Error", success: false });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
