import React, {useContext, useEffect, useState} from 'react';
import {MyOceanContext} from '../../OceanContext';
import {DDO} from '@oceanprotocol/squid';
import {
    Grid,
    Typography,
    TextField,
    Button,
    Paper,
    makeStyles,
    Theme,
    createStyles
} from '@material-ui/core';
import AssetDetails from './AssetDetails';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../redux';
import {
    setAssetListInfo,
    StakeInterFaceMap,
    StakeInterface,
    MyStakeInterfaceMap,
    MyStakeInterface
} from '../../slices/asset-list';

const useStyles = makeStyles((theme : Theme) => createStyles({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.primary,
        backgroundColor: '#c5cae9'
    },
    testField: {
        paddingRight: theme.spacing(2),
        textAlign: 'center',
        width: '300px',
        color: theme.palette.text.primary
    }
}),);


const ViewAssets = () => {
    const classes = useStyles();

    const {instance, stakeApp, web3} = useContext(MyOceanContext)
    const {assets, ranks} = useSelector((state : RootState) => state.assetList);
    const dispatch = useDispatch();
    const {getAllStakes, getMyStakes} = stakeApp ?. methods;
    const [search, setSearch] = useState < string > ('xzyabc123');

    const getData = async () => {
        console.log('loading assets...')
        const result = instance ?. assets.search(search)
        if (result !== undefined && web3 !== null) {
            const accounts: String[] = await web3.eth.getAccounts();

            result.then(async (r) => {
                const a = r.results.filter(r => r.service.find(e => e.attributes ?. main.type === 'dataset'));
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
                console.log("my dataset stakes", r2)
                dispatch(setAssetListInfo(a, r1, r2));
            })
        } else {
            console.log('result undefined')
        }
    }
    useEffect(() => {
        if (assets === []) {
            getData()
        }
    }, [])


    return (<div>
        <Paper className={
            classes.paper
        }>
            <Typography>
                Search Datasets
            </Typography>
        </Paper>
        <br/>
        <Grid container
            spacing={3}>
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
        <br/>
        <div>
            <Grid container>
                <Grid container direction="column">
                    <Grid container
                        spacing={3}> {
                        assets.map((value : DDO, index : number) => (<Grid item
                            xs={12}
                            sm={4}
                            key={
                                value.id
                        }>
                            <AssetDetails assetInfo={value}
                                type="dataset"
                                rank={
                                    ranks[value.id]
                                }
                                rankNumber={
                                    index + 1
                            }></AssetDetails>
                        </Grid>))
                    } </Grid>
                </Grid>
            </Grid>
        </div>
    </div>)
}

export default ViewAssets
