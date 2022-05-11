import {gql, useMutation, useQuery} from "@apollo/client";
import React, {useState} from "react";
import SelectResourceType from "../components/select_resource_type";
import SelectUnit from "../components/select_unit";
import {useAuth} from "../lib/auth";

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
   const handleUnit = (e:any) => {
    e.preventDefault()
    setUnitId(e.target.value)
  }
   const handleResource = (e:any) => {
    e.preventDefault()
    setResourceType(e.target.value)
  }

  return (
      <form onSubmit={onSubmit}>
          <SelectResourceType handleSelect={handleResource}/>
          <input type="number"
                 placeholder="Type here"
                 className="input input-bordered"
                 onChange={(e) => setQuantity(parseInt(e.target.value))}
          />
          <SelectUnit handleSelect={handleUnit}/>
          <textarea onChange={(e)=>setResourceName(e.target.value)} className="textarea textarea-bordered w-full" placeholder="Resource Descrption"/>
          <textarea onChange={(e)=>setResourceNote(e.target.value)} className="textarea textarea-bordered w-full" placeholder="Note"/>
          <input onChange={(e)=>setHasPointInTime(e.target.value)} type="date" placeholder="Date 1" className="input input-bordered"/>
          <input type="date" placeholder="Date 2" className="input input-bordered"/>
          <input type="date" placeholder="Date 3" className="input input-bordered"/>
          <button type="submit" className="btn btn-primary float-right">Produce</button>
      </form>
  )};

export default Produce
