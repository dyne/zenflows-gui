import React from 'react';
import {gql, useQuery} from "@apollo/client";
import {useAuth} from "../lib/auth";

type handleResource = (value: { id: string, name: string, onhandQuantity: any }) => void


const SelectInventoriedResource: any = (props: { handleSelect: Function }) => {
    const {authId} = useAuth()
    const FETCH_INVENTORY = gql(`query($id: ID!) {
                                      agent(id: $id) {
                                        inventoriedEconomicResources {
                                          id
                                          name
                                          onhandQuantity {
                                            id
                                            hasNumericalValue
                                            hasUnit {
                                              label
                                              symbol
                                            }
                                          }
                                        }
                                      }
                                    }`)


    const resources: Array<{ id: string, name: string, onhandQuantity: any }> = useQuery(FETCH_INVENTORY,{variables: {id: authId}}).data?.agent.inventoriedEconomicResources

    const options = () => resources?.map((resource) => (
        <option key={resource.id} value={resource.id}>{resource.name}</option>))
    return (<>
        <select onChange={(e) => props.handleSelect(resources.find((r) => (r.id === `e`))!)}
                className="select select-bordered w-full">
            {options()}
        </select>
    </>)
};

export default SelectInventoriedResource
