class UserDto {
  id;
  createdAt;
  activated;
  name;
  avatar;
  phone;

  constructor(user) {
    this.id = user._id;
    this.phone = user.phone;
    this.name = user.name;
    this.avatar = user.avatar ? `${process.env.BASE_URL}${user.avatar}` : null;
    this.createdAt = user.createdAt;
    this.activated = user.activated;
  }
}

module.exports = UserDto;
