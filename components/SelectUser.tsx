import React from "react";
import {gql, useQuery} from "@apollo/client";
import BrSelect from "./brickroom/BrSelect";


const SelectUser= ({handleUserSelect}:{handleUserSelect:React.ChangeEventHandler<Element>}) => {
    const QUERY_AGENTS = gql`
            query {
              agents {
                id 
                name
              } 
            }
          `
    const agents = useQuery(QUERY_AGENTS).data?.agents.map((agent:{id:string, name:string }) => ({id:agent.id, name:agent.name}))

    return(<>
            <BrSelect label="Select the receiver of the transaction" array={agents} handleSelect={handleUserSelect}/>
        </>
)}

export default SelectUser