const router = require("express").Router();
const OtpController = require("../controllers/otp-controller");
const verifyToken = require("../middlewares/activate-middleware");

router.post("/api/send-otp", OtpController.sendOtp);
router.post("/api/verify-otp", OtpController.verifyOtp);
router.post("/api/activate", verifyToken, OtpController.activate);

module.exports = router;
