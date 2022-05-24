import {gql, useMutation} from "@apollo/client";
import React from "react";
import ActionForm from "./ActionForm";

const Transfer = (props:{processId:string}) => {

    const TRANSFER_MUTATION = gql`
            mutation (
              $outputOf: ID!
              $provider: ID!
              $receiver: ID!
              $resourceConformsTo: ID!
              $resourceQuantity: IMeasure!
              $newInventoriedResource: EconomicResourceCreateParams!
              $hasPointInTime: DateTime
              $hasBeginning: DateTime
              $hasEnd: DateTime
            ) {
              createEconomicEvent(
                event: {
                  action: "raise"
                  outputOf: $outputOf
                  provider: $provider
                  receiver: $receiver
                  resourceConformsTo: $resourceConformsTo
                  resourceQuantity: $resourceQuantity
                  hasPointInTime: $hasPointInTime
                  hasBeginning: $hasBeginning
                  hasEnd: $hasEnd
                }
                newInventoriedResource: $newInventoriedResource
              ) {
                economicEvent {
                  id
                  action {id}
                  outputOf {id}
                  provider {id}
                  receiver {id}
                  resourceConformsTo {id}
                  resourceQuantity {
                    hasNumericalValue
                    hasUnit {id}
                  }
                  resourceInventoriedAs {
                    id
                    name
                    note
                    primaryAccountable {id}
                    accountingQuantity {
                      hasNumericalValue
                      hasUnit {id}
                    }
                    onhandQuantity {
                      hasNumericalValue
                      hasUnit {id}
                    }
                    conformsTo {id}
                  }
                  hasPointInTime
                  hasEnd
                  hasBeginning
                }
              }
            }
          `

  return (
            <ActionForm MUTATION={TRANSFER_MUTATION} processId={props.processId} type="transfer"/>
  )};

export default Transfer
