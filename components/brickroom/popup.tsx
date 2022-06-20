import React from 'react';

type PopupPops = {
    name: string,
    action1: string,
    action2?: string,
    buttons?: any,
    children?: any,
}

function Popup({ name, action1, action2, buttons, children }: PopupPops) {
    const buttonClose = () => action2 ? (<label htmlFor={name} className="btn">{action2}</label>) : (<></>)
    return (<>
        <label htmlFor={name} className="btn modal-button">{action1}</label>
        <input type="checkbox" id={name} className="modal-toggle" />
        <div className="modal">
            <div className="pt-10 modal-box">
                <label htmlFor={name} className="absolute btn btn-sm btn-outline btn-square right-2 top-2">✕</label>
                {children}
                <div className="modal-action">
                    {buttons}{buttonClose()}
                </div>
            </div>
        </div>
    </>
    )
}

export default Popup;