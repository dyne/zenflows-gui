import React, {FormEventHandler, useState} from "react";
import SelectResourceType from "../components/select_resource_type";
import SelectUnit from "../components/select_unit";
import {useAuth} from "../lib/auth";

type ActionFormProps = {
    handleUnitId:Function,
    action:{onSubmit:FormEventHandler<HTMLFormElement>,name:string},
    handleQuantity:Function,
    handleResourceName:Function,
    handleResourceType:Function,
    handleResourceNote:Function,
    handleHasPointInTime:Function,
}

const ActionForm = (props:ActionFormProps) => {
  return (
      <form onSubmit={props.action.onSubmit}>
          <SelectResourceType handleSelect={props.handleResourceType}/>
          <input type="number"
                 placeholder="Type here"
                 className="input input-bordered"
                 onChange={(e)=>props.handleQuantity(parseInt(e.target.value))}
          />
          <SelectUnit handleSelect={props.handleUnitId}/>
          <textarea onChange={(e)=>props.handleResourceName(e.target.value)}
                    className="textarea textarea-bordered w-full" placeholder="Resource Descrption"/>
          <textarea onChange={(e)=>props.handleResourceNote(e.target.value)} className="textarea textarea-bordered w-full" placeholder="Note"/>
          <input onChange={(e)=>props.handleHasPointInTime(e.target.value)} type="date" placeholder="Date 1" className="input input-bordered"/>
          <input type="date" placeholder="Date 2" className="input input-bordered"/>
          <input type="date" placeholder="Date 3" className="input input-bordered"/>
          <label htmlFor="produce">
              <button type="submit" className="btn btn-primary float-right">Produce</button>
          </label>
      </form>
  )};

export default ActionForm
