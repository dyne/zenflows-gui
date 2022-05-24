import type {NextPage} from 'next'
import {gql, useQuery} from "@apollo/client";
import React from "react";
import { useRouter } from 'next/router'
import Popup from "../../components/popup";
import Produce from "../../components/produce";
import Raise from "../../components/raise";
import Transfer from "../../components/transfer";

const Process: NextPage = () => {
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
    const process = useQuery(Process)

  return (
  <ul>
      <li>{process.data?.process.name}</li>
      <li>{process.data?.process.id}</li>
      <div className="divider"/>
      <li className="float-left mr-2">
          <Popup name="produce" action1="Produce">
                 <Produce processId={process.data?.process.id}/>
          </Popup>
      </li>
      <li className="float-left mr-2">
          <Popup name="raise" action1="Raise">
              <Raise processId={process.data?.process.id}/>
          </Popup>
      </li>
      <li className="float-left mr-2">
          <Popup name="transfer" action1="Transfer">
              <Transfer processId={process.data?.process.id}/>
          </Popup>
      </li>
      <li className="float-left mr-2">
          <Popup name="use" action1="Use">
                 <Produce processId={process.data?.process.id}/>
          </Popup>
      </li>
      <li className="float-left mr-2">
          <Popup name="consume" action1="Consume">
                 <Produce processId={process.data?.process.id}/>
          </Popup>
      </li>
      <li className="float-left mr-2">
          <Popup name="lower" action1="Lower">
                 <Produce processId={process.data?.process.id}/>
          </Popup>
      </li>
  </ul>
  )};

export default Process
