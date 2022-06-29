import React, { ChangeEventHandler } from 'react';
import {gql, useQuery} from "@apollo/client";
import {mapUnits} from "../lib/mapUnit"
import BrSelect from "./brickroom/BrSelect";


const SelectUnit: any = (props: { handleSelect: ChangeEventHandler }) => {
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
    const mappedUnits = mapUnits(units)

    return (<>
        <BrSelect handleSelect={props.handleSelect} array={mappedUnits} label="Unit" hint="Pick a unit"/>
    </>)
};

export default SelectUnit