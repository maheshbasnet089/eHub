const router = require("express").Router();
const OtpController = require("../controllers/otp-controller");

router.post("/api/send-otp", OtpController.sendOtp);
router.post("/api/verify-otp", OtpController.verifyOtp);

module.exports = router;
