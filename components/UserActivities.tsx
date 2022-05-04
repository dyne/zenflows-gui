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



const User: NextPage = () => {
  const [activities, setActivities] = useState<any[]>()
  const { signOut } = useAuth()
  const {createApolloClient} = useAuth()
  const client = createApolloClient()
  let userActivities;
  const result = async () => await client.query({query: FETCH_USER_DATA}).then((res:any) => {
      userActivities = [...res.data.me.user.userActivities]
      setActivities(userActivities)
  });
  result()
  if (activities) {
         return <><button onClick={() => signOut()}>Sign Out</button>
           <ul>{activities.map((activity: any) => (
        renderActivities(activity)
      ))}</ul></>
      }
  return <h2>Just a moment...</h2>
};

export default User
