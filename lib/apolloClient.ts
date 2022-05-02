import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: process.env.uri,
});

const authLink = setContext((_, { headers }) => {
  console.log(process.env.uri);
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${process.env.token}`,
    }
  }
});

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    addTypename: false
  })
});



export default apolloClient;

