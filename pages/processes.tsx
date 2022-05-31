import type {NextPage} from 'next'
import {gql, useQuery} from "@apollo/client";
import React from "react";
import Link from 'next/link';

const Processes: NextPage = () => {
    const ProcessesQuery = gql`
            query {
              processes(limit:3){
                id
                name
              }
            }
          `

    const processes = useQuery(ProcessesQuery).data?.processes

  return (<ul>
      {processes?.map((process:any)=>{
          return <li key={process.id}><Link href={"/processes/" + process.id}><a>{process.name}</a></Link></li>})}
  </ul>
  )};

export default Processes


