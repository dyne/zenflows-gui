import type {NextPage} from 'next'
import {gql, useMutation} from "@apollo/client";
import React, {ChangeEvent, useState} from "react";
import BrTextField from "../components/brickroom/BrTextField";
import BrInput from "../components/brickroom/BrInput";
import {useRouter} from "next/router";
import BrRadio from "../components/brickroom/BrRadio";
import TagSelector from "../components/brickroom/TagSelector";

const newAssetProps = {
    headline: {
        title: "Create a new asset",
        description: "Make sure you read the Comunity Guidelines before you create a new asset.",
    },
    generalInfo: {
        title: "General Information",
        desctiption: "Help us display your project correctly."
    },
    assetType: {
        label: "Select asset type",
        array: [{id: "Design", name: "Design", value: "Design", label: "Design"}, {
            id: "Development",
            name: "Development",
            value: "Development",
            label: "Development"
        }, {id: "Marketing", name: "Marketing", value: "Marketing", label: "Marketing"}],
        hint: "Refer to the standards we want to follow for this field",
    },
    assetName: {
        label: "Name",
        placeholder: "E.g. Fabulaser",
        hint: "Working name of the project module",
    },
    assetDescription: {
        label: "Description",
        placeholder: "E.g. An open source laser cutter within you reach",
        hint: "Short description to be displayed inside the project page",
    },
    repositoryOrId: {
        label: "Repository link or interfacer Id",
        placeholder: "E.g. github.com/my-repo",
        hint: "Reference to repository in which the technical documentation is developed",
    },
    assetTags: {
        label: "Tags",
        hint: "Add relevant keywords to describe your project",
    },
    location: {
        label: "Location",
        placeholder: "An d. Alsterschleife 3, 22399 - Hamburg, Germany",
        hint: "Short description to be displayed inside the project page",
    },
    price: {
        label: "Price",
        placeholder: "E.g. 1 Fab Token",
        hint: "Short description to be displayed inside the project page",
    },
    button: "Import project",
}

const NewAsset: NextPage = () => {
    const [assetType, setAssetType] = useState('')
    const [assetName, setAssetName] = useState('')
    const [assetDescription, setAssetDescription] = useState('')
    const [repositoryOrId, setRepositoryOrId] = useState('')
    const [assetTags, setAssetTags] = useState('')
    const [location, setLocation] = useState('')
    const [price, setPrice] = useState('')

    const CREATE_ASSET = gql`mutation (
                              $name: String!
                              $metadata: String!
                              $agent: ID!
                              $creationTime: DateTime!
                              $location: ID!
                              $tags: [URI!]
                              $projectSpec: ID!
                              $oneUnit: ID!
                            ) {
                              createEconomicEvent(
                                event: {
                                  action: "raise"
                                  provider: $agent
                                  receiver: $agent
                                  hasPointInTime: $creationTime
                                  resourceClassifiedAs: $tags
                                  resourceConformsTo: $projectSpec
                                  resourceQuantity: {
                                    hasNumericalValue: 1
                                    hasUnit: $oneUnit
                                  }
                                  toLocation: $location
                                }
                                newInventoriedResource: {
                                  name: $name
                                  note: $metadata
                                }
                              )
                            }
            `
    const [createAsset, {data}] = useMutation(CREATE_ASSET)


    const router = useRouter()

    function onSubmit(e: any) {
        e.preventDefault()
        createAsset({variables: {assetType, assetName, assetDescription, repositoryOrId, assetTags, location, price}})
            .then((re: any) => router.push(`/processes/${re.data?.createProcess.process.id}`))
    }

    return (<>
        <div className="w-128">
            <div className="w-80">
                <h2>{newAssetProps.headline.title} </h2>
                <p>{newAssetProps.headline.description}</p>
            </div>
            <div className="w-80 my-12">
                <h2>{newAssetProps.generalInfo.title} </h2>
                <p>{newAssetProps.generalInfo.desctiption}</p>
            </div>

            <form onSubmit={onSubmit} className="w-full">
                <BrRadio array={newAssetProps.assetType.array} label={newAssetProps.assetType.label}
                         hint={newAssetProps.assetType.hint} onChange={setAssetType} value={assetType}/>
                <BrInput label={newAssetProps.assetName.label} hint={newAssetProps.assetName.hint} value={assetName}
                         onChange={(e: ChangeEvent<HTMLInputElement>) => setAssetName(e.target.value)}/>
                <BrTextField label={newAssetProps.assetDescription.label} hint={newAssetProps.assetDescription.hint}
                             value={assetDescription}
                             onChange={(e: ChangeEvent<HTMLInputElement>) => setAssetDescription(e.target.value)}/>
                <BrInput label={newAssetProps.repositoryOrId.label} hint={newAssetProps.repositoryOrId.hint}
                         value={repositoryOrId}
                         onChange={(e: ChangeEvent<HTMLInputElement>) => setRepositoryOrId(e.target.value)}/>
                <TagSelector label={newAssetProps.assetTags.label} hint={newAssetProps.assetTags.hint}/>
                <BrInput label={newAssetProps.location.label} hint={newAssetProps.location.hint} value={location}
                         onChange={(e: ChangeEvent<HTMLInputElement>) => setLocation(e.target.value)}/>
                <BrInput label={newAssetProps.price.label} hint={newAssetProps.price.hint} value={price}
                         onChange={(e: ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)}/>
                <button type="submit" className="btn btn-primary">{newAssetProps.button}</button>
            </form>
        </div>
    </>)
};

export default NewAsset


