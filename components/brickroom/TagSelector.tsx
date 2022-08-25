import React, {ChangeEvent, useEffect} from 'react';
import BrTextField from "./BrTextField";

type TagSelectorProps = {
    tags?: Array<string>,
    selectedTags?: Array<string>,
    onSelect?: (tags: string[]) => void,
    onSubmit?: () => void,
    onCancel?: () => void,
    className?: string,
    hint?: string,
    error?: string,
    label?: string,
    placeholder?: string,
}

const TagSelelector = (props: TagSelectorProps) => {
    const [tags, setTags] = React.useState(props.tags &&[...props.tags]);

    const handleAdd = async (e: ChangeEvent<HTMLInputElement>) => {
        setTags(Array.from(new Set(
            e.target.value.split(/\s/).filter(tag => tag.length > 0)
        )))
    }
    const cancelTag = (tag:string) => {
        setTags([...tags!.filter(t => t !== tag)])
    }

    useEffect(() => {
        props.onSelect && props.onSelect(tags!);
    }, [tags]);
    return (<>
        <div className={`form-control ${props.className}`}>
             <label className="label mb-[-3px]">
                <span className="label-text">{props.label}</span>
            </label>
            {tags && tags.length > 0 && <>{
                tags?.map((tag: string) => <span key={tag} className="badge left mb-1"><button  className={'btn btn-ghost btn-xs'} onClick={()=>cancelTag(tag)}>x</button> {tag}</span>)
            }</>}
            <BrTextField placeholder={props.placeholder} hint={props.hint} error={props.error} onChange={handleAdd}/>
        </div>
        </>)
}

export default TagSelelector;