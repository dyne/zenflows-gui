import React from 'react';
import type {NextPage} from 'next'
import {gql, useQuery} from '@apollo/client'
import RenderActivities from "../components/renderActivities"

const FETCH_LOCAL_DATA = gql`
        query {
          feed(filter: {feedName: "local"}) {
            object {
              ... on Process {
                __typename
                id
                name 
                note
                finished
              }
              ... on EconomicEvent {
                __typename
                note
                provider {displayUsername id}
                receiver {displayUsername id}
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
            objectId
          }
        }`


const Local: NextPage = () => {
    const activities = useQuery(FETCH_LOCAL_DATA).data?.feed
    return <>
        {activities && <ul>
            {activities.map((activity: any) => <RenderActivities key={activity.object.id} userActivity={activity.object}/>)}
        </ul>}
        {!activities && <h2>Just a moment...</h2>}
    </>
};

export default Local
