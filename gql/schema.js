const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID
    name: String
    username: String
    email: String
    avatar: String
    website: String
    description: String
    createdAt: String
    updatedAt: String
  }

  input UserInput {
    name: String
    username: String!
    email: String!
    password: String!
  }

  type Query {
    # User
    getUser: User
  }

  type Mutation {
    # User
    registerUser(input: UserInput): User
  }
`;

module.exports = typeDefs;
