import {gql, useMutation} from "@apollo/client";
import React, {useState} from "react";
import {useAuth} from "../lib/auth";
import ActionForm from "./actions_form";

const Produce = (props:{processId:string}) => {

    const [unitId, setUnitId] = useState('')
    const [quantity, setQuantity] = useState(0)
    const [resourceType, setResourceType] = useState('')
    const [hasPointInTime, setHasPointInTime] = useState('')
    const [resourceName, setResourceName] = useState('')
    const [resourceNote, setResourceNote] = useState('')

    const {authId} = useAuth()
    const PRODUCE_MUTATION = gql`
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
                  action: "produce"
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

    const [result, { data, loading, error }] = useMutation(PRODUCE_MUTATION)

  function onSubmit(e:any) {
    result({variables:{provider: authId,
                              receiver: authId,
                              outputOf: props.processId,
                              newInventoriedResource: { name:resourceName, note: resourceNote},
                              resourceConformsTo: resourceType,
                              resourceQuantity: {hasNumericalValue:quantity,hasUnit:unitId },
                              hasPointInTime: new Date(hasPointInTime).toISOString()}})
    e.preventDefault()
  }
   const handleUnit = (e:React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setUnitId(e.target.value)
  }
   const handleResource = (e:React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setResourceType(e.target.value)
  }

  return (
      <ActionForm handleUnitId={handleUnit}
                  action={{onSubmit: onSubmit, name:"produce"}}
                  handleQuantity={(e:number) => setQuantity(e)}
                  handleResourceName={(e:string)=>setResourceName(e)}
                  handleResourceType={handleResource}
                  handleResourceNote={(e:string)=>setResourceNote(e)}
                  handleHasPointInTime={(e:string)=>setHasPointInTime(e)}
      />
  )};

export default Produce
