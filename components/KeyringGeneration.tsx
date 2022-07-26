import Card, {CardWidth} from "./brickroom/Card";
import BrInput from "./brickroom/BrInput";
import React, {ChangeEvent, useState} from "react";
import useStorage from "../lib/useStorage";
import {zencode_exec} from "zenroom";
import generateKeyring from "../zenflows-crypto/src/generateKeyring";

const KeyringGeneration = ({setStep1, setEddsaPublicKey}: { setStep1: Function, setEddsaPublicKey: Function }) => {

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
        button: "Step two",
        question1: "Where my parents met?",
        question2: "What is the name of your first pet?",
        question3: "What is your home town?",
        question4: "What is the name of your first teacher?",
        question5: "What is the surname of your mother before wedding?"
    }
    const [question1, setQuestion1] = React.useState('null')
    const [question2, setQuestion2] = React.useState('null')
    const [question3, setQuestion3] = React.useState('null')
    const [question4, setQuestion4] = React.useState('null')
    const [question5, setQuestion5] = React.useState('null')
    const [email, setEmail] = React.useState('')
    const {getItem, setItem} = useStorage()
    const [result, setResult] = useState("")

    const isEnough = () => {

    }

    const onSubmit = async () => {
        const zenData =`
            {
                "userChallanges": {
                    "question1":${question1},
                    "question2":${question2},
                    "question3":${question3},
                    "question4":${question4},
                    "question5":${question5}
                },
                "username": ${email},
                "key_derivation": "qf3skXnPGFMrE28UJS7S8BdT8g=="
            }`


        await zencode_exec(generateKeyring)
            .then(({result}) => {
                const res = JSON.parse(result)
                setEddsaPublicKey(res.publicKey)
                setItem('eddsa_key', res.keyring.eddsa, 'local')
                setItem('ethereum_address', res.keyring.ethereum, 'local')
                setItem('reflow', res.keyring.reflow, 'local')
                setItem('schnorr', res.keyring.schnorr, 'local')
                setItem('eddsa', res.keyring.eddsa, 'local')
            }).then(() => setStep1(false))
    }


    return (
        <Card title={keyringGenProps.title}
              width={CardWidth.LG}
              className="px-16 py-[4.5rem]">
            <>
                <p>{keyringGenProps.presentation}</p>
                <form onSubmit={onSubmit}>
                    <BrInput type="email"
                             placeholder={keyringGenProps.email.placeholder}
                             label={keyringGenProps.email.label}
                             onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    />
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