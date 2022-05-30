import React from 'react';
import ProcessCard from "./ProcessCard";
import EconomicEventCard from "./EconomicEventCard";


const RenderActivities = ({userActivity}:{userActivity:any}) => {
  const obj = userActivity;
  const isProcess = () => obj.__typename == "Process"
  const isEconomicEvent = () => obj.__typename == "EconomicEvent"

  if (!obj)
    return (<><b>nothing to show</b><br /><br /></>)

  return (
    <div key={obj.id} className="ml-2">
      <ul>
        {isProcess() && <ProcessCard process={obj}/>}
        {isEconomicEvent() && <EconomicEventCard event={obj}/>}
      </ul>
      <br />
    </div>
  );
}

export default RenderActivities