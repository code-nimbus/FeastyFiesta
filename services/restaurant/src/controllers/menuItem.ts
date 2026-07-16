import axios from "axios";
import { AuthenticatedRequest } from "../middlewares/isAuth.js";
import TryCatch from "../middlewares/trycatch.js";
import Restaurant from "../models/Restaurant.js";
import MenuItems from "../models/MenuItems.js";

export const addMenuItem = TryCatch(async (req: AuthenticatedRequest, res) => {
    if (!req.user) {
        return res.status(403).json({
            message: "Please Login",
        });
    }

    const restaurant = await Restaurant.findOne({ ownerId: req.user._id });

    if (!restaurant) {
        return res.status(404).json({
            message: "No restaurant found"
        });

    }

    const { name, description, price } = req.body;

    if (!name || !price) {
        return res.status(404).json({
            message: "Name and price are required",
        });
    }

    const file = req.file;

    if (!file || !file.buffer) {
        return res.status(400).json({ message: "Image file missing" });
    }

    console.log("FILE RECEIVED:", file.originalname);

    let uploadResult;

    try {
        console.log("UTILS URL:", process.env.UTILS_SERVICE);
        console.log("BASE64 SIZE:", file.buffer.toString("base64").length);
        const response = await axios.post(
            `${process.env.UTILS_SERVICE}/api/upload`,
            {
                buffer: file.buffer.toString("base64"),
            }
        );

        uploadResult = response.data;

    } catch (err: any) {
        console.log("UPLOAD FAILED:", err?.response?.data || err.message);
        return res.status(500).json({ message: "Image upload failed" });
    }

    const item = await MenuItems.create({
        name,
        description,
        price,
        restaurantId: restaurant._id,
        image: uploadResult.url,
    })

    res.json({
        message: "Item added successfully",
        item,
    });

});

export const getAllItems = TryCatch(async (req: AuthenticatedRequest, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({
            message: "Id is required",

        });
    }

    const items = await MenuItems.find({ restaurantId: id });

    res.json({ items });
});

export const deleteMenuItem = TryCatch(async (req: AuthenticatedRequest, res) => {
    if (!req.user) {
        return res.status(401).json({
            message: "id is required",
        });
    }

    const { itemId } = req.params;
    if (!itemId) {
        return res.status(400).json({
            message: "id is required",
        });
    }

    const item = await MenuItems.findById(itemId)

    if (!item) {
        return res.status(404).json({
            message: "no item found"
        });
    }

    const restaurant = await Restaurant.findOne({
        _id: item.restaurantId,
        ownerId: req.user._id,
    });

    if (!restaurant) {
        return res.status(404).json({
            message: "No retsaurant found",
        });
    }

    await item.deleteOne()

    res.json({
        message: "Menu item deleted successfully",
    });
});

export const toggleMenuItemAvailability = TryCatch(async (req: AuthenticatedRequest, res) => {
    if (!req.user) {
        return res.status(404).json({
            message: "Please login"
        })
    }

    const { itemId } = req.params;

    if (!itemId) {
        return res.status(400).json({
            message: "id is required",
        });
    }

    const item = await MenuItems.findById(itemId)

    if (!item) {
        return res.status(404).json({
            message: "no item found"
        });
    }

    const restaurant = await Restaurant.findOne({
        _id: item.restaurantId,
        ownerId: req.user._id,
    });

    if (!restaurant) {
        return res.status(404).json({
            message: "No retsaurant found",
        });
    }

    item.isAvailable = !item.isAvailable;
    await item.save()

    res.json({
        message: `Item marked as ${item.isAvailable ? "available" : "unavailable"}`
    })
})