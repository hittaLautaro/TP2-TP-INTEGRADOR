import PostsFactory from "../models/PostsFactory.js";

class PostsService {
  constructor() {
    this.postsModel = PostsFactory.create(process.env.PERSISTENCE);
  }

  getPost = async (id) => {
    const post = await this.postsModel.findById(id);
    if (!post) {
      const error = new Error("Post not found");
      error.statusCode = 404;
      throw error;
    }
    return post;
  };

  getPosts = async () => {
    return await this.postsModel.findAll();
  };

  getPostsByUser = async (userId) => {
    return await this.postsModel.findByUserId(userId);
  };

  getUserPosts = async () => {
    return await this.postsModel.findAll();
  };

  postPost = async (userId, newPost) => {
    newPost.userId = userId;
    await this.postsModel.save(newPost);
    return newPost;
  };

  putPost = async (id, newPost, userId) => {
    const post = await this.postsModel.findById(id);
    if (!post) {
      const error = new Error("Post not found");
      error.statusCode = 404;
      throw error;
    }
    if (post.userId.toString() !== userId) {
      const error = new Error("Forbidden");
      error.statusCode = 403;
      throw error;
    }

    return await this.postsModel.update(id, newPost);
  };

  patchPost = async (id, updatedData, userId) => {
    const post = await this.postsModel.findById(id);
    if (!post) {
      const error = new Error("Post not found");
      error.statusCode = 404;
      throw error;
    }
    if (post.userId.toString() !== userId) {
      const error = new Error("Forbidden");
      error.statusCode = 403;
      throw error;
    }

    return await this.postsModel.patch(id, updatedData);
  };

  deletePost = async (id, userId) => {
    const post = await this.postsModel.findById(id);

    if (!post) {
      return;
    }

    if (post.userId.toString() !== userId) {
      const error = new Error("Forbidden");
      error.statusCode = 403;
      throw error;
    }

    return await this.postsModel.delete(id);
  };
}

export default PostsService;
