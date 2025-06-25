import { MongoClient } from "mongodb";

class MongoConnection {
  static client;
  static db;

  static connection = async () => {
    if (!this.client) {
      this.client = new MongoClient(process.env.MONGO_URL);
      this.db = this.client.db("tp2");
    }
    await this.client.connect();
  };
}

export default MongoConnection;
