const bcrypt = require("bcryptjs");
const User = require("../models/user");

const getUser = async ({ id }) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

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

module.exports = { getUser, registerUser };
