import MongoConnection from "../connection.js";

class AuthModelMongo {
  constructor() {
    this.db = MongoConnection.db;
  }

  findByEmail = async (email) => {
    return await this.db.collection("users").findOne({ email });
  };

  save = async (user) => {
    return await this.db.collection("users").insertOne(user);
  };
}

export default AuthModelMongo;
