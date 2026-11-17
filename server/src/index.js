import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.js";
import movieRoutes from "./routes/movies.js";
import roomRoutes from "./routes/rooms.js";
import showtimeRoutes from "./routes/showtimes.js";
import bookingRoutes from "./routes/bookings.js";
import statsRoutes from "./routes/stats.js";
import { errorHandler } from "./middleware/error.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/showtimes", showtimeRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/stats", statsRoutes);

app.use((req, res) => res.status(404).json({ message: "Không tìm thấy API" }));
app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Đã kết nối MongoDB");
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server chạy ở cổng ${process.env.PORT || 5000}`)
    );
  } catch (err) {
    console.error("Không kết nối được MongoDB:", err.message);
    process.exit(1);
  }
};

start();