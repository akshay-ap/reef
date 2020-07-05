import React, {useState, useContext, ReactNode} from 'react';
import asset from './asset'
import {assetAlgo, rawAlgoMeta} from './asset-compute'
import {MyOceanContext} from '../../OceanContext';
import {MetaDataAlgorithm} from '@oceanprotocol/squid';
import {Output} from '@oceanprotocol/squid/dist/node/ocean/OceanCompute';

const Compute = () => {

    const [ddoAssetId, setDdoAssetId] = useState('')
    const [jobStatus, setJobStatus] = useState('')
    const [jobId, setJobId] = useState('')
    const [agreementId, setAgreementId] = useState('')
    const [ddoAlgorithmId, setDdoAlgorithmId] = useState('')
    const [isAlgoInputVisible, setIsAlgoInputVisible] = useState < string | boolean > ('')
    const [textRawAlgo, setTextRawAlgo] = useState('')
    const [publishLogState, setPublishLogState] = useState(false)
    const [publishOutputState, setPublishOutputState] = useState(false)

    const {instance} = useContext(MyOceanContext);
    // publish a dataset and an algorithm
    const publish = async () => {
        try {
            const accounts = await instance ?. accounts.list()
            if (accounts === undefined) {
                console.log('accounts undefined')
                return;
            }
            console.log('Publishing asset.')

            const service = await instance ?. compute.createComputeServiceAttributes(accounts[0], '0', '2020-03-10T10:00:00Z')
            console.log(service)
            if (service === undefined) {
                console.log('service undefined')
                return;
            }
            const ddoAssetNew = await instance ?. assets.create(asset, accounts[0], [service])
            console.log('Asset successfully submitted.')
            console.log(ddoAssetNew)
            // keep track of this registered asset for consumption later on
            if (ddoAssetNew === undefined) {
                console.log('ddoAssetNew undefined')
                return;
            }
            setDdoAssetId(ddoAssetNew.id)
            alert('Asset successfully submitted.')
        } catch (error) {
            console.error(error.message)
        }
    }

    const publishalgo = async () => {
        try {
            const accounts = await instance ?. accounts.list()
            console.log('Publishing algo.')
            if (accounts === undefined) {
                console.log('accounts undefined')
                return;
            }
            const ddoAlgorithmNew = await instance ?. assets.create(assetAlgo, accounts[0])
            console.log(ddoAlgorithmNew)
            console.log('Algo asset successfully submitted.')
            if (ddoAlgorithmNew === undefined) {
                console.log('ddoAssetNew undefined')
                return;
            }
            // keep track of this registered asset for consumption later on
            setDdoAlgorithmId(ddoAlgorithmNew.id)
            alert('Algorithm successfully submitted.')
        } catch (error) {
            console.error(error.message)
        }
    }

    const startCompute = async (algorithmId? : string, algorithmMeta? : MetaDataAlgorithm) => {
        try {
            const accounts = await instance ?. accounts.list()
            if (accounts === undefined) {
                console.log('accounts undefined')
                return;
            }
            const computeOutput: Output = {
                publishAlgorithmLog: publishLogState,
                publishOutput: publishOutputState,
                brizoAddress: '0x376817c638D2a04f475a73aF37f7B51A2862D567',
                brizoUri: 'https://brizo.nile.dev-ocean.com',
                metadataUri: 'https://aquarius.nile.dev-ocean.com',
                nodeUri: 'https://nile.dev-ocean.com',
                owner: accounts[0].getId(),
                secretStoreUri: 'https://secret-store.nile.dev-ocean.com'
            }
            console.log(computeOutput)
            // order the compute service
            const agreement = await instance ?. compute.order(accounts[0], ddoAssetId)
            if (agreement === undefined) {
                console.log('agreement undefined')
                return;
            }
            setAgreementId(agreement)
            // start a compute job
            const status = await instance ?. compute.start(accounts[0], agreement, algorithmId, algorithmMeta, computeOutput)
            if (status === undefined) {
                console.log('status undefined')
                return;
            }
            setJobId(status.jobId)
            console.log(status)
            alert('Compute job created. You can query for its status now.')
        } catch (error) {
            console.error(error.message)
        }
    }
    // order and start the compute service with an algorithm published as an asset
    async function startWithPublishedAlgo() {
        return startCompute(ddoAlgorithmId)
    }

    // order and start the compute service with a passed raw algorithm
    async function startWithRawAlgo() {
        rawAlgoMeta.rawcode = textRawAlgo
        return startCompute(undefined, rawAlgoMeta)
    }

    const getStatus = async () => {
        try {
            const accounts = await instance ?. accounts.list()

            if (accounts === undefined) {
                console.log('accounts undefined')
                return;
            }
            const status = await instance ?. compute.status(accounts[0], agreementId, jobId)
            setJobStatus(JSON.stringify(status, null, '\t'))
            console.log(status)
        } catch (error) {
            console.error(error.message)
        }
    }

    async function showDivAlgo() {
        setIsAlgoInputVisible(isAlgoInputVisible ? false : true)
    }

    async function updateRawAlgoCode(event : React.ChangeEvent<HTMLTextAreaElement>) {
        setTextRawAlgo(event.target.value)
    }

    async function updateDdoAssetId(event : React.ChangeEvent<HTMLInputElement>) {
        setDdoAssetId(event.target.value)
    }

    async function handlePublishOutputState(event : React.ChangeEvent<HTMLInputElement>) {
        setPublishOutputState(event.target.checked)
    }

    async function handlePublishLogState(event : React.ChangeEvent<HTMLInputElement>) {
        setPublishLogState(event.target.checked)
    }

    return (<div>Compute

        <ComputeSection>
            <h3>1. Publish Dataset</h3>
            <button onClick={publish}>Publish dataset with compute service</button>

            <p>
                <Label>Asset DID</Label>
                <code id="ddoAssetId"> {ddoAssetId}</code>
            </p>
        </ComputeSection>

        <ComputeSection>
            <h3>2. Publish Algorithm</h3>
            <button onClick={publishalgo}>Publish algorithm</button>
            <p>
                <Label>Algorithm DID</Label>
                <code id="ddoAlgorithmId"> {ddoAlgorithmId}</code>
            </p>
        </ComputeSection>

        <ComputeSection>
            <h3>3. Start Compute Job</h3>

            <p>
                <Label>
                    <input type="checkbox" id="publishOutputState"
                        checked={publishOutputState}
                        onChange={handlePublishOutputState}/>
                    Publish Output into the Marketplace
                </Label>
                <Label>
                    <input type="checkbox" id="publishLogState"
                        checked={publishLogState}
                        onChange={handlePublishLogState}/>
                    Publish Algorithm Logs into the Marketplace
                </Label>
            </p>

            <div>
                <button onClick={showDivAlgo}>Show/Hide Raw Algorithm</button>
                <p style={
                    {
                        display: isAlgoInputVisible ? 'block' : 'none'
                    }
                }>
                    <Label>Raw Algorithm</Label>
                    <textarea style={
                            {width: '100%'}
                        }

                        value={textRawAlgo}
                        onChange={updateRawAlgoCode}/>
                </p>
            </div>

            <p>
                <Label>Compute Job ID</Label>
                <code> {jobId}</code>
            </p>

            <button onClick={startWithPublishedAlgo}
                disabled={
                    !ddoAssetId || !ddoAlgorithmId
            }>
                Order and start compute service with published algorithm
            </button>
            <button onClick={startWithRawAlgo}
                disabled={
                    !ddoAssetId
            }>
                Order and start compute service with raw algorithm
            </button>
        </ComputeSection>
        <ComputeSection>
            <h3>4. Get Compute Job Status</h3>


            <code> {jobStatus}</code>

            <button onClick={getStatus}
                disabled={
                    !jobId
            }>
                Get Job Status
            </button>
        </ComputeSection>

    </div>)

}

const ComputeSection = ({children} : {
    children: ReactNode
}) => {
    return (<>
        <div style={
            {
                textAlign: 'left',
                paddingBottom: '1rem',
                maxWidth: '40rem',
                margin: '1rem auto'
            }
        }> {children} </div>
        <hr/>
    </>)
}

const Label = ({
    children,
    ...props
} : {
    children: ReactNode
}) => {
    return (<label style={
            {
                display: 'block',
                fontSize: '0.8rem'
            }
        }
        {...props}> {children} </label>)
}

export default Compute;
