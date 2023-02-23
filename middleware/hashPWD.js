import bcrypt from "bcrypt";
export default async (req, res, next) => {
  try {
    if (!req.body.password || req.body.email) {
      next({ aprooved: false, message: "no email od password provided" });
    } else {
      const hashdPWD = bcrypt.hash(req.body.password, 10);
      req.body.password = hashdPWD;
      next();
    }
  } catch (error) {
    next({ approved: false, message: error });
  }
};
