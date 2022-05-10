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
    const [quantity, setQuantity] = useState('')
    const [resourceType, setResourceType] = useState('')
    const [hasPointInTime, setHasPointInTime] = useState('')
    const [resourceName, setResourceName] = useState('')
    const [resourceNote, setResourceNote] = useState('')

    const {createApolloClient} = useAuth()
    const produce = async () => {
    const client = createApolloClient()
    const ProduceMutation = gql`
            mutation{
              createEconomicEvent(event:{
                action:"produce",
                resourceQuantity:{hasNumericalValue:10, hasUnit: ${unitId}},
                triggeredBy:${userId},
                resourceConformsTo: ${resourceType},
                hasPointInTime: ${hasPointInTime},
                outputOf: ${processId},
                provider: ${userId},
                receiver: ${userId},
              }, newInventoriedResource: 
                { name: ${resourceName},
                  note: ${resourceNote},
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
    e.preventDefault()
  }
   const handleUnit = (e:any) => {
    e.preventDefault()
    setUnitId(e.target.key)
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
                  <SelectResourceType/>
                  <input type="number"
                         placeholder="Type here"
                         className="input input-bordered"
                         onChange={(e) => setQuantity(e.target.value)}
                  />
                  <SelectUnit handleSelect={handleUnit}/>
                  <textarea onChange={(e)=>setResourceName} className="textarea textarea-bordered w-full" placeholder="Resource Descrption"/>
                  <textarea onChange={(e)=>setResourceNote} className="textarea textarea-bordered w-full" placeholder="Note"/>
                  <input onChange={(e)=>setHasPointInTime} type="date" placeholder="Date 1" className="input input-bordered"/>
                  <input type="date" placeholder="Date 2" className="input input-bordered"/>
                  <input type="date" placeholder="Date 3" className="input input-bordered"/>
                  <label htmlFor="produce" className="btn btn-primary float-right">Produce</label>
              </form>
          </Popup>
      </li>
  </ul>
  )};

export default Process
