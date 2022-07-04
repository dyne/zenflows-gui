import React, {ChangeEventHandler} from 'react';
import {gql, useQuery} from "@apollo/client";
import BrSelect from "./brickroom/BrSelect";


const SelectResourceType: any = (props: { handleSelect: ChangeEventHandler }) => {
    const queryTypes = gql`
            query {
              resourceSpecifications{
                name
                id
              }
            }
          `

    const types: Array<{ id: string, name: string }> = useQuery(queryTypes).data?.resourceSpecifications

    const options = types?.map((type) => (<option key={type.id} value={type.id}>
        {type.name}
    </option>))

    return (<>
        <BrSelect handleSelect={props.handleSelect} array={types} label="Select Resource:" placeholder="pick a tipe of resource"/>
    </>)
};

export default SelectResourceType
