import React, { ReactNode } from 'react';
import Popup from "./brickroom/popup";
import Card from "./brickroom/Card";
import { ActionsEnum } from "../lib/ActionsEnum";
import Produce from "./produce";
import Raise from "./raise";
import Transfer from "./transfer";
import Use from "./use";
import Consume from "./consume";
import Lower from "./lower";

type ActionBlockProps = { processId?: string }

const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque pellentesque hendrerit ultrices mauris et non pellentesque suspendisse est. "

type Action = { name: string, component: ReactNode };


const ActionsBlock = ({ processId }: ActionBlockProps) => {
    const actions: Array<Action> = [
        { name: ActionsEnum.Produce, component: <Produce processId={processId} intro={{ title: 'Produce a resource', description: lorem }} /> },
        { name: ActionsEnum.Raise, component: <Raise processId={processId} intro={{ title: 'Produce a resource', description: lorem }} /> },
        { name: ActionsEnum.Transfer, component: <Transfer processId={processId} intro={{ title: 'Produce a resource', description: lorem }} /> },
        { name: ActionsEnum.Use, component: <Use processId={processId} intro={{ title: 'Produce a resource', description: lorem }} /> },
        { name: ActionsEnum.Consume, component: <Consume processId={processId} intro={{ title: 'Produce a resource', description: lorem }} /> },
        { name: ActionsEnum.Lower, component: <Lower processId={processId} intro={{ title: 'Produce a resource', description: lorem }} /> },
    ]
    return (<Card>
        <span className="float-left mr-2">
            {actions?.map((a: Action) => <span key={a.name} className="mr-2">
                <Popup name={a.name} action1={a.name}>{a.component}</Popup></span>
            )}</span>
    </Card>
    )
}

export default ActionsBlock;