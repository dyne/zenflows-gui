import type {NextPage} from 'next'
import {gql, useQuery} from "@apollo/client";
import React from "react";
import ProcessCard from "../components/ProcessCard";

const Processes: NextPage = () => {
    const ProcessesQuery = gql`
            query {
              processes(limit:3){
                id
                name
                note
              }
            }
          `

    const processes = useQuery(ProcessesQuery).data?.processes

  return (<ul>
      {processes?.map((process:any)=>{
          return <li key={process.id}><ProcessCard process={process}/></li>})}
  </ul>
  )};

export default Processes


