const Post = require("../models/Post");
const Comment = require("../models/Comment");

const createPost = async ({ title, content, userId }) => {
    const post = new Post({ title, content, author: userId });
    await post.save();
    return post.populate("author");
};

const addComment = async ({ postId, content, userId }) => {
    const comment = new Comment({ content, author: userId, post: postId });
    await comment.save();
    await Post.findByIdAndUpdate(postId, { $push: { comments: comment._id } });
    return comment.populate("author");
};

const getPost = async (postId) => {
    return await Post.findById(postId)
        .populate("author")
        .populate({ path: "comments", populate: { path: "author" } });
};

const listPosts = async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    const totalCount = await Post.countDocuments();
    const posts = await Post.find()
        .skip(skip)
        .limit(limit)
        .populate("author")
        .populate({
            path: "comments",
            populate: {
                path: "author",
            },
        });


    const filteredPosts = posts.filter(post => post.author !== null);

    return {
        posts: filteredPosts,
        totalCount
    };
};





const editPost = async ({ postId, title, content, userId }) => {
    const post = await Post.findOneAndUpdate(
        { _id: postId, author: userId },
        { title, content },
        { new: true }
    );
    if (!post) {
        console.log(`Post with id ${postId} not found or unauthorized access`);
        throw new Error("Post not found or unauthorized");
    }
    return post;
};

const deletePost = async ({ postId, userId }) => {
    const post = await Post.findOneAndDelete({ _id: postId, author: userId });
    if (!post) throw new Error("Post not found or unauthorized");
    await Comment.deleteMany({ post: postId });
    return `Post with ID ${postId} deleted successfully`;
};


const editComment = async ({ commentId, content, userId }) => {
    const comment = await Comment.findOneAndUpdate(
        { _id: commentId, author: userId },
        { content },
        { new: true }
    ).populate("author");
    if (!comment) throw new Error("Comment not found or unauthorized");

    return comment;
};


const deleteComment = async ({ commentId, userId }) => {
    console.log("Deleting comment with commentId:", commentId, "userId:", userId);
    const comment = await Comment.findOneAndDelete({ _id: commentId, author: userId });
    if (!comment) {
        throw new Error("Comment not found or unauthorized");
    }
    return "Comment deleted successfully";
};



module.exports = {
    createPost,
    addComment,
    getPost,
    listPosts,
    editPost,
    deletePost,
    editComment,
    deleteComment,
};
