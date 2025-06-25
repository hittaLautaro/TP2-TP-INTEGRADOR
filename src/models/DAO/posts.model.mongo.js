import MongoConnection from "../connection.js";
import { ObjectId } from "mongodb";

class PostsModelMongo {
  constructor() {
    this.db = MongoConnection.db;
  }

  getPost = async (id) => {
    const posts = await this.db
      .collection("posts")
      .findOne({ _id: ObjectId.createFromHexString(id) });
    return posts;
  };

  getPosts = async () => {
    const posts = await this.db.collection("posts").find({}).toArray();
    return posts;
  };

  postPost = async (post) => {
    const newPost = await this.db.collection("posts").insertOne(post);
    return newPost;
  };

  putPost = async (id, data) => {
    delete data.userId;

    const update = await this.db
      .collection("posts")
      .updateOne({ _id: ObjectId.createFromHexString(id) }, { $set: data });
    return update;
  };

  patchPost = async (id, data) => {
    const update = await this.db
      .collection("posts")
      .updateOne({ _id: ObjectId.createFromHexString(id) }, { $set: data });
    return update;
  };

  deletePost = async (id) => {
    const postDelete = await this.db
      .collection("posts")
      .deleteOne({ _id: ObjectId.createFromHexString(id) });
    return postDelete;
  };
}

export default PostsModelMongo;
