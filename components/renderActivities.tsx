import React from 'react';
import Link from "next/link";
import Card from "./Card";
import ProcessCard from "./ProcessCard";


const EconomicEventAttributes = (obj:any) => <>
  <li>Activity:{obj.action?.id}</li>
  <li>note:{obj.note}</li>
  <li>from:{obj.provider?.displayUsername}</li>
  <li>to:{obj.receiver?.displayUsername}</li>
  <li>resource type::{obj.resourceConformsTo?.name}</li>
  <li><Link href={`/resource/${obj.resourceInventoriedAs?.id || ''}`}><a>resource link</a></Link></li>
  <li>quantity:{obj.resourceQuantity?.hasNumericalValue} {obj.resourceQuantity?.hasUnit.label}</li>
</>

const RenderActivities = (userActivity: any) => {
  const obj = userActivity.object;
  const isProcess = () => obj.__typename == "Process"
  const isEconomicEvent = () => obj.__typename == "EconomicEvent"

  if (!obj)
    return (<><b>nothing to show</b><br /><br /></>)

  return (
    <li key={obj.id} className="ml-2">
      <ul>
        {isProcess() && <ProcessCard process={obj}/>}
        {isEconomicEvent() && EconomicEventAttributes(obj)}
      </ul>
      <br />
    </li>
  );
}

export default RenderActivities