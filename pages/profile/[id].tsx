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
                                            inventoriedEconomicResources {
                                              id
                                              name
                                              note
                                            }
                                            economicEvents{
                                                    __typename
                                                    id
                                                    note
                                                    provider {displayUsername id}
                                                    receiver {displayUsername id}
                                                    resourceConformsTo {name note}
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

    const {authId} = useAuth()
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

    return (<>
        {!user&&<Spinner/>}
        {user&&<><ul>
            <li>name:{user?.name}</li>
        </ul>
        <div className="divider"/>
        <Tabs tabsArray={tabsArray}/></>}
    </>)
};

export default Profile


