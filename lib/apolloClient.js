import { ApolloClient, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
    uri: "https://reflow-demo.dyne.org/api/graphql",
    cache: new InMemoryCache(),
});

export default apolloClient;