import React, {ReactEventHandler} from 'react';
import {gql, useQuery} from "@apollo/client";



const SelectUnit: any = (props:{handleSelect:Function}) => {
    const queryUnitsId = gql`
            query {
              unitsPages {
                edges {
                  id
                }
              }
            }
          `
        function query_Units(id:string, name:string) {return `
              ${name}:unit(id: "${id}"){
                id
                label
              }`}
    function QUERY(ids: Array<any>) { return ids?.reduce((query, id, index) => query + query_Units(id.id, String.fromCharCode(97 + index)), "")}
    const unitsIds = useQuery(queryUnitsId).data?.unitsPages.edges
    const unitsObj = useQuery(gql`query {${QUERY(unitsIds)}}`)
    const units = unitsIds?.map((id:any, index: number) => unitsObj.data? unitsObj.data[String.fromCharCode(97 + index)] : {})
  return (<>
      <select onChange={(e)=>props.handleSelect(e)} className="select select-bordered">
          { units?.map((unit:{id:string, label:string})=> (<option key={unit?.id}>{unit?.label}</option>)) }
      </select>
        </>)};

export default SelectUnit
