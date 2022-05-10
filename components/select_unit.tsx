import React, {ReactEventHandler} from 'react';
import {gql, useQuery} from "@apollo/client";



const SelectUnit: any = (props:{handleSelect:Function}) => {
    const queryUnitsId = gql`
            query {
              unitsPages {
                edges {
                  id
                  label
                }
              }
            }
          `
    const units = useQuery(queryUnitsId).data?.unitsPages.edges
  return (<>
      <select onChange={(e)=>props.handleSelect(e)} className="select select-bordered">
          { units?.map((unit:{id:string, label:string})=> (<option key={unit?.id} value={unit?.id}>{unit?.label}</option>)) }
      </select>
        </>)};

export default SelectUnit
