import type {NextPage} from 'next'
import {gql, useMutation} from "@apollo/client";
import React, {useState} from "react";

const NewProcess: NextPage = () => {
    const [processName, setProcessName] = useState('')
    const [processNote, setProcessNote] = useState('')

    const NewProcessMutation = gql`
            mutation ($name: String, $note: String){
              createProcess(process:{name:$name, note:$note} ){
                process{
                  id 
                  name 
                  note
                }
              }
            }
          `

    const [newProcess, { data, loading, error }] = useMutation(NewProcessMutation)

  function onSubmit(e:any) {
    e.preventDefault()
    newProcess({variables:{ name: processName, note: processNote }})
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


