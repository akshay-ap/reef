import React, {useContext, useEffect, useState} from 'react';
import {MyOceanContext} from '../../OceanContext';
import {DDO} from '@oceanprotocol/squid';
import {Grid} from '@material-ui/core';
import AssetDetails from './AssetDetails';

const ViewAssets = () => {
    const {instance} = useContext(MyOceanContext)
    const [assets, setAssets] = useState < DDO[] > ([]);
    // const classes = useStyles();

    useEffect(() => {
        console.log('loading assets...')
        const result = instance ?. assets.search('xzyabc123')
        if (result !== undefined) {
            result.then((r) => {
                const a = r.results.filter(r => r.service.find(e => e.attributes.main.type === 'dataset'))
                console.log(a)
                setAssets(a)
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
                            assets.map((value : DDO) => (
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
