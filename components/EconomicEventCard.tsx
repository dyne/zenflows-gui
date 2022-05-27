import Card from "./Card";
import Link from "next/link";
import React from "react";

const EconomicEventCards = ({event}:any) => (<>
  <Card title={event?.action?.id}>
      <>
        <li>note:{event?.note}</li>
        <li>from:{event?.provider?.displayUsername}</li>
        <li>to:{event?.receiver?.displayUsername}</li>
        <li>resource type::{event?.resourceConformsTo?.name}</li>
        <li><Link href={`/resource/${event?.resourceInventoriedAs?.id || ''}`}><a>resource link</a></Link></li>
        <li>quantity:{event?.resourceQuantity?.hasNumericalValue} {event?.resourceQuantity?.hasUnit.label}</li>
      </>
  </Card>
</>)

export default EconomicEventCards