import React from 'react';
import select_resource_type from "./select_resource_type";

type PopupPops = {
    name: string,
    action1:string,
    action2?:string,
    buttons?: any,
    children?:any,
}

function Popup({name, action1, action2, buttons, children }:PopupPops) {
    const buttonClose = ()=> action2 ? (<label htmlFor={name} className="btn">{action2}</label>) : (<></>)
    return (<>
            <label htmlFor={name} className="btn btn-primary modal-button">{action1}</label>
            <input type="checkbox" id={name} className="modal-toggle"/>
              <div className="modal">
                  <div className="modal-box">
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