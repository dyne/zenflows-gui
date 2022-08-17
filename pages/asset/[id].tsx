import React, {useState} from 'react';
import {useRouter} from "next/router";
import {gql, useQuery} from "@apollo/client";

const Asset = () => {
    const router = useRouter()
    const {id} = router.query
    const QUERY_ASSET = gql`query ($id: ID!) {
  proposal(id: $id) {
    primaryIntents {
      resourceInventoriedAs {id}
    }
    reciprocalIntents {
      resourceQuantity {
        hasNumericalValue
      }
    }
  }
}
`
    const asset = useQuery(QUERY_ASSET, {variables: {id}})
    return (<>
        {JSON.stringify(asset.data, null, 2)}
        </>
    )

}

export default Asset;