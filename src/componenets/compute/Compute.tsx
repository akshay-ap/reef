import React, {useState, useContext, ReactNode} from 'react';
import {MyOceanContext} from '../../OceanContext';
import {MetaDataAlgorithm} from '@oceanprotocol/squid';
import {Output} from '@oceanprotocol/squid/dist/node/ocean/OceanCompute';
import {ComputeOutput} from '../../config';

import {
    Button,
    Typography,
    Paper,
    makeStyles,
    Theme,
    createStyles,
    TextField
} from '@material-ui/core';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux';
import {MyComputeJob} from './ViewCompute';

const useStyles = makeStyles((theme : Theme) => createStyles({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.primary
    }
}),);

const Compute = () => {
    const classes = useStyles();
    const {selectAlgorithmForCompute, selectDatasetForCompute} = useSelector((state : RootState) => state.selectedAsset);
    const [ddoAssetId, setDdoAssetId] = useState(selectDatasetForCompute === '' ? 'did:op:5db23da44aee4c8b805a1e15758745680fe127c0090c42f38640d791153f7f10' : selectDatasetForCompute)
    const [jobStatus, setJobStatus] = useState('')
    const [jobId, setJobId] = useState('')
    const [agreementId, setAgreementId] = useState('')
    const [ddoAlgorithmId, setDdoAlgorithmId] = useState(selectAlgorithmForCompute === '' ? 'did:op:8b6383814d9b400c88033b4e653ae4697c6e09bc0c5f422995044189303135ec' : selectAlgorithmForCompute)
    // const [isAlgoInputVisible, setIsAlgoInputVisible] = useState < string | boolean > ('')
    // const [textRawAlgo, setTextRawAlgo] = useState('')
    const [publishLogState, setPublishLogState] = useState(false)
    const [publishOutputState, setPublishOutputState] = useState(false)

    const {instance} = useContext(MyOceanContext);
    // const publish = async () => {
    //     try {
    //         const accounts = await instance ?. accounts.list()
    //         if (accounts === undefined) {
    //             console.log('accounts undefined')
    //             return;
    //         }
    //         console.log('Publishing asset.')

    //         const service = await instance ?. compute.createComputeServiceAttributes(accounts[0], '0', '2020-03-10T10:00:00Z')
    //         console.log(service)
    //         if (service === undefined) {
    //             console.log('service undefined')
    //             return;
    //         }
    //         const ddoAssetNew = await instance ?. assets.create(asset, accounts[0], [service])
    //         console.log('Asset successfully submitted.')
    //         console.log(ddoAssetNew)
    //         // keep track of this registered asset for consumption later on
    //         if (ddoAssetNew === undefined) {
    //             console.log('ddoAssetNew undefined')
    //             return;
    //         }
    //         setDdoAssetId(ddoAssetNew.id)
    //         alert('Asset successfully submitted.')
    //     } catch (error) {
    //         console.error(error.message)
    //     }
    // }

    // const publishalgo = async () => {
    //     try {
    //         const accounts = await instance ?. accounts.list()
    //         console.log('Publishing algo.')
    //         if (accounts === undefined) {
    //             console.log('accounts undefined')
    //             return;
    //         }
    //         const ddoAlgorithmNew = await instance ?. assets.create(assetAlgo, accounts[0])
    //         console.log(ddoAlgorithmNew)
    //         console.log('Algo asset successfully submitted.')
    //         if (ddoAlgorithmNew === undefined) {
    //             console.log('ddoAssetNew undefined')
    //             return;
    //         }
    //         // keep track of this registered asset for consumption later on
    //         setDdoAlgorithmId(ddoAlgorithmNew.id)
    //         alert('Algorithm successfully submitted.')
    //     } catch (error) {
    //         console.error(error.message)
    //     }
    // }

    const startCompute = async (algorithmId? : string, algorithmMeta? : MetaDataAlgorithm) => {
        try {
            const accounts = await instance ?. accounts.list()
            if (accounts === undefined) {
                console.log('accounts undefined')
                return;
            }
            const computeOutput: Output = {
                ...ComputeOutput,
                publishAlgorithmLog: publishLogState,
                publishOutput: publishOutputState,
                owner: accounts[0].getId()
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
            let jobs = localStorage.getItem('jobIds')
            if (jobs === null) {
                jobs = JSON.stringify([{
                        jobId: status.jobId,
                        agreementId: agreement
                    }])
            } else {
                let parsed: MyComputeJob[] = JSON.parse(jobs)as MyComputeJob[]
                jobs = JSON.stringify(parsed.push({jobId: status.jobId, agreementId: agreement}));
            }
            localStorage.setItem('jobIds', jobs)

            setJobId(status.jobId)
            console.log(status)
            alert('Compute job created. You can query for its status now.')
        } catch (error) {
            console.error(error.message)
        }
    }
    async function startWithPublishedAlgo() {
        return startCompute(ddoAlgorithmId)
    }

    // async function startWithRawAlgo() {
    //     rawAlgoMeta.rawcode = textRawAlgo
    //     return startCompute(undefined, rawAlgoMeta)
    // }

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

    // const showDivAlgo = async () => {
    //     setIsAlgoInputVisible(isAlgoInputVisible ? false : true)
    // }

    // const updateRawAlgoCode = async (event : React.ChangeEvent<HTMLTextAreaElement>) => {
    //     setTextRawAlgo(event.target.value)
    // }

    // const updateDdoAssetId = async (event : React.ChangeEvent<HTMLInputElement>) => {
    //     setDdoAssetId(event.target.value)
    // }

    const handlePublishOutputState = async (event : React.ChangeEvent<HTMLInputElement>) => {
        setPublishOutputState(event.target.checked)
    }

    const handlePublishLogState = async (event : React.ChangeEvent<HTMLInputElement>) => {
        setPublishLogState(event.target.checked)
    }

    return (<div>

        <Paper className={
            classes.paper
        }>
            <Typography>
                Compute
            </Typography>
        </Paper>


        <ComputeSection>
            <Typography variant="h6">Selected Dataset</Typography>

            <Label>Asset DID</Label>
            <TextField value={ddoAssetId}
                fullWidth={true}
                onChange={
                    e => setDdoAssetId(e.target.value)
                }/>

        </ComputeSection>

        <ComputeSection>
            <Typography variant="h6">Selected algorithm</Typography>


            <Label>Algorithm DID</Label>

            <TextField value={ddoAlgorithmId}

                fullWidth={true}
                onChange={
                    e => setDdoAlgorithmId(e.target.value)
                }/>

        </ComputeSection>

        <ComputeSection>
            <h3>3. Start Compute Job</h3>
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

            <Label>Compute Job ID</Label>
            <code> {jobId}</code>


            <Button color="primary" variant="contained"
                onClick={startWithPublishedAlgo}
                disabled={
                    !ddoAssetId || !ddoAlgorithmId
            }>
                Order and start compute service with published algorithm
            </Button>
        </ComputeSection>
        <ComputeSection>
            <h3>4. Get Compute Job Status</h3>
            <code> {jobStatus}</code>

            <Button color="primary" variant="contained"
                onClick={getStatus}
                disabled={
                    !jobId
            }>
                Get Job Status
            </Button>
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
