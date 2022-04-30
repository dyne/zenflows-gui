import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'https://reflow-demo.dyne.org/api/graphql',
});

const token = "QTEyOEdDTQ.JOAN7Vn6zIEYCnI0Q6drfUJzYa6b-H87WusllWFyoGzszRgt6-tVEcIA210.ny1AlCnTHc0XmD6L.NF-8OaUWrVmZQrOkEKqoc0LGPYepTOz2oDwbmoMO_gRkKsmpfYbM8UM1Uw6QVIzq.2NrHEm4E24T6Hw4mhq8whA"



const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
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

