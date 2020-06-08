const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const { typeDefs, resolvers } = require("./schema.js");

const startServer = async() => {
    const app = express();
    const server = new ApolloServer({ typeDefs, resolvers });

    server.applyMiddleware({ app });

    await mongoose.connect(
        "mongodb://localhost:27017/test", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
        console.log("connected to mongoDB")
    );

    app.listen({ port: 5000 }, () =>
        console.log(`🚀 Server ready at http://localhost:5000${server.graphqlPath}`)
    );
};

startServer();