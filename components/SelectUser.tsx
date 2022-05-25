import React from "react";
import {gql, useQuery} from "@apollo/client";


const SelectUser= () => {
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

    return(<>
    <input list="select" name="select" className="select select-bordered w-full"/>
            <datalist id="select">
                <option value="Trans"/>
            </datalist>
        </>
)}

export default SelectUser