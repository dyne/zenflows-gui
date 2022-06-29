import React, {ChangeEventHandler} from "react";
import {ExclamationIcon} from "@heroicons/react/solid";

type BrSelectProps = {
    array: Array<{ id: string, name: string }>
    placeholder?: string,
    label?: string,
    handleSelect: ChangeEventHandler,
    hint?: string,
    error?: string,
    className?: string,
}


const BrSelect = (props: BrSelectProps) => {

    return (<>

        <div className={`form-control ${props.className}`}>
            <label className="label">
                <span className="label-text">{props.label}</span>
            </label>
            <select onSelect={(e: React.ChangeEvent<HTMLSelectElement>) => props.handleSelect(e)}
                    className="select select-bordered">
                {props.array?.map((unit: { id: string, name: string }) =>
                    (<option key={unit?.id} value={unit?.id}>{unit?.name}</option>))}
            </select>
            <label className="label">
                {props.error &&
                <span className="flex flex-row items-center justify-between label-text-alt text-warning">
                    <ExclamationIcon className='w-5 h-5'/>
                    {props.error}</span>}
                {props.hint && <span className="label-text-alt">{props.hint}
                </span>}

            </label>
        </div>
    </>)
}

export default BrSelect