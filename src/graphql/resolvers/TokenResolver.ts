import jwt from 'jsonwebtoken';
import { Mutation } from 'type-graphql';

export class TokenResolver {
  @Mutation((returns) => String, {
    description: 'Generates a token which can be used to execute requests against this API',
  })
  generateToken(): string {
    const { JWT_SECRET } = process.env;
    if (!JWT_SECRET) {
      throw new Error('Could not create token. An environment variable is missing.');
    }

    return jwt.sign({ user: Math.random().toString(36).substring(2) }, JWT_SECRET);
  }
}
