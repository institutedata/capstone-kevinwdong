import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {

  const token = req.header('Authorisation');
  if (!token) {
    return next(errorHandler(401, 'Unauthorised'));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(401, 'Authorisation Error'));
    }
    req.user = user;
    next();
  });
};
