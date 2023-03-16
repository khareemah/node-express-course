const { isTokenValid } = require('../utils');
const { UnauthenticatedError, UnauthorizedError } = require('../errors');
const authenticateUser = (req, res, next) => {
  const token = req.signedCookies.token;
  if (!token) {
    throw new UnauthenticatedError('Authentication Invalid');
  }
  try {
    const payload = isTokenValid({ token });
    const { name, userId, role } = payload;
    req.user = { name, userId, role };
    next();
  } catch (error) {
    throw new UnauthenticatedError('Authentication Invalid');
  }
};

// const authorizePermissions = (req, res, next) => {
//   const { role } = req.user;

//   console.log(role);
//   if (role !== 'admin') {
//     throw new UnauthorizedError('unauthorized to access this route');
//   }
//   next();
// };
const authorizePermissions = (...permittedRoles) => {
  return (req, res, next) => {
    const { role } = req.user;
    if (!permittedRoles.includes(role)) {
      throw new UnauthorizedError('unauthorized to access this route');
    }
    next();
  };
};
module.exports = { authenticateUser, authorizePermissions };
