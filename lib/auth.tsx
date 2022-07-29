import React, {useState, useContext, createContext, useEffect} from 'react'
import {
    ApolloProvider,
    ApolloClient,
    InMemoryCache,
    HttpLink,
    gql,
    concat
} from '@apollo/client'

import useStorage from "./useStorage";
import SignRequest from "./SignRequest";
import {setContext} from "@apollo/client/link/context";
import {zencode_exec} from "zenroom";
import keypairoomClient from "../zenflows-crypto/src/keypairoomClient-8-9-10-11-12";


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


const headersMiddleware = setContext(async (operation, {headers}) => {
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
    const storedEddsaKey = getItem('eddsa_key', 'local') !== '' ? getItem('eddsa_key', 'local') : null
    useEffect(() => setAuthToken(storedEddsaKey), [])


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
            link: isSignedIn()? concat(headersMiddleware, link) : link,
            ssrMode: typeof window === 'undefined',
            cache: new InMemoryCache({
                addTypename: false
            }),

        })
    }

    const askKeypairoomServer = async (email: string, firstRegistration: boolean) => {
        const client = createApolloClient()
        const KEYPAIROOM_SERVER_MUTATION = gql`mutation {
  keypairoomServer(firstRegistration: ${firstRegistration}, userData: "{\\"email\\": \\"${email}\\"}")
}
        `
        return await client.mutate({mutation: KEYPAIROOM_SERVER_MUTATION})
            .then(({data}) => data)
            .catch((error) => {
                if (`${error}`.includes("email doesn't exists")) {
                     return "email doesn't exists"
                }
                else if (`${error}`.includes("email exists")) {
                    return "email has already been registered"
                }
            })
    }

    const signIn = async ({
                              question1,
                              question2,
                              question3,
                              question4,
                              question5,
                              email,
                              keypairoomServer
                          }: { question1: string, question2: string, question3: string, question4: string, question5: string, email: string, keypairoomServer: string }) => {
        const zenData = `
            {
                "userChallenges": {
                    "question1":"${question1}",
                    "question2":"${question2}",
                    "question3":"${question3}",
                    "question4":"${question4}",
                    "question5":"${question5}",
                },
                "username": "${email}",
                "key_derivation": "${keypairoomServer}"
            }`


        zencode_exec(keypairoomClient, {data: zenData})
            .then(({result}) => {
                console.log(result)
                const res = JSON.parse(result)
                console.log(res)
                setItem('eddsa_public_key', res.eddsa_public_key, 'local')
                setItem('eddsa_key', res.keyring.eddsa, 'local')
                setItem('ethereum_address', res.keyring.ethereum, 'local')
                setItem('reflow', res.keyring.reflow, 'local')
                setItem('schnorr', res.keyring.schnorr, 'local')
                setItem('eddsa', res.keyring.eddsa, 'local')
                setItem('seed', res.concatenatedHashes, 'local')
            })
    }

    const signUp = async ({
                              name,
                              user,
                              email,
                              eddsaPublicKey
                          }: { name: string, user: string, email: string, eddsaPublicKey: string }) => {
        const client = createApolloClient()
        const SignUpMutation = gql`mutation  {
              createPerson(person: {
                name: "${name}"
                user: "${user}"
                email: "${email}"
                eddsaPublicKey: "${eddsaPublicKey}"
              }) {
              agent{
                id
                name
                user
                email
                eddsaPublicKey
              }
              }
            }`

        const result = await client.mutate({
            mutation: SignUpMutation,
            context: {headers: {'zenflows-admin': 'b4a7a8b0a87a8df133ceded44a5c624f1dae19024d72f931b65122a8463a69e6be7ae8bbd51a330182fde04e3e441371a051c7c800147837f31dff27c78cf246'}}
        })
    }

    const signOut = () => {
        setAuthToken(null)
        setItem('eddsa_public_key', '', 'local')
        setItem('eddsa_key', '', 'local')
        setItem('ethereum_address', '', 'local')
        setItem('reflow', '', 'local')
        setItem('schnorr', '', 'local')
        setItem('eddsa', '', 'local')
        setItem('seed', '', 'local')
    }

    return {
        setAuthToken,
        isSignedIn,
        signIn,
        signUp,
        signOut,
        createApolloClient,
        askKeypairoomServer,
    }
}