import React, {useState} from "react";
import Link from "next/link";


import BrTable from "./brickroom/BrTable";
import BrPagination from "./brickroom/BrPagination";
import AvatarUsers from "./avatarUsers";

const ProcessTable = ({processes}: { processes: Array<any> }) => {
    const [processStartPage, setProcessStartPage] = useState(0)
    const [processEndPage, setProcessEndPage] = useState(10)
    const processesHead = ['process', 'status', 'description', 'users']
    function retrieveUsers(pro:Array<any>) {
        const users: Array<{ displayUsername: string, id: string }> = [];
        pro?.map((p:any) => {

            if (p.outputs?.length > 0) {
                p.outputs?.map((o: any) => users.push(o.provider))
            }
            if (p.inputs?.length > 0) {
                p.inputs?.map((i: any) => users.push(i.provider))
            }
        })
        return users
    }
    const users = retrieveUsers(processes)

    function paginate(array: Array<any>, start: number = 0, end: number = 10) {
        return array?.filter((e, i) => (i < end && i > start))
    }

    const processesPages = Math.floor(processes?.length / 10 + 1 | 1)
    return (<>
        <BrTable headArray={processesHead}>
            {paginate(processes, processStartPage, processEndPage)?.map((p) => <tr key={p.id}>
                <th className="whitespace-normal"><Link href={`/processes/${p.id}`}><a>{p.name}</a></Link></th>
                <td>{p.finished ? 'finished' : <div className="badge badge-success">active</div>}</td>
                <td className="whitespace-normal">{p.note}</td>
                <td>
                    <AvatarUsers users={users}/>
                </td>
            </tr>)}


        </BrTable>

        <BrPagination max={processesPages} handleStart={setProcessStartPage} handleEnd={setProcessEndPage}/>

    </>)
}

export default ProcessTable