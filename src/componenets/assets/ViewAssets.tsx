import React, {useContext, useEffect, useState} from 'react';
import {MyOceanContext} from '../../OceanContext';
import {DDO} from '@oceanprotocol/squid';
import {Grid, Card, CardContent, Typography} from '@material-ui/core';
import AssetDetails from './AssetDetails';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../redux';
import {setAssetListInfo} from '../../slices/asset-list';

const ViewAssets = () => {
    const {instance} = useContext(MyOceanContext)
    const {assets} = useSelector((state : RootState) => state.assetList);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('loading assets...')
        const result = instance ?. assets.search('xzyabc123')
        if (result !== undefined) {
            result.then((r) => {
                const a = r.results.filter(r => r.service.find(e => e.attributes.main.type === 'dataset'))
                console.log(a)
                dispatch(setAssetListInfo(a));
            })

        } else {
            console.log('result undefined')
        }
    }, [instance])

    return (
        <div>
            <Grid container
                spacing={3}>
                <Card>
                    <CardContent>
                        <Typography>
                            ViewAssets
                        </Typography>

                    </CardContent>
                </Card>
            </Grid>
            <br/>
            <div>
                <Grid container>
                    <Grid container direction="column">
                        <Grid container
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
