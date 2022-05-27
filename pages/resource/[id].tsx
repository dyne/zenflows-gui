import type {NextPage} from 'next'
import {gql, useQuery} from "@apollo/client";
import React, {useEffect, useState} from "react";
import { useRouter } from 'next/router'
import Popup from "../../components/popup";
import base45 from "base45";
import QRCode from "react-qr-code";

const Resource: NextPage = () => {
    const router = useRouter()
    const { id } = router.query
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
              }
            }
          `
    const resource = useQuery(QUERY_RESOURCE).data

  return (
  <ul>
      <li>{JSON.stringify(resource)}</li>
      <li>{result && <QRCode value={result} className="mx-auto" />}</li>
      <div className="divider"/>
      <button type="submit" onClick={fetchQr} className="btn btn-primary">See Passport</button>
      <li className="float-left mr-2">
          <Popup name="use" action1="Use">
          </Popup>
      </li>
  </ul>
  )};

export default Resource
