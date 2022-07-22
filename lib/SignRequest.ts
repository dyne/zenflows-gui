import React from 'react';
import useStorage from "../lib/useStorage";
import {zencode_exec} from "zenroom";
import sign from "../zenflows-crypto/src/sign";


const SignRequest = async ({query, variables}:{query:string, variables?:any}) => {
    const body = JSON.stringify({"variables":variables, "query":query});
    const {getItem, setItem } = useStorage()
    setItem('eddsa_key','3gRTjzoek4LnumEAsE58ycBiiMo7sQWBa5T7CMN7LbE9', 'local')
    const zenKeys = `
        {
            "keyring": {
                            "eddsa": "${getItem('eddsa_key', 'local')}"
                        }
        }
    `
    console.log(body, zenKeys)
    const zenData = `
        {
                "gql": "${Buffer.from(body, 'utf8').toString('base64')}",
        }
    `
    console.log('eddsa:', getItem('eddsa_key', 'local'))
    console.log(zenData)
    return await zencode_exec(sign(), {data: zenData ,keys:zenKeys})

}

export default SignRequest