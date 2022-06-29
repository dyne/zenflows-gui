import React, {ReactEventHandler} from 'react';
import {MailIcon} from "@heroicons/react/solid";

type PopupPops = {
    name: string,
    action1: string,
    action2?: ReactEventHandler,
    buttons?: any,
    children?: any,
    svg?:React.ReactNode,
}

function Popup({ name, action1, action2, buttons, children, svg }: PopupPops) {
    return (<>
        <label htmlFor={name} className="btn modal-button text-normal font-medium normal-case" onClick={action2}>{action1}{svg}</label>
        <input type="checkbox" id={name} className="modal-toggle" />
        <div className="modal">
            <div className="pt-10 modal-box">
                <label htmlFor={name} className="absolute btn btn-sm btn-outline btn-square right-2 top-2">✕</label>
                {children}
                <div className="modal-action">
                    {buttons}
                </div>
            </div>
        </div>
    </>
    )
}

export default Popup;