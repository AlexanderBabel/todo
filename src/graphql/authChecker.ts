import { AuthChecker } from 'type-graphql';
import { Context } from '../middlewares/authentication';

export const authChecker: AuthChecker<Context> = ({ context }) => {
  return !!context.user;
};
