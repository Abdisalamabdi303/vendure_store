import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_VENDURE_API_URL || "https://demo.vendure.io/shop-api",
  cache: new InMemoryCache(),
});

export default client;
