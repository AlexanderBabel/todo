import 'reflect-metadata';
import { Express } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { TodoResolver } from './resolvers/TodoResolver';
import { buildSchema } from 'type-graphql';

export default async function (app: Express): Promise<void> {
  const schema = await buildSchema({
    resolvers: [TodoResolver],

  });

  const server = new ApolloServer({
    schema,
  });

  server.applyMiddleware({ app });
}
