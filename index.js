const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server");
require("dotenv").config({ path: ".env" });

const typeDefs = require("./gql/schema");
const resolvers = require("./gql/resolvers");

mongoose.connect(process.env.MONGODB_URI, {}, (err, _) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Connected to MongoDB");
  server();
});

const server = () => {
  const serverApollo = new ApolloServer({
    typeDefs,
    resolvers,
    // context
  });

  serverApollo.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
};
