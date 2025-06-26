import MongoConnection from "../connection.js";
import { ObjectId } from "mongodb";

class PostsModelMongo {
  constructor() {
    this.db = MongoConnection.db;
  }

  findById = async (id) => {
    const posts = await this.db
      .collection("posts")
      .findOne({ _id: ObjectId.createFromHexString(id) });
    return posts;
  };

  findAll = async () => {
    const posts = await this.db.collection("posts").find({}).toArray();
    return posts;
  };

  findByUserId = async (userId) => {
    return await this.db.collection("posts").find({ userId: userId }).toArray();
  };

  save = async (post) => {
    const newPost = await this.db.collection("posts").insertOne(post);
    return newPost;
  };

  update = async (id, data) => {
    delete data.userId;

    const update = await this.db
      .collection("posts")
      .updateOne({ _id: ObjectId.createFromHexString(id) }, { $set: data });
    return update;
  };

  patch = async (id, data) => {
    const update = await this.db
      .collection("posts")
      .updateOne({ _id: ObjectId.createFromHexString(id) }, { $set: data });
    return update;
  };

  delete = async (id) => {
    const postDelete = await this.db
      .collection("posts")
      .deleteOne({ _id: ObjectId.createFromHexString(id) });
    return postDelete;
  };

  deleteByUserId = async (userId) => {
    const result = await this.db
      .collection("posts")
      .deleteMany({ userId: userId });
    return result;
  };
}

export default PostsModelMongo;
