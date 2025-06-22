import FacturasModelMongo from "./DAO/users.model.mongo.js";
class FacturasFactory {
  static create(persistence) {
    switch (persistence) {
      case "mongo":
        return new FacturasModelMongo();
      default:
        return new FacturasModel();
    }
  }
}

export default FacturasFactory;
