import React, {useState} from 'react';
import ProcessCard from "./ProcessCard";
import EconomicEventCard from "./EconomicEventCard";
import BrTable from "./brickroom/BrTable";
import AvatarUsers from "./avatarUsers";
import BrPagination from "./brickroom/BrPagination";


const RenderActivities = ({userActivities}:{userActivities:any[]}) => {
    const [processStartPage, setProcessStartPage] = useState(0)
    const [processEndPage, setProcessEndPage] = useState(10)
    const [eventStartPage, setEventStartPage] = useState(0)
    const [eventEndPage, setEventEndPage] = useState(10)
    const processes:Array<any> = []
    const economicEvent:Array<any> = [];
    const processesHead = ['process','status','description', 'users']
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

          <BrTable headArray={processesHead}>
              {paginate(processes, processStartPage, processEndPage).map((p)=><tr key={p.id}>
                    <th>{p.name}</th>
                    <td>{p.finished? 'finished' : <div className="badge badge-success">active</div>}</td>
                    <td>{p.note}</td>
                    <td>
                        <AvatarUsers/>
                    </td>
                </tr>)}


          </BrTable>

          <BrPagination max={processesPages} handleStart={setProcessStartPage} handleEnd={setProcessEndPage}/>


          <BrTable headArray={eventHead}>
              {paginate(economicEvent, eventStartPage, eventEndPage).filter((e,i)=>i<10).map((e)=><tr key={e.id}>
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
        <BrPagination max={eventPages} handleStart={setEventStartPage} handleEnd={setEventEndPage}/>

      <ul>
      </ul>
      <br />
    </>
  );
}

export default RenderActivities