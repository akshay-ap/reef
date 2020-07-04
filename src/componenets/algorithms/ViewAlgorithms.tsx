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
    const {instance} = useContext(MyOceanContext)
    const [assets, setAssets] = useState < DDO[] > ([]);
    const [search, setSearch] = useState < string > ('xzyabc123');
    const classes = useStyles();

    const getData = () => {
        console.log('loading assets...')
        const result = instance ?. assets.search(search)
        if (result !== undefined) {
            result.then((r) => {
                console.log('alogrithm found', r)
                if (r.results != undefined) {
                    const a = r.results.filter(r => r.service.find(e => e.attributes && e.attributes.main.type === 'algorithm'))
                    setAssets(a)
                } else {
                    console.log('result undefined')

                }

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
                            assets.map((value : DDO, index) => (
                                <Grid item
                                    xs={12}
                                    sm={4}
                                    key={
                                        value.id
                                }>
                                    <AssetDetails assetInfo={value}></AssetDetails>
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
