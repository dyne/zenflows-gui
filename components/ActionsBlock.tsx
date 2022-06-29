import React, {ReactNode} from 'react';
import Popup from "./brickroom/popup";
import Card from "./brickroom/Card";
import {ActionsEnum} from "../lib/ActionsEnum";
import Produce from "./produce";
import Raise from "./raise";
import Transfer from "./transfer";
import Use from "./use";
import Consume from "./consume";
import Lower from "./lower";
import {
    ChartPieIcon,
    LightningBoltIcon,
    PuzzleIcon,
    SwitchHorizontalIcon, TrendingDownIcon,
    TrendingUpIcon
} from "@heroicons/react/solid";

type ActionBlockProps = { processId?: string, resourceId?: string }

const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque pellentesque hendrerit ultrices mauris et non pellentesque suspendisse est. "

type Action = { name: string, component: ReactNode, svg: ReactNode, disabled?:boolean }


const ActionsBlock = ({processId, resourceId}: ActionBlockProps) => {
    const svgCss = "w-6 ml-1 text-accent"
    const actions: Array<Action> = [
        {
            name: ActionsEnum.Produce,
            component: <Produce processId={processId} intro={{title: 'Produce a resource', description: lorem}}/>,
            svg: <PuzzleIcon className={svgCss}/>,
            disabled: !!resourceId
        },
        {
            name: ActionsEnum.Raise,
            component: <Raise processId={processId} intro={{title: 'Produce a resource', description: lorem}}/>,
            svg: <TrendingUpIcon className={svgCss}/>
        },
        {
            name: ActionsEnum.Transfer,
            component: <Transfer processId={processId} intro={{title: 'Produce a resource', description: lorem}}/>,
            svg: <SwitchHorizontalIcon className={svgCss}/>
        },
        {
            name: ActionsEnum.Use,
            component: <Use processId={processId} intro={{title: 'Produce a resource', description: lorem}}/>,
            svg: <LightningBoltIcon className={svgCss}/>
        },
        {
            name: ActionsEnum.Consume,
            component: <Consume processId={processId} intro={{title: 'Produce a resource', description: lorem}}/>,
            svg: <ChartPieIcon className={svgCss}/>
        },
        {
            name: ActionsEnum.Lower,
            component: <Lower processId={processId} intro={{title: 'Produce a resource', description: lorem}}/>,
            svg: <TrendingDownIcon className={svgCss}/>
        },
    ]
    return (<Card>
            {processId&& <><h2>Perform an Action on this Process:</h2>
                <p>Lorem ipsum dolor sit amet process</p></>}
            <span className="float-left mr-2">
            {actions?.map((a: Action) => <span key={a.name} className="mr-2">
                <Popup name={a.name} action1={a.name} svg={a.svg} disabled={a.disabled}>{a.component}</Popup></span>
            )}</span>
        </Card>
    )
}

export default ActionsBlock;