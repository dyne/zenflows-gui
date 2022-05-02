import type {NextPage} from 'next'
import {gql} from "@apollo/client";
import apolloClient from "../lib/apolloClient";
import {ReactNode} from "react";



export async function getStaticProps() {
  const {data} = await apolloClient.query({
    query: gql`
        query {
          me {
            user {
              userActivities {
                object {
                  __typename
                   ... on Process {
                        __typename
                        id
                        name # title
                        note # description
                        finished # the green Open text; false = Open
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
        }
      `,
  });

  return {
    props: {
      userActivities: [...data.me.user.userActivities],

    },
  };
}

function renderUserActivities(userActivity: any) {
  const obj = userActivity.object;
  if (obj.__typename == "Process") {
    return <li key={obj.id} className="border-l-8 ml-2 ">
      <ul>
        <li>{obj.__typename}</li>
        <li>title:{obj.name}</li>
        <li>description:{obj?.note}</li>
        <li>{obj?.finished}</li>
      </ul><br />
    </li>;
  }
  else if (obj.__typename == "EconomicEvent") {
    return <li key={obj.action?.id} className="border-l-8 ml-2 ">
      <ul>
        <li>Activity:{obj.action?.id}</li>
        <li>note:{obj.note}</li>
        <li>from:{obj.provider?.displayUsername}</li>
        <li>to:{obj.receiver?.displayUsername}</li>
        <li>resource type::{obj.resourceConformsTo?.name}</li>
        <li>quantity:{obj.resourceQuantity?.hasNumericalValue} {obj.resourceQuantity?.hasUnit.label}</li>
      </ul><br />

    </li>;
  } return <><b>nothing to show</b><br /><br /></>
}

const Home: NextPage = ({userActivities}: any) => {

  return <ul>{userActivities.map((activity: any) => (
    renderUserActivities(activity)
  ))}</ul>

};

export default Home
