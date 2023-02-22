export default (req, res, next) => {
  next({ status: 404, message: "Page not found" });
};
