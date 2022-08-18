import type {NextPage} from 'next'
import {useAuth} from "../../lib/auth";
import {gql, useQuery} from "@apollo/client";
import {useRouter} from "next/router";
import Tabs from "../../components/Tabs";
import EventTable from "../../components/EventTable";
import Spinner from "../../components/brickroom/Spinner";
import ResourceTable from "../../components/ResourceTable";


const Profile: NextPage = () => {
    const router = useRouter()
    const {id} = router.query
    const FETCH_USER = gql(`query($id:ID!){
                                        agent(id:$id){
                                            id 
                                            name 
                                            primaryLocation {
                                              id
                                              name
                                            }
                                            inventoriedEconomicResources {
                                              id
                                              name
                                              note
                                              conformsTo {
                                                id
                                                name
                                               }
                                              primaryAccountable{id name}
                                              currentLocation {id name}
                                              accountingQuantity{
                                                hasUnit{
                                                  id label
                                                }
                                                hasNumericalValue
                                              }
                                              }
                                            economicEvents{
                                                    __typename
                                                    id
                                                    note
                                                    provider {displayUsername id}
                                                    receiver {displayUsername id}
                                                    resourceConformsTo {name note}
                                                    inputOf { id name }
                                                    outputOf { id name }
                                                    resourceInventoriedAs {name id note}
                                                    toResourceInventoriedAs {name note}
                                                    action { id }
                                                    resourceQuantity {
                                                      hasNumericalValue
                                                      hasUnit {label symbol}
                                                    }
                                                }
                                            }
                                   }`)

    const {authId, authUsername, authName, authEmail} = useAuth()
    const isUser: boolean = (id === 'my_profile' || id === authId)
    const idToBeFetch = isUser ? authId : id
    const user = useQuery(FETCH_USER, {variables: {id: idToBeFetch}}).data?.agent
    const tabsArray = [
        {title: 'Activity', component: <EventTable economicEvents={user?.economicEvents}/>},
        {
            title: 'Inventory',
            component: <ResourceTable resources={user?.inventoriedEconomicResources}/>
        }
    ]
    //todo:
    // return (<>
    //     {!user && <Spinner/>}
    //     {user && <>
    //             <h3 className="mb-6">{user?.name}</h3>
    //         <Tabs tabsArray={tabsArray}/></>}
    // </>)
    return (<>
        {isUser && <>
            <h3 className="mb-6">Name: {authName}</h3>
            <h3 className="mb-6">UserName: {authUsername}</h3>
            <h3 className="mb-6">Email: {authEmail}</h3>
        </>}</>)
};

export default Profile


