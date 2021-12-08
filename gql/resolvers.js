const User = require("../models/user");

const resolvers = {
  Query: {
    // User
    getUser: () => {
      return null;
    },
  },

  Mutation: {
    // User
    registerUser: async (_, { input }) => {
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

      // TODO: encrypt password

      try {
        const user = new User(newUser);
        await user.save();
        return user;
      } catch (error) {
        console.log(error);
      }

      return null;
    },
  },
};

module.exports = resolvers;
