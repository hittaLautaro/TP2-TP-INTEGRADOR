import PostsFactory from "../models/PostsFactory.js";

class PostsService {
  constructor() {
    this.postsModel = PostsFactory.create(process.env.PERSISTENCE);
  }

  getPost = async (id) => {
    return await this.postsModel.getPost(id);
  };

  getPosts = async () => {
    return await this.postsModel.getPosts();
  };

  postPost = async (newPost) => {
    return await this.postsModel.postPost(newPost);
  };

  putPost = async (id, newPost) => {
    return await this.postsModel.putPost(id, newPost);
  };

  patchPost = async (id, updatedData) => {
    return await this.postsModel.patchPost(id, updatedData);
  };

  deletePost = async (id) => {
    return await this.postsModel.deletePost(id);
  };
}

export default PostsService;
