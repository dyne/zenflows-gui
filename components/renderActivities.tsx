import React from 'react';
import ProcessCard from "./ProcessCard";
import EconomicEventCard from "./EconomicEventCard";
import BrTable from "./brickroom/BrTable";
import AvatarUsers from "./avatarUsers";


const RenderActivities = ({userActivities}:{userActivities:any[]}) => {
    const processes:Array<any> = []
    const economicEvent:Array<any> = [];
    const processesHead = ['process','status','description', 'users']
    const eventHead = ['last update', 'activity', 'resource', 'provider', 'receiver', 'input', 'output', 'notes']
  userActivities?.map((a:any)=>{
      (a.object.__typename == "Process")&&processes.push(a.object);
      (a.object.__typename == "EconomicEvent")&&economicEvent.push(a.object);
  });

  return (<>
          <BrTable headArray={processesHead}>
              {processes.map((p)=><tr key={p.id}>
                    <th>{p.name}</th>
                    <td>{p.finished? 'finished' : <div className="badge badge-success">active</div>}</td>
                    <td>{p.note}</td>
                    <td>
                        <AvatarUsers/>
                    </td>
                </tr>)}
          </BrTable>
          <BrTable headArray={eventHead}>
              {economicEvent.map((e)=><tr key={e.id}>
                    <td></td>
                    <td>{e.action.id}</td>
                    <td>{e.resourceConformsTo?.name}</td>
                    <td>{e.provider.displayUsername}</td>
                    <td>{e.receiver.displayUsername}</td>
                    <td>{e.inputOf}</td>
                    <td>{e.outputOf}</td>
                    <td>{e.note}</td>
                </tr>)}
          </BrTable>
      <ul>
      </ul>
      <br />
    </>
  );
}

export default RenderActivities