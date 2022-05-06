import type {NextPage} from 'next'
import {gql} from "@apollo/client";
import {useAuth} from "../lib/auth";
import React, {useState} from "react";
import Link from 'next/link';







const Processes: NextPage = () => {
    const [processes, setProcesses] = useState([])

    const {createApolloClient} = useAuth()
    const askForProcesses = async () => {
    const client = createApolloClient()
    const Processes = gql`
            query {
              processes(limit:3){
                id
                name
              }
            }
          `

    const result = await client.query({query: Processes}).then((res:any) => {
      setProcesses(res.data?.processes)});
    console.log(result);
  }
  askForProcesses()

  return (<ul>
      {processes.map((process:any)=>{
          return <li key={process.id}><Link href={"/processes/" + process.id}><a>{process.name}</a></Link></li>})}
  </ul>
  )};

export default Processes


