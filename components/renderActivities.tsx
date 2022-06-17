import React from 'react';
import ProcessTable from "./ProcessTable";
import EventTable from "./EventTable";


const RenderActivities = ({userActivities}:{userActivities:any[]}) => {
    const processes:Array<any> = []
    const economicEvent:Array<any> = [];
    userActivities?.map((a:any)=>{
      (a.object.__typename == "EconomicEvent")&&economicEvent.push(a.object);
          (a.object.__typename == "Process")&&processes.push(a.object);

    });

  return (<>
          <ProcessTable processes={processes}/>
          <EventTable economicEvents={economicEvent}/>
      </>
  );
}

export default RenderActivities