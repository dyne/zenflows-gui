import React from 'react';
import type {NextPage} from 'next'
import {gql, useQuery} from '@apollo/client'
import RenderActivities from "../components/renderActivities"
import Link from "next/link";
import NewProcessButton from "./NewProcessButton";
import Spinner from "./brickroom/Spinner";
import CreateProjectButton from "./NewProjectButton";
import {CheckCircleIcon} from "@heroicons/react/outline";
import {useAuth} from "../lib/auth";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";


const FETCH_USER_DATA = gql`
        query {
          me {
            user {
              userActivities {
                object {
                  __typename
                   ... on Process {
                        __typename
                        id
                        name 
                        note
                        finished
                        inputs {
                          id
                          provider {displayUsername id}
                          receiver {displayUsername id}
                        }
                        outputs {
                          id 
                          provider {displayUsername id}
                          receiver {displayUsername id}
                        }
                      }
                  ... on EconomicEvent {
                    id
                    note
                    provider {displayUsername id}
                    receiver {displayUsername id}
                    resourceConformsTo {name note}
                    resourceInventoriedAs {name id note}
                    toResourceInventoriedAs {name note}
                    inputOf {
                      id
                      name
                    }
                    outputOf {
                      id
                      name
                    }
                    atLocation {
                      id
                      name
                    }
                    
                    action { id }
                    resourceQuantity {
                      hasNumericalValue
                      hasUnit {label symbol}
                    }
                  }
                }
              }
            }
          }
        }`


const User = ({title, par1, par2}:{title:string, par1:string, par2:string}) => {
    const { isSignedIn } = useAuth()
    const activities = useQuery(FETCH_USER_DATA).data?.me?.user.userActivities
    return <>
        <div className="flex justify-between mb-6">
            <div className="w-128">
                <div className="logo mb-4"/>
                <h2>{title}</h2>
                <p className="mt-4"><CheckCircleIcon className="w-5 h-5 float-left"/>{par1}</p>
                <p className="mt-4"><CheckCircleIcon className="w-5 h-5 float-left"/>{par2}</p>
                <Link href="/sign_in"><a className={`btn btn-primary mt-4 ${isSignedIn? 'btn-disabled' : ''}`}>sign in</a></Link>
            </div>
            <div>
                {/*<Link href="/processes">*/}
                {/*    <a className="btn btn-outline font-medium normal-case btn-primary w-60 ml-4">*/}
                {/*        See all process*/}
                {/*    </a>*/}
                {/*</Link>*/}
            </div>
        </div>
        {/*{activities && <ul>*/}
        {/*    <RenderActivities userActivities={activities}/>*/}
        {/*</ul>}*/}
        {/*{!activities && <Spinner/>}*/}
    </>
};

export default User
