import type {NextPage} from 'next'
import {gql, useQuery} from "@apollo/client";
import React, {useState} from "react";
import {useRouter} from 'next/router'
import base45 from "base45";
import QRCode from "react-qr-code";
import ActionsBlock from "../../components/ActionsBlock";
import {mapUnit} from "../../lib/mapUnit";
import QrCodeButton from "../../components/brickroom/QrCodeButton";

const Resource: NextPage = () => {
    const router = useRouter()
    const {id} = router.query

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
                primaryAccountable {
                    id
                    name
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
            <div className="my-6">
                <QrCodeButton id={id} />
            </div>
            <div>
                <ActionsBlock resourceId={String(id)}/>
            </div>
        </>
    )
};

export default Resource
