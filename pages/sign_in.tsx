import React, {useState} from 'react';
import {useAuth} from "../lib/auth";

export default function SignIn() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // @ts-ignore
  const { signIn } = useAuth()

  function onSubmit(e:any) {
    e.preventDefault()
    signIn({ username, password })
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  )
}