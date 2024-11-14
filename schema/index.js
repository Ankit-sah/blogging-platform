const { gql } = require("apollo-server-express");
const { register, login } = require("../resolvers/auth");
const {
  createPost,
  addComment,
  getPost,
  listPosts,
  editPost,
  deletePost,
  editComment,
  deleteComment,
} = require("../resolvers/post");

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    author: User!
    comments: [Comment]
  }

  type Comment {
    id: ID!
    content: String!
    author: User!
  }

  type AuthPayload {
    token: String!
  }

  type PostConnection {
  posts: [Post]
  totalCount: Int!
}

type Query {
  listPosts(page: Int, limit: Int): PostConnection
  getPost(id: ID!): Post
}

  type Mutation {
    register(username: String!, email: String!, password: String!): User
    login(email: String!, password: String!): AuthPayload
    createPost(title: String!, content: String!): Post
    addComment(postId: ID!, content: String!): Comment
    editPost(id: ID!, title: String, content: String): Post
    deletePost(id: ID!): String
    editComment(id: ID!, content: String!): Comment
    deleteComment(id: ID!): String
  }
`;

const resolvers = {
  Query: {
    listPosts: (_, { page, limit }) => listPosts(page, limit),
    getPost: (_, { id }) => getPost(id),
  },
  Mutation: {
    register: (_, args) => register(args),
    login: (_, args) => login(args),
    createPost: (_, args, { userId }) => createPost({ ...args, userId }),
    addComment: (_, args, { userId }) => addComment({ ...args, userId }),
    editPost: async (_, args, { userId }) => {
      const { id, title, content } = args;
      return await editPost({ postId: id, title, content, userId });
    },
    deletePost: async (_, args, { userId }) => {
      const { id: postId } = args;
      return await deletePost({ postId, userId });
    },
    editComment: async (_, { id, content }, { userId }) => {
      return await editComment({ commentId: id, content, userId });
    },
    deleteComment: async (_, args, { userId }) => {
      const { id: commentId } = args;
      return await deleteComment({ commentId, userId });
    },
  },
};

module.exports = { typeDefs, resolvers };
