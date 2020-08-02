import React, { useContext, useEffect, useState } from "react";
import { MyOceanContext } from "../../OceanContext";
import { DDO } from "@oceanprotocol/squid";
import {
  Grid,
  TextField,
  Button,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core";
import AssetDetails from "./AssetDetails";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux";
import {
  setAssetListInfo,
  StakeInterFaceMap,
  StakeInterface,
  MyStakeInterfaceMap,
  MyStakeInterface,
  startLoading,
} from "../../slices/asset-list";
import { useSnackbar } from "notistack";
import CircularProgress from "@material-ui/core/CircularProgress";
import { SectionHeader } from "../other/SectionHeader";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.primary,
      backgroundColor: "#c5cae9",
    },
    searchTextField: {
      paddingRight: theme.spacing(2),
      textAlign: "center",
      width: "100%",
      marginBottom: "10px",
      color: theme.palette.text.primary,
    },
    progress: {
      position: "absolute",
      top: "50%",
      left: "50%",
      marginTop: -12,
      marginLeft: -12,
    },
  })
);

const ViewAssets = () => {
  const classes = useStyles();

  const { instance, stakeApp, web3 } = useContext(MyOceanContext);
  const { assets, ranks, isLoading } = useSelector(
    (state: RootState) => state.assetList
  );
  const dispatch = useDispatch();
  const { getAllStakes, getMyStakes } = stakeApp?.methods;
  const [search, setSearch] = useState<string>("user names");
  const { enqueueSnackbar } = useSnackbar();

  const getData = async () => {
    dispatch(startLoading());
    enqueueSnackbar("Seaching data", { variant: "info" });
    const result = instance?.assets.search(search);
    if (result !== undefined && web3 !== null) {
      const accounts: String[] = await web3.eth.getAccounts();

      result.then(async (r) => {
        const a = r.results.filter((r) =>
          r.service.find((e) => e.attributes?.main.type === "dataset")
        );
        const dids: string[] = a.map((ddo) => ddo.id);
        const allStakes = await getAllStakes(dids).call({ from: accounts[0] });
        const r1: StakeInterFaceMap = {};

        allStakes.forEach((element: StakeInterface, index: number) => {
          r1[dids[index]] = element;
        });

        const myAllStakes = await getMyStakes().call({ from: accounts[0] });
        const r2: MyStakeInterfaceMap = {};
        myAllStakes.forEach((element: MyStakeInterface, index: number) => {
          r2[element.assetAddress] = element;
        });
        dispatch(setAssetListInfo(a, r1, r2));
      });
    } else {
      enqueueSnackbar("Seach result undefined", { variant: "info" });
    }
  };
  useEffect(() => {
    if (assets === []) {
      getData();
    }
  }, []);

  return (
    <div>
      <SectionHeader title="Search Datasets" />
      <br />
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            value={search}
            fullWidth
            className={classes.searchTextField}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            onClick={getData}
          >
            Search
          </Button>
        </Grid>
      </Grid>

      <br />
      {isLoading ? (
        <CircularProgress className={classes.progress} />
      ) : (
        <div>
          <Grid container>
            <Grid container direction="column">
              <Grid container spacing={3}>
                {assets.map((value: DDO, index: number) => (
                  <Grid item xs={12} sm={4} key={value.id}>
                    <AssetDetails
                      assetInfo={value}
                      type="dataset"
                      rank={ranks[value.id]}
                      rankNumber={index + 1}
                    ></AssetDetails>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
};

export default ViewAssets;
