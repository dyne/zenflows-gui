import {ApolloClient, createHttpLink, InMemoryCache} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'https://reflow-demo.dyne.org/api/graphql',
});

const token = "QTEyOEdDTQ.1ztDjya6L111p4yMXXwGiVH-m0rvGZUNLcimxXOFLDa9Xgjfddi_kWu9Kvg.I10k5Sipkhkzzoeb.ae2eBK-VxefHdp0dvH3nH1XzeUh6Mdht-BtrZ9B0F2-p54Umpg7K6fysN5xrELzA.TgPSBhh6V5Yuh3UQ5EpizQ"



const authLink = setContext((_, {headers}) => {
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

