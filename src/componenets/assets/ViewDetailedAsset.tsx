import React, {useEffect, useContext, useState} from 'react';
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
    },
    paperInfo: {
        padding: theme.spacing(2),
        textAlign: 'left',
        color: theme.palette.text.primary
    }


}),);
const ViewDetailedAsset = () => {
    const {asset} = useSelector((state : RootState) => state.selectedAsset);
    const {stakes} = useSelector((state : RootState) => state.assetList);

    const classes = useStyles();
    const {web3, stakeApp} = useContext(MyOceanContext);
    const [stakeAmount, setStakeAmount] = useState < number > (0);
    const {getMyStakes} = stakeApp ?. methods;
    const [myStake, setMyStake] = useState < number > (0);
    console.log(asset)
    // const [metaData, setMetaData] = useState < MetaData | undefined > (asset.service.find(e => e.type === 'metadata'));

    const getStakeForAsset = async () => {

        if (web3 !== null) {
            const accounts: String[] = await web3.eth.getAccounts();
            const res = await getMyStakes().call({from: accounts[0]});
            // res.map((r : Object) => console.log(r["amount"], r["assetAddress"]));
            // console.log(res);
        }
    }
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

    useEffect(() => {
        getStakeForAsset()
    }, [])

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
                        classes.paperInfo
                    }>
                        <Typography>Name: {
                            asset.service.find(e => e.type === 'metadata') ?. attributes.main.name
                        }</Typography>
                        <Typography>Date created: {
                            asset.service.find(e => e.type === 'metadata') ?. attributes.main.dateCreated
                        }</Typography>
                        <Typography>Author: {
                            asset.service.find(e => e.type === 'metadata') ?. attributes.main.author
                        }</Typography>
                        <Typography>License: {
                            asset.service.find(e => e.type === 'metadata') ?. attributes.main.license
                        }</Typography>
                        <Typography>DatePublished: {
                            asset.service.find(e => e.type === 'metadata') ?. attributes.main.datePublished
                        }</Typography>
                        <Typography>Price: {
                            asset.service.find(e => e.type === 'metadata') ?. attributes.main.price
                        }</Typography>
                    </Paper>
                </Grid>
                <Grid item
                    xs={12}>
                    <Paper className={
                        classes.paperInfo
                    }>
                        <Typography>My stakes: 0</Typography>
                        <Typography>Unique stakers: {
                            stakes[asset.id].count
                        }</Typography>
                        <Typography>Total staker amount: {
                            stakes[asset.id].amount
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
