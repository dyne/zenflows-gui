import type {NextPage} from 'next'
import {ReactNode} from "react";
import {useAuth} from "../lib/auth";
import SignIn from "../components/SignIn"
import User from "../components/UserActivities"



const Home: NextPage = () => {
  const { isSignedIn } = useAuth()
  return (
      <main>
        {!isSignedIn() && <SignIn />}
        {isSignedIn() && <User/>}
      </main>
  )
};

export default Home
