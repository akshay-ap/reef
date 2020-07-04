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
import {AbiItem} from 'web3-utils';
import {Contract} from 'web3-eth-contract';

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
    const {web3} = useContext(MyOceanContext);
    const [stakeAmount, setStakeAmount] = useState < number > (0);
    const [contract, setContract] = useState < Contract | null > (null);

    const setUp = async () => {
        const networkId = await web3 ?. eth.net.getId();
        if (web3 !== null) {
            let parsed: AbiItem | AbiItem[] = StakeApp.abi as AbiItem | AbiItem[];
            let meta = new web3.eth.Contract(parsed, '0xA641cc999Bb2d2935c9608c860041c49463fc418');
            setContract(meta)
            console.log('this.meta', meta)
        }

    }
    useEffect(() => {
        setUp();
    }, []);


    const unStakeToken = async () => {
        if (web3 == null || contract == null) 
            return;
        


        const accounts: String[] = await web3.eth.getAccounts();
        const {unStake} = contract.methods;
        await unStake(asset.id).send({from: accounts[0]});
    }

    const addStake = async () => {
        if (web3 == null || contract == null) 
            return;
        


        const accounts: String[] = await web3.eth.getAccounts();
        const {addStake} = contract.methods;
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
