const bcrypt = require("bcryptjs");
const User = require("../models/user");

const registerUser = async (input) => {
  const newUser = {
    ...input,
    email: input.email.toLowerCase(),
    username: input.username.toLowerCase(),
  };

  const { email, username, password } = newUser;

  const foundEmail = await User.findOne({ email });
  if (foundEmail) {
    throw new Error("Email already exists");
  }

  const foundUsername = await User.findOne({ username });
  if (foundUsername) {
    throw new Error("Username already exists");
  }

  newUser.password = await bcrypt.hash(password, 12);

  try {
    const user = new User(newUser);
    await user.save();

    return user;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { registerUser };
