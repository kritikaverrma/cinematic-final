const Razorpay = require("razorpay");
const UserModel = require("../model/UserModel");

const razorpay = new Razorpay({
  key_id: "rzp_test_eb1NauEUWTRP88",
  key_secret: "Z3Oc0D8M53J6cmWLTLTIKBks",
});

const getPaymentController = async (req, res) => {
  console.log("We are in getpaymentController");
  try {
    const data = await razorpay.orders.create({
      amount: req.body.amount * 100,
      currency: "INR",
      receipt: "Receipt_Id" + Date.now(),
    });
    res.json({
      amount: data.amount,
      orderId: data.id,
    });
  } catch (err) {
    console.log("err from getpaymentcontroller", err);
  }
};

const updatePremiumAccessController = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.premiumAccess = true;
    await UserModel.findOneAndUpdate(
      { email: email },
      { $set: { isPremium: true } },
      { new: true }
    );
    res.json({ message: { isPremium: true } });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getPaymentController,
  updatePremiumAccessController,
};
