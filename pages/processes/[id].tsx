import type {NextPage} from 'next'
import {gql, useQuery} from "@apollo/client";
import React from "react";
import { useRouter } from 'next/router'
import Popup from "../../components/popup";
import Produce from "../../components/produce";
import Raise from "../../components/raise";
import Transfer from "../../components/transfer";
import Use from "../../components/use";
import Consume from "../../components/consume";
import Lower from "../../components/lower";
import EconomicEventCell from "../../components/EconomicEventCell";

const Process: NextPage = () => {
    const router = useRouter()
    const { id } = router.query

    const Process = gql`
            query {
              process(id:"${id}"){
                id
                name
                inputs{id}
                outputs{id}
              }
            }
          `
    const process = useQuery(Process)
    const processId = process.data?.process.id
    const actions = [
        {name:"produce",component: <Produce processId={processId}/>},
        {name:"raise",component: <Raise processId={processId}/>},
        {name:"transfer",component: <Transfer processId={processId}/>},
        {name:"use",component: <Use processId={processId}/>},
        {name:"consume",component: <Consume processId={processId}/>},
        {name:"lower",component: <Lower processId={processId}/>},
        ]

  return (
  <ul>
      <li>{process.data?.process.name}</li>
      <li>{processId}</li>
      <div className="divider"/>
      {actions.map((a)=><li key={a.name} className="float-left mr-2">
          <Popup name={a.name} action1={a.name}>{a.component}</Popup>
      </li>)}
      <div className="divider w-full"/>
      <li>{process.data?.process.inputs.map((i:any)=><EconomicEventCell id={i.id} key={i.id}/>)}</li>
      <li>{process.data?.process.outputs.map((i:any)=><EconomicEventCell id={i.id} key={i.id}/>)}</li>
  </ul>
  )};

export default Process
