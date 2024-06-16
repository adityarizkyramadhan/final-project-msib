const jwt = require('jsonwebtoken');
const flaverr = require('flaverr');

module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw flaverr(
        'E_INVALID_TOKEN',
        Error('token authentication is required')
      );
    }
    const jwtToken = req.headers.authorization.split(/^Bearer\s+/)[1];
    const decodedJWT = jwt.verify(jwtToken, process.env.JWT_SECRET);
    req.user = decodedJWT;
    if (req.user) {
      return next();
    } else {
      throw flaverr('E_INVALID_TOKEN', Error('invalid token'));
    }
  } catch (err) {
    return next(err);
  }
};
