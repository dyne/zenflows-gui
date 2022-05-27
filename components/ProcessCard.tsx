import Card from "./Card";
import React from "react";

const ProcessCard = ({process}:any) => (<>
  <Card title={process?.name}>
    <ul>
      <li>{process?.__typename}</li>
      <li>description:{process?.note}</li>
      <li>{process?.finished}</li>
    </ul>
  </Card>
</>)

export default ProcessCard