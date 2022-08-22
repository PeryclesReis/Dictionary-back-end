const jwt = require('jsonwebtoken');

const JWT = {
  secret: process.env.JWT_SECRET,
  config: {
    expiresIn: '1d',
    algorithm: 'HS256',
  },
};

const encodeToken = (user) => {
  const token = jwt.sign({ data: user }, JWT.secret, JWT.config);

  return token;
};

const verifyToken = (token) => {
  const result = jwt.verify(token, JWT.secret);

  return result;
};

const generateToken = (name, email, id) => {
  const user = { name, email, id };

  const result = encodeToken(user);

  return result;
};

module.exports = {
  generateToken,
  verifyToken,
};
