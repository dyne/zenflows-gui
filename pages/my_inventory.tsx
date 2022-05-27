import {NextPage} from "next";
import React, {useState} from "react";
import {useAuth} from "../lib/auth";
import {gql} from "@apollo/client";
import Card from "../components/Card";
import Link from "next/link";



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


    const [inventory, setInventory] = useState<any[]>()
    const [flag, setFlag] = useState(false)
    const {authId} = useAuth()
    const {createApolloClient} = useAuth()
    const client = createApolloClient()
    const result = async () => await client.query({query: FETCH_INVENTORY, variables: {id: authId}}).then((res: any) => {
        setInventory(res.data.agent.inventoriedEconomicResources)
        setFlag(true)
    });
    if (!flag) {
        result()
    }
    return (<>
        <h1>inventory</h1>
        <ul>{inventory?.map((r)=><li key={r.id}><Link href={`/resource/${r.id}`}><a><Card title={r.name}><p>{JSON.stringify(r)}</p></Card></a></Link></li>)}</ul>
    </>)
};

export default MyInventory
