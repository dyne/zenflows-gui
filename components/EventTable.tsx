import React, {useState} from "react";
import Link from 'next/link';



import BrTable from "./brickroom/BrTable";
import BrPagination from "./brickroom/BrPagination";

const EventTable = ({economicEvents}:{economicEvents:Array<any>}) => {
  const [economicEventStartPage, seteconomicEventStartPage] = useState(0)
  const [economicEventEndPage, seteconomicEventEndPage] = useState(10)
  const economicEventsHead = ['activity', 'process', 'resource', 'provider', 'receiver', 'notes']
  const ActionChip = ({action}:{action:string}) => <span className="bg-[#E5E7EB] py-2 px-4 rounded">{action}</span>
    const ResourceCell = ({conform,inventoried, quantity, action}:{
        conform?:any,
        inventoried?:any,
        quantity?:any,
        action?:any})=>(
        <Link href={`/resource/${inventoried?.id}`}>
            <a>
                <h4>{inventoried?.name}</h4>
                <span>{`${action}d`} {quantity?.hasNumericalValue} {quantity?.hasUnit.label} {conform&&`of ${conform.name}`}</span>
            </a>
        </Link>
    )
    const ProcessCell = ({input, output}:{
        input?:{id:string,name:string},
        output?:{id:string,name:string}})=>(
            <Link href={`processes/${input?.id || output?.id}`}>
                <a>
                    {input&&`input of ${input.name}`}
                    {output&&`outcome of ${output.name}`}
                </a>
            </Link>)
    function paginate (array:Array<any>, start: number = 0, end: number = 10) {
        return array?.filter((e,i)=>(i<end&&i>start))
    }
  const economicEventsPages = Math.floor(economicEvents?.length/10 + 1 | 1)
  return (<>
   <BrTable headArray={economicEventsHead}>
              {paginate(economicEvents, economicEventStartPage, economicEventEndPage)?.map((e)=><tr key={e.id}>
                  <td><ActionChip action={e.action.id}/></td>
                  <td><ProcessCell output={e.outputOf} input={e.inputOf}/></td>
                  <td><ResourceCell conform={e.resourceConformsTo}
                                      inventoried={e.resourceInventoriedAs}
                                      quantity={e.resourceQuantity}
                                      action={e.action.id}
                    /></td>
                  <td>{e.provider.displayUsername}</td>
                  <td>{e.receiver.displayUsername}</td>
                    <td>{e.note}</td>
                </tr>)}


          </BrTable>

          <BrPagination max={economicEventsPages} handleStart={seteconomicEventStartPage} handleEnd={seteconomicEventEndPage}/>

</>)}

export default EventTable