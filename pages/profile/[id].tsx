import type {NextPage} from 'next'
import User from "../../components/UserActivities"
import {useAuth} from "../../lib/auth";
import {gql, useQuery} from "@apollo/client";
import {useRouter} from "next/router";

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
    const idToBeFetch = (id === 'my_profile')? authId : id
    const user = useQuery(FETCH_USER, {variables:{id:idToBeFetch}}).data?.agent
    console.log(user)

  return (<>
      <ul>
          <li>name:{user?.name}</li>
      </ul>
            <User/>
        </>)};

export default Profile


