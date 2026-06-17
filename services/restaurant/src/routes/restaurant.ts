import express from "express";
import { addRestaurant, fetchMyRestaurant } from "../controllers/restaurant.js";
import { isAuth, isSeller } from "../middlewares/isAuth.js";

const router = express.Router();

router.post("/new", isAuth, isSeller, addRestaurant);
router.get("/my", isAuth, isSeller, fetchMyRestaurant)

export default router;