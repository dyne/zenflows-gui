import {NextPage} from "next";
import React from "react";
import {useAuth} from "../lib/auth";
import {gql, useQuery} from "@apollo/client";
import ResourceTable from "../components/ResourceTable";



const FETCH_INVENTORY = gql(`query($id: ID!) {
                                      agent(id: $id) {
                                        inventoriedEconomicResources {
                                          __typename
                                          id
                                          name
                                          conformsTo {
                                            id name
                                          }
                                          note
                                          image
                                          currentLocation {
                                            __typename
                                            id
                                            name
                                            mappableAddress
                                          }
                                          primaryAccountable {
                                            id
                                            name
                                          }
                                          onhandQuantity {
                                            __typename
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


const MyInventory: NextPage = () => {
    const {authId} = useAuth()
    const inventory = useQuery(FETCH_INVENTORY, {variables:{id:authId}}).data?.agent.inventoriedEconomicResources

    return <>
        <div className="w-80 mb-6">
            <h1>My Inventory</h1>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Neque pellentesque hendrerit ultrices mauris et non pellentesque suspendisse est.
            </p>
        </div>
        <ResourceTable resources={inventory}/>
    </>};

export default MyInventory
