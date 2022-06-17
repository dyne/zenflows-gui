import React, {useState} from "react";
import Link from "next/link";


import BrTable from "./brickroom/BrTable";
import BrPagination from "./brickroom/BrPagination";

const EventTable = ({economicEvents}:{economicEvents:Array<any>}) => {
  const [economicEventStartPage, seteconomicEventStartPage] = useState(0)
  const [economicEventEndPage, seteconomicEventEndPage] = useState(10)
  const economicEventsHead = ['last update', 'activity', 'resource', 'provider', 'receiver', 'input', 'output', 'notes']
  function paginate (array:Array<any>, start: number = 0, end: number = 10) {
        return array?.filter((e,i)=>(i<end&&i>start))
    }
  const economicEventsPages = Math.floor(economicEvents?.length/10 + 1 | 1)
  return (<>
   <BrTable headArray={economicEventsHead}>
              {paginate(economicEvents, economicEventStartPage, economicEventEndPage)?.map((e)=><tr key={e.id}>
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

          <BrPagination max={economicEventsPages} handleStart={seteconomicEventStartPage} handleEnd={seteconomicEventEndPage}/>

</>)}

export default EventTable