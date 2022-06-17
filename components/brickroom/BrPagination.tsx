import React from "react";

type BrPaginationProps = {
    max:number,
    handleStart: any,
    handleEnd:any
}

const BrPagination = (props:BrPaginationProps) => {

    return (<div className="grid grid-cols-1 gap-4 place-items-center">
        <div className="btn-group ">

        {Array.from(Array(props.max).keys()).map((a)=>(
                  <button key={a}
                          onClick={()=>{props.handleStart(a*10)
                              props.handleEnd((a*10)+10)}}
                          className="btn btn-ghost btn-xs">
                      {a}
                  </button>))}
    </div>
    </div>
         )
}

export default BrPagination