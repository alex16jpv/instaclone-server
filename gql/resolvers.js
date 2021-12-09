const userController = require("../controllers/user");

const resolvers = {
  Query: {
    // User
    getUser: (_, input) => userController.getUser(input),
  },

  Mutation: {
    // User
    registerUser: (_, { input }) => userController.registerUser(input),
  },
};

module.exports = resolvers;
