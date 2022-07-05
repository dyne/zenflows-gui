import SelectUnit from "./select_unit";
import SelectResourceType from "./select_resource_type";
import React, {ChangeEvent, useState} from "react";
import {useAuth} from "../lib/auth";
import {DocumentNode, TypedDocumentNode, useMutation} from "@apollo/client";
import SelectUser from "./SelectUser";
import SelectInventoriedResource from "./SelectInventoriedResource";
import {ActionsEnum} from "../lib/ActionsEnum";
import BrInput from "./brickroom/BrInput";
import BrTextField from "./brickroom/BrTextField";
import {useRouter} from "next/router";
import SelectDate from "./SelectDate";

type ActionVariables = {
    inputOf?: string,
    provider: string,
    receiver: string,
    resourceInventoriedAs?: string,
    outputOf?: string,
    newInventoriedResource?: { name: string, note: string },
    resourceConformsTo?: string,
    resourceQuantity: { hasNumericalValue: number, hasUnit: string },
    hasPointInTime: string,
}


type ActionFormProps = {
    MUTATION: DocumentNode | TypedDocumentNode,
    processId?: string,
    type: ActionsEnum,
    inventoriedResource?: { name: string, id: string, onhandQuantity: any },
    intro?: { title: string, description: string }
}


const ActionForm = (props: ActionFormProps) => {
    const [unitId, setUnitId] = useState('')
    const [quantity, setQuantity] = useState(0)
    const [resourceType, setResourceType] = useState('')
    const [hasPointInTime, setHasPointInTime] = useState('')
    const [hasBeginning, setHasBeginning] = useState('')
    const [hasEnd, setHasEnd] = useState('')
    const [resourceName, setResourceName] = useState('')
    const [resourceNote, setResourceNote] = useState('')
    const [inventoriedResource, setInventoriedResource] = useState(props.inventoriedResource)

    const router = useRouter()

    const {authId} = useAuth()

    const [performAction, {data, loading, error}] = useMutation(props.MUTATION)

    const variables: () => ActionVariables | undefined = () => {
        switch (props.type) {
            case ActionsEnum.Produce:
                return {
                    provider: authId,
                    receiver: authId,
                    outputOf: props.processId,
                    newInventoriedResource: {name: resourceName, note: resourceNote},
                    resourceConformsTo: resourceType,
                    resourceQuantity: {hasNumericalValue: quantity, hasUnit: unitId},
                    hasPointInTime: new Date(hasPointInTime).toISOString()
                }
            case ActionsEnum.Use :
            case ActionsEnum.Consume:
            case ActionsEnum.Lower:
                return {
                    inputOf: props.processId,
                    provider: authId,
                    receiver: authId,
                    resourceInventoriedAs: inventoriedResource!.id,
                    resourceQuantity: {
                        hasNumericalValue: quantity,
                        hasUnit: unitId
                    },
                    hasPointInTime: new Date(hasPointInTime).toISOString()
                }
            case ActionsEnum.Transfer:
                return {
                    inputOf: props.processId,
                    provider: authId,
                    receiver: authId,
                    resourceInventoriedAs: inventoriedResource!.id,
                    resourceQuantity: {
                        hasNumericalValue: quantity,
                        hasUnit: unitId
                    },
                    hasPointInTime: new Date(hasPointInTime).toISOString()
                }
        }
    }

    function onSubmit() {
        //TODO: handle error and response
        const vars = variables()
        performAction({variables: vars}).then((r:any)=>{
            const economicEvent = r.data?.createEconomicEvent.economicEvent
            router.push(`/processes/${economicEvent.outputOf?.id || economicEvent.inputOf?.id}`)
        })
    }

    const handleUnit = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setUnitId(e.target.value)
    }
    const handleResource = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setResourceType(e.target.value)
    }

    return (<>
            <form>
                {props.intro && (<>
                    <h2>{props.intro.title}</h2>
                    <p>{props.intro.description}</p>
                </>)}
                {!props.processId && <BrInput/>}

                {(props.type === ActionsEnum.Produce || props.type === ActionsEnum.Raise) && <>
                    <SelectResourceType handleSelect={handleResource}/>
                    <div className="grid grid-cols-3 gap-2">
                        <BrInput type="number" placeholder="0" label="Quantity"
                                 onChange={(e: ChangeEvent<HTMLInputElement>) => setQuantity(parseInt(e.target.value))}/>
                        <SelectUnit handleSelect={handleUnit} className="col-span-2"/>
                    </div>
                    <BrTextField label="Resource Description" onChange={(e: any) => setResourceName!(e.target.value)}
                                 placeholder="Resource Description"/>
                    <BrTextField label="Optional Notes:" onChange={(e: any) => setResourceNote!(e.target.value)}
                                 placeholder="Note"/>
                </>}
                {(props.type === ActionsEnum.Transfer) && <><input type="number"
                                                                   placeholder="Type here"
                                                                   className="input input-bordered"
                                                                   onChange={(e) => setQuantity(parseInt(e.target.value))}
                />
                    <SelectUnit handleSelect={handleUnit} className="select select-bordered w-full"/>
                    <SelectResourceType handleSelect={handleResource}/>
                    <SelectUser/>
                    <textarea onChange={(e) => setResourceNote(e.target.value)}
                              className="textarea textarea-bordered w-full" placeholder="Note"/>
                    <textarea onChange={(e) => setResourceNote(e.target.value)}
                              className="textarea textarea-bordered w-full" placeholder="Note"/></>}


                {(props.type === ActionsEnum.Use) && <><SelectInventoriedResource
                    inventoriedResource={props.inventoriedResource}
                    handleSelect={(e: any) => setInventoriedResource(e)}/>
                    <textarea onChange={(e) => setResourceNote(e.target.value)}
                              className="textarea textarea-bordered w-full" placeholder="Note"/></>}

                {(props.type === "consume" || props.type === "lower") && <><input type="number"
                                                                                  placeholder="Type here"
                                                                                  className="input input-bordered"
                                                                                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                />
                    <SelectUnit handleSelect={handleUnit}/>
                    <SelectInventoriedResource handleSelect={(e: any) => setInventoriedResource(e)}/>
                    <textarea onChange={(e) => setResourceNote(e.target.value)}
                              className="textarea textarea-bordered w-full" placeholder="Note"/></>}
                <SelectDate handleHasPointInTime={setHasPointInTime} handleHasBeginning={setHasBeginning} handleHasEnd={setHasEnd}/>
                <button type="button" onClick={onSubmit} className="btn btn-primary float-right">{props.type}</button>
            </form>
        </>
    )
};

export default ActionForm