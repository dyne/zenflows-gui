import {ExclamationIcon} from "@heroicons/react/solid";
import React, {useState} from "react";
import devLog from "../../lib/devLog";
import useStorage from "../../lib/useStorage";
import {zencode_exec,
    zenroom_hash_init, zenroom_hash_update, zenroom_hash_final} from "zenroom";
import signFile from "../../zenflows-crypto/src/sign_file";
import base64url from 'base64url';

type BrImageUploadProps = {
    onChange: (i: Images) => void;
    setImagesFiles: (images: Array<any>) => void;
    label: string;
    placeholder: string;
    error?: string;
    hint?: string;
    className?: string;
    value?: Images
}
type Image = {
    description: string,
    extension: string,
    hash: string,
    mimeType: string,
    name: string,
    signature: any,
    size: number
}
type Images = Array<Image>

const BrImageUpload = (props: BrImageUploadProps) => {
    const [images, setImages] = useState([] as Images)
    const {getItem} = useStorage()
    const zenKeys = `
        {
            "keyring": {
                            "eddsa": "${getItem('eddsa_key', 'local')}"
                        }
        }
    `
    const isNotImageSelected = (props.value?.length === 0)

    async function hashFile(ab: ArrayBuffer): Promise<string> {
        const bytesChunkSize = 1024 * 64;
        let ctx = await zenroom_hash_init('sha512');
        if(ctx.logs) devLog("ERROR during hash");
        let i;
        for(i = 0; i < ab.byteLength; i+=bytesChunkSize) {
            const upperLimit = i+bytesChunkSize > ab.byteLength ?
                ab.byteLength : i+bytesChunkSize;
            const i8a = new Uint8Array(ab.slice(i, upperLimit));
            ctx = await zenroom_hash_update(ctx.result, i8a);
        }
        ctx = await zenroom_hash_final(ctx.result);

        return ctx.result;
    }

    function handleUpload(elements: any) {
        const images: Images = []
        Array.from(elements).forEach(async (element: any) => {
            devLog()
            const hash = base64url.fromBase64(
                await hashFile(await element.arrayBuffer()));
            const zenData = `
        {
                "hashedFile": "${hash}",
        }
    `
            devLog(element)
            devLog('hash:', hash)
            devLog('zenData:', zenData)
            const image: Image = {
                name: element.name,
                description: element.name,
                extension: element.name.split('.').at(-1),
                hash: hash,
                mimeType: element.type,
                size: element.size,
                signature: await zencode_exec(signFile(), {
                    data: zenData,
                    keys: zenKeys
                }).then(({result}) => JSON.parse(result).eddsa_signature)
            }
            images.push(image)
            devLog('image', image)
        })
        props.onChange(images)
        props.setImagesFiles(Array.from(elements))
    }

    return (<>
        <div className={`form-control ${props.className}`}>
            <label className="label">
                <span className="label-text">{props.label}</span>
            </label>
            <div className="flex justify-center items-center w-full">
                <label htmlFor="dropzone-file"
                       className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-100">
                    {isNotImageSelected && <><div className="flex flex-col justify-center items-center pt-5 pb-6">
                        <svg aria-hidden="true" className="mb-3 w-10 h-10 text-gray-400" fill="none"
                             stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500"><span
                            className="font-semibold">Click to upload</span> or
                            drag and drop</p>
                        <p className="text-xs text-gray-500">{props.placeholder}</p>

                    </div></>}
                    {!isNotImageSelected && <>
                        <div className="w-3/12 border border-primary">
                            <img className="w-full"/>
                        </div>
                        <button className="btn btn-ghost" onClick={() => props.onChange([])}>x</button>
                    </>}
                    <input id="dropzone-file" type="file" className="hidden" onChange={(e) => {
                        handleUpload(e.target.files)
                    }} multiple/>
                </label>
            </div>
            <label className="label">
                {props.error &&
                <span className="flex flex-row items-center justify-between label-text-alt text-warning">
                    <ExclamationIcon className='w-5 h-5'/>
                    {props.error}</span>}
                {props.hint && <span className="label-text-alt">{props.hint}</span>}
            </label>
        </div>
    </>)
}

export default BrImageUpload;
