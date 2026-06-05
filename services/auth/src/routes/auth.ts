import express from "express";
import { addUserRole, loginUser } from "../controller/auth.js";
import { isAuth } from "../middlewares/isAuth.js";
import { myProfile } from "../controller/auth.js";

const router = express.Router();

router.post("/login", loginUser);
router.put("/add/role", isAuth, addUserRole)
router.get("/me", isAuth, myProfile);

export default router;
