import React, {useState} from "react";
import Link from "next/link";


import BrTable from "./brickroom/BrTable";
import BrPagination from "./brickroom/BrPagination";
import {mapUnit} from "../lib/mapUnit";
import QrCodeButton from "./brickroom/QrCodeButton";

const ResourceTable = ({resources}: { resources: Array<any> }) => {
    const [resourcesStartPage, setResourcesStartPage] = useState(0)
    const [resourcesEndPage, setResourcesEndPage] = useState(10)
    const resourcesHead = ['Resource', 'Name', 'Quantity', 'Location', 'Passport', 'Owner', 'Notes']

    function paginate(array: Array<any>, start: number = 0, end: number = 10) {
        return array?.filter((e, i) => (i < end && i > start))
    }

    const resourcesPages = Math.floor((resources?.length / 10) + 1)
    return (<>
        <BrTable headArray={resourcesHead}>
            {paginate(resources, resourcesStartPage, resourcesEndPage)?.map((e) =>

                <tr key={e.id}>
                    <td>{e.conformsTo?.name}</td>
                    <td><Link href={`/resource/${e.id}`}><a>{e.name}</a></Link></td>
                    <td>{e.onhandQuantity?.hasNumericalValue} {mapUnit(e.onhandQuantity?.hasUnit.label)}</td>
                    <td className="whitespace-normal">{e.currentLocation?.name}</td>
                    <td><QrCodeButton id={e.id}/></td>
                    <td className="p-1">
                        <Link href={`/profile/${e.primaryAccountable?.id}`}>
                            <a className="pl-0 grid grid-cols-1 items-center">
                                {e.primaryAccountable?.name}
                            </a>
                        </Link>
                    </td>
                    <td className="whitespace-normal">{e.note}</td>

                </tr>
            )}


        </BrTable>

        <BrPagination max={resourcesPages} handleStart={setResourcesStartPage} handleEnd={setResourcesEndPage}/>

    </>)
}

export default ResourceTable