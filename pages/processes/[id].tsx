import type {NextPage} from 'next'
import {gql, useQuery} from "@apollo/client";
import React from "react";
import {useRouter} from 'next/router'
import Produce from "../../components/produce";
import Raise from "../../components/raise";
import Transfer from "../../components/transfer";
import Use from "../../components/use";
import Consume from "../../components/consume";
import Lower from "../../components/lower";
import {ActionsEnum} from "../../lib/ActionsEnum";
import EventTable from "../../components/EventTable";
import ActionsBlock from "../../components/ActionsBlock";
import {ArrowNarrowLeftIcon} from "@heroicons/react/solid";


const Process: NextPage = () => {
    const router = useRouter()
    const {id} = router.query
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
        {name: ActionsEnum.Produce, component: <Produce processId={processId}/>},
        {name: ActionsEnum.Raise, component: <Raise processId={processId}/>},
        {name: ActionsEnum.Transfer, component: <Transfer processId={processId}/>},
        {name: ActionsEnum.Use, component: <Use processId={processId}/>},
        {name: ActionsEnum.Consume, component: <Consume processId={processId}/>},
        {name: ActionsEnum.Lower, component: <Lower processId={processId}/>},
    ]
    const back = () => {
        router.back()
    }
    return (
        <>
            <button type={'button'} className="btn btn-outline" onClick={back}><ArrowNarrowLeftIcon
                className="w-5 mr-1"/>Back
            </button>
            <br/><br/>
            <h1>{process.data?.process.name}</h1>
            <br/><br/>
            <ActionsBlock processId={processId}/>
            <br/><br/>
            {(process.data?.process.inputs.length > 0 || process.data?.process.outputs.length > 0) && (<>
                <h2>Activity fo this process:</h2>
                <br/><br/>
                <EventTable economicEvents={process.data?.process.inputs.concat(process.data?.process.outputs)} noProcess={true}/></>)}
        </>
    )
};

export default Process
