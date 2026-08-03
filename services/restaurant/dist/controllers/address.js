import TryCatch from "../middlewares/trycatch.js";
import Address from "../models/Address.js";
export const addAddress = TryCatch(async (req, res) => {
    const user = req.user;
    if (!user) {
        return res.status(401).json({
            message: "Please login",
        });
    }
    const { mobile, formattedAddress, latitude, longitude } = req.body;
    if (!mobile ||
        !formattedAddress ||
        latitude === undefined ||
        longitude === undefined) {
        return res.status(400).json({
            message: "Please give all fields",
        });
    }
    const newAddress = await Address.create({
        userId: user._id,
        mobile,
        formattedAddress,
        location: {
            type: "Point",
            coordinates: [Number(longitude), Number(latitude)]
        }
    });
    res.json({
        message: "Address added successfully",
        address: newAddress,
    });
});
export const deleteAddress = TryCatch(async (req, res) => {
    const user = req.user;
    if (!user) {
        return res.status(401).json({
            message: "Please login",
        });
    }
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({
            message: "id is required"
        });
    }
    const address = await Address.findOne({
        _id: id,
        userId: user._id.toString()
    });
    if (!address) {
        res.status(404).json({
            message: "Address not found",
        });
    }
    await address?.deleteOne();
    res.json({
        message: "Address deleted successfully"
    });
});
export const getMyAddresses = TryCatch(async (req, res) => {
    const user = req.user;
    if (!user) {
        res.status(401).json({
            message: "Please login",
        });
    }
    const addresses = await Address.find({
        userId: user?._id.toString(),
    }).sort({ createdAt: -1 });
    res.json(addresses);
});
