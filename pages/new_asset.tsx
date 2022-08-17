import type {NextPage} from 'next'
import {gql, useMutation, useQuery} from "@apollo/client";
import React, {ChangeEvent, useEffect, useState} from "react";
import BrTextField from "../components/brickroom/BrTextField";
import BrInput from "../components/brickroom/BrInput";
import {useRouter} from "next/router";
import BrRadio from "../components/brickroom/BrRadio";
import TagSelector from "../components/brickroom/TagSelector";
import {useAuth} from "../lib/auth";
import dayjs from 'dayjs'
import devLog from "../lib/devLog";
import BrImageUpload from "../components/brickroom/BrImageUpload";



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
            id: "Service",
            name: "Service",
            value: "Service",
            label: "Service"
        }, {id: "Product", name: "Product", value: "Product", label: "Product"}],
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
        name: {
            label: "Location Name",
            placeholder: "E.g. Amburg Warehouse",
            hint: "Short name to refers to the location",
        },
        address: {
            label: "Location",
            placeholder: "An d. Alsterschleife 3, 22399 - Hamburg, Germany",
            hint: "Short description to be displayed inside the project page",
        }
    },
    price: {
        label: "Price",
        placeholder: "E.g. 1 Fab Token",
        hint: "Short description to be displayed inside the project page",
    },
    button: "Import project",
    resourceSpec: "73u648QASpCtC80ihY0KLg",
    unitId: "82XqknZlTsGcFbQw8Gg6ow"
}

