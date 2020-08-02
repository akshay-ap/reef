import React, { useContext, useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  Button,
  makeStyles,
  Theme,
  createStyles,
  TextField,
  Card,
  CardHeader,
  CardContent,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/index";
import { MyOceanContext } from "../../OceanContext";
import {
  StakeInterFaceMap,
  MyStakeInterfaceMap,
} from "../../slices/asset-list";
import {
  setSelectedAlgoForCompute,
  setSelectedDataForCompute,
} from "../../slices/selected-asset";
import { STAKE_APP_CONTRACT_ADDRESS, MAX_APPROVAL_AMOUNT } from "../../config";
import { SectionHeader } from "../other/SectionHeader";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.primary,
    },
    paperInfo: {
      padding: theme.spacing(2),
      textAlign: "left",
      color: theme.palette.text.primary,
    },
    cardHeader: {
      backgroundColor: theme.palette.primary.main,
      color: "white",
      textAlign: "center",
    },
    stakesCardHeader: {
      backgroundColor: theme.palette.secondary.main,
      color: "black",
      textAlign: "center",
    },
  })
);
const ViewDetailedAsset = () => {
  const { asset, type } = useSelector(
    (state: RootState) => state.selectedAsset
  );
  const { stakes, myStakes } = useSelector(
    (state: RootState) => state.assetList
  );
  const { algoStakes, myAlgoStakes } = useSelector(
    (state: RootState) => state.algoList
  );
  const dispatch = useDispatch();
  const [stakeInfo] = useState<StakeInterFaceMap>(
    type === "dataset" ? stakes : algoStakes
  );
  const [myStakeInfo] = useState<MyStakeInterfaceMap>(
    type === "dataset" ? myStakes : myAlgoStakes
  );

  const classes = useStyles();
  const { web3, stakeApp, oceanContract } = useContext(MyOceanContext);
  const [stakeAmount, setStakeAmount] = useState<number>(0);
  const s: boolean = myStakes[asset.id]
    ? parseInt(myStakes[asset.id].amount) > 0
      ? true
      : false
    : false;
  const [unStakeable] = useState<boolean>(s);

  const unStakeToken = async () => {
    if (web3 == null || stakeApp == null) return;

    const accounts: String[] = await web3.eth.getAccounts();
    const { unStake } = stakeApp.methods;
    await unStake(asset.id).send({ from: accounts[0] });
  };
  const selectAssetForCompute = () => {
    if (type === "algorithm") {
      dispatch(setSelectedAlgoForCompute(asset.id));
    } else if (type === "dataset") {
      dispatch(setSelectedDataForCompute(asset.id));
    }
  };
  const addStake = async () => {
    if (web3 == null || stakeApp == null) return;

    await approve();
    console.log("approval");
    const accounts: String[] = await web3.eth.getAccounts();
    const { addStake } = stakeApp.methods;
    await addStake(stakeAmount, asset.id).send({ from: accounts[0] });
  };

  const approve = async () => {
    if (web3 === null) return;

    const accounts: String[] = await web3.eth.getAccounts();

    if (accounts === undefined) return;

    const { approve } = oceanContract?.methods;
    await approve(STAKE_APP_CONTRACT_ADDRESS, MAX_APPROVAL_AMOUNT).send({
      from: accounts[0],
    });
  };

  const getStakesCard = (title: String, amount: string) => {
    return (
      <Card>
        <CardHeader
          titleTypographyProps={{ variant: "button" }}
          title={title}
          className={classes.stakesCardHeader}
        />
        <CardContent>
          <Typography>{amount}</Typography>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className={classes.root}>
      <SectionHeader title="Asset details" />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography> {asset.id}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title={"Information"}
              className={classes.cardHeader}
            ></CardHeader>
            <CardContent>
              <Typography>
                Name:{" "}
                {
                  asset.service.find((e) => e.type === "metadata")?.attributes
                    .main.name
                }
              </Typography>
              <Typography>
                Date created:{" "}
                {
                  asset.service.find((e) => e.type === "metadata")?.attributes
                    .main.dateCreated
                }
              </Typography>
              <Typography>
                Author:{" "}
                {
                  asset.service.find((e) => e.type === "metadata")?.attributes
                    .main.author
                }
              </Typography>
              <Typography>
                License:{" "}
                {
                  asset.service.find((e) => e.type === "metadata")?.attributes
                    .main.license
                }
              </Typography>
              <Typography>
                DatePublished:{" "}
                {
                  asset.service.find((e) => e.type === "metadata")?.attributes
                    .main.datePublished
                }
              </Typography>
              <Typography>
                Price:{" "}
                {
                  asset.service.find((e) => e.type === "metadata")?.attributes
                    .main.price
                }
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title={"Stakes"}
              className={classes.cardHeader}
            ></CardHeader>
            <CardContent>
              <Grid container spacing={4}>
                <Grid item xs={4}>
                  {getStakesCard(
                    "My stakes",
                    myStakeInfo[asset.id] ? myStakeInfo[asset.id].amount : "0"
                  )}
                </Grid>
                <Grid item xs={4}>
                  {getStakesCard(
                    "Unique stakers",
                    stakeInfo[asset.id] ? stakeInfo[asset.id].count : "0"
                  )}
                </Grid>
                <Grid item xs={4}>
                  {getStakesCard(
                    "Total stakes amount",
                    stakeInfo[asset.id] ? stakeInfo[asset.id].amount : "0"
                  )}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Paper className={classes.paperInfo}>
            <Button
              variant="contained"
              color="primary"
              onClick={selectAssetForCompute}
            >
              Select for compute
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paperInfo}>
            <TextField
              type="number"
              label="Amount"
              onChange={(event) => {
                setStakeAmount(parseInt(event.target.value));
              }}
            />

            <Button
              variant="contained"
              color="primary"
              disabled={stakeAmount <= 0}
              onClick={addStake}
            >
              Stake
            </Button>

            <Button
              variant="contained"
              color="primary"
              disabled={!unStakeable}
              onClick={unStakeToken}
            >
              UnStake
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default ViewDetailedAsset;
