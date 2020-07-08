import React, { useMemo, useContext, useRef } from "react";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { setContext } from "@apollo/link-context";
import { AccountContext } from "./AccountContext";

type ApolloProps = {
  children: React.ReactNode;
};

export function Apollo({ children }: ApolloProps) {
  const { token } = useContext(AccountContext);
  const tokenRef = useRef(token);

  console.log(tokenRef.current, token);

  tokenRef.current = token;

  const client = useMemo(() => {
    const httpLink = createHttpLink({
      uri: process.env.REACT_APP_GRAPHQL_URL,
    });

    const cache = new InMemoryCache({});

    const authLink = setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
          authorization: tokenRef.current ? `Bearer ${tokenRef.current}` : "",
        },
      };
    });

    return new ApolloClient({
      cache,
      link: authLink.concat(httpLink),
    });
  }, []);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
