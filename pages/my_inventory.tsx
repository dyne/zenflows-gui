import {NextPage} from "next";
import React from "react";
import {useAuth} from "../lib/auth";
import {gql, useQuery} from "@apollo/client";
import Card from "../components/brickroom/Card";
import Link from "next/link";
import InventoriedResources from "../components/InventoriedResources";
import ResourceTable from "../components/ResourceTable";



const FETCH_INVENTORY = gql(`query($id: ID!) {
                                      agent(id: $id) {
                                        inventoriedEconomicResources {
                                          __typename
                                          id
                                          name
                                          note
                                          image
                                          currentLocation {
                                            __typename
                                            id
                                            name
                                            mappableAddress
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

    return <><ResourceTable resources={inventory}/></>};

export default MyInventory
