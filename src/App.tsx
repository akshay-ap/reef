import React, {useContext} from 'react';
import './App.css';
import {Switch, BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import Compute from './componenets/compute/Compute';
import ViewCompute from './componenets/compute/ViewCompute';
import ViewAlgorithms from './componenets/algorithms/ViewAlgorithms';
import CreateAlgorithm from './componenets/algorithms/CreateAlgorithm';
import CreateAsset from './componenets/assets/CreateAsset';
import ViewJobs from './componenets/Jobs/ViewJobs';
import AppDrawer from './componenets/AppDrawer';
import {makeStyles} from '@material-ui/core/styles';
import {Main} from './componenets/Main';
import TitleAppBar from './componenets/TitleAppBar';
import {CssBaseline, Toolbar} from '@material-ui/core';
import {MyOceanContext} from './OceanContext';
import ViewAssets from './componenets/assets/ViewAssets';
import ViewDetailedAsset from './componenets/assets/ViewDetailedAsset';

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex"
    },
    root: {
        display: "flex"
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
    }
}))


function App() {
    const classes = useStyles()
    const {loading} = useContext(MyOceanContext)
    if (window.ethereum === undefined) {
        return <div>No wallet</div>;
    }

    const getUI = () => {
        if (loading) 
            return <div>Loading</div>


        


        return <div className={
            classes.root
        }>
            <CssBaseline/>
            <TitleAppBar/>
            <Router>
                <AppDrawer/>
                <div className={
                    classes.content
                }>
                    <Toolbar/>
                    <Switch>
                        <Route path="/"
                            exact={true}>
                            <Redirect to="/assets/view"/>
                        </Route>
                        <Route path="/assets/view">
                            <ViewAssets/>
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
                        <Route path="/asset/details"
                            component={ViewDetailedAsset}></Route>
                    </Switch>
                </div>
            </Router>
        </div>
    }
    return(getUI());
}

export default App;
