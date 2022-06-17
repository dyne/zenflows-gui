import React from 'react';
import type {NextPage} from 'next'
import {gql, useQuery} from '@apollo/client'
import RenderActivities from "../components/renderActivities"
import Link from "next/link";


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
const HomeProps = {
    welcome: {
        title: "Welcome to Reflow Demo",
        paragraph: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque pellentesque hendrerit ultrices mauris et non pellentesque suspendisse est.",
    }
}


const User: NextPage = () => {
    const activities = useQuery(FETCH_USER_DATA).data?.me?.user.userActivities
    return <>
            <div className="flex justify-between">
                <div className="w-80">
                    <h2>{HomeProps.welcome.title}</h2>
                    <p>{HomeProps.welcome.paragraph}</p>
                </div>
                <div className="w-80">
                    <Link href="/new_process">
                        <a className="btn btn-accent text-primary-content w-60 ml-4 mb-4">
                            new process
                        </a>
                    </Link>
                    <Link href="/processes">
                        <a className="btn btn-outline btn-primary w-60 ml-4">
                            see all process
                        </a>
                    </Link>
                </div>
            </div>
            {activities && <ul>
            <RenderActivities userActivities={activities}/>
        </ul>}
        {!activities && <h2>Just a moment...</h2>}

    </>
};

export default User
