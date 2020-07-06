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
    makeStyles,
    Avatar
} from '@material-ui/core'
import {MyOceanContext} from '../../OceanContext';

const useStyles = makeStyles({
    title: {
        fontSize: 14
    },
    card: {
        background: '#bbdefb'
    },
    button: {
        backgroundColor: '#1a237e',
        color: 'white'
    },
    avatar: {
        backgroundColor: '#bbdefb'
    },
    cardHeader: {
        backgroundColor: '#3f51b5'
    }
});

const AssetDetails = ({assetInfo, type, rank, rankNumber} : {
    assetInfo: DDO,
    type: string,
    rank: number,
    rankNumber: number
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
            return (<Button size="small" color="primary" variant="contained"
                className={
                    classes.button
                }
                onClick={runComputeJob}>Compute</Button>)
        } else {
            return null
        }

    }
    const consume = async (consumeAsset : DDO) => {
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
    return (<Card variant="outlined"
        className={
            classes.card
        }
        raised={true}>
        <CardHeader avatar={
                (<Avatar aria-label="recipe"
                    className={
                        classes.avatar
                }>
                    <Typography color='primary'> {rankNumber}</Typography>
                </Avatar>)
            }
            title={
                assetInfo.service.find(e => e.type === 'metadata') ?. attributes.main.name
            }
            action={
                <div></div>
            }
            className={
                classes.cardHeader
            }/>

        <CardContent>
            <Typography>Rank score: {
                Math.round((rank + Number.EPSILON) * 100) / 100
            } </Typography>
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
    </Card>)
}
export
default
AssetDetails
