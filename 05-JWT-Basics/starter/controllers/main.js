// check username and password in req.body, post request
// if they exist, create new JWT
// send back to the front end

// set up authentication so that only the request with JWT can access the dashboard

const customAPIError = require('../errors/custom-error');
const jwt = require('jsonwebtoken');
const login = async (req, res) => {
  const { username, password } = req.body;
  // to validate username and pasword, options are:
  // mongoose Schema validation
  // Joi (extra package)
  // checking in the controller
  if (!username || !password) {
    throw new customAPIError('please provide username and passwword', 400);
  }

  // use for demo, normalluy provided by DB
  const id = new Date().getTime();
  // try to keep payload small, better experience for user
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
  res.status(200).json({ msg: 'user created', token });
};

const dashboard = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new customAPIError('no token provided', 401);
  }
  const token = authHeader.split(' ')[1];
  console.log(token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({
      msg: `Hello ${decoded.username}`,
      secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
    });
  } catch (error) {
    throw new customAPIError('not authorized to access this route');
  }
};

module.exports = { login, dashboard };
