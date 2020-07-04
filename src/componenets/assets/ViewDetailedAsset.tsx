import React, {useEffect, useContext, useState} from 'react';
import StakeApp from "../../abi/StakeApp.json";
import {
    Grid,
    Paper,
    Typography,
    Button,
    makeStyles,
    Theme,
    createStyles,
    TextField
} from '@material-ui/core';
import {useSelector} from "react-redux";
import {RootState} from "../../redux/index";
import {MyOceanContext} from '../../OceanContext';

const useStyles = makeStyles((theme : Theme) => createStyles({
    root: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.primary
    }

}),);
const ViewDetailedAsset = () => {
    const {asset} = useSelector((state : RootState) => state.selectedAsset);
    const classes = useStyles();
    const {web3, stakeApp} = useContext(MyOceanContext);
    const [stakeAmount, setStakeAmount] = useState < number > (0);

    const unStakeToken = async () => {
        if (web3 == null || stakeApp == null) 
            return;
        


        const accounts: String[] = await web3.eth.getAccounts();
        const {unStake} = stakeApp.methods;
        await unStake(asset.id).send({from: accounts[0]});
    }

    const addStake = async () => {
        if (web3 == null || stakeApp == null) 
            return;
        

        const accounts: String[] = await web3.eth.getAccounts();
        const {addStake} = stakeApp.methods;
        await addStake(stakeAmount, asset.id).send({from: accounts[0]});
    }

    return (
        <div className={
            classes.root
        }>
            <Grid container
                spacing={3}>
                <Grid item
                    xs={12}>
                    <Paper className={
                        classes.paper
                    }>
                        <Typography>
                            Asstet details</Typography>
                    </Paper>
                </Grid>
                <Grid item
                    xs={12}>
                    <Paper className={
                        classes.paper
                    }>
                        <Typography>{
                            asset.id
                        }</Typography>
                    </Paper>
                </Grid>
                <Grid item
                    xs={12}>
                    <Paper className={
                        classes.paper
                    }>
                        <Typography>{
                            asset.id
                        }</Typography>
                    </Paper>
                </Grid>
                <Grid item
                    xs={3}>
                    <TextField type="number" label="Amount"
                        onChange={
                            (event) => {
                                setStakeAmount(parseInt(event.target.value))
                            }
                        }/>

                </Grid>
            <Grid item
                xs={3}>
                <Button variant="contained" color="primary"
                    onClick={addStake}>Stake</Button>
            </Grid>
            <Grid item
                xs={3}>

                <Button variant="contained" color="primary"
                    onClick={unStakeToken}>UnStake</Button>
            </Grid>
        </Grid>
    </div>
    )
}

export default ViewDetailedAsset;
