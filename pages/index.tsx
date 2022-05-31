import type {NextPage} from 'next'
import {useAuth} from "../lib/auth";
import SignIn from "./sign_in"
import User from "../components/UserActivities"

const Home: NextPage = () => {
  const { isSignedIn } = useAuth()
  return (<>
            {!isSignedIn() && <SignIn />}
            {isSignedIn() && <User/>}
        </>)};

export default Home


