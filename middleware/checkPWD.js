import * as user from "../models/User.js";
import bcrypt from "bcrypt";
export default async (req, res, next) => {
  try {
    if (!req.body.email) {
      next({ aprooved: false, message: "no email provided" });
    } else {
      const toCheckUser = await user.getOne({ email: req.body.email });
      if (!toCheckUser) {
        next({ aprooved: false, message: "no user provided" });
      } else {
        const passwordIsEqual = await bcrypt.compare(
          req.body.password,
          toCheckUser.password
        );
        if (passwordIsEqual) {
          req.user = toCheckUser;
          next();
        } else {
          next({ aprooved: false, message: "wrong password" });
        }
      }
    }
  } catch (error) {
    next({ approved: false, message: error });
  }
};
