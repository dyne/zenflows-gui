import React from 'react';
import type {NextPage} from 'next'
import {gql, useQuery} from '@apollo/client'
import RenderActivities from "../components/renderActivities"

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
                    id
                    note
                    provider {displayUsername id}
                    receiver {displayUsername id}
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
    const activities = useQuery(FETCH_USER_DATA).data?.me?.user.userActivities
    return <>
        {activities && <ul>
            {activities.map((activity: any) => <RenderActivities key={activity.object.id} userActivity={activity}/>)}
        </ul>}
        {!activities && <h2>Just a moment...</h2>}
    </>
};

export default User
