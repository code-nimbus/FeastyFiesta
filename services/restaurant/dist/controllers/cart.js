import mongoose from "mongoose";
import TryCatch from "../middlewares/trycatch.js";
import Cart from "../models/Cart.js";
export const addToCart = TryCatch(async (req, res) => {
    if (!req.user) {
        return res.status(401).json({
            message: "Please login",
        });
    }
    const userId = req.user._id;
    const { restaurantId, itemId } = req.body;
    if (!mongoose.Types.ObjectId.isValid(restaurantId) ||
        !mongoose.Types.ObjectId.isValid(itemId)) {
        return res.status(400).json({
            message: "Invalid restaurant and item id",
        });
    }
    const cartfromDifferentRestaurant = await Cart.findOne({
        userId,
        restaurantId: { $ne: restaurantId },
    });
    if (cartfromDifferentRestaurant) {
        return res.status(400).json({
            message: "You can order only from one restaurant at a time. Please clear your cart first to add items from this restaurant.",
        });
    }
    const cartItem = await Cart.findOneAndUpdate({ userId, restaurantId, itemId }, {
        $inc: { quantity: 1 },
        $setOnInsert: { userId, restaurantId, itemId },
    }, { upsert: true, new: true, setDefaultsOnInsert: true });
    return res.json({
        message: "Item added to cart",
        cart: cartItem,
    });
});
export const fetchMyCart = TryCatch(async (req, res) => {
    if (!req.user) {
        return res.status(401).json({
            message: "Please login",
        });
    }
    const userId = req.user._id;
    // const cartItems = await Cart.find({ userId })
    //     .populate("itemId")
    //     .populate("restaurantId");
    const cartItems = await Cart.find({ userId })
        .populate("itemId")
        .populate("restaurantId");
    console.log("========== CART ==========");
    console.dir(cartItems, { depth: 5 });
    let subtotal = 0;
    let cartLength = 0;
    // for (const cartItem of cartItems) {
    //     const item: any = cartItem.itemId;
    //     subtotal += item.price * cartItem.quantity;
    //     cartLength += cartItem.quantity;
    // }
    // for (const cartItem of cartItems) {
    //     console.log("itemId populated:", cartItem.itemId);
    //     console.log("restaurant populated:", cartItem.restaurantId);
    //     const item: any = cartItem.itemId;
    //     if (!item) {
    //         console.log("❌ itemId populate failed");
    //         continue;
    //     }
    //     subtotal += item.price * cartItem.quantity;
    //     cartLength += cartItem.quantity;
    // }
    const validCartItems = cartItems.filter(cart => cart.itemId);
    // let subtotal = 0;
    // let cartLength = 0;
    for (const cartItem of validCartItems) {
        const item = cartItem.itemId;
        subtotal += item.price * cartItem.quantity;
        cartLength += cartItem.quantity;
    }
    return res.json({
        success: true,
        subtotal,
        cartLength,
        cart: validCartItems,
    });
});
//     return res.json({
//         success: true,
//         cartLength,
//         subtotal,
//         cart: cartItems,
//     })
// })
export const incrementCartItem = TryCatch(async (req, res) => {
    const userId = req.user?._id;
    const { itemId } = req.body;
    if (!userId || !itemId) {
        return res.status(400).json({
            message: "Invalid request"
        });
    }
    const cartItem = await Cart.findOneAndUpdate({ userId, itemId }, { $inc: { quantity: 1 } }, { new: true });
    if (!cartItem) {
        res.status(404).json({
            message: "Item not found",
        });
    }
    res.json({
        message: "Quantity increased by 1",
        cartItem,
    });
});
export const decrementCartItem = TryCatch(async (req, res) => {
    const userId = req.user?._id;
    const { itemId } = req.body;
    if (!userId || !itemId) {
        res.status(400).json({
            message: "Invalid request"
        });
    }
    const cartItem = await Cart.findOneAndUpdate({ userId, itemId }, { $inc: { quantity: -1 } }, { new: true });
    if (!cartItem) {
        res.status(404).json({
            message: "Item not found"
        });
    }
    if (cartItem?.quantity === 0) {
        await Cart.deleteOne({ userId, itemId });
        return res.json({
            message: "Item removed from cart"
        });
    }
    await cartItem?.save();
    res.json({
        message: "Quantity decreased by 1",
        cartItem,
    });
});
export const clearCart = TryCatch(async (req, res) => {
    const userId = req.user?._id;
    if (!userId) {
        return res.json({
            message: "Unauthorized"
        });
    }
    await Cart.deleteMany({ userId });
    res.json({
        message: "Cart cleared successfully",
    });
});
