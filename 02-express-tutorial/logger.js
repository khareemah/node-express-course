const logger = (req, res, next) => {
  const method = req.method;
  const year = new Date().getFullYear();
  console.log(method, year);
  next();
};

module.exports = logger;
