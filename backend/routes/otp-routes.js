const router = require("express").Router();
const OtpController = require("../controllers/otp-controller");

router.post("/send-otp", OtpController.sendOtp);

module.exports = router;
