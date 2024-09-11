const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema/schema');  // Updated to typeDefs
const resolvers = require('./resolvers/resolvers');
const cors = require('cors');

const app = express();
app.use(cors());

async function startApolloServer() {
    const server = new ApolloServer({
        typeDefs,  // Use the typeDefs directly
        resolvers,  // Use the fixed resolvers
    });

    await server.start();
    server.applyMiddleware({ app });

    app.listen({ port: 4000 }, () => {
        console.log(`Server running at http://localhost:4000${server.graphqlPath}`);
    });
}

startApolloServer();
