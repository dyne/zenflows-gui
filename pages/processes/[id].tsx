import type {NextPage} from 'next'
import {gql, useQuery} from "@apollo/client";
import React, {useState} from "react";
import { useRouter } from 'next/router'

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
    const p = useQuery(Process)

  return (<ul>
      <li>{p.data?.process.name}</li><li>{p.data?.process.id}</li>
  </ul>
  )};

export default Process


