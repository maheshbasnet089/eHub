const User = require("../models/UserModel");

class UserService {
  async findUser(filter) {
    const user = await User.findOne({ filter });
    return user;
  }

  async createUser(data) {
    const user = User.create(data);
    return user;
  }
}

module.exports = new UserService();
