const crypto = require("crypto");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilio = require("twilio")(accountSid, authToken, {
  lazyLoading: true,
});

const HashServices = require("./hash-services");

class OtpService {
  async generateOtp() {
    try {
      const otp = crypto.randomInt(1000, 9999);
      return otp;
    } catch (e) {
      console.log(e);
    }
  }
  async sendBySms(phone, otp) {
    return await twilio.messages
      .create({
        body: `Your Verification Code of eHub is ${otp}: `,
        from: process.env.FROM_NUMBER,
        to: phone,
      })
      .then((message) => console.log("Message sid : ", message.sid));
  }
  verifyOtp(hashedOtp, data) {
    let hashedData = HashServices.hashOtp(data);
    return hashedOtp === hashedData;
  }
}

module.exports = new OtpService();
