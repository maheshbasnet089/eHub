const OtpService = require("../services/otp-services");
const HashServices = require("../services/hash-services");
const UserService = require("../services/user-services");
const TokenServices = require("../services/token-services");

class OtpController {
  async sendOtp(req, res) {
    const { phone } = req.body;
    if (!phone) {
      return res.status(400).json({ message: "Phone field is required" });
    }
    const otp = await OtpService.generateOtp();
    const expiresIn = Date.now() + 1000 * 60 * 2;
    const data = `${phone}.${otp}.${expiresIn}`;
    const hash = HashServices.hashOtp(data);
    try {
      await OtpService.sendBySms(phone, otp);
      res.json({
        hash: `${hash}.${expiresIn}`,
        phone,
        otp,
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        message: "Message sending failed ",
      });
    }
  }
  async verifyOtp(req, res) {
    const { phone, otp, hash } = req.body;
    if (!phone || !otp || !hash) {
      res.status(400).json({ message: "All fields are required" });
    }
    const [hashedOtp, expiresIn] = hash.split(".");
    if (Date.now() > +expiresIn) {
      res.status(400).json({ message: "OTP expired!" });
    }
    const data = `${phone}.${otp}.${expiresIn}`;
    const isValid = OtpService.verifyOtp(hashedOtp, data);
    if (!isValid) {
      return res.status(400).json({ message: "Invalid Token" });
    }
    let user;
    try {
      user = await UserService.findUser({ phone });
      if (!user) {
        user = await UserService.createUser({ phone });
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "DB error" });
    }
    const { accessToken, refreshToken } = TokenServices.generateToken({
      id: user._id,
      activated: false,
    });
    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });
    res.json({ accessToken });
  }
}

module.exports = new OtpController();
