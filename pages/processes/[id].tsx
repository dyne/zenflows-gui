import type {NextPage} from 'next'
import {gql, useQuery} from "@apollo/client";
import React from "react";
import { useRouter } from 'next/router'
import Popup from "../../components/popup";
import Produce from "../../components/produce";

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
      <li>
          <Popup name="produce" action1="Produce">
                 <Produce processId={process.data?.process.id}/>
          </Popup>
      </li>
  </ul>
  )};

export default Process
