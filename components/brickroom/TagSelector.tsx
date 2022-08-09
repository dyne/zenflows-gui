import React from 'react';
import BrTextField from "./BrTextField";

type TagSelectorProps = {
    tags: Array<string>,
    selectedTags?: Array<string>,
    onSelect?: (tag: string) => void,
    onDeselect?: (tag: string) => void,
    onSubmit?: () => void,
    onCancel: () => void,
    onClose: () => void,
    className?: string,
    hint?: string,
    error?: string,
    label?: string,
    placeholder?: string,

}

const TagSelelector = (props: TagSelectorProps) => {
    return (<>
        <div className={`form-control ${props.className}`}>
            {props.selectedTags && props.selectedTags.length > 0 && <>{
                props.selectedTags.map((tag: string) => {
                    return <span key={tag} className="tag">{tag}</span>
                })
            }</>}
            <BrTextField placeholder={props.placeholder} label={props.label} hint={props.hint} error={props.error} onChange={}/>
        </div>
        </>)
}

export default TagSelelector;