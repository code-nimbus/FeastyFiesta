export const createRazorPayOrder = async (req, res) => {
    const { orderId } = req.body;
    const { data } = await axios.get(`process.env.RESTAURANT_SERVICE`);
};
