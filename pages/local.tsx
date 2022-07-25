import React from 'react';
import type {NextPage} from 'next'
import {gql, useQuery} from '@apollo/client'
import RenderActivities from "../components/renderActivities"
import EventTable from "../components/EventTable";

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
                resourceInventoriedAs {name id note}
                toResourceInventoriedAs {name id note}
                inputOf { id name }
                outputOf { id name }
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
    return <RenderActivities userActivities={activities}/>
};

export default Local
