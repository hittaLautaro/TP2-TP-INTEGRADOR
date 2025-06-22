import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

class MongoConnection {
  static client = new MongoClient(process.env.MONGO_URL);
  static db = this.client.db("tp2");

  static connection = async () => {
    await this.client.connect();
  };
}

export default MongoConnection;
