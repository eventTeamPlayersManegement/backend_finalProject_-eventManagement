import * as user from "../models/User.js";
export default async (req, res, next) => {
  try {
    const searchUser = await user.getOneById(req.params.id);
    if (searchUser.admin) {
      next();
    } else {
      res.status(403).json({ aprooved: false, message: "you are not admin" });
    }
  } catch (error) {
    next(error);
  }
};
