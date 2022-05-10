import React from 'react';
import {gql, useQuery} from "@apollo/client";



const SelectResourceType: any = (props:{handleSelect:Function}) => {

    const queryTypes = gql`
            query {
              resourceSpecifications{
                name
                id
              }
            }
          `

    const types: Array<{id:string, name:string}> = useQuery(queryTypes).data?.resourceSpecifications

  const options = ()=> types?.map((type)=> (<option key={type.id} value={type.id}>{type.name}</option>))

  return (<>
      <select onChange={(e)=>props.handleSelect(e)} className="select select-bordered w-full">
          { options() }
      </select>
        </>)};

export default SelectResourceType
