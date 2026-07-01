import axios from "axios";
import TryCatch from "../middlewares/trycatch.js";
import Restaurant from "../models/Restaurant.js";
import jwt from "jsonwebtoken";
// export const addRestaurant = TryCatch(async (req: AuthenticatedRequest, res) => {
//     const user = req.user;
//     if (!user) {
//         return res.status(401).json({
//             message: "Unauthorised"
//         })
//     }
//     const existingRestaurant = await Restaurant.findOne({
//         ownerId: user?._id,
//     });
//     if (existingRestaurant) {
//         return res.status(400).json({
//             message: "you already have a restaurant"
//         })
//     }
//     const { name, description, latitude, longitude, formattedAddress, phone } = req.body;
//     if (!name || !latitude || !longitude) {
//         return res.status(400).json({
//             message: "Please give all details."
//         })
//     }
//     const file = req.file;
//     if (!file) {
//         return res.status(400).json({
//             message: "Please give image",
//         });
//     }
//     // const fileBuffer = getBuffer(file)
//     const fBuffer = req.file?.buffer;
//     if (!fBuffer) {
//         return res.status(400).json({ message: "No image file" });
//     }
//     console.log(fBuffer.toString("base64").slice(0, 100));
//     // if (!fileBuffer?.content) {
//     //     return res.status(500).json({
//     //         message: "Failed to create file buffer",
//     //     });
//     // }
//     let uploadResult;
//     try {
//         const response = await axios.post(
//             `${process.env.UTILS_SERVICE}/api/upload`,
//             {
//                 // buffer: fileBuffer.content,
//                 // buffer: fBuffer.toString("base64"),
//                 buffer: `data:image/jpeg;base64,${fBuffer.toString("base64")}`,
//             }
//         );
//         uploadResult = response.data;
//     } catch (err) {
//         console.log("UPLOAD FAILED:", err);
//         return res.status(500).json({
//             message: "Image upload failed"
//         });
//     }
//     // console.log("FILE:", req.file);
//     // console.log("BUFFER:", fileBuffer);
//     // console.log("BUFFER CONTENT LENGTH:", fileBuffer?.content?.length);
//     // const { data: uploadResult } = await axios.post(
//     //     `${process.env.UTILS_SERVICE}/api/upload`,
//     //     {
//     //         buffer: fileBuffer.content,
//     //     }
//     // )
//     const restaurant = await Restaurant.create({
//         name,
//         description,
//         phone,
//         image: uploadResult.url,
//         ownerId: user._id,
//         autoLocation: {
//             type: "Point",
//             coordinates: [Number(longitude), Number(latitude)],
//             formattedAddress,
//         }
//     })
//     return res.status(201).json({
//         message: "Restaurant created successfully",
//         restaurant
//     })
// })
export const addRestaurant = TryCatch(async (req, res) => {
    const user = req.user;
    if (!user) {
        return res.status(401).json({ message: "Unauthorised" });
    }
    const { name, description, latitude, longitude, formattedAddress, phone } = req.body;
    if (!name || !latitude || !longitude) {
        return res.status(400).json({ message: "Please give all details." });
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
        const response = await axios.post(`${process.env.UTILS_SERVICE}/api/upload`, {
            buffer: file.buffer.toString("base64"),
        });
        uploadResult = response.data;
    }
    catch (err) {
        console.log("UPLOAD FAILED:", err?.response?.data || err.message);
        return res.status(500).json({ message: "Image upload failed" });
    }
    const restaurant = await Restaurant.create({
        name,
        description,
        phone,
        image: uploadResult.url,
        ownerId: user._id,
        autoLocation: {
            type: "Point",
            coordinates: [Number(longitude), Number(latitude)],
            formattedAddress,
        },
        isVerified: false,
    });
    return res.status(201).json({
        message: "Restaurant created successfully",
        restaurant
    });
});
///
// export const addRestaurant = TryCatch(async (req: AuthenticatedRequest, res) => {
//     const user = req.user;
//     if (!user) {
//         return res.status(401).json({ message: "Unauthorised" });
//     }
//     const { name, description, latitude, longitude, formattedAddress, phone } = req.body;
//     if (!name || !latitude || !longitude) {
//         return res.status(400).json({ message: "Please give all details." });
//     }
//     const file = req.file;
//     if (!file) {
//         return res.status(400).json({ message: "Please give image" });
//     }
//     // ✅ NO base64, NO conversion
//     const formData = new FormData();
//     formData.append("buffer", file.buffer.toString("base64"));
//     let uploadResult;
//     try {
//         const response = await axios.post(
//             `${process.env.UTILS_SERVICE}/api/upload`,
//             {
//                 buffer: file.buffer.toString("base64") // 👈 ONLY THIS
//             }
//         );
//         uploadResult = response.data;
//     } catch (err) {
//         console.log("UPLOAD FAILED:", err);
//         return res.status(500).json({ message: "Image upload failed" });
//     }
//     const restaurant = await Restaurant.create({
//         name,
//         description,
//         phone,
//         image: uploadResult.url,
//         ownerId: user._id,
//         autoLocation: {
//             type: "Point",
//             coordinates: [Number(longitude), Number(latitude)],
//             formattedAddress,
//         }
//     });
//     return res.status(201).json({
//         message: "Restaurant created successfully",
//         restaurant
//     });
// });
export const fetchMyRestaurant = TryCatch(async (req, res) => {
    if (!req.user) {
        return res.status(401).json({
            message: "Please Login"
        });
    }
    const restaurant = await Restaurant.findOne({ ownerId: req.user._id });
    if (!restaurant) {
        return res.status(400).json({
            message: "No restaurant found",
        });
    }
    if (!req.user.restaurantId) {
        const token = jwt.sign({
            user: {
                ...req.user,
                restaurantId: restaurant._id
            },
        }, process.env.JWT_SEC, {
            expiresIn: "15d",
        });
        return res.json({ restaurant, token });
    }
    res.json({ restaurant });
});
