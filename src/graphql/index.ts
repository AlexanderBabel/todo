import 'reflect-metadata';
import { Express } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { TodoResolver } from './resolvers/TodoResolver';
import { buildSchema, Ctx } from 'type-graphql';
import { authChecker } from './authChecker';

export default async function (app: Express): Promise<void> {
  const schema = await buildSchema({
    resolvers: [TodoResolver],
    authChecker,
  });

  const server = new ApolloServer({
    schema,
    context: (ctx) => ctx.req.context,
  });

  server.applyMiddleware({ app });
}
