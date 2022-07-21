import {zencode_exec} from "zenroom"
import {ChangeEvent, useState} from "react";
import BrInput from "../components/brickroom/BrInput";
import useStorage from "../lib/useStorage";
import {gql, useMutation} from "@apollo/client";
import sign from "../zencode/src/sign"
import generateKeyring from "../zencode/src/generateKeyring";


const Zencode = () => {
    const {getItem, setItem } = useStorage()
    const [result, setResult] = useState("")
    const [eddsa_public_key, setEddsaPublicKey] = useState("")
    const [ethereum_address, setEthereumAddress] = useState("")
    const [reflow_public_key, setReflowPublicKey] = useState("")
    const [schnorr_public_key, setSchnorrPublicKey] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [user, setUser] = useState("")
    const [header, setHeader] = useState("")
    const [hash, setHash] = useState("")

    const query = `mutation ($label: String! $symbol: String!) {
  createUnit(unit: {
    label: $label symbol: $symbol
  }) {
    unit { id label symbol }
  }
}`

    const CREATE_USER = gql`${query}`

    const [newUser, {data, loading, error}] = useMutation(CREATE_USER)


    const zencodeExec = ()=> {zencode_exec(generateKeyring).then(({result}) => {
        const r = JSON.parse(result)
        const k = r.keyring
        setItem("ecdh_key", k.ecdh, "local")
        setItem("ethereum_key", k.ethereum, "local")
        setItem("reflow_key", k.reflow, "local")
        setItem("schnorr_key", k.schnorr, "local")
        setItem("bitcoin_key", k.bitcoin, "local")
        setItem("eddsa_key", k.eddsa, "local")
        setItem("dilithium_key", k.dilithium, "local")
        setReflowPublicKey(r.reflow_public_key)
        setSchnorrPublicKey(r.schnorr_public_key)
        setEddsaPublicKey(r.eddsa_public_key)
        setEthereumAddress(r.ethereum_address)
        setResult(JSON.stringify(r, null, 2))
    })}

    const signBody = async (zenData:string, zenKeys: string ) => {
        return await zencode_exec(sign(), {data: zenData ,keys:zenKeys})
    }

    const createUser = async () => {
        const variables = {
            label: "kilogram",
            symbol: "kg",
        }
        const body = {"variables":{"label":"kilogram","symbol":"kg"},"query":"mutation ($label: String!, $symbol: String!) {\n  createUnit(unit: {label: $label, symbol: $symbol}) {\n    unit {\n      id\n      label\n      symbol\n    }\n  }\n}"}
        console.log(body)
        console.log(query)
        const str = JSON.stringify(body)
        console.log(str)
        const zenKeys = `
            {
                "keyring": {
                                "eddsa": "3gRTjzoek4LnumEAsE58ycBiiMo7sQWBa5T7CMN7LbE9",
                            }
            }
        `
        const zenData = `
            {
                    "gql": "${Buffer.from(str, 'utf8').toString('base64')}"
            }
        `
        await signBody(zenData, zenKeys)
            .then(({result}) => {
                console.log(str)
                console.log(Buffer.from(str, 'utf8').toString('base64'))
                console.log(body)
                console.log('hash:',JSON.parse(result).hash)
                console.log('signature:',JSON.parse(result).eddsa_signature)
                setHeader(JSON.parse(result).eddsa_signature)
                setHash(JSON.parse(result).hash)
            })
            .then(()=>{
                 return newUser({variables, context: {headers: {'zenflows-sign': header, 'zenflows-user': 'anosolare', 'zenflows-hash': hash}}})
            }).then(console.log)}


    return (
        <div>
            <h1>Create user flow</h1>
            <p>
                Generate public and private keys to sign graphql requests.
            </p>
            <div className={'divider'}/>
            <h2>generate the keys</h2>
            <button onClick={zencodeExec} className="btn btn-accent">Generate</button>
            <p>Private keys: {result}</p>
            <div className={'divider'}/>
            <h2>Create User</h2>
            <BrInput label="Name" value={name} onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}/>
            <BrInput label="User" value={user} onChange={(e: ChangeEvent<HTMLInputElement>) => setUser(e.target.value)}/>
            <BrInput label="Email" value={email} onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}/>
            <button onClick={createUser} className="btn btn-accent">Create</button>
        </div>)
}

export default Zencode