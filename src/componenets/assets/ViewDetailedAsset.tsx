import React, {useEffect} from 'react';
import {Grid, Paper} from '@material-ui/core';
import {useSelector} from "react-redux";
import {RootState} from "../../redux/index";

const ViewDetailedAsset = () => {
    const {asset} = useSelector((state : RootState) => state.selectedAsset);

    useEffect(() => {}, []);

    return (
        <Grid container>
            <Grid item>
                <Paper>Asstet details</Paper>
            </Grid>
            <Grid item>
                <Paper>{
                    asset.id
                }</Paper>
            </Grid>
        </Grid>

    )
}

export default ViewDetailedAsset;
