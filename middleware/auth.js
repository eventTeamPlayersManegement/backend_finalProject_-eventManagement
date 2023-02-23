import token from "../lib/token.js";
export default async (req, res, next) => {
  try {
    if (!req.cookies.jwt) {
      next({ aprooved: false, message: "please login first", status: 404 });
      return;
    }
    const checkToken = token.verifyToken(req.cookies.jwt);
    console.log(checkToken);
    if (checkToken.exp > 0) {
      req.userId = checkToken.id;
      next();
    } else {
      res.status(404).json({ aprooved: false, message: "token not valid" });
    }
  } catch (error) {
    next(error);
  }
};
