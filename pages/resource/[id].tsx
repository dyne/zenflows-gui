import type {NextPage} from 'next'
import {gql, useQuery} from "@apollo/client";
import React from "react";
import { useRouter } from 'next/router'

const Resource: NextPage = () => {
    const router = useRouter()
    const { id } = router.query
    const QUERY_RESOURCE = gql`
            query {
              economicResource(id:"${id}"){
                id
                name
              }
            }
          `
    const resource = useQuery(QUERY_RESOURCE).data

  return (
  <div>
      {JSON.stringify(resource)}
  </div>
  )};

export default Resource
