import React from 'react';
import {gql, useQuery} from "@apollo/client";



const SelectResourceType: any = () => {

    const queryTypes = gql`
            query {
              resourceSpecifications{
                name
                id
              }
            }
          `

    const types: Array<{id:string, name:string}> = useQuery(queryTypes).data?.resourceSpecifications

  const options = ()=> types?.map((type)=> (<option key={type.id}>{type.name}</option>))

  return (<>
      <select className="select select-bordered w-full">
          { options() }
      </select>
        </>)};

export default SelectResourceType
