import UsersModelMongo from "./DAO/users.model.mongo.js";

class UsersFactory {
  static create(persistence) {
    switch (persistence) {
      case "mongo":
        return new UsersModelMongo();
      default:
        return new UsersModelMongo();
    }
  }
}

export default UsersFactory;
