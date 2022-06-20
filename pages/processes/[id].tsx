import type {NextPage} from 'next'
import {gql, useQuery} from "@apollo/client";
import React from "react";
import {useRouter} from 'next/router'
import Popup from "../../components/brickroom/popup";
import Produce from "../../components/produce";
import Raise from "../../components/raise";
import Transfer from "../../components/transfer";
import Use from "../../components/use";
import Consume from "../../components/consume";
import Lower from "../../components/lower";
import {ActionsEnum} from "../../lib/ActionsEnum";
import EventTable from "../../components/EventTable";
import ActionsBlock from "../../components/ActionsBlock";


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
  <>
      <h2>{process.data?.process.name}</h2>
      <div className="divider"/>
      <ActionsBlock processId={processId}/>
      <div className="divider w-full"/>
      {(process.data?.process.inputs.length>0)&&(<><h2>inputs:</h2>
      <EventTable economicEvents={process.data?.process.inputs}/></>)}
      <div className="divider w-full"/>
      {(process.data?.process.outputs.length>0)&&(<><h2>outputs:</h2>
      <EventTable economicEvents={process.data?.process.outputs}/></>)}
  </>
  )};

export default Process
