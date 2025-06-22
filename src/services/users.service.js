import UsersFactory from "../models/UsersFactory.js";

class UsersService {
  constructor() {
    this.usersModel = UsersFactory.create(process.env.PERSISTENCE);
  }

  getUsers = async () => {
    return await this.usersModel.getUsers();
  };

  postUser = async (newUser) => {
    return await this.usersModel.postUser(newUser);
  };

  putUser = async (id, newUser) => {
    return await this.usersModel.putUser(id, newUser);
  };

  patchUser = async (id, updatedData) => {
    return await this.usersModel.patchUser(id, updatedData);
  };

  deleteUser = async (id) => {
    return await this.usersModel.deleteUser(id);
  };
}

export default UsersService;
