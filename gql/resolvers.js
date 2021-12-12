const userController = require("../controllers/user");

const resolvers = {
  Query: {
    // User
    getUser: (_, { id, username }) => userController.getUser(id, username),
  },

  Mutation: {
    // User
    registerUser: (_, { input }) => userController.registerUser(input),
    login: (_, { input }) => userController.login(input),
  },
};

module.exports = resolvers;
