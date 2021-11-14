const OtpService = require("../services/otp-services");
const HashServices = require("../services/hash-services");

class OtpController {
  async sendOtp(req, res) {
    const { phone } = req.body;
    if (!phone) {
      return res.status(400).json({ message: "Phone Number is required" });
    }
    const otp = await OtpService.generateOtp();
    const expiresIn = Date.now() + 1000 * 60 * 2;
    const data = `${phone}.${otp}.${expiresIn}`;
    const hash = HashServices.hashOtp(data);
    res.json({ hash });
  }
}

module.exports = new OtpController();
