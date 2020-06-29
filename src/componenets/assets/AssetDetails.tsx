import React, {useContext} from 'react'
import {DDO} from '@oceanprotocol/squid'
import {Account} from '@oceanprotocol/squid';
import {
    Card,
    CardHeader,
    IconButton,
    Avatar,
    CardContent,
    Typography,
    CardActions,
    Button,
    makeStyles
} from '@material-ui/core'
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import asset from '../../data/asset';
import {MyOceanContext} from '../../OceanContext';

const useStyles = makeStyles({
    title: {
        fontSize: 14
    }
});

const AssetDetails = ({assetInfo} : {
    assetInfo: DDO
}) => {
    const classes = useStyles();
    const {instance} = useContext(MyOceanContext)

    const consume = async (consumeAsset : DDO) => {
        const accounts: Account[] | undefined = await instance ?. accounts.list()
        if (accounts) {
            const agreement = await instance ?. assets.order(consumeAsset.id, accounts[0])
            if (agreement) {
                await instance ?. assets.consume(agreement, consumeAsset.id, accounts[0], '', 0)

            }

        }
        // consume it
    }
    return (
        <Card variant="outlined">
            <CardHeader title={
                    assetInfo.service.find(e => e.type == 'metadata') ?. attributes.main.name
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
                    assetInfo.service.find(e => e.type == 'metadata') ?. attributes.main.author
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
                    Comsume
                </Button>
                <Button size="small" color="primary">
                    Run compute
                </Button>
            </CardActions>
        </Card>
    )
}
export default AssetDetails
