import Card, {CardWidth} from "./brickroom/Card";
import BrInput from "./brickroom/BrInput";
import React, {ChangeEvent, useState} from "react";
import useStorage from "../lib/useStorage";
import {zencode_exec} from "zenroom";
import generateKeyring from "../zenflows-crypto/src/generateKeyring";
import keypairoomClient from "../zenflows-crypto/src/keypairoomClient";
import {useRouter} from "next/router";
import {useAuth} from "../lib/auth";


const KeyringGeneration = ({
                               setStep1,
                               email,
                               name,
                               user
                           }: { setStep1: Function, email: string, name: string, user: string }) => {
    const {signUp} = useAuth()
    const keyringGenProps: any = {
        title: "Welcome!",
        presentation: "Answer the questions",
        email: {
            label: "Email",
            placeholder: "alice@email.com"
        },
        register: {
            question: "",
            answer: "Sign In"
        },
        button: "Sign Up",
        question1: "Where my parents met?",
        question2: "What is the name of your first pet?",
        question3: "What is your home town?",
        question4: "What is the name of your first teacher?",
        question5: "What is the surname of your mother before wedding?"
    }
    const [eddsaPublicKey, setEddsaPublicKey] = useState('')
    const [seed, setSeed] = useState('')
    const [question1, setQuestion1] = React.useState('null')
    const [question2, setQuestion2] = React.useState('null')
    const [question3, setQuestion3] = React.useState('null')
    const [question4, setQuestion4] = React.useState('null')
    const [question5, setQuestion5] = React.useState('null')
    const {getItem, setItem} = useStorage()
    const [result, setResult] = useState("")
    const router = useRouter()

    const onSignUp = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        signUp({name, user, email, seed})
    }
    const onSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        const zenData = `
            {
                "userChallenges": {
                    "question1":"${question1}",
                    "question2":"${question2}",
                    "question3":"${question3}",
                    "question4":"${question4}",
                    "question5":"${question5}",
                },
                "username": "${email}",
                "key_derivation": "qf3skXnPGFMrE28UJS7S8BdT8g=="
            }`


        zencode_exec(keypairoomClient, {data: zenData})
            .then(({result}) => {
                console.log(result)
                const res = JSON.parse(result)
                console.log(res)
                setEddsaPublicKey(res.eddsa_public_key)
                setItem('eddsa_key', res.keyring.eddsa, 'local')
                setItem('ethereum_address', res.keyring.ethereum, 'local')
                setItem('reflow', res.keyring.reflow, 'local')
                setItem('schnorr', res.keyring.schnorr, 'local')
                setItem('eddsa', res.keyring.eddsa, 'local')
                setSeed(res.concatenedHashes)
            }).then(() => signUp({name, user, email, eddsaPublicKey})
            .then(() => router.push('/')))
    }


    return (
        <Card title={keyringGenProps.title}
              width={CardWidth.LG}
              className="px-16 py-[4.5rem]">
            <>
                <p>{keyringGenProps.presentation}</p>
                <form onSubmit={onSubmit}>
                    <BrInput type="text"
                             label={keyringGenProps.question1}
                             onChange={(e: ChangeEvent<HTMLInputElement>) => setQuestion1(e.target.value)}/>
                    <BrInput type="text"
                             label={keyringGenProps.question2}
                             onChange={(e: ChangeEvent<HTMLInputElement>) => setQuestion2(e.target.value)}/>
                    <BrInput type="text"
                             label={keyringGenProps.question3}
                             onChange={(e: ChangeEvent<HTMLInputElement>) => setQuestion3(e.target.value)}/>
                    <BrInput type="text"
                             label={keyringGenProps.question4}
                             onChange={(e: ChangeEvent<HTMLInputElement>) => setQuestion4(e.target.value)}/>
                    <BrInput type="text"
                             label={keyringGenProps.question5}
                             onChange={(e: ChangeEvent<HTMLInputElement>) => setQuestion5(e.target.value)}/>

                    <button className="btn btn-block" type="submit">{keyringGenProps.button}</button>
                </form>
                <p className="flex flex-row items-center justify-between">
                    {keyringGenProps.register.question}
                    {keyringGenProps.register.answer}
                </p>
            </>
        </Card>
    )
}

export default KeyringGeneration