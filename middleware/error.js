export default (error, req, res, next) => {
  try {
    res.status(error.status || 500).send({ message: error.message });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

//middleware mit 4 param ist error handler,
