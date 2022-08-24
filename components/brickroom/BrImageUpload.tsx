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

            <div className="flex justify-center items-center w-full">
                <label htmlFor="dropzone-file"
                       className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-100">
                    <div className="flex flex-col justify-center items-center pt-5 pb-6">
                        <svg aria-hidden="true" className="mb-3 w-10 h-10 text-gray-400" fill="none"
                             stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or
                            drag and drop</p>
                        <p className="text-xs text-gray-500">{props.placeholder}</p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" onChange={(e) => {handleUpload(e.target.files)}}/>
                </label>
            </div>
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