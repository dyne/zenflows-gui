import type {NextPage} from 'next'
import User from "../../components/UserActivities"
import {useAuth} from "../../lib/auth";
import {gql, useQuery} from "@apollo/client";
import {useRouter} from "next/router";
import Tabs from "../../components/Tabs";
import MyInventory from "../my_inventory";

const Profile: NextPage = () => {
    const router = useRouter()
    const { id } = router.query
    const FETCH_USER = gql(`query($id:ID!){
                                        agent(id:$id){
                                            id 
                                            name 
                                            }
                                   }`)

    const {authId} = useAuth()
    const isUser: boolean = (id === 'my_profile' || id === authId)
    const idToBeFetch = isUser? authId : id
    const user = useQuery(FETCH_USER, {variables:{id:idToBeFetch}}).data?.agent
    console.log(user)
    const tabsArray = [{title: 'tab1',component:<User/>},{title:'tab2', component: <MyInventory/>}]

  return (<>
      <ul>
          <li>name:{user?.name}</li>
      </ul>
      <div className="divider"/>
      <Tabs tabsArray={tabsArray}/>
  </>)};

export default Profile


