import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

/**
 * This route allows you to create a token that you can use in order to interact with this API
 * @route GET /token
 * @group token - Create a Token which can be used for all other API calls
 * @returns {string} 200 - A JWT token.
 * @returns {Error}  500 - Something went wrong during the creation process.
 */
export default (req: Request, res: Response): void => {
  const { JWT_SECRET } = process.env;
  if (!JWT_SECRET) {
    res.status(500).send('Missing env var.');
    return;
  }

  const token = jwt.sign({ user: Math.random().toString(36).substring(2) }, JWT_SECRET);
  res.send(token);
};
