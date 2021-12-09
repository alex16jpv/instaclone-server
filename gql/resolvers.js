const userController = require("../controllers/user");

const resolvers = {
  Query: {
    // User
    getUser: () => {
      return null;
    },
  },

  Mutation: {
    // User
    registerUser: (_, { input }) => userController.registerUser(input),
  },
};

module.exports = resolvers;
