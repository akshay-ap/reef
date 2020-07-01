import React, {useContext, useState} from 'react'
import {DDO} from '@oceanprotocol/squid'
import {Account} from '@oceanprotocol/squid';
import {
    Card,
    CardHeader,
    CardContent,
    Typography,
    CardActions,
    Button,
    makeStyles,
    IconButton
} from '@material-ui/core'
import {MyOceanContext} from '../../OceanContext';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
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

const AssetDetails = ({assetInfo} : {
    assetInfo: DDO
}) => {
    const [asset] = useState < DDO > (assetInfo)
    const classes = useStyles();
    const {instance} = useContext(MyOceanContext)
    const runComputeJob = () => {
        alert('Compute')
    }
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
            }
                <IconButton><ThumbUpIcon/></IconButton>
                <IconButton><ThumbDownIcon/></IconButton>

            </CardActions>
        </Card>
    )
}
export default AssetDetails
