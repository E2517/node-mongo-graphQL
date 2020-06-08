const { ApolloServer, gql } = require("apollo-server-express");
const programmers = [{
        name: "Carlos",
        skills: "Java, C, Flutter",
    },
    {
        name: "Miguel",
        skills: "Java, NodeJS, React, Angular",
    },
];

const typeDefs = gql `
  type Programmer {
    name: String
    skills: String
  }

  type Query {
    programmers: [Programmer]
  }
`;

const resolvers = {
    Query: {
        programmers: () => programmers,
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

module.exports = {
    typeDefs,
    resolvers,
};