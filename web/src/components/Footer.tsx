import React from "react";

export function Footer() {
  return (
    <div className="border-t-2 border-gray-200 text-center mt-8 pt-8 text-sm">
      <h1 className="font-medium">Simple Todo Manager API</h1>
      <p>
        This API exposes a REST endpoint and a GraphQL endpoint. You can access
        the REST endpoint documentation under:
      </p>
      <a
        href="/api-docs"
        target="_blank"
        className="block m-2 text-medium text-blue-800"
      >
        Swagger UI
      </a>
      <p>
        If you want to interact with the GraphQL endpoint, please use the
        following documentation:
      </p>
      <a
        href="/graphql"
        target="_blank"
        className="block m-2 text-medium text-blue-800"
      >
        GraphQL Playground
      </a>

      <p>&copy;{new Date().getFullYear()} Alexander Babel, Jonas Embach</p>
    </div>
  );
}
