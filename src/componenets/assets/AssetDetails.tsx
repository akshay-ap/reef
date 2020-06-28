import React from 'react'
import {DDO} from '@oceanprotocol/squid'
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

const useStyles = makeStyles({
    title: {
        fontSize: 14
    }
});

const AssetDetails = ({assetInfo} : {
    assetInfo: DDO
}) => {
    const classes = useStyles();
    return (
        <Card variant="outlined">
            <CardHeader title={
                    assetInfo.id
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
                    asset.additionalInformation ?. description
                } </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary">
                    View
                </Button>

                <Button size="small" color="primary">
                    Run compute
                </Button>
            </CardActions>
        </Card>
    )
}
export default AssetDetails
