import React, {ChangeEvent, useState} from 'react';
import {useAuth} from "../lib/auth";
import {useRouter} from "next/router";
import Card from "../components/brickroom/Card";
import BrInput from "../components/brickroom/BrInput";

export default function SignIn() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const { signIn } = useAuth()

  async function  onSubmit(e: { preventDefault: () => void; }) {
    e.preventDefault()
    await signIn({ username, password }).then(()=> router.push('/'))
  }

  return (
    <div className="h-screen " style={{['background-image' as any]: "url('/reflow_background.jpeg')"}}>
      <div className="container mx-auto h-screen grid place-items-center">
        <div className="w-80">
          <Card title="Welcome Back!">
            <>
              <p>Lorem ipsum dolor sit amet</p>
              <form onSubmit={onSubmit}>
                <BrInput type="text"
                         label="username"
                         placeholder="Username"
                         onChange={(e:ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} />
                <BrInput type="password"
                         placeholder="password"
                         label="password"
                         onChange={(e:ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                />
                <div className="card-actions justify-end">
                  <button className="btn btn-primary" type="submit">Sign In</button>
                </div>
              </form>
            </>
          </Card>
        </div>
      </div>
    </div>
  )
}