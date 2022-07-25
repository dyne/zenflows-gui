import React from 'react';
import useStorage from "../lib/useStorage";
import {zencode_exec} from "zenroom";
import sign from "../zenflows-crypto/src/sign";


const SignRequest = async ({query, variables}:{query:string, variables?:any}) => {
    const body = `{"variables":${JSON.stringify(variables)},"query":"${query}"}`
    const {getItem, setItem } = useStorage()
    setItem('eddsa_key','FQbTMYYqMGqiDMFyygPC7Ccf2wFh2EZSXt1myQZuaUQj', 'local')
    const zenKeys = `
        {
            "keyring": {
                            "eddsa": "${getItem('eddsa_key', 'local')}"
                        }
        }
    `
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