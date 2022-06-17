import React, {ChangeEvent, ChangeEventHandler, useState} from "react";

type BrInputProps = {
    type?:'number'|'text'|'password',
    placeholder?:string,
    label?:string,
    onChange?:ChangeEventHandler,
    hint?:string,
    error?:string,
}
import {ExclamationIcon} from '@heroicons/react/solid'


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
            <label className="label">
                {props.error&&<span className="label-text-alt text-warning flex flex-row items-center justify-between">
                    <ExclamationIcon className='h-5 w-5'/>
                    {props.error}</span>}
                {props.hint&&<span className="label-text-alt">{props.hint}</span>}

            </label>
        </div>
            </> )
}

export default BrInput