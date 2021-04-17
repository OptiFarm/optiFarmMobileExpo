import { ApolloClient, InMemoryCache } from "@apollo/client";

export const makeApolloClient = (token) => {
  const cache = new InMemoryCache();
  const client = new ApolloClient({
    uri: "http://54.144.86.17:4000/optiFarm",
    headers: {
      Authorization: token !== null ? `Bearer ${token.toString()}` : "",
      "Content-Type": "application/json",
    },
    cache,
    defaultOptions: { watchQuery: { fetchPolicy: "cache-and-network" } },
  });
  return client;
};

// Authorization: token !== null ? `Bearer ${token}` : "",
