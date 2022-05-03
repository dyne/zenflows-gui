import type {NextPage} from 'next'
import {gql, useQuery} from '@apollo/client'
import {ReactNode, useState} from "react";
import {useAuth} from "../lib/auth";
import renderUserActivities from "../components/renderUserActivities"

const FETCH_USER_DATA = gql`
        query {
          me {
            user {
              userActivities {
                object {
                  __typename
                   ... on Process {
                        __typename
                        id
                        name 
                        note
                        finished
                      }
                  ... on EconomicEvent {
                    note
                    provider {displayUsername}
                    receiver {displayUsername}
                    resourceConformsTo {name note}
                    resourceInventoriedAs {name note}
                    toResourceInventoriedAs {name note}
                    action { id }
                    resourceQuantity {
                      hasNumericalValue
                      hasUnit {label symbol}
                    }
                  }
                }
              }
            }
          }
        }`

const SignIn = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // @ts-ignore
  const { signIn } = useAuth()

  function onSubmit(e:any) {
    e.preventDefault()
    signIn({ username, password })
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="submit">Sign In</button>
      </form>
    </div>
  )
}

const User: NextPage = () => {
  const [res, setRes] = useState()
  const { signOut } = useAuth()
  const {createApolloClient} = useAuth()
  const client = createApolloClient()
  let userActivities;
  const result = async () => await client.query({query: FETCH_USER_DATA}).then((res:any) => {
      userActivities = [...res.data.me.user.userActivities]
      // @ts-ignore
      setRes(userActivities)
  });
  result()
  if (res) {
         return <><button onClick={() => signOut()}>Sign Out</button>
           <ul>{res.map((activity: any) => (
        renderUserActivities(activity)
      ))}</ul></>
      }
  return <h2>aspetta un attimo</h2>
};

const Home: NextPage = () => {
  // @ts-ignore
  const { isSignedIn } = useAuth()
  return (
      <main>
        {!isSignedIn() && <SignIn />}
        {isSignedIn() && <User/>}
      </main>
  )
};

export default Home
