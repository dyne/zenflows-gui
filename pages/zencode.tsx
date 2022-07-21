import {zencode_exec} from "zenroom"
import {ChangeEvent, useState} from "react";
import BrInput from "../components/brickroom/BrInput";
import useStorage from "../lib/useStorage";
import {gql, useMutation} from "@apollo/client";


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

    const query = `mutation (
                          $name: String!
                          $user: String! 
                          $email: String!
                          $eddsa_public_key: String!
                          $ethereum_address: String!
                          $reflow_public_key: String!
                          $schnorr_public_key: String!
                        ) {
                          createPerson(person: {
                            name: $name
                            user: $user
                            email: $email
                            eddsa_public_key: $eddsa_public_key
                            ethereum_address: $ethereum_address
                            reflow_public_key: $reflow_public_key
                            schnorr_public_key: $schnorr_public_key
                        
                          }) {
                          agent{
                            id
                            name
                            user
                            email
                            eddsa_public_key
                            ethereum_address
                            reflow_public_key
                            schnorr_public_key
                          }
                          }
                        }`

    const CREATE_USER = gql`${query}`

    const [newUser, {data, loading, error}] = useMutation(CREATE_USER)


    const smartContract = `Scenario 'ecdh': Create the key
                        Scenario 'ethereum': Create key
                        Scenario 'reflow': Create the key
                        Scenario 'schnorr': Create the key
                        Scenario 'eddsa': Create the key
                        Scenario 'qp': Create the key
                        
                        Given nothing
                        
                        # Here we are creating the keys
                        When I create the ecdh key
                        When I create the ethereum key 
                        When I create the reflow key
                        When I create the schnorr key
                        When I create the bitcoin key
                        When I create the eddsa key
                        When I create the dilithium key
                        
                        # Generating the public keys
                        When I create the ecdh public key
                        When I create the reflow public key
                        When I create the schnorr public key
                        When I create the bitcoin public key
                        When I create the eddsa public key
                        
                        # With Ethereum the 'ethereum address' is what we want to create, rather than a public key
                        When I create the ethereum address
                        When I create the bitcoin address
                        
                        When I create the dilithium public key
                        
                        Then print the 'keyring'
                        
                        # Then print the 'ecdh public key' 
                        # Then print the 'dilithium public key' 
                        # Then print the 'bitcoin address' 
                        Then print the 'reflow public key' 
                        Then print the 'schnorr public key' 
                        Then print the 'eddsa public key' 
                        Then print the 'ethereum address'`


    const zencodeExec = ()=> {zencode_exec(smartContract).then(({result}) => {
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

    const sign = async (zenData:string, zenKeys: string ) => {
        return await zencode_exec(`Scenario eddsa: sign a graph query
                    Given I have a 'base64' named 'gql'
                    Given I have a 'keyring'
                    When I create the eddsa signature of 'gql'
                    Then print 'eddsa signature' as 'base64'
                    Then print 'gql' as 'base64'`, {data: zenData ,keys:zenKeys})
    }

    const createUser = async () => {
        const variables = {
            name,
            user,
            email,
            eddsa_public_key,
            ethereum_address,
            reflow_public_key,
            schnorr_public_key,
        }
        const body = {query,variables}
        const str = JSON.stringify(body)
        const zenKeys = `
            {
                "keyring": {
                                "eddsa": "AnGkdziUacroGGb7zVYZgwAMHQjdLg1PcU6wpEYGx3qT"
                            }
            }
        `

        const zenData = `
            {
                    "gql": "${Buffer.from(str, 'utf8').toString('base64')}"
            }
        `
        await sign(zenData, zenKeys)
            .then(({result}) => {setHeader(result)})
            .then(()=>{
                 newUser({variables, context: {headers: {'zenflows-sign': header}}})
            })
    }

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