import React from 'react';
import {gql, useQuery} from "@apollo/client";
import {useAuth} from "../lib/auth";

type Resource = { id: string, name: string, onhandQuantity: any }
type handleResource = (value: Resource) => void


const SelectInventoriedResource: any = (props: { handleSelect: handleResource }) => {
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


    const resources: Array<Resource> = useQuery(gql(`query($id: ID!) {
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
                                    }`),
        { variables: { id: authId } }).data?.agent.inventoriedEconomicResources

    const options = () => resources?.map((resource) => (
        <option key={resource.id} value={resource.id}>{resource.name}</option>))
    return (<>
        <select onChange={(e) => props.handleSelect(resources.find(r => r.id === e.target.value)!)}
                className="select select-bordered w-full">
            {options()}
        </select>
    </>)
};

export default SelectInventoriedResource
