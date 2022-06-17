import type {NextPage} from 'next'
import {gql, useQuery} from "@apollo/client";
import React from "react";
import ProcessTable from "../components/ProcessTable";


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


  return (<ProcessTable processes={processes}/>)};

export default Processes


