import {ExclamationIcon} from "@heroicons/react/solid";
import React from "react";
import devLog from "../../lib/devLog";

type BrImageUploadProps = {
    onChange: (e:string) => void;
    label: string;
    placeholder: string;
    error?: string;
    hint?: string;
    className?: string;
}

const BrImageUpload = (props: BrImageUploadProps) => {
    function handleUpload(elements: any) {
        devLog(elements)
      const file = elements[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        devLog('RESULT', reader.result)
          props.onChange(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
    return (<>
        <div className={`form-control ${props.className}`}>
            <label className="label">
                <span className="label-text">{props.label}</span>
            </label>
            <input type='file'
                placeholder={props.placeholder}
                onChange={(e) => {handleUpload(e.target.files)}}
                className="w-full input input-bordered focus:input-primary cursor-pointer pl-0"
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

export default BrImageUpload;