const NewAsset: NextPage = () => {
    const [assetType, setAssetType] = useState('')
    const [assetName, setAssetName] = useState('')
    const [assetDescription, setAssetDescription] = useState('')
    const [repositoryOrId, setRepositoryOrId] = useState('')
    const [assetTags, setAssetTags] = useState([] as string[])
    const [locationAddress, setLocationAddress] = useState('')
    const [locationId, setLocationId] = useState('')
    const [locationName, setLocationName] = useState('')
    const [price, setPrice] = useState('')
    const [resourceSpec, setResourceSpec] = useState('')
    const [resourceId, setResourceId] = useState('')
    const [intentId, setIntentId] = useState('')
    const [image, setImage] = useState('')

    useEffect(() => {
        if (assetType === 'Product') {
            setResourceSpec(instanceVariables?.specs?.specProjectProduct.id)
        }
        if (assetType === 'Service') {
            setResourceSpec(instanceVariables?.specs?.specProjectService.id)
        }
        if (assetType === 'Design') {
            setResourceSpec(instanceVariables?.specs?.specProjectDesign.id)
        }
    }, [assetType])


    const {authId} = useAuth()



    const QUERY_VARIABLES = gql`query {
  instanceVariables{
    specs{
      specCurrency {
        id
      }
      specProjectDesign {
        id
      }
      specProjectProduct {
        id
      }
      specProjectService {
        id
      }
      
    }
    units {
      unitOne {
        id
      }
    }
  }
}`

    const CREATE_PROPOSAL = gql`
    mutation {
  createProposal(proposal: {
    name: "price tag",
    unitBased: true
  }) {
    proposal {
      id
    }
  }
}
`
    const CREATE_INTENT = gql`mutation (
  $agent: ID!,
  $resource: ID!,
  $oneUnit: ID!,
  $currency: ID!,
  $howMuch: Int!
) {
  item: createIntent(
    intent: {
      name: "asset",
      action: "transfer",
      provider: $agent,
      resourceInventoriedAs: $resource,
      resourceQuantity: { hasNumericalValue: 1, hasUnit: $oneUnit }
    }
  ) {
    intent {
      id
    }
  }

  payment: createIntent(
    intent: {
      name: "payment",
      action: "transfer",
      receiver: $agent,
      resourceConformsTo: $currency,
      resourceQuantity: { hasNumericalValue: $howMuch, hasUnit: $oneUnit }
    }
  ) {
    intent {
      id
    }
  }
}
`

    const LINK_PROPOSAL_AND_INTENT = gql`mutation ($proposal: ID!, $item: ID!, $payment: ID!) {
  linkItem: proposeIntent(
    publishedIn: $proposal
    publishes: $item
    reciprocal: false
  ) {
    proposedIntent {
      id
    }
  }

  linkPayment: proposeIntent(
    publishedIn: $proposal
    publishes: $payment
    reciprocal: true
  ) {
    proposedIntent {
      id
    }
  }
}
`


    const CREATE_LOCATION = gql`mutation ($name: String!, $addr: String!) {
  createSpatialThing(spatialThing: { name: $name, mappableAddress: $addr }) {
    spatialThing {
      id
    }
  }
}
`

    const CREATE_ASSET = gql`mutation (
  $name: String!,
  $metadata: String!,
  $agent: ID!,
  $creationTime: DateTime!,
  $location: ID!,
  $tags: [URI!],
  $resourceSpec: ID!,
  $oneUnit: ID!,
  $image: String
) {
  createEconomicEvent(
    event: {
      action: "raise",
      provider: $agent,
      receiver: $agent,
      hasPointInTime: $creationTime,
      resourceClassifiedAs: $tags,
      resourceConformsTo: $resourceSpec,
      resourceQuantity: { hasNumericalValue: 1, hasUnit: $oneUnit },
      toLocation: $location
    }
    newInventoriedResource: { name: $name, note: $metadata, image: $image }
  ) {
    economicEvent {
      id
      resourceInventoriedAs {
        id
      }
    }
  }
}
`
    const instanceVariables = useQuery(QUERY_VARIABLES).data?.instanceVariables

    const [createAsset, {data}] = useMutation(CREATE_ASSET)

    const [createLocation, {data: spatialThing}] = useMutation(CREATE_LOCATION)

    const [createProposal, {data: proposal}] = useMutation(CREATE_PROPOSAL)

    const [createIntent, {data: intent}] = useMutation(CREATE_INTENT)

    const [linkProposalAndIntent, {data: link}] = useMutation(LINK_PROPOSAL_AND_INTENT)

    const handleCreateLocation = async () => {
        const name = locationName === '' ? '*untitled*' : locationName
        await createLocation({variables: {name: name, addr: locationAddress}}).then((r) => {
            setLocationId(r.data.createSpatialThing.spatialThing.id)
        })
    }
    const router = useRouter()

    function onSubmit(e: any) {
        e.preventDefault()

        createAsset({
            variables: {
                resourceSpec: resourceSpec,
                agent: authId,
                name: assetName,
                metadata: `description: ${assetDescription}, repositoryOrId: ${repositoryOrId}, `,
                location: locationId,
                oneUnit: instanceVariables?.units?.unitOne.id,
                creationTime: dayjs().toISOString(),
                image: image.split(',')[1],
            }
        })
            .then((re: any) => {
                setResourceId(re.data?.createEconomicEvent.economicEvent.resourceInventoriedAs.id)
                devLog('2', re.data?.createEconomicEvent.economicEvent.resourceInventoriedAs.id)
                createProposal()
                    .then((proposal) => {
                        devLog('3', proposal)
                        createIntent({
                            variables: {
                                agent: authId,
                                resource: re.data?.createEconomicEvent.economicEvent.resourceInventoriedAs.id,
                                oneUnit: instanceVariables?.units.unitOne.id,
                                howMuch: parseFloat(price),
                                currency: instanceVariables?.specs.specCurrency.id
                            }
                        }).then((intent) => {
                            devLog('4', intent)
                            linkProposalAndIntent({
                                variables: {
                                    proposal: proposal.data?.createProposal.proposal.id,
                                    item: intent.data?.item.intent.id,
                                    payment: intent.data?.payment.intent.id
                                }
                            }).then(() => {
                                router.push(`/asset/${proposal.data?.createProposal.proposal.id}`)
                            })
                        })
                    })
            })
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
                         onChange={(e: ChangeEvent<HTMLInputElement>) => setAssetName(e.target.value)}
                         placeholder={newAssetProps.assetName.placeholder}/>
                <BrImageUpload onChange={setImage} label={'upload one Image'} placeholder={'uploadedImage.png'} hint={'SVG, PNG, JPG or GIF (MAX. 800x400px)'}/>
                <BrTextField label={newAssetProps.assetDescription.label} hint={newAssetProps.assetDescription.hint}
                             value={assetDescription} placeholder={newAssetProps.assetDescription.placeholder}
                             onChange={(e: ChangeEvent<HTMLInputElement>) => setAssetDescription(e.target.value)}/>
                <BrInput label={newAssetProps.repositoryOrId.label} hint={newAssetProps.repositoryOrId.hint}
                         value={repositoryOrId} placeholder={newAssetProps.repositoryOrId.placeholder}
                         onChange={(e: ChangeEvent<HTMLInputElement>) => setRepositoryOrId(e.target.value)}/>
                <TagSelector label={newAssetProps.assetTags.label} hint={newAssetProps.assetTags.hint}
                             onSelect={(tags) => setAssetTags(tags)}/>
                <div className="grid grid-cols-2 gap-2">
                    <BrInput label={newAssetProps.location.name.label} hint={newAssetProps.location.name.hint}
                             value={locationName} placeholder={newAssetProps.location.name.placeholder}
                             onChange={(e: ChangeEvent<HTMLInputElement>) => setLocationName(e.target.value)}/>
                    <BrInput label={newAssetProps.location.address.label} hint={newAssetProps.location.address.hint}
                             value={locationAddress}
                             placeholder={newAssetProps.location.address.placeholder}
                             onChange={(e: ChangeEvent<HTMLInputElement>) => setLocationAddress(e.target.value)}
                             onBlur={handleCreateLocation}/>
                </div>
                <BrInput label={newAssetProps.price.label} hint={newAssetProps.price.hint} value={price}
                         placeholder={newAssetProps.price.placeholder}
                         onChange={(e: ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)}/>
                <button type="submit" className="btn btn-primary">{newAssetProps.button}</button>
            </form>
        </div>
    </>)
};

export default NewAsset


