import {gql, useQuery} from "@apollo/client";
import EconomicEventCard from "./EconomicEventCard";

function EconomicEventCell({ id }: { id:string }) {
    const QUERY_EVENT = gql`
            query($id: ID!) {
              economicEvent(id:$id){
                __typename
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
          `
    const event = useQuery(QUERY_EVENT,{variables:{id:id}}).data?.economicEvent
    return (
        <EconomicEventCard event={event}/>
  )
}
export default EconomicEventCell;