import React from 'react';
import './App.css';
import {Web3Provider, OceanProvider, Config} from '@oceanprotocol/react'
import Web3 from 'web3';
import {Switch, BrowserRouter as Router, Route} from "react-router-dom";
import Compute from './componenets/compute/Compute';
import ViewCompute from './componenets/compute/ViewCompute';
import ViewAlgorithms from './componenets/algorithms/ViewAlgorithms';
import CreateAlgorithm from './componenets/algorithms/CreateAlgorithm';
import CreateAsset from './componenets/assets/CreateAsset';
import ViewJobs from './componenets/Jobs/ViewJobs';
import ReefDrawer from './componenets/ReefDrawer';
import {makeStyles} from '@material-ui/core/styles';
import {AppBar, Toolbar, Typography} from '@material-ui/core';
import {Main} from './componenets/Main';

declare global {
    interface Window {
        web3: any;
        ethereum: any;
    }
}

if (window.web3) { // web3 = new Web3(window.web3.currentProvider)
    window.ethereum.enable()
}

const config: Config = {
    web3Provider: new Web3(window.web3.currentProvider),
    nodeUri: 'http://localhost:8545',
    aquariusUri: 'http://aquarius:5000',
    brizoUri: 'http://localhost:8030',
    brizoAddress: '0x00bd138abd70e2f00903268f3db08f2d25677c9e',
    secretStoreUri: 'http://localhost:12001',
    verbose: true
}

const drawerWidth = 160;

const userStyles = makeStyles((theme) => ({
    container: {
        display: "flex"
    },
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth
        }
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar
    }
}))

function App() {
    const classes = userStyles()

    return (<div className={
        classes.container
    }>
        <Router>
            <Web3Provider>
                <OceanProvider config={config}>
                    <AppBar position="fixed"
                        className={
                            classes.appBar
                    }>
                        <Toolbar>
                            <Typography variant="h6" noWrap>
                                Reef
                            </Typography>
                        </Toolbar>
                    </AppBar>

                    <ReefDrawer/>
                    <Switch>
                        <Route path="/"
                            exact={true}>
                            <Main/>
                        </Route>
                        <Route path="/assets/view">
                            <ViewCompute/>
                        </Route>
                        <Route path="/assets/create">
                            <CreateAsset/>
                        </Route>
                        <Route path="/algorithms/view">
                            <ViewAlgorithms/>
                        </Route>
                        <Route path="/algorithms/create">
                            <CreateAlgorithm/>
                        </Route>
                        <Route path="/compute/view">
                            <ViewCompute/>
                        </Route>
                        <Route path="/compute/create">
                            <Compute/>
                        </Route>
                        <Route path="/jobs">
                            <ViewJobs/>
                        </Route>
                    </Switch>
                </OceanProvider>
            </Web3Provider>
        </Router>
    </div>);
}

export default App;
