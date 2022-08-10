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
    const [value, setValue] = React.useState('');

    const onBlur = async (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        if (e.target.value.slice(-1) === ' ' && e.target.value.length > 1) {
        setTags(Array.from(new Set(
            e.target.value.split(' ').filter(tag => tag.length > 0)
        )))
        }
    }
    const cancelTag = (tag:string) => {
        setTags([...tags!.filter(t => t !== tag)])
    }

    useEffect(() => {
        props.onSelect && props.onSelect(tags!);
    }, [tags]);
    return (<>
        <div className={`form-control ${props.className}`}>
            {tags && tags.length > 0 && <>{
                tags?.map((tag: string) => {
                    return <span key={tag} className="badge left mb-1"><button  className={'btn btn-ghost btn-xs'} onClick={()=>cancelTag(tag)}>x</button> {tag}</span>
                })
            }</>}
            <BrTextField placeholder={props.placeholder} label={props.label} hint={props.hint} error={props.error} onChange={onBlur} value={value} onBlur={()=>setValue('')}/>
        </div>
        </>)
}

export default TagSelelector;