import Card from "./Card";
import React from "react";
import Link from "next/link";

const ProcessCard = ({process}:any) => (<>
  <Link href={"/processes/" + process.id}><a>
    <Card title={process?.name}>
      <ul>
        <li>{process?.__typename}</li>
        <li>description:{process?.note}</li>
        <li>{process?.finished}</li>
      </ul>
    </Card>
  </a></Link>
</>)

export default ProcessCard