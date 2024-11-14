Blogging Platform API
This is a GraphQL API for a Blogging Platform that allows users to perform operations such as listing posts, creating, updating, and deleting posts, as well as managing comments along with jwt based authentication.

Features
Post Management:
Retrieve a single post by ID.
List all posts with pagination.
Create, update, and delete posts.
Comment Management:
Add comments to posts.
Fetch comments for a post.
User Management:
Retrieve user information by ID.
Subscriptions:
Listen for new posts added to the platform.
Listen for new comments added to a post.
GraphQL Schema

Technologies Used
GraphQL for API layer
Apollo Server for GraphQL server
MongoDB for database storage (can be adapted to other databases)
Node.js and Express for backend

Installation
Prerequisites
Ensure you have the following installed:

Node.js (v14 or higher)
MongoDB (for local development) or any other database
npm or yarn

Install dependencies:

bash
Copy code
npm install
Create a .env file (see the .env.example for structure).

Start the development server:

bash
Copy code
npm run dev
The server will be running on http://localhost:4000.

Environment Variables
Make sure to create a .env file in the root of the project for the following configuration.

.env
env
Copy code

# MongoDB URI

MONGO_URI=mongodb://localhost:27017/blogging-platform

# Port for the API server

PORT=4000

# JWT Secret for authentication (change this in production)

JWT_SECRET=your-secret-key

Usage
Running the server: After setting up the environment variables, run npm run dev to start the GraphQL API server.
Accessing the API: Navigate to http://localhost:4000/graphql to open Apollo Server's GraphQL Playground and start testing the queries and mutations.
