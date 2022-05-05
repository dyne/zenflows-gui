import type {NextPage} from 'next'
import {gql} from "@apollo/client";
import {useAuth} from "../lib/auth";
import React, {useState} from "react";






const NewProcess: NextPage = () => {
    const [processName, setProcessName] = useState('')
    const [processNote, setProcessNote] = useState('')

    const {createApolloClient} = useAuth()
    const createNewProcess = async ({ name, note }:{name:string,note:string}) => {
    const client = createApolloClient()
    const NewProcessMutation = gql`
            mutation {
              createProcess(process:{name:"${name}", note:"${note}"} ){
                process{
                  id 
                  name 
                  note
                }
              }
            }
          `

    const result = await client.mutate({
      mutation: NewProcessMutation,
      variables: { name, note },
    })

    console.log(result)
  }

  function onSubmit(e:any) {
    e.preventDefault()
    createNewProcess({ name: processName, note: processNote })
  }
  return (<>
            <h1>New Process</h1>
      <form onSubmit={onSubmit}>
          <input type="text"
                 placeholder="Name"
                 className="input input-bordered w-full max-w-xs block"
                 onChange={(e) => setProcessName(e.target.value)}
          />
          <textarea className="textarea textarea-bordered block"
                    placeholder="Note"
                    onChange={(e) => setProcessNote(e.target.value)}

          />
        <button type="submit" className="btn btn-primary">Create</button>
      </form>
        </>)};

export default NewProcess


