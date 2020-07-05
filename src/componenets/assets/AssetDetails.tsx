import React, {useContext, useState} from 'react'
import {DDO} from '@oceanprotocol/squid'
import {Account} from '@oceanprotocol/squid';
import {useHistory} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {setSelectedAsset} from "../../slices/selected-asset";
import {
    Card,
    CardHeader,
    CardContent,
    Typography,
    CardActions,
    Button,
    makeStyles
} from '@material-ui/core'
import {MyOceanContext} from '../../OceanContext';

const useStyles = makeStyles({
    title: {
        fontSize: 14
    },
    card: {
        background: 'linear-gradient(45deg, #64b5f6 30%, #e3f2fd 90%)'
    },
    button: {
        backgroundColor: '#1a237e',
        color: 'white'
    }
});

const AssetDetails = ({assetInfo, type, rank} : {
    assetInfo: DDO,
    type: string,
    rank: number
}) => {
    const history = useHistory()
    const dispatch = useDispatch();
    const [asset] = useState < DDO > (assetInfo)
    const classes = useStyles();
    const {instance} = useContext(MyOceanContext)
    const runComputeJob = () => {
        alert('Compute')
    }

    const setAsset = (asset : DDO) => {
        dispatch(setSelectedAsset(asset, type));
    };

    const isComputable = () => {
        const compute = asset.service.find(e => e.type === 'compute')
        if (compute !== undefined) {
            return (
                <Button size="small" color="primary" variant="contained"
                    className={
                        classes.button
                    }
                    onClick={runComputeJob}>Compute</Button>
            )
        } else {
            return null
        }

    }
    const consume = async (consumeAsset : DDO) => {
        console.log('------------')
        const accounts: Account[] | undefined = await instance ?. accounts.list()
        if (accounts) {
            const agreement = await instance ?. assets.order(consumeAsset.id, accounts[0])
            console.log('agreement----', agreement)
            if (agreement) {
                await instance ?. assets.consume(agreement, consumeAsset.id, accounts[0], '', 0)
            }
        } else {
            console.log('no accounts', consumeAsset)

        }
        // consume it
    }
    return (
        <Card variant="outlined"
            className={
                classes.card
            }
            raised={true}>
            <CardHeader title={
                    assetInfo.service.find(e => e.type === 'metadata') ?. attributes.main.name
                }
                action={
                    <div></div>
                }/>

            <CardContent>
                <Typography>Rank score: {rank} </Typography>
                <Typography className={
                        classes.title
                    }
                    color="textSecondary">
                    Price: {
                    assetInfo.service.find(e => e.type === 'metadata') ?. attributes.main.price
                }</Typography>
                <Typography className={
                        classes.title
                    }
                    color="textSecondary">
                    Author: {
                    assetInfo.service.find(e => e.type === 'metadata') ?. attributes.main.author
                } </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary" variant="contained"
                    className={
                        classes.button
                    }

                    onClick={
                        () => {
                            setAsset(asset)
                            history.push('/asset/details')
                        }
                }>
                    View
                </Button>


                <Button size="small" color="primary" variant="contained"
                    className={
                        classes.button
                    }
                    onClick={
                        () => {
                            consume(assetInfo)
                        }
                }>
                    Consume
                </Button>
                {
                isComputable()
            } </CardActions>
        </Card>

    )
}
export
default
AssetDetails
