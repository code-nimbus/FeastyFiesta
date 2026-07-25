import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import restaurantRoutes from "./routes/restaurant.js";
import itemRoutes from './routes/menuItem.js';
import cartRoutes from './routes/cart.js';
import cors from "cors";
import addressRoutes from "./routes/address.js";

dotenv.config()

const app = express()

app.use(cors())

// app.use(express.json())

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

const PORT = process.env.PORT || 5002;

app.use("/api/restaurant", restaurantRoutes);
app.use("/api/item", itemRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/address", addressRoutes);

app.listen(PORT, () => {
    console.log(`Restaurant service is running on port ${PORT}`)
    connectDB();
})