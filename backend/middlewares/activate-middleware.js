const TokenServices = require("../services/token-services");

module.exports = async function (req, res, next) {
  try {
    const { accessToken } = req.cookies;
    if (!accessToken) {
      throw new Error();
    }
    const userData = await TokenServices.verifyToken(accessToken);
    // console.log(userData);
    if (!userData) {
      throw new Error();
    }
    req.user = userData;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
