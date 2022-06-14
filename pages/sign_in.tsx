import React, {ChangeEvent, useState} from 'react';
import {useAuth} from "../lib/auth";
import {useRouter} from "next/router";
import Card, {CardWidth} from "../components/brickroom/Card";
import BrInput from "../components/brickroom/BrInput";
import {LinkIcon} from "@heroicons/react/solid";

export default function SignIn() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const signInTextProps:any ={
    title:"Welcome Back!",
    presentation:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quam semper felis volutpat mauris libero feugiat ornare aliquet urna.",
    username: {
      label: "Email address or @username",
      placeholder: "alice@email.com"
    },
    password: {
      label: "Password (min 8 characters)",
      placeholder: "Type your password"
    },
    register:{
      question:"✌️ You don’t have an account yet?",
      answer:"Sign Up"
    }
  }

  const { signIn } = useAuth()

  async function  onSubmit(e: { preventDefault: () => void; }) {
    e.preventDefault()
    await signIn({ username, password }).then(()=> router.push('/'))
  }

  return (
    <div className="h-screen bg-cover" style={{['background-image' as any]: "url('/reflow_background.jpeg')"}}>
      <div className="container mx-auto h-screen grid place-items-center">
          <Card title={signInTextProps.title}
                width={CardWidth.LG}
                className="px-16 py-[4.5rem]">
            <>
              <p>{signInTextProps.presentation}</p>
              <form onSubmit={onSubmit}>
                <BrInput type="text"
                         label={signInTextProps.username.label}
                         placeholder={signInTextProps.username.placeholder}
                         onChange={(e:ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} />
                <BrInput type="password"
                         placeholder={signInTextProps.password.placeholder}
                         label={signInTextProps.password.label}
                         onChange={(e:ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                />
                  <button className="btn btn-block" type="submit">Sign In</button>
              </form>
              <p className="flex flex-row items-center justify-between">
                {signInTextProps.register.question}
                <LinkIcon className='h-5 w-5 ml-6'/>
                {signInTextProps.register.answer}
              </p>
            </>
          </Card>
      </div>
    </div>
  )
}