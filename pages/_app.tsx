import '../styles/globals.css'
import {useApollo} from '../lib/apolloClient'
import type { AppProps } from 'next/app'
import {ApolloProvider} from "@apollo/client";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={useApollo(pageProps)}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
