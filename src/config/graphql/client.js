import { ApolloClient, InMemoryCache } from "@apollo/client";

export const makeApolloClient = (token) => {
  const cache = new InMemoryCache();
  const client = new ApolloClient({
    uri: "http://34.248.116.21:4000/optiFarm",
    headers: {
      Authorization: token !== null ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    },
    cache,
    defaultOptions: { watchQuery: { fetchPolicy: "cache-and-network" } },
  });
  return client;
};