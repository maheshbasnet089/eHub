const crypto = require("crypto");

class HashServices {
  hashOtp(data) {
    try {
      const secret = process.env.SECRET;
      const hash = crypto
        .createHmac("sha256", secret)
        .update(data)
        .digest("hex");
      return hash;
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new HashServices();
