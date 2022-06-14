import React, {ChangeEvent, useState} from 'react';
import {useAuth} from "../lib/auth";
import {useRouter} from "next/router";

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
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Sign In!</h2>
            <form onSubmit={onSubmit}>
              <input
                type="text"
                placeholder="username"
                onChange={(e:ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
            />
              <input
                type="password"
                placeholder="password"
                onChange={(e:ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            />
              <div className="card-actions justify-end">
                <button className="btn btn-primary" type="submit">Sign In</button>
              </div>
            </form>
          </div>
        </div>
        <div>

        </div>
      </div>
    </div>
  )
}