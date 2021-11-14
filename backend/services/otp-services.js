const crypto = require("crypto");
class OtpService {
  async generateOtp() {
    try {
      const otp = crypto.randomInt(1000, 9999);
      return otp;
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new OtpService();
