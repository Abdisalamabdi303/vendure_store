import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_VENDURE_API_URL || "http://localhost:3000/shop-api",
    credentials: "include",  // Needed for authentication
  }),
  cache: new InMemoryCache(),
});

export default client;
