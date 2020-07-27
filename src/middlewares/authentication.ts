/* eslint-disable @typescript-eslint/no-namespace */
import { Request, NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';

const allowedRoutes = ['^/$', '^/api-docs*', '^/token$'];

export type Context = {
  user: string;
};

declare global {
  namespace Express {
    interface Request {
      context: Context;
    }
  }
}

export default (req: Request, res: Response, next: NextFunction): void => {
  const isGraphQL = req.path.match('/graphql');
  if (allowedRoutes.find((r) => req.path.match(r))) {
    return next();
  }

  const { authorization } = req.headers;
  const { JWT_SECRET } = process.env;
  if (!JWT_SECRET) {
    res.status(500).send('Missing env var.');
    return;
  }

  if (!authorization) {
    if (isGraphQL) {
      return next();
    }

    res.status(401).send('Not Authenticated');
    return;
  }

  try {
    const decoded = verify(authorization.replace('Bearer ', ''), JWT_SECRET) as { user: string };
    if (typeof decoded === 'object' && decoded.user) {
      req.context = { user: decoded.user };
    }
  } catch (err) {
    if (!isGraphQL) {
      res.status(401).send('Not Authenticated');
      return;
    }
  }

  return next();
};
