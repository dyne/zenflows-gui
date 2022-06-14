import Card from "./brickroom/Card";
import Link from "next/link";
import React from "react";

const EconomicEventCards = ({event}: any) => (<>
    <Card title={event?.action?.id}>
        <>
            <li>note:{event?.note}</li>
            <li>from:{event?.provider?.displayUsername}</li>
            <li><Link href={`/profile/${event?.receiver?.id}`}>
                <a className="btn btn-ghost">to:{event?.provider?.displayUsername}</a>
            </Link></li>
            <li><Link href={`/profile/${event?.receiver?.id}`}>
                <a className="btn btn-ghost">to:{event?.receiver?.displayUsername}</a>
            </Link></li>
            <li>resource type:{event?.resourceConformsTo?.name}</li>
            <li><Link href={`/resource/${event?.resourceInventoriedAs?.id || ''}`}>
                <a className="btn btn-ghost">see inside inventory</a>
            </Link></li>
            <li>quantity:{event?.resourceQuantity?.hasNumericalValue} {event?.resourceQuantity?.hasUnit.label}</li>
        </>
    </Card>
</>)

export default EconomicEventCards