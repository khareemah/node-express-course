// check username and password in req.body, post request
// if they exist, create new JWT
// send back to the front end

// set up authentication so that only the request with JWT can access the dashboard

const jwt = require('jsonwebtoken');
const { BadRequest } = require('../errors');
const login = async (req, res) => {
  const { username, password } = req.body;
  // to validate username and pasword, options are:
  // mongoose Schema validation
  // Joi (extra package)
  // checking in the controller
  if (!username || !password) {
    throw new BadRequest('Please provide email and password');
  }

  // use for demo, normally provided by DB
  const id = new Date().getTime();
  // try to keep payload small, better experience for user
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
  res.status(200).json({ msg: 'user created', token });
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello ${req.user.username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

module.exports = { login, dashboard };
