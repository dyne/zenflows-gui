import React from 'react';
import type {NextPage} from 'next'
import {gql} from '@apollo/client'
import {ReactNode, useState} from "react";
import {useAuth} from "../lib/auth";
import renderActivities from "../components/renderActivities"

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
                    resourceInventoriedAs {name id note}
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



const User: NextPage = () => {
  const [activities, setActivities] = useState<any[]>()
  const [flag, setFlag] = useState(false)
  const { signOut } = useAuth()
  const {createApolloClient} = useAuth()
  const client = createApolloClient()
  const result = async () => await client.query({query: FETCH_USER_DATA}).then((res:any) => {
      setActivities([...res.data.me.user.userActivities])
      setFlag(true)
  });
  if (!flag) {result()}
  return <>
      <button onClick={() => signOut()}>Sign Out</button>
      {activities && <ul>{activities.map((activity: any) => (renderActivities(activity)))}</ul>}
      {!activities && <h2>Just a moment...</h2>}
        </>
};

export default User
