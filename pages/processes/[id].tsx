import type {NextPage} from 'next'
import {gql, useQuery} from "@apollo/client";
import React from "react";
import {useRouter} from 'next/router'
import Popup from "../../components/popup";
import Produce from "../../components/produce";
import Raise from "../../components/raise";
import Transfer from "../../components/transfer";
import Use from "../../components/use";
import Consume from "../../components/consume";
import Lower from "../../components/lower";
import EconomicEventCard from "../../components/EconomicEventCard";
import {ActionsEnum} from "../../lib/ActionsEnum";

const Process: NextPage = () => {
    const router = useRouter()
    const { id } = router.query

    const Process = gql`
            query {
              process(id:"${id}"){
                id
                name
                inputs{
                    __typename
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
                outputs{
                    __typename
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
          `
    const process = useQuery(Process)
    const processId = process.data?.process.id
    const actions = [
        {name:ActionsEnum.Produce,component: <Produce processId={processId}/>},
        {name:ActionsEnum.Raise,component: <Raise processId={processId}/>},
        {name:ActionsEnum.Transfer,component: <Transfer processId={processId}/>},
        {name:ActionsEnum.Use,component: <Use processId={processId}/>},
        {name:ActionsEnum.Consume,component: <Consume processId={processId}/>},
        {name:ActionsEnum.Lower,component: <Lower processId={processId}/>},
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
      <ul>{process.data?.process.inputs.map((i:any)=><li key={i.id}><EconomicEventCard event={i}/></li>)}</ul>
      <li>{process.data?.process.outputs.map((o:any)=><EconomicEventCard event={o} key={o.id}/>)}</li>
  </ul>
  )};

export default Process
