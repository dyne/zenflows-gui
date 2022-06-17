import React, {useState} from 'react';
import BrTable from "./brickroom/BrTable";
import BrPagination from "./brickroom/BrPagination";
import ProcessTable from "./ProcessTable";
import EventTable from "./EventTable";


const RenderActivities = ({userActivities}:{userActivities:any[]}) => {
    const processes:Array<any> = []
    const economicEvent:Array<any> = [];
    const eventHead = ['last update', 'activity', 'resource', 'provider', 'receiver', 'input', 'output', 'notes']
    userActivities?.map((a:any)=>{
      (a.object.__typename == "EconomicEvent")&&economicEvent.push(a.object);
          (a.object.__typename == "Process")&&processes.push(a.object);

    });
    function paginate (array:Array<any>, start: number = 0, end: number = 10) {
        return array.filter((e,i)=>(i<end&&i>start))
    }

    const processesPages = Math.floor(processes.length/10 + 1)
    const eventPages = Math.floor(economicEvent.length/10 + 1)
  return (<>
          <ProcessTable processes={processes}/>
          <EventTable economicEvents={economicEvent}/>
      </>
  );
}

export default RenderActivities