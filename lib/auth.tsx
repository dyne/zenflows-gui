import React, {useState, useContext, createContext, useEffect} from 'react'
import {
    ApolloProvider,
    ApolloClient,
    InMemoryCache,
    HttpLink,
    gql,
    ApolloLink, concat
} from '@apollo/client'

import useStorage from "./useStorage";
import SignRequest from "./SignRequest";
import {setContext} from "@apollo/client/link/context";


// @ts-ignore
const authContext: any = createContext()

export function AuthProvider({children}: any) {
    const auth = useProvideAuth()

    return (
        <authContext.Provider value={auth}>
            <ApolloProvider client={auth.createApolloClient()}>
                {children}
            </ApolloProvider>
        </authContext.Provider>
    )
}

export const useAuth: any = () => {
    return useContext(authContext)
}

const headersMiddleware = setContext(async(operation, { headers }) => {
    const variables = operation.variables
    const query = operation.query.loc?.source.body!
    const completeHeaders = await SignRequest({query, variables}).then(({result}) => ({
    ...headers,
    'zenflows-sign': JSON.parse(result).eddsa_signature,
    'zenflows-user': 'anosolare',
    'zenflows-hash': JSON.parse(result).hash
  }))
return {headers: completeHeaders}
}
);

function useProvideAuth() {
    const {getItem, setItem} = useStorage()
    const [authToken, setAuthToken] = useState(null as string | null)
    const [username, setUsername] = useState(null as string | null)
    const [authId, setAuthId] = useState(null as string | null)
    const storedToken = getItem('token', 'local') !== '' ? getItem('token', 'local') : null
    useEffect(() => setAuthToken(storedToken), [])
    const storedId = getItem('authId', 'local') !== '' ? getItem('authId', 'local') : null
    useEffect(() => setAuthId(storedId), [])
    const storedUser = getItem('username', 'local') !== '' ? getItem('username', 'local') : null
    useEffect(() => setUsername(storedUser), [])

    const isSignedIn = () => {
        if (authToken) {
            return true
        } else {
            return false
        }
    }

    const getAuthHeaders = () => {
        return null

    }

    const createApolloClient = () => {
        const link = new HttpLink({
            uri: 'http://65.109.11.42:8000/api',
            headers: getAuthHeaders(),
        })

        return new ApolloClient({
            link: concat(headersMiddleware, link),
            ssrMode: typeof window === 'undefined',
            cache: new InMemoryCache({
                addTypename: false
            }),

        })
    }

    const signIn = async ({username, password}: { username: string, password: string }) => {
        const client = createApolloClient()
        const LoginMutation = gql`
            mutation {
              login(emailOrUsername: "${username}", password: "${password}") {
                token
                currentUser {
                id 
                profile{
                  name
                  summary
                  }
                }
              }
            }
          `

        const result = await client.mutate({
            mutation: LoginMutation,
            variables: {username, password},
        })

        if (result?.data?.login?.token) {
            setAuthToken(result.data.login.token)
            setUsername(result.data.login.currentUser.profile.name)
            setItem('token', result.data.login.token, 'local')
            setItem('authId', result.data.login.currentUser.id, 'local')
            setItem('username', result.data.login.currentUser.profile.name, 'local')
            setAuthId(result.data.login.currentUser.id)
        }
    }

    const signOut = () => {
        setAuthToken(null)
        setItem('token', '', 'local')
        setItem('authId', '', 'local')
        setItem('username', '', 'local')
    }

    return {
        setAuthToken,
        isSignedIn,
        signIn,
        signOut,
        createApolloClient,
        authId,
        username
    }
}