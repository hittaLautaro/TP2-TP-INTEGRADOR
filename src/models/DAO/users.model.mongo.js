import MongoConnection from "../connection.js";
import { ObjectId } from "mongodb";

class UsersModelMongo {
  constructor() {
    this.db = MongoConnection.db;
  }

  findById = async (id) => {
    console.log("findById", id);
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
    console.log("found:", found);
    const result = await this.db
      .collection("users")
      .deleteOne({ _id: ObjectId.createFromHexString(id) });
    return result.deletedCount > 0;
  };
}

export default UsersModelMongo;
