import PostsModelMongo from "./DAO/posts.model.mongo.js";

class PostsFactory {
  static create(persistence) {
    switch (persistence) {
      case "mongo":
        return new PostsModelMongo();
      default:
        return new PostsModelMongo();
    }
  }
}

export default PostsFactory;
