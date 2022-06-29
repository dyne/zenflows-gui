import {zencode_exec} from "zenroom"
import {ChangeEvent, useState} from "react";
import BrInput from "../components/brickroom/BrInput";


const Zencode = () => {
    const [result, setResult] = useState("")
    const [inputData, setInputData] = useState("")
    const smartContract = `Given that I have a 'string' named 'hello'
                       Then print all data as 'string'`
    const data = JSON.stringify({hello: inputData})
    const zencodeExec = ()=> {zencode_exec(smartContract, {data}).then(({result}) => {
        console.log(result) // {"hello":"world!"}
        setResult(result)
    })}
    return (
        <div>
            <h1>Zencode</h1>
            <p>
                Zencode is a simple, easy to use, and powerful tool for creating
                interactive code. It is a tool for creating code that is both
                readable and interactive.
            </p>
            <div className={'divider'}/>
            <h2>Example</h2>
            <BrInput type="text" placeholder="inserisce una parola" label="inserisce una parola" onChange={(e:ChangeEvent<HTMLInputElement>) => setInputData(e.target.value)}/>
            <button onClick={zencodeExec} className="btn btn-accent">Execute</button>
            <p>{result}</p>
        </div>)
}

export default Zencode