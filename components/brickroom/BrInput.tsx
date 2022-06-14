import React, {ChangeEvent, ChangeEventHandler, useState} from "react";

type BrInputProps = {
    type?:'number'|'text'|'password',
    placeholder?:string,
    label?:string,
    onChange?:ChangeEventHandler,
    hint?:string,
}


const BrInput = (props:BrInputProps) => {

    return (<>

        <div className="form-control w-full max-w-xs">
            <label className="label">
                <span className="label-text">{props.label}</span>
            </label>
            <input type={props.type}
                   placeholder={props.placeholder}
                   onChange={props.onChange}
                   className="input input-bordered w-full max-w-xs focus:input-primary"
            />
            {props.hint&&<label className="label">
                <span className="label-text-alt">{props.hint}</span>
            </label>}
        </div>
            </> )
}

export default BrInput