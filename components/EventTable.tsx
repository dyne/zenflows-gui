import React, {useState} from "react";
import Link from 'next/link';

import BrTable from "./brickroom/BrTable";
import Avatar from "boring-avatars";
import BrPagination from "./brickroom/BrPagination";
import {mapUnit} from "../lib/mapUnit";
import QrCodeButton from "./brickroom/QrCodeButton";

const EventTable = ({economicEvents}: { economicEvents: Array<any> }) => {
    const [economicEventStartPage, seteconomicEventStartPage] = useState(0)
    const [economicEventEndPage, seteconomicEventEndPage] = useState(10)
    const economicEventsHead = ['activity', 'process', 'resource', 'provider', 'receiver', 'notes']
    const ActionChip = ({action}: { action: string }) => <span
        className="bg-[#E5E7EB] py-2 px-4 rounded">{action}</span>
    const ResourceCell = ({conform, inventoried, quantity, action}: {
        conform?: any,
        inventoried?: any,
        quantity?: any,
        action?: any
    }) => (
        <Link href={`/resource/${inventoried?.id}`}>
            <a>
                <h4>{inventoried?.name}</h4>
                <span>{`${action}d`} {quantity?.hasNumericalValue} {mapUnit(quantity?.hasUnit.label)} {conform && `of ${conform.name}`}</span>
            </a>
        </Link>
    )
    const ProcessCell = ({input, output}: {
        input?: { id: string, name: string },
        output?: { id: string, name: string }
    }) => (
        <Link href={`processes/${input?.id || output?.id}`}>
            <a>
                {input && `input of ${input.name}`}
                {output && `outcome of ${output.name}`}
            </a>
        </Link>)

    function paginate(array: Array<any>, start: number = 0, end: number = 10) {
        return array?.filter((e, i) => (i < end && i > start))
    }

    const economicEventsPages = Math.floor((economicEvents?.length / 10) + 1)

    return (<>
        <BrTable headArray={economicEventsHead}>
            {(economicEvents?.length > 0) && (<>{paginate(economicEvents, economicEventStartPage, economicEventEndPage)?.map((e) =>
                <tr key={e.id}>
                    <td><ActionChip action={e.action.id}/></td>
                    <td className="whitespace-normal"><ProcessCell output={e.outputOf} input={e.inputOf}/></td>
                    <td className="whitespace-normal"><ResourceCell conform={e.resourceConformsTo}
                                                                    inventoried={e.resourceInventoriedAs}
                                                                    quantity={e.resourceQuantity}
                                                                    action={e.action.id}
                    /></td>
                    <td className="whitespace-normal">
                        <Link href={`/profile/${e.provider.id}`}>
                            <a className="pl-0 grid grid-cols-2 items-center">
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar ml-4">
                                    <div className="w-10 rounded-full">
                                        <Avatar
                                            size={'full'}
                                            name={e.provider.displayUsername}
                                            variant="beam"
                                            colors={["#02E379", "#05244F", "#FFFFFF", "#405059"]}
                                        />;
                                    </div>
                                </label>
                                {e.provider.displayUsername}
                            </a>
                        </Link>
                    </td>
                    <td className="whitespace-normal">
                        <Link href={`/profile/${e.receiver.id}`}>
                            <a className="pl-0 grid grid-cols-2 items-center">
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar ml-4">
                                    <div className="w-10 rounded-full">
                                        <Avatar
                                            size={'full'}
                                            name={e.receiver.displayUsername}
                                            variant="beam"
                                            colors={["#02E379", "#05244F", "#FFFFFF", "#405059"]}
                                        />;
                                    </div>
                                </label>
                                {e.receiver.displayUsername}
                            </a>
                        </Link></td>
                    <td className="whitespace-normal">{e.note}</td>
                </tr>)}</>)}
            {(economicEvents?.length === 0) && <>
                <tr>
                    <td className="whitespace-normal">xxxxxxx</td>
                    <td className="whitespace-normal">xxxxxx xxxx</td>
                    <td>xxxxxxxxxxxx xxx xxxxx</td>
                    <td className="whitespace-normal">xxxxx, xxxxxx xx</td>
                    <td>xxxxxxxx</td>
                    <td className="whitespace-normal">xxxxxxxxx xxxxxxxx xxxxxxxxxxxx xxxxxxxx xxxxxxxxxx xxxxxx xxxx
                    </td>
                </tr>
                <tr>
                    <td colSpan={economicEventsHead?.length}>
                        <h4>There’s nothing to display here.</h4>
                        <p>
                            This table will display the activities related to this process.
                            Execute an action on top and it will be displayed here.
                        </p>
                    </td>
                </tr>
            </>}


        </BrTable>

        <BrPagination max={economicEventsPages} handleStart={seteconomicEventStartPage}
                      handleEnd={seteconomicEventEndPage}/>

    </>)
}

export default EventTable