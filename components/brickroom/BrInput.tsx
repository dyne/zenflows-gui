import React, { ChangeEventHandler } from "react";
import { ExclamationIcon } from '@heroicons/react/solid'

type BrInputProps = {
    type?: 'number' | 'text' | 'password',
    placeholder?: string,
    label?: string,
    onChange?: ChangeEventHandler,
    hint?: string,
    error?: string,
    className?: string,
}


const BrInput = (props: BrInputProps) => {

    return (<>

        <div className={`form-control ${props.className}`}>
            <label className="label">
                <span className="label-text">{props.label}</span>
            </label>
            <input type={props.type}
                placeholder={props.placeholder}
                onChange={props.onChange}
                className="w-full input input-bordered focus:input-primary"
            />
            <label className="label">
                {props.error && <span className="flex flex-row items-center justify-between label-text-alt text-warning">
                    <ExclamationIcon className='w-5 h-5' />
                    {props.error}</span>}
                {props.hint && <span className="label-text-alt">{props.hint}</span>}

            </label>
        </div>
    </>)
}

export default BrInput