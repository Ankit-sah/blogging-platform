const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const { typeDefs, resolvers } = require("./schema");
const authMiddleware = require("./middleware/auth");

dotenv.config();
connectDB();

const app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        const userId = authMiddleware(req);
        return { userId };
    },
});

server.start().then(() => {
    server.applyMiddleware({ app });
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}${server.graphqlPath}`));
});
