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
            {(resources?.length !== 0) && <>{paginate(resources, resourcesStartPage, resourcesEndPage)?.map((e) =>

                <tr key={e.id}>
                    <td>{e.conformsTo?.name}</td>
                    <td><Link href={`/resource/${e.id}`}><a>{e.name}</a></Link></td>
                    <td>{e.onhandQuantity?.hasNumericalValue || e.accountingQuantity?.hasNumericalValue} {mapUnit(e.onhandQuantity?.hasUnit.label || e.accountingQuantity?.hasUnit.label)}</td>
                    <td className="whitespace-normal">{e.currentLocation?.name}</td>
                    <td><QrCodeButton id={e.id} outlined={true}/></td>
                    <td className="p-1">
                        <Link href={`/profile/${e.primaryAccountable?.id}`}>
                            <a className="pl-0 grid grid-cols-1 items-center">
                                {e.primaryAccountable?.name}
                            </a>
                        </Link>
                    </td>
                    <td className="whitespace-normal">{e.note}</td>

                </tr>
            )}</>}
            {(resources?.length === 0) && <>
                <tr className="disabled">
                    <td>xxxxxxx</td>
                    <td>xxxxxx xxxx</td>
                    <td>xxxxxxxxxxxx xxx xxxxx</td>
                    <td className="whitespace-normal">xxxxx, xxxxxx xx</td>
                    <td><QrCodeButton id='' outlined={true}/></td>
                    <td className="p-1">
                        xxxxxxx
                    </td>
                    <td className="whitespace-normal">xxxxxxxxx xxxxxxxx xxxxxxxxxxxx xxxxxxxx xxxxxxxxxx xxxxxx xxxx
                    </td>

                </tr>
                <tr>
                    <td colSpan={resourcesHead.length}>
                        <h4>There’s nothing to display here.</h4>
                        <p>
                            This table will display the resources that you will have in inventory.
                            Raise, transfer or Produce a resource and it will displayed here.
                        </p>
                    </td>
                </tr>
            </>}


        </BrTable>

        <BrPagination max={resourcesPages} handleStart={setResourcesStartPage} handleEnd={setResourcesEndPage}/>

    </>)
}

export default ResourceTable