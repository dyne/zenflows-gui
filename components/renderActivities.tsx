import React from 'react';

export default function renderActivities(userActivity: any) {
  const obj = userActivity.object;
  if (obj.__typename == "Process") {
    return <li key={obj.id} className="border-l-8 ml-2 ">
      <ul>
        <li>{obj.__typename}</li>
        <li>title:{obj.name}</li>
        <li>description:{obj?.note}</li>
        <li>{obj?.finished}</li>
      </ul><br />
    </li>;
  }
  else if (obj.__typename == "EconomicEvent") {
    return <li key={obj.action?.id} className="border-l-8 ml-2 ">
      <ul>
        <li>Activity:{obj.action?.id}</li>
        <li>note:{obj.note}</li>
        <li>from:{obj.provider?.displayUsername}</li>
        <li>to:{obj.receiver?.displayUsername}</li>
        <li>resource type::{obj.resourceConformsTo?.name}</li>
        <li>quantity:{obj.resourceQuantity?.hasNumericalValue} {obj.resourceQuantity?.hasUnit.label}</li>
      </ul><br />

    </li>;
  } return <><b>nothing to show</b><br /><br /></>
}
