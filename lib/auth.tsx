import React, { useState, useContext, createContext } from 'react'
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  gql,
} from '@apollo/client'


// @ts-ignore
const authContext:any = createContext()

export function AuthProvider({ children}:any) {
  const auth = useProvideAuth()

  return (
    <authContext.Provider value={auth}>
      <ApolloProvider client={auth.createApolloClient()}>
        {children}
      </ApolloProvider>
    </authContext.Provider>
  )
}

export const useAuth:any = () => {
  return useContext(authContext)
}

function useProvideAuth() {
  const [authToken, setAuthToken] = useState(null)
  const [authId, setAuthId] = useState(null)

  const isSignedIn = () => {
    if (authToken) {
      return true
    } else {
      return false
    }
  }

  const getAuthHeaders = () => {
    if (!authToken) return null

    return {
      authorization: `Bearer ${authToken}`,
    }
  }

  const createApolloClient = () => {
    const link = new HttpLink({
      uri: "https://reflow-demo.dyne.org/api/graphql",
      headers: getAuthHeaders(),
    })
    console.log(link)

    return new ApolloClient({
      link,
      ssrMode: typeof window === 'undefined',
      cache: new InMemoryCache({
    addTypename: false
  }),

    })
  }

  const signIn = async ({ username, password }:{username:string,password:string}) => {
    const client = createApolloClient()
    const LoginMutation = gql`
            mutation {
              login(emailOrUsername: "${username}", password: "${password}") {
                token
                currentUser {id}
              }
            }
          `

    const result = await client.mutate({
      mutation: LoginMutation,
      variables: { username, password },
    })

    console.log(result)

    if (result?.data?.login?.token) {
      setAuthToken(result.data.login.token)
      setAuthId(result.data.login.currentUser.id)
    }
  }

  const signOut = () => {
    setAuthToken(null)
  }

  return {
    setAuthToken,
    isSignedIn,
    signIn,
    signOut,
    createApolloClient,
    authId,
  }
}