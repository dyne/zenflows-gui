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

type ActionBlockProps = {processId?:string}



const ActionsBlock = ({processId}:ActionBlockProps) =>{
    const actions:Array<{name:string, component:ReactNode}> = [
        {name:ActionsEnum.Produce,component: <Produce processId={processId}/>},
        {name:ActionsEnum.Raise,component: <Raise processId={processId}/>},
        {name:ActionsEnum.Transfer,component: <Transfer processId={processId}/>},
        {name:ActionsEnum.Use,component: <Use processId={processId}/>},
        {name:ActionsEnum.Consume,component: <Consume processId={processId}/>},
        {name:ActionsEnum.Lower,component: <Lower processId={processId}/>},
        ]
    return (<Card>
            <span  className="float-left mr-2">
            {actions?.map((a:{name:string, component:ReactNode})=><span key={a.name} className="mr-2">
          <Popup  name={a.name} action1={a.name}>{a.component}</Popup></span>
      )}</span>
        </Card>
    )
}

export default ActionsBlock;