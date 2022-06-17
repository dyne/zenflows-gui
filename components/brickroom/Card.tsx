import React, {ReactElement} from 'react'

export enum CardWidth {
    SM ='w-24',
    LG = 'w-128',
    Full = 'w-full'
}

type CardProps = {
    title:string,
    action?:{name:string, handle:Function},
    children: ReactElement<any, any>,
    width?:CardWidth,
    className?:string
}

const Card = (props:CardProps) => {

    const cardCss = `${props.width} ${props.className} card bg-base-100 shadow-xl`
    return (<>
        <div className={cardCss}>
            <div className="card-body">
                <>
                    <h1 className="card-title heading1">
                        {props.title}
                    </h1>
                    {props.children}
                    {props.action&&<div className="card-actions justify-end">
                        <button onClick={props.action.handle()} className="btn btn-primary">{props.action.name}</button>
                    </div>}
                </>
            </div>
        </div></>)
};
export default Card;