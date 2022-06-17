import type {NextPage} from 'next'
import {gql, useMutation} from "@apollo/client";
import React, {ChangeEvent, useState} from "react";
import BrTextField from "../components/brickroom/BrTextField";
import BrInput from "../components/brickroom/BrInput";

const newProcessProps = {
    headline: {
        title: "Create a new flow",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque pellentesque hendrerit ultrices mauris et non pellentesque suspendisse est.",
    },
    inputName: {
        label: "Give it a name:",
        placeholder: "Process name",
        hint: "hint",
    },
    inputNotes: {
        label: "Write a short description:",
        placeholder: "Description goes here",
        hint: "hint"
    }
}

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

    const [newProcess, {data, loading, error}] = useMutation(NewProcessMutation)

    function onSubmit(e: any) {
        e.preventDefault()
        newProcess({variables: {name: processName, note: processNote}})
    }

    return (<>
        <div className="w-128">
            <div className="w-80">
                <h2>{newProcessProps.headline.title} </h2>
                <p>{newProcessProps.headline.description}</p>
            </div>
            <form onSubmit={onSubmit} className="w-full">
                <BrInput type="text"
                         label={newProcessProps.inputName.label}
                         placeholder={newProcessProps.inputName.placeholder}
                         hint={newProcessProps.inputName.hint}
                         onChange={(e: ChangeEvent<HTMLInputElement>) => setProcessName(e.target.value)}/>
                <BrTextField hint={newProcessProps.inputName.hint}
                             label="Note"
                             placeholder="Note"
                             onChange={(e: ChangeEvent<HTMLInputElement>) => setProcessNote(e.target.value)}/>
                <button type="submit" className="btn btn-accent float-right">Create</button>
            </form>

        </div>

    </>)
};

export default NewProcess


