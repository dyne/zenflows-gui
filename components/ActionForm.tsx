import SelectUnit from "./select_unit";
import SelectResourceType from "./select_resource_type";
import React, {FormEventHandler} from "react";

type ActionFormProps = {
    handleUnit: Function,
    handleResource: Function,
    setResourceNote: Function,
    setHasPointInTime: Function,
    setQuantity: Function,
    setResourceName?:Function,
    onSubmit: FormEventHandler<HTMLFormElement>,
    type: "produce" | "raise" | "transfer" | "use" | "consume" | "lower",
}

const ActionForm = (props:ActionFormProps) => {

return (<>
    <form onSubmit={props.onSubmit}>

          {(props.type==="produce" || props.type==="raise")&&<><SelectResourceType handleSelect={props.handleResource}/>
          <input type="number"
                 placeholder="Type here"
                 className="input input-bordered"
                 onChange={(e) => props.setQuantity(parseInt(e.target.value))}
          />
          <SelectUnit handleSelect={props.handleUnit}/>
          <textarea onChange={(e)=>props.setResourceName!(e.target.value)} className="textarea textarea-bordered w-full" placeholder="Resource Descrption"/>
          <textarea onChange={(e)=>props.setResourceNote(e.target.value)} className="textarea textarea-bordered w-full" placeholder="Note"/></>}

        {(props.type==="transfer")&&<><input type="number"
                 placeholder="Type here"
                 className="input input-bordered"
                 onChange={(e) => props.setQuantity(parseInt(e.target.value))}
          />
          <SelectUnit handleSelect={props.handleUnit}/>
          <SelectResourceType handleSelect={props.handleResource}/>
          <select className="select select-bordered w-full"/>
          <textarea onChange={(e)=>props.setResourceNote(e.target.value)} className="textarea textarea-bordered w-full" placeholder="Note"/>
          <textarea onChange={(e)=>props.setResourceNote(e.target.value)} className="textarea textarea-bordered w-full" placeholder="Note"/></>}

          <input onChange={(e)=>props.setHasPointInTime(e.target.value)} type="date" placeholder="Date 1" className="input input-bordered"/>
          <input type="date" placeholder="Date 2" className="input input-bordered"/>
          <button type="submit" className="btn btn-primary float-right">{props.type}</button>
      </form>
        </>
  )};

export default ActionForm