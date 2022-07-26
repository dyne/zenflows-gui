import React, {ChangeEvent, useState} from 'react';
import {useAuth} from "../lib/auth";
import {useRouter} from "next/router";
import Card, {CardWidth} from "../components/brickroom/Card";
import BrInput from "../components/brickroom/BrInput";
import {LinkIcon} from "@heroicons/react/solid";
import {zencode_exec} from "zenroom";
import generateKeyring from "../zenflows-crypto/src/generateKeyring";
import useStorage from "../lib/useStorage";
import KeyringGeneration from "../components/KeyringGeneration";


export default function SignIn() {
    const {getItem, setItem} = useStorage()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [user, setUser] = useState('')
    const [eddsaPublicKey, setEddsaPublicKey] = useState('')
    const [isStep1, setIsStep1] = useState(true)

    const router = useRouter()
    const signUpTextProps: any = {
        title: "Second step",
        presentation: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quam semper felis volutpat mauris libero feugiat ornare aliquet urna.",
        name: {
            label: "name",
            placeholder: "Type your name"
        },
        user: {
            label: "User",
            placeholder: "Type your visible username"
        },
        email: {
            label: "Email",
            placeholder: "alice@email.com"
        },
        register: {
            question: "✌️  yet regisetered?",
            answer: "Sign In"
        },
        button: "Sign Up"
    }

    const {signUp} = useAuth()

    async function onSubmit(e: { preventDefault: () => void; }) {
        e.preventDefault()
        await signUp({name, user, email, eddsaPublicKey})
            .then(() => router.push('/'))
    }

    return (
            <div className="container mx-auto h-screen grid place-items-center">
                {isStep1&&<KeyringGeneration setStep1={setIsStep1}/>}
                {!isStep1&&<Card title={signUpTextProps.title}
                      width={CardWidth.LG}
                      className="px-16 py-[4.5rem]">
                    <>
                        <p>{signUpTextProps.presentation}</p>
                        <form onSubmit={onSubmit}>
                            <BrInput type="text"
                                     label={signUpTextProps.name.label}
                                     placeholder={signUpTextProps.name.placeholder}
                                     onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}/>
                            <BrInput type="text"
                                     placeholder={signUpTextProps.user.placeholder}
                                     label={signUpTextProps.user.label}
                                     onChange={(e: ChangeEvent<HTMLInputElement>) => setUser(e.target.value)}
                            />
                            <BrInput type="email"
                                     placeholder={signUpTextProps.email.placeholder}
                                     label={signUpTextProps.email.label}
                                     onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            />
                            <button className="btn btn-block" type="submit">{signUpTextProps.button}</button>
                        </form>
                        <p className="flex flex-row items-center justify-between">
                            {signUpTextProps.register.question}
                            <LinkIcon className='h-5 w-5 ml-28'/>
                            {signUpTextProps.register.answer}
                        </p>
                    </>
                </Card>}
            </div>
    )
}