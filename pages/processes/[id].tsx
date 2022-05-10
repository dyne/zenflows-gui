import type {NextPage} from 'next'
import {gql, useQuery} from "@apollo/client";
import React, {useState} from "react";
import { useRouter } from 'next/router'
import Popup from "../../components/popup";
import SelectResourceType from "../../components/select_resource_type";
import SelectUnit from "../../components/select_unit";
import {useAuth} from "../../lib/auth";

const Process: NextPage = () => {

    const [unitId, setUnitId] = useState('')
    const [quantity, setQuantity] = useState(0)
    const [resourceType, setResourceType] = useState('')
    const [hasPointInTime, setHasPointInTime] = useState('')
    const [resourceName, setResourceName] = useState('')
    const [resourceNote, setResourceNote] = useState('')

    const {createApolloClient, authId} = useAuth()
    const produce = async () => {
    const client = createApolloClient()
    const ProduceMutation = gql`
            mutation{
              createEconomicEvent(event:{
                action:"produce",
                resourceQuantity:{hasNumericalValue:${quantity}, hasUnit:"${unitId}"},
                triggeredBy:"${authId}",
                resourceConformsTo: "${resourceType}",
                hasPointInTime: "${new Date(hasPointInTime).toISOString()}",
                outputOf: "${p.data?.process.id}",
                provider: "${authId}",
                receiver: "${authId}",
              }, newInventoriedResource: 
                { name: "${resourceName}",
                  note: "${resourceNote}",
                }) {
                economicEvent{
                  id
                  action {
                    id
                  }
                }
              }
            }
          `

    const result = await client.mutate({
      mutation: ProduceMutation,
    })

    console.log(result)
  }

  function onSubmit(e:any) {
    produce()
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
    const router = useRouter()
    const { id } = router.query
    const Process = gql`
            query {
              process(id:"${id}"){
                id
                name
              }
            }
          `
    const p = useQuery(Process)

  return (
  <ul>
      <li>{p.data?.process.name}</li>
      <li>{p.data?.process.id}</li>
      <li>
          <Popup name="produce" action1="Produce">
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
          </Popup>
      </li>
  </ul>
  )};

export default Process
