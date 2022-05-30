import type {NextPage} from 'next'
import {useAuth} from "../../lib/auth";
import {gql, useQuery} from "@apollo/client";
import {useRouter} from "next/router";
import Tabs from "../../components/Tabs";
import InventoriedResources from "../../components/InventoriedResources";
import RenderActivities from "../../components/renderActivities";

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
    console.log(user)
    const tabsArray = [
        {title: 'Activity', component: <>
                {user?.economicEvents.map((e:any, i:number)=><RenderActivities key={i} userActivity={e}/>)}
            </>},
        {
            title: 'Inventory',
            component: <InventoriedResources inventoriedResources={user?.inventoriedEconomicResources}/>
        }
    ]

    return (<>
        <ul>
            <li>name:{user?.name}</li>
        </ul>
        <div className="divider"/>
        <Tabs tabsArray={tabsArray}/>
    </>)
};

export default Profile


