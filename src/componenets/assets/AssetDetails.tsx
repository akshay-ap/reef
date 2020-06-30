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
    makeStyles
} from '@material-ui/core'
import {MyOceanContext} from '../../OceanContext';

const useStyles = makeStyles({
    title: {
        fontSize: 14
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
                <Button size="small" color="primary"
                    onClick={runComputeJob}>Run Compute</Button>
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
        <Card variant="outlined">
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
                    {
                    assetInfo.service.find(e => e.type === 'metadata') ?. attributes.main.author
                } </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary">
                    View
                </Button>

                <Button size="small" color="primary"
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
export default AssetDetails
