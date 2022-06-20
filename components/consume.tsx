import {gql} from "@apollo/client";
import React from "react";
import ActionForm from "./ActionForm";
import {ActionsEnum} from "../lib/ActionsEnum";

const Consume = (props:{processId?:string}) => {

    const TRANSFER_MUTATION = gql`
            mutation (
              $inputOf: ID!
              $provider: ID!
              $receiver: ID!
              $resourceInventoriedAs: ID!
              $resourceQuantity: IMeasure!
              $hasPointInTime: DateTime
              $hasBeginning: DateTime
              $hasEnd: DateTime
            ) {
              createEconomicEvent(event: {
                 action: "consume"
                 inputOf: $inputOf
                 provider: $provider
                 receiver: $receiver
                 resourceInventoriedAs: $resourceInventoriedAs
                 resourceQuantity: $resourceQuantity
                 hasPointInTime: $hasPointInTime
                 hasBeginning: $hasBeginning
                 hasEnd: $hasEnd
              }) {
                economicEvent {
                  id
                  action {id}
                  inputOf {id}
                  provider {id}
                  receiver {id}
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
            <ActionForm MUTATION={TRANSFER_MUTATION} processId={props.processId} type={ActionsEnum.Consume}/>
  )};

export default Consume
