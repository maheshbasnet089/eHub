const router = require("express").Router();
const OtpController = require("../controllers/otp-controller");

router.post("/send-otp", OtpController.sendOtp);
router.post("/verify-otp", OtpController.verifyOtp);

module.exports = router;
