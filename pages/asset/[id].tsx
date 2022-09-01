import React, {useState} from 'react';
import {useRouter} from "next/router";
import {gql, useQuery} from "@apollo/client";
import devLog from "../../lib/devLog";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";
import {GetStaticPaths} from "next";

const Asset = () => {
    const router = useRouter()
    const {id} = router.query
    const {t} = useTranslation('common')
    const QUERY_ASSET = gql`query ($id: ID!) {
  proposal(id: $id) {
    primaryIntents {
      resourceInventoriedAs {
        conformsTo {
          name
        }
        name
        id
        note
        onhandQuantity {
          hasUnit {
            label
          }
        }
        images {
          hash
          name
          mimeType
        }
      }
    }
    reciprocalIntents {
      resourceQuantity {
        hasNumericalValue
        hasUnit {
          label
          symbol
        }
      }
    }
  }
}
`
    const asset = useQuery(QUERY_ASSET, {variables: {id}}).data
    devLog(asset)
    return (<>
                    <h1>{asset?.proposal.primaryIntents[0].resourceInventoriedAs.name}</h1>
                    <p>{t('This is a')} <span className="text-primary bold">{asset?.proposal.primaryIntents[0].resourceInventoriedAs.conformsTo.name}</span></p><br/>
                    <p>{asset?.proposal.primaryIntents[0].resourceInventoriedAs.note.split(':')[1].split(',')[0]}</p>
                    <img src={`data:${asset?.proposal.primaryIntents[0].resourceInventoriedAs.images[0].mimeType};base64, ${process.env.FILE}/${asset?.proposal.primaryIntents[0].resourceInventoriedAs.images[0].hash}`}/>
                    <p>{t('Value of this asset')}:</p>
                    <b>{asset?.proposal.reciprocalIntents[0].resourceQuantity.hasNumericalValue} FAB TOKEN/${asset?.proposal.primaryIntents[0].resourceInventoriedAs.onhandQuantity.hasUnit.label}</b>
        </>
    )

}
export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {

    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: 'blocking' //indicates the type of fallback
    }
}


export async function getStaticProps({locale}: any) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}

export default Asset;