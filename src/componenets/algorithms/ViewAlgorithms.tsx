import React, {useEffect, useContext, useState} from 'react';
import {MyOceanContext} from '../../OceanContext';
import {DDO} from '@oceanprotocol/squid';
import {
    Grid,
    Paper,
    Typography,
    TextField,
    Button,
    makeStyles,
    Theme,
    createStyles
} from '@material-ui/core';
import AssetDetails from '../assets/AssetDetails';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../redux';
import {
    MyStakeInterfaceMap,
    MyStakeInterface,
    StakeInterFaceMap,
    StakeInterface,
    setAlgoListInfo
} from '../../slices/algo-list';

const useStyles = makeStyles((theme : Theme) => createStyles({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.primary
    },
    testField: {
        paddingRight: theme.spacing(2),
        textAlign: 'center',
        width: '300px',
        color: theme.palette.text.primary
    }
}),);

const ViewAlgorithms = () => {
    const classes = useStyles();

    const {instance, stakeApp, web3} = useContext(MyOceanContext)
    const {algos, ranks} = useSelector((state : RootState) => state.algoList);
    const dispatch = useDispatch();
    const {getAllStakes, getMyStakes} = stakeApp ?. methods;
    const [search, setSearch] = useState < string > ('xzyabc123');

    const getData = async () => {
        console.log('loading algos...')
        const result = instance ?. assets.search(search)
        if (result !== undefined && web3 !== null) {
            const accounts: String[] = await web3.eth.getAccounts();
            result.then(async (r) => {
                const a = r.results.filter(r => r.service.find(e => e.attributes ?. main.type === 'algorithm'));
                const dids: string[] = a.map(ddo => ddo.id);
                const allStakes = await getAllStakes(dids).call({from: accounts[0]});
                const r1: StakeInterFaceMap = {}

                allStakes.forEach((element : StakeInterface, index : number) => {
                    r1[dids[index]] = element
                });

                const myAllStakes = await getMyStakes().call({from: accounts[0]});
                const r2: MyStakeInterfaceMap = {}
                myAllStakes.forEach((element : MyStakeInterface, index : number) => {
                    r2[element.assetAddress] = element
                });
                dispatch(setAlgoListInfo(a, r1, r2));
                console.log('algos loaded...')
                console.log('all algo stakes loaded...', r1)
                console.log('my algo stakes loaded...', r2)


            })
        } else {
            console.log('result undefined')
        }

    }

    useEffect(() => {}, [])
    return (
        <div>
            <Grid container
                spacing={3}>
                <Grid item>
                    <Paper className={
                        classes.paper
                    }>
                        <Typography>
                            ViewAlogs
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item>
                    <TextField id="outlined-basic" label="Search" variant="outlined"
                        value={search}
                        className={
                            classes.testField
                        }
                        onChange={
                            (e) => {
                                setSearch(e.target.value)
                            }
                        }/>
                    <Button variant="contained" color="primary"
                        onClick={getData}>
                        Search
                    </Button>
                </Grid>

            </Grid>
            <div>
                <Grid container>
                    <Grid container direction="column">
                        <Grid item container
                            spacing={3}>
                            {
                            algos.map((value : DDO, index) => (
                                <Grid item
                                    xs={12}
                                    sm={4}
                                    key={
                                        value.id
                                }>
                                    <AssetDetails assetInfo={value}
                                        type="algorithm"
                                        rank={
                                            ranks[value.id]
                                    }></AssetDetails>
                                </Grid>
                            ))
                        } </Grid>
                    </Grid>
                </Grid>
            </div>
        </div>

    )
}

export default ViewAlgorithms
