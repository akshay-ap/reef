import React, { useContext } from "react";
import "./App.css";
import {
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect,
} from "react-router-dom";
import Compute from "./componenets/compute/Compute";
import ViewCompute from "./componenets/compute/ViewCompute";
import ViewAlgorithms from "./componenets/algorithms/ViewAlgorithms";
import CreateAlgorithm from "./componenets/algorithms/CreateAlgorithm";
import CreateAsset from "./componenets/assets/CreateAsset";
import ViewJobs from "./componenets/Jobs/ViewJobs";
import AppDrawer from "./componenets/AppDrawer";
import { makeStyles } from "@material-ui/core/styles";
import TitleAppBar from "./componenets/TitleAppBar";
import { CssBaseline, Toolbar, Typography } from "@material-ui/core";
import { MyOceanContext } from "./OceanContext";
import ViewAssets from "./componenets/assets/ViewAssets";
import ViewDetailedAsset from "./componenets/assets/ViewDetailedAsset";
import { NoWallet } from "./componenets/other/NoWallet";
import { NotConnectedToOceanNetwork } from "./componenets/other/NotConnectToOceanNetwork";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
  },
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.primary,
    backgroundColor: "#ff8a80",
  },
}));

function App() {
  const classes = useStyles();
  const { loading, instance } = useContext(MyOceanContext);
  if (window.ethereum === undefined) {
    return <NoWallet />;
  }

  const getUI = () => {
    if (loading) return <div>Loading</div>;

    return instance?.keeper?.connected ? (
      <div className={classes.root}>
        <CssBaseline />
        <TitleAppBar />
        <Router>
          <AppDrawer />
          <div className={classes.content}>
            <Toolbar />
            <Switch>
              <Route path="/" exact={true}>
                <Redirect to="/assets/view" />
              </Route>
              <Route path="/assets/view">
                <ViewAssets />
              </Route>
              <Route path="/assets/create">
                <CreateAsset />
              </Route>
              <Route path="/algorithms/view">
                <ViewAlgorithms />
              </Route>
              <Route path="/algorithms/create">
                <CreateAlgorithm />
              </Route>
              <Route path="/compute/view">
                <ViewCompute />
              </Route>
              <Route path="/compute/create">
                <Compute />
              </Route>
              <Route path="/jobs">
                <ViewJobs />
              </Route>
              <Route
                path="/asset/details"
                component={ViewDetailedAsset}
              ></Route>
            </Switch>
          </div>
        </Router>
      </div>
    ) : (
      <NotConnectedToOceanNetwork />
    );
  };
  return getUI();
}

export default App;
