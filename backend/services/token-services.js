const jwt = require("jsonwebtoken");
const Token = require("../models/TokenModel");
const accessTokenSecret = process.env.JWT_ACCESS_TOKEN;
const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN;

class TokenServices {
  generateToken(payload) {
    const accessToken = jwt.sign(payload, accessTokenSecret, {
      expiresIn: "1m",
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

  async verifyRefreshToken(refreshToken) {
    return jwt.verify(refreshToken, refreshTokenSecret);
  }

  async findRefreshToken(userId, refreshToken) {
    return await Token.findOne({ userId: userId, token: refreshToken });
  }

  async updateRefreshToken(userId, refreshToken) {
    return await Token.updateOne({ userId: userId }, { token: refreshToken });
  }
}
module.exports = new TokenServices();
