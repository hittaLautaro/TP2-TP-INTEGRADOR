import PostsFactory from "../models/PostsFactory.js";

class PostsService {
  constructor() {
    this.postsModel = PostsFactory.create(process.env.PERSISTENCE);
  }

  getPost = async (id) => {
    const post = await this.postsModel.findById(id);

    if (!post) {
      throw new Error("Post not found");
    }

    return post;
  };

  getPosts = async () => {
    return await this.postsModel.findAll();
  };

  postPost = async (userId, newPost) => {
    newPost.userId = userId;
    return await this.postsModel.save(newPost);
  };

  putPost = async (id, newPost) => {
    return await this.postsModel.update(id, newPost);
  };

  patchPost = async (id, updatedData) => {
    return await this.postsModel.patch(id, updatedData);
  };

  deletePost = async (id) => {
    return await this.postsModel.delete(id);
  };
}

export default PostsService;
