const tokenHandler = require('../auth');

const auth = async (req, _res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    const error = { statusCode: 401, message: 'Token not found' };

    return next(error);
  }

  const tokenSpli = token.split(" ");

  try {
    const { data: { email, id } } = tokenHandler.verifyToken(tokenSpli[1]);

    const user = { email, id };

    req.user = user;

    return next();
  } catch (error) {
    const ERROR = { statusCode: 401, message: 'Expired or invalid token' };
    return next(ERROR);
  }
};

module.exports = auth;
