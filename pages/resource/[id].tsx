import type {NextPage} from 'next'
import {gql, useQuery} from "@apollo/client";
import React, {useState} from "react";
import {useRouter} from 'next/router'
import base45 from "base45";
import QRCode from "react-qr-code";
import ActionsBlock from "../../components/ActionsBlock";
import {mapUnit} from "../../lib/mapUnit";

const Resource: NextPage = () => {
    const router = useRouter()
    const {id} = router.query
    const [result, setResult] = useState('');

    const fetchQr = async () => {
        const data = {
            "data": {
                "reflow_data_to_post": {
                    "id": id,
                    "recurseLimit": 10,
                    "unwind": true
                },
                "reflow_endpoint": "https://reflow-demo.dyne.org/api/json/trace",
                "sawroomEndpoint": "http://195.201.41.35:8008"
            }
        }

        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const url = "https://apiroom.net/api/ReflowDPP/Reflow-create-DPP-and-store-in-sawroom.chain";
        const res = await fetch(url, options);
        if (res.status === 200) {
            const json = await res.json();
            const compressed = base45.encode(JSON.stringify(json));
            setResult(compressed);
        }
    }


    const QUERY_RESOURCE = gql`
             query {
              economicResource(id:"${id}"){
                id
                name
                note
                conformsTo {
                 id
                 name
                }
                onhandQuantity {
                  id
                  hasUnit {
                    id
                    symbol
                    label
                  }
                  hasNumericalValue
                }
                accountingQuantity {
                  id
                  hasUnit {
                    label
                    symbol
                  }
                  hasNumericalValue
                }
                currentLocation{
                  id
                  displayUsername
                  name
                }
                primaryAccountable {
                  id
                  name
                }
              }
            }
          `
    const resource = useQuery(QUERY_RESOURCE).data?.economicResource

    return (
        <>
            <div className="grid grid-cols-3 justify-between">
                <div>
                    <h2>{resource?.name}</h2>
                    <p className="text-gray-500">{resource?.note}</p>
                    <p className="text-gray-500">
                        {resource?.onhandQuantity?.hasNumericalValue} {mapUnit(resource?.onhandQuantity?.hasUnit.label)}
                        {resource?.conformsTo && ` of ${resource.conformsTo.name}`}
                    </p>
                </div>
                <div>
                    <h4>Assigned to:</h4>
                    <p className="text-gray-500">{resource?.primaryAccountable?.name}</p>
                </div>
                <div>
                    <h4>Current Location:</h4>
                    <p className="text-gray-500">{resource?.currentLocation?.name}</p>
                </div>
            </div>
            <div>{result && <QRCode value={result} className="mx-auto"/>}</div>
            <div className="divider"/>
            <button type="submit" onClick={fetchQr} className="btn btn-primary">See Passport</button>
            <div className="divider"/>

            <div>
                <ActionsBlock/>
            </div>
        </>
    )
};

export default Resource
