const jwt = require("jsonwebtoken");
const Token = require("../models/TokenModel");
const accessTokenSecret = process.env.JWT_ACCESS_TOKEN;
const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN;

class TokenServices {
  generateToken(payload) {
    const accessToken = jwt.sign(payload, accessTokenSecret, {
      expiresIn: "1h",
    });

    const refreshToken = jwt.sign(payload, refreshTokenSecret, {
      expiresIn: "1y",
    });
    return { accessToken, refreshToken };
  }
  async storeToken(token, userId) {
    await Token.create({ token, user: userId });
  }
  async verifyToken(accessToken) {
    return jwt.verify(accessToken, accessTokenSecret);
  }
}
module.exports = new TokenServices();
