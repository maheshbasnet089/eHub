const router = require("express").Router();
const OtpController = require("../controllers/otp-controller");
const verifyToken = require("../middlewares/activate-middleware");
const ActivateController = require("../controllers/activate-controller.js");

router.post("/api/send-otp", OtpController.sendOtp);
router.post("/api/verify-otp", OtpController.verifyOtp);
router.post("/api/activate", verifyToken, ActivateController.activate);
router.get("/api/refresh", OtpController.refresh);
router.post("/api/logout", OtpController.logOut);

module.exports = router;
