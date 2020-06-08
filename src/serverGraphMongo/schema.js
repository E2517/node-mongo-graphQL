const { gql } = require("apollo-server-express");
const dataMongoDB = require("./mongo.js").programmers;
const dataLocal = require("./localdata.js").programmers;

const typeDefs = gql `
  type Programmer {
    id: ID!
    name: String
    skills: String
  }

  type Query {
    searchAllProgrammersMongoDB: [Programmer]
    searchOneprogrammerMongoDB(name: String!): Programmer
    searchMultipleProgrammersMondoDB(name: String!): [Programmer]
    searchAllProgrammersLocal: [Programmer]
    searchOneprogrammerLocal(name: String!): Programmer
  }

  type Mutation {
    createProgrammerMongoDB(name: String, skills: String): Programmer!
    deleteProgrammerMondoDB(name: String): Programmer!
  }
`;

const resolvers = {
    Query: {
        searchAllProgrammersMongoDB: () => dataMongoDB.find(),
        searchOneprogrammerMongoDB: (parent, args, context, info) => {
            const developer = dataMongoDB.findOne(args).exec();
            return developer;
        },

        //1.- Promise
        // programmerMongoDB: (parent, args) => {
        //     return new Promise((resolve, reject) => {
        //         dataMongoDB.findOne(args, function(err, result) {
        //             if (err) throw err;
        //             resolve(result);
        //         });
        //     });
        // },

        //2.- async y await
        // programmerMongoDB: async(parent, args) => {
        //     const developers = await dataMongoDB.findOne(args).exec();
        //     return developers;
        // },

        searchMultipleProgrammersMondoDB: async(parent, args, context, info) => {
            const developers = await dataMongoDB.find(args).exec();
            return developers;
        },

        searchAllProgrammersLocal: () => dataLocal,
        searchOneprogrammerLocal: (parent, { name }, context, info) => {
            const developer = dataLocal.filter((p) => p.name === name);
            console.log(developer);
            return developer[0];
        },
    },
    Mutation: {
        createProgrammerMongoDB: (_, { name, skills }) => {
            const addProgrammer = new dataMongoDB({ name, skills });
            addProgrammer.save();
            console.log(
                "new programmer added in mongoDB ... check in Mongo Compass" +
                addProgrammer
            );

            return addProgrammer;
        },

        //1.- async y await
        // createProgrammerMongoDB: async(_, { name, skills }) => {
        //     const addProgrammer = new dataMongoDB({ name, skills });
        //     await addProgrammer.save();
        //     console.log(
        //         "new programmer added in mongoDB ... check in Mongo Compass" +
        //         addProgrammer
        //     );

        //     return addProgrammer;
        // },

        deleteProgrammerMondoDB: (parent, args) => {
            const developer = dataMongoDB.findOneAndDelete(args).exec();
            return developer;
        },

        // 1.- Promise 
        // deleteProgrammerMondoDB: (parent, args) => {
        //     return new Promise((resolve, reject) => {
        //         dataMongoDB.findOneAndDelete(args, function(err, result) {
        //             if (err) throw err;
        //             resolve(result);
        //         });
        //     });
        // },

        //2.- async y await
        // deleteProgrammerMondoDB: async(parent, args) => {
        //     const developer = await dataMongoDB.findOneAndDelete(args).exec();
        //     return developer;
        // },
    },
};

module.exports = {
    typeDefs,
    resolvers,
};