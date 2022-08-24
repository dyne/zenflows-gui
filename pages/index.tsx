import type {NextPage} from 'next'
import {useAuth} from "../lib/auth";
import User from "../components/UserActivities"
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

export async function getStaticProps({ locale }:any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['signInProps'])),
    },
  };
}

const Home: NextPage = () => {
  const { isSignedIn } = useAuth()
  return (<>
            {!isSignedIn && <><p>You should log in first</p></>}
            {isSignedIn && <User/>}
        </>)};

export default Home


