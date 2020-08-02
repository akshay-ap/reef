import React, { useState, useContext, ReactNode } from "react";
import { MyOceanContext } from "../../OceanContext";
import { MetaDataAlgorithm } from "@oceanprotocol/squid";
import { Output } from "@oceanprotocol/squid/dist/node/ocean/OceanCompute";
import { ComputeOutput } from "../../config";
import { useSnackbar } from "notistack";

import {
  Button,
  Typography,
  makeStyles,
  Theme,
  createStyles,
  TextField,
  CardHeader,
  CardContent,
  Card,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { MyComputeJob } from "./ViewCompute";
import { SectionHeader } from "../other/SectionHeader";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.primary,
      backgroundColor: "#e8eaf6",
    },
    paperTitle: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.primary,
      backgroundColor: "#c5cae9",
    },
    cardHeader: {
      backgroundColor: theme.palette.primary.main,
      color: "white",
      textAlign: "center",
    },
  })
);

const Compute = () => {
  const { enqueueSnackbar } = useSnackbar();

  const classes = useStyles();
  const { selectAlgorithmForCompute, selectDatasetForCompute } = useSelector(
    (state: RootState) => state.selectedAsset
  );
  const [ddoAssetId, setDdoAssetId] = useState(
    selectDatasetForCompute === ""
      ? "did:op:5db23da44aee4c8b805a1e15758745680fe127c0090c42f38640d791153f7f10"
      : selectDatasetForCompute
  );
  const [jobStatus, setJobStatus] = useState("");
  const [jobId, setJobId] = useState("");
  const [agreementId, setAgreementId] = useState("");
  const [ddoAlgorithmId, setDdoAlgorithmId] = useState(
    selectAlgorithmForCompute === ""
      ? "did:op:8b6383814d9b400c88033b4e653ae4697c6e09bc0c5f422995044189303135ec"
      : selectAlgorithmForCompute
  );
  // const [isAlgoInputVisible, setIsAlgoInputVisible] = useState < string | boolean > ('')
  // const [textRawAlgo, setTextRawAlgo] = useState('')
  const [publishLogState, setPublishLogState] = useState(false);
  const [publishOutputState, setPublishOutputState] = useState(false);

  const { instance } = useContext(MyOceanContext);
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

  const startCompute = async (
    algorithmId?: string,
    algorithmMeta?: MetaDataAlgorithm
  ) => {
    try {
      enqueueSnackbar("Start creating compute job", { variant: "info" });
      const accounts = await instance?.accounts.list();
      if (accounts === undefined) {
        console.log("accounts undefined");
        return;
      }
      const computeOutput: Output = {
        ...ComputeOutput,
        publishAlgorithmLog: publishLogState,
        publishOutput: publishOutputState,
        owner: accounts[0].getId(),
      };
      console.log(computeOutput);
      // order the compute service
      const agreement = await instance?.compute.order(accounts[0], ddoAssetId);
      if (agreement === undefined) {
        console.log("agreement undefined");
        return;
      }
      enqueueSnackbar("Agreement created", { variant: "info" });
      setAgreementId(agreement);
      // start a compute job
      const status = await instance?.compute.start(
        accounts[0],
        agreement,
        algorithmId,
        algorithmMeta,
        computeOutput
      );
      if (status === undefined) {
        console.log("status undefined");
        return;
      }

      enqueueSnackbar("Jobid created", { variant: "info" });
      let jobs = localStorage.getItem("jobIds");
      let p_jobs: string = "";
      if (jobs === null) {
        p_jobs = JSON.stringify([
          {
            jobId: status.jobId,
            agreementId: agreement,
          },
        ]);
      } else {
        let parsed: MyComputeJob[] = JSON.parse(jobs);
        console.log("parsed...", parsed);
        let newJob: MyComputeJob = {
          jobId: status.jobId,
          agreementId: agreement,
        };
        p_jobs = JSON.stringify(parsed.push(newJob));
      }
      console.log("Storing jobs: ", p_jobs);
      localStorage.setItem("jobIds", p_jobs);
      setJobId(status.jobId);
      console.log(status);
      alert("Compute job created. You can query for its status now.");
    } catch (error) {
      console.error(error.message);
    }
  };
  async function startWithPublishedAlgo() {
    return startCompute(ddoAlgorithmId);
  }

  // async function startWithRawAlgo() {
  //     rawAlgoMeta.rawcode = textRawAlgo
  //     return startCompute(undefined, rawAlgoMeta)
  // }

  const getStatus = async () => {
    try {
      const accounts = await instance?.accounts.list();

      if (accounts === undefined) {
        console.log("accounts undefined");
        return;
      }
      const status = await instance?.compute.status(
        accounts[0],
        agreementId,
        jobId
      );
      setJobStatus(JSON.stringify(status, null, "\t"));
      console.log(status);
    } catch (error) {
      console.error(error.message);
    }
  };

  // const showDivAlgo = async () => {
  //     setIsAlgoInputVisible(isAlgoInputVisible ? false : true)
  // }

  // const updateRawAlgoCode = async (event : React.ChangeEvent<HTMLTextAreaElement>) => {
  //     setTextRawAlgo(event.target.value)
  // }

  // const updateDdoAssetId = async (event : React.ChangeEvent<HTMLInputElement>) => {
  //     setDdoAssetId(event.target.value)
  // }

  const handlePublishOutputState = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPublishOutputState(event.target.checked);
  };

  const handlePublishLogState = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPublishLogState(event.target.checked);
  };

  return (
    <div>
      <SectionHeader title={"Compute"} />

      <br />
      <Card>
        <CardHeader title={"Selected Dataset"} className={classes.cardHeader} />
        <CardContent>
          <Typography variant="caption">Asset DID</Typography>

          <TextField
            value={ddoAssetId}
            fullWidth={true}
            onChange={(e) => setDdoAssetId(e.target.value)}
          />
        </CardContent>
      </Card>
      <br />
      <Card>
        <CardHeader
          title={"Selected algorithm"}
          className={classes.cardHeader}
        />
        <CardContent>
          <Typography variant="caption">Algorithm DID</Typography>
          <TextField
            value={ddoAlgorithmId}
            fullWidth={true}
            onChange={(e) => setDdoAlgorithmId(e.target.value)}
          />
        </CardContent>
      </Card>
      <br />
      <Card>
        <CardHeader
          title={"Start Compute Job"}
          className={classes.cardHeader}
        />
        <CardContent>
          <Typography variant="caption">Compute Job ID</Typography>
          <code> {jobId}</code>
          <Button
            color="secondary"
            variant="contained"
            onClick={startWithPublishedAlgo}
            disabled={!ddoAssetId || !ddoAlgorithmId}
          >
            Order and start compute service with published algorithm
          </Button>
        </CardContent>
      </Card>
      <br />
      <Card>
        <CardHeader title={"View Job Status"} className={classes.cardHeader} />
        <CardContent>
          <code> {jobStatus}</code>

          <Button
            color="primary"
            variant="contained"
            onClick={getStatus}
            disabled={!jobId}
          >
            View Job Status
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Compute;
