import React, {useContext, useState} from 'react';
import {MyOceanContext} from '../../OceanContext';
import {
    Typography,
    List,
    ListItemText,
    Button,
    Paper,
    makeStyles,
    Theme,
    createStyles
} from '@material-ui/core';
import {ComputeJob} from '@oceanprotocol/squid';

const useStyles = makeStyles((theme : Theme) => createStyles({
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.primary
    }
}),);

export interface MyComputeJob {
    jobId: string;
    agreementId: string;
}
const ViewCompute = () => {
    const classes = useStyles();

    const {instance} = useContext(MyOceanContext);
    const [jobStatus, setJobStatus] = useState < ComputeJob[] > ([]);

    let temp = localStorage.getItem('jobIds')
    let jobIds: MyComputeJob[];
    if (temp === null) {
        jobIds = []
    } else {
        jobIds = JSON.parse(temp)
    }

    const getStatus = async (jobId : string, agreementId : string) => {
        try {
            const accounts = await instance ?. accounts.list()

            if (accounts === undefined) {
                console.log('accounts undefined')
                return;
            }
            const status = await instance ?. compute.status(accounts[0], agreementId, jobId)
            if (status !== undefined) 
                setJobStatus(status)


            


            console.log(status)
        } catch (error) {
            console.error(error.message)
        }
    }


    return (<div>
        <Paper className={
            classes.paper
        }>
            ViewCompute
        </Paper>
        <Paper className={
            classes.paper
        }>
            <Typography>Status</Typography>
            {
            jobStatus.length > 0 ? <div>
                <div>
                    <span>Status text:</span>
                    <span> {
                        jobStatus[0].statusText
                    }</span>
                </div>
                <div>
                    <span>Job:</span>
                    <span>
                        <code> {
                            jobStatus[0].jobId
                        }</code>
                    </span>
                </div>
            </div> : null
        }
            {/* <div>{            Object.keys(jobStatus[0]).map((key, i) => {})
}
            </div> */}
            {/* {
        Object.keys(jobStatus).map((key, i) => (
          <p key={i}>
            <span>Key Name: {key}</span>
            <span>Value: {jobStatus[key]}</span>
          </p>
        )
      } */} </Paper>

        <List> {
            jobIds && jobIds.length > 0 ? jobIds.map((e
            : {
                jobId: string,
                agreementId: string
            }) => {
                return <div key={
                    e.jobId
                }>
                    <Paper className={
                        classes.paper
                    }>
                        <ListItemText>
                            JobId:
                            <code> {
                                e.jobId
                            }</code>
                        </ListItemText>
                        <ListItemText>
                            AgreementId:
                            <code> {
                                e.agreementId
                            }</code>
                        </ListItemText>
                        <Button onClick={
                                () => {
                                    getStatus(e.jobId, e.agreementId)
                                }
                            }
                            color="primary"
                            variant="contained">View Status</Button>
                    </Paper>
                </div>
        }) : "No Jobs found"
        } </List>
    </div>)
}

export default ViewCompute
