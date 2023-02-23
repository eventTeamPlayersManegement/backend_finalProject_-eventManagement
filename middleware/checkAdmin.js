import * as user from "../models/User.js";
export default async (req, res, next) => {
  try {
    const searchUser = await user.getOneById(req.userId);
    if (searchUser.admin) {
      next();
    } else {
      res.status(404).json({ aprooved: false, message: "you are not admin" });
    }
  } catch (error) {
    next(error);
  }
};
