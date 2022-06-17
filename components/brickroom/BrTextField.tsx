import React, {ChangeEvent, ChangeEventHandler, useState} from "react";

type BrTextFieldProps = {
    placeholder?:string,
    label?:string,
    onChange?:ChangeEventHandler,
    hint?:string,
    error?:string,
}
import {ExclamationIcon} from '@heroicons/react/solid'


const BrTextField = (props:BrTextFieldProps) => {

    return (<>

        <div className="form-control w-full">
            <label className="label">
                <span className="label-text">{props.label}</span>
            </label>
            <textarea
                   placeholder={props.placeholder}
                   onChange={props.onChange}
                   className="textarea textarea-bordered w-full focus:textarea-primary"
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

export default BrTextField