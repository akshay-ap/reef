import React, {useEffect, useContext, useState} from 'react';
import {MyOceanContext} from '../../OceanContext';
import {DDO} from '@oceanprotocol/squid';
import {Grid} from '@material-ui/core';
import AssetDetails from '../assets/AssetDetails';

const ViewAlgorithms = () => {
    const {instance} = useContext(MyOceanContext)
    const [assets, setAssets] = useState < DDO[] > ([]);

    useEffect(() => {
        console.log('loading assets...')
        const result = instance ?. assets.search('Small')
        if (result !== undefined) {
            result.then((r) => {
                setAssets(r.results)
                console.log(instance ?. aquarius.retrieveDDO(r.results[0].id))
            })


        } else {
            console.log('result undefined')
        }
    }, [instance])
    return (
        <div>ViewAlgorithms<div>
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
