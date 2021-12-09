const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const createToken = (user, expiresIn = "1h") => {
  const { id, username, email } = user;
  const payload = {
    id,
    username,
    email,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

const getUser = async (id) => {
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

// Auth
const login = async ({ email, password }) => {
  const errorMessage = "Invalid email or password";
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    throw new Error(errorMessage);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error(errorMessage);
  }

  return {
    token: createToken(user),
  };
};

module.exports = { getUser, registerUser, login };
