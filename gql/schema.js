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

  type Token {
    token: String
  }

  input UserInput {
    name: String
    username: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type Query {
    # User
    getUser(id: ID, username: String): User
  }

  type Mutation {
    # User
    registerUser(input: UserInput): User
    login(input: LoginInput): Token
  }
`;

module.exports = typeDefs;
