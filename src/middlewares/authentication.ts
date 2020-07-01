import { Request, NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';

export default (req: Request, res: Response, next: NextFunction): void => {
  if (req.path.match('/api-docs*')) {
    return next();
  }

  const { authorization } = req.headers;
  const { JWT_SECRET } = process.env;
  if (!JWT_SECRET) {
    res.status(500).send('Missing env var.');
    return;
  }

  if (!authorization) {
    res.status(401).send('Not Authenticated');
    return;
  }

  try {
    verify(authorization.replace('Bearer ', ''), JWT_SECRET);
  } catch (err) {
    res.status(401).send('Not Authenticated');
    return;
  }

  return next();
};
