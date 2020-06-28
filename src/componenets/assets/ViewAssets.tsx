import React, {useContext, useEffect, useState} from 'react';
import {MyOceanContext} from '../../OceanContext';
import {DDO} from '@oceanprotocol/squid';
import {
    Grid,
    Card,
    CardContent,
    InputBase,
    Button,
    makeStyles,
    Theme,
    createStyles
} from '@material-ui/core';
import AssetDetails from './AssetDetails';

const useStyles = makeStyles((theme : Theme) => createStyles({
    inputRoot: {
        color: "inherit"
    }

}));

const ViewAssets = () => {
    const {instance} = useContext(MyOceanContext)
    const [assets, setAssets] = useState < DDO[] > ([]);
    // const classes = useStyles();

    useEffect(() => {
        console.log('loading assets...')
        const result = instance ?. assets.query({
            query: {
                text: ''
            }
        })
        if (result !== undefined) {
            result.then((r) => {
                console.log(r)
                const ddo: DDO = new DDO();
                ddo.id = "1";
                r.results.push(ddo)
                setAssets(r.results)
            })
        } else {
            console.log('result undefined')
        }
    }, [instance])

    return (
        <div>ViewAssets
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

export default ViewAssets
