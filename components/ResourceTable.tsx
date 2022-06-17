import React, {useState} from "react";
import Link from "next/link";


import BrTable from "./brickroom/BrTable";
import BrPagination from "./brickroom/BrPagination";

const ResourceTable = ({resources}: { resources: Array<any> }) => {
    const [resourcesStartPage, setResourcesStartPage] = useState(0)
    const [resourcesEndPage, setResourcesEndPage] = useState(10)
    const resourcesHead = ['Resource', 'Name', 'Quantity', 'Location', 'Password', 'Owner', 'Notes']

    function paginate(array: Array<any>, start: number = 0, end: number = 10) {
        return array?.filter((e, i) => (i < end && i > start))
    }

    const resourcesPages = Math.floor(resources?.length / 10 + 1 | 1)
    return (<>
        <BrTable headArray={resourcesHead}>
            {paginate(resources, resourcesStartPage, resourcesEndPage)?.map((e) =>

                <tr key={e.id}>
                    <td><Link href={`/resource/${e.id}`}><a>{e.id}</a></Link></td>
                    <td>{e.name}</td>
                    <td>{e.onhandQuantity?.hasNumericalValue}{e.onhandQuantity?.hasUnit.symbol}</td>
                    <td>{e.currentLocation?.name}</td>
                    <td></td>
                    <td></td>
                    <td>{e.note}</td>

                </tr>
            )}


        </BrTable>

        <BrPagination max={resourcesPages} handleStart={setResourcesStartPage} handleEnd={setResourcesEndPage}/>

    </>)
}

export default ResourceTable