import React, {useState} from "react";
import Link from "next/link";


import BrTable from "./brickroom/BrTable";
import BrPagination from "./brickroom/BrPagination";
import AvatarUsers from "./avatarUsers";
import Spinner from "./brickroom/Spinner";

const ProcessTable = ({processes}: { processes: Array<any> }) => {
    const [processStartPage, setProcessStartPage] = useState(0)
    const [processEndPage, setProcessEndPage] = useState(10)
    const processesHead = ['process', 'status', 'description', 'users']
    function retrieveUsers(pro:any) {
        const users: Array<{ displayUsername: string, id: string }> = [];
            const out = pro.outputs
            const inp = pro.inputs

            if (out?.length > 0) {
                out?.map((o: any) => users.push(o.provider))
            }
            if (inp?.length > 0) {
                inp?.map((i: any) => users.push(i.provider))
            }
        return users
    }

    function paginate(array: Array<any>, start: number = 0, end: number = 10) {
        return array?.filter((e, i) => (i < end && i > start))
    }

    const processesPages = Math.floor((processes?.length / 10) + 1)
    return (<>
        {!(processes?.length>0)&&<Spinner/>}
        {processes&&<><BrTable headArray={processesHead}>

            {paginate(processes, processStartPage, processEndPage)?.map((p) => <tr className="bg-['#F9F9F7']" key={p.id}>
                <th className="whitespace-normal"><Link href={`/processes/${p.id}`}><a>{p.name}</a></Link></th>
                <td>{p.finished ? 'finished' : <div className="badge badge-success">active</div>}</td>
                <td className="whitespace-normal">{p.note}</td>
                <td>
                    <AvatarUsers users={retrieveUsers(p)}/>
                </td>
            </tr>)}


        </BrTable>

        <BrPagination max={processesPages} handleStart={setProcessStartPage} handleEnd={setProcessEndPage}/></>}

    </>)
}

export default ProcessTable