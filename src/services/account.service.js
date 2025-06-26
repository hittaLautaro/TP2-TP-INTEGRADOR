import UsersFactory from "../models/UsersFactory.js";
import PostsFactory from "../models/PostsFactory.js";
import bcrypt from "bcrypt";

class AccountService {
  constructor() {
    this.usersModel = UsersFactory.create(process.env.PERSISTENCE);
    this.postsModel = PostsFactory.create(process.env.PERSISTENCE);
  }

  delete = async (userId, password) => {
    const user = await this.usersModel.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    await this.postsModel.deleteByUserId(userId);

    return await this.usersModel.delete(userId);
  };
}

export default AccountService;
