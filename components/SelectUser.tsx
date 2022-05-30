import React from "react";
import {gql, useQuery} from "@apollo/client";


const SelectUser= () => {
    const QUERY_AGENTS = gql`
            query {
              agents {
                id 
                name
              } 
            }
          `
    const agents = useQuery(QUERY_AGENTS).data?.agents

    return(<>
            <select className="select select-bordered w-full">
                {agents?.map((agent:any) =><option key={agent.id} value={agent} label={agent.name}/>)}
            </select>
        </>
)}

export default SelectUser