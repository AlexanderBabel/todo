import 'reflect-metadata';
import { Express } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { TodoResolver } from './resolvers/TodoResolver';
import { buildSchema, Ctx } from 'type-graphql';
import { authChecker } from './authChecker';
import { GraphQLSchema } from 'graphql';

export function getSchema(): Promise<GraphQLSchema> {
  return buildSchema({
    resolvers: [TodoResolver],
    authChecker,
  });
}

export default async function (app: Express): Promise<void> {
  const server = new ApolloServer({
    schema: await getSchema(),
    context: (ctx) => ctx.req.context,
  });

  server.applyMiddleware({ app });
}
