import {zencode_exec} from "zenroom"
import {ChangeEvent, useState} from "react";
import BrInput from "../components/brickroom/BrInput";
import useStorage from "../lib/useStorage";
import {gql, useMutation} from "@apollo/client";
import generateKeyring from "../zenflows-crypto/src/generateKeyring";
import SignRequest from "../lib/SignRequest";


const Zencode = () => {
    const {getItem, setItem } = useStorage()
    const [result, setResult] = useState("")
    const [eddsa_public_key, setEddsaPublicKey] = useState("")
    const [ethereum_address, setEthereumAddress] = useState("")
    const [reflow_public_key, setReflowPublicKey] = useState("")
    const [schnorr_public_key, setSchnorrPublicKey] = useState("")
    const [symbol, setSymbol] = useState("")
    const [label, setLabel] = useState("")

    const query = `mutation ($label: String!, $symbol: String!) {
                       createUnit(unit: {label: $label, symbol: $symbol}) {
                        unit {
                          id
                          label
                          symbol
                         }
                      }
                    }`

    const CREATE_UNIT = gql`${query}`

    const [newUnit, {data, loading, error}] = useMutation(CREATE_UNIT)


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

    const createUnit = async () => {
        const variables = {
            label: "kilogram",
            symbol: "kg",
        }

        await SignRequest({query, variables})
            .then(({result}) => {
                console.log(JSON.stringify({variables, "query":query}))
                console.log('hash:',JSON.parse(result).hash)
                console.log('signature:',JSON.parse(result).eddsa_signature)
                console.log('gql:',Buffer.from(JSON.parse(result).gql, 'base64').toString('utf8'))
                return newUnit({variables, context: {headers: {'zenflows-sign': JSON.parse(result).eddsa_signature, 'zenflows-user': 'anosolare', 'zenflows-hash': JSON.parse(result).hash}}})
            }).then(console.log)}


    return (
        <div>
            <h1>Zencode playground for advanced cryptography</h1>
            <p>
                This is an experimental page to test advanced cryptography in client-server interactions
            </p>
            <div className={'divider'}/>
            <h2>generate the keys</h2>
            <button onClick={zencodeExec} className="btn btn-accent">Generate</button>
            <p>Private keys: {result}</p>
            <div className={'divider'}/>
            <h2>Create Unit</h2>
            <BrInput label="Label" value={label} onChange={(e: ChangeEvent<HTMLInputElement>) => setLabel(e.target.value)}/>
            <BrInput label="Symbol" value={symbol} onChange={(e: ChangeEvent<HTMLInputElement>) => setSymbol(e.target.value)}/>
            <button onClick={createUnit} className="btn btn-accent">Create</button>
        </div>)
}

export default Zencode