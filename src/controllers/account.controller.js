import AccountService from "../services/account.service.js";

class AccountController {
  constructor() {
    this.accountService = new AccountService();
  }

  delete = async (req, res) => {
    try {
      const { password } = req.body;
      await this.accountService.delete(req.user.id, password);
      return res.status(200).json({ message: "Account deleted successfully" });
    } catch (error) {
      return res
        .status(500)
        .json({ error: error.message || "Error deleting account" });
    }
  };
}

export default AccountController;
