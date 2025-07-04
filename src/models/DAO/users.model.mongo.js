import MongoConnection from "../connection.js";
import { ObjectId } from "mongodb";

class UsersModelMongo {
  constructor() {
    this.db = MongoConnection.db;
  }

  findById = async (id) => {
    return await this.db
      .collection("users")
      .findOne({ _id: ObjectId.createFromHexString(id) });
  };

  findByEmail = async (email) => {
    return await this.db.collection("users").findOne({ email });
  };

  save = async (user) => {
    return await this.db.collection("users").insertOne(user);
  };

  delete = async (id) => {
    const found = await this.db
      .collection("users")
      .findOne({ _id: ObjectId.createFromHexString(id) });
    const result = await this.db
      .collection("users")
      .deleteOne({ _id: ObjectId.createFromHexString(id) });
    return result.deletedCount > 0;
  };

  updateActive = async (userId, isActive) => {
    return await this.db
      .collection("users")
      .updateOne(
        { _id: ObjectId.createFromHexString(userId) },
        { $set: { isActive } }
      );
  };
}

export default UsersModelMongo;
