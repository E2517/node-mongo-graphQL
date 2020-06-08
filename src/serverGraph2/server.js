const express = require("express");
const app = express();
const { ApolloServer, gql } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./schema");

const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app });

app.listen({ port: 5000 }, () =>
    console.log(`🚀 Server ready at http://localhost:5000${server.graphqlPath}`)
);