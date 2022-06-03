import Link from "next/link";
import Card from "./Card";
import React from "react";

type Resource ={
    id: string,
    name:string,
}

const InventoriedResources = ({inventoriedResources}:{inventoriedResources:Array<Resource>}) => {

    return (<>
        <ul>{inventoriedResources?.map((r:any)=><li key={r.id}>
            <Link href={`/resource/${r.id}`}>
                <a><Card title={r.name}>
                    <p>{JSON.stringify(r)}</p>
                </Card></a></Link></li>)}</ul>
    </>)
};

export default InventoriedResources