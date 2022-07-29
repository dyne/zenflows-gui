import React, {ChangeEvent, useState} from 'react';
import {useAuth} from "../lib/auth";
import {useRouter} from "next/router";
import Card, {CardWidth} from "../components/brickroom/Card";
import BrInput from "../components/brickroom/BrInput";
import Link from "next/link";
import KeyringGeneration from "../components/KeyringGeneration";
import VerifySeed from "../components/VerifySeed";


export default function Sign_in() {
    const [isPassprhase, setIsPassphrase] = useState(false)
    const [step, setStep] = useState(0)
    const [email, setEmail] = useState('')
    const [pdfk, setPdfk] = useState('')
    const [isMailExisting, setIsMailExising] = useState(true)

    const {askKeypairoomServer, signIn} = useAuth()

    const errorMail = isMailExisting ? undefined : 'this email doesn\'t exists'
    const viaPassphrase = () => {
        setIsPassphrase(true)
        setStep(1)
    }


    const viaQuestions = () => {
        setIsPassphrase(false)
        setStep(1)
    }
    const toNextStep = async (step:number) => {
        const result = await askKeypairoomServer(email, false)
        if (await result?.keypairoomServer) {
            setPdfk(result?.keypairoomServer)
            setStep(step)
            console.log(result)
        } else {
            setIsMailExising(false)
            console.log(result)
        }
        // setPdfk(key)
        // setStep(2)
    }

    const router = useRouter()
    const signInTextProps: any = {
        title: "Welcome!",
        presentation: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quam semper felis volutpat mauris libero feugiat ornare aliquet urna.",
        button1: "Sign In via passprhase",
        button2: "Sign In answering some questions",
        button3: "Sign Up",
        button4: "Next",
        email: {
            label: "Email address",
            placeholder: "alice@email.com"
        }
    }

    async function onSubmit(e: { preventDefault: () => void; }) {
        e.preventDefault()
    }

    return (
        <div className="h-screen bg-cover" style={{['backgroundImage' as any]: "url('/reflow_background.jpeg')"}}>
            <div className="container mx-auto h-screen grid place-items-center">
                <Card title={signInTextProps.title}
                      width={CardWidth.LG}
                      className="px-16 py-[4.5rem]">
                    <>
                        {step === 0 && <><p>{signInTextProps.presentation}</p>
                            <button className="btn btn-block" type="button"
                                    onClick={() => viaPassphrase()}>{signInTextProps.button1}</button>
                            <button className="btn btn-block my-4" type="button"
                                    onClick={() => viaQuestions()}>{signInTextProps.button2}</button>
                            <Link href={'/sign_up'}>
                                <a className="btn btn-block">{signInTextProps.button3}</a>
                            </Link></>}
                        {step === 1 && <>
                            <BrInput type="email" label={signInTextProps.email.label}
                                     error={errorMail}
                                     placeholder={signInTextProps.email.placeholder}
                                     onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}/>
                            {!isPassprhase && <>
                                <button className="btn btn-block" type="button" onClick={() => toNextStep(2)}>
                                    {signInTextProps.button4}
                                </button>
                            </>}
                            {isPassprhase && <>
                                <button className="btn btn-block" type="button" onClick={() => toNextStep(3)}>
                                    {signInTextProps.button4}
                                </button>
                            </>}
                        </>}
                        {step === 3 && <>
                    <VerifySeed email={email} HMAC={pdfk}/>
                </>}
                    </>
                </Card>
                {step === 2 && <>
                    <KeyringGeneration email={email} HMAC={pdfk}/>
                </>}

            </div>
        </div>
    )
}