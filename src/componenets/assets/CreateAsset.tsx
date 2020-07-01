import React, {useContext, useState} from 'react';
import {MyOceanContext} from '../../OceanContext';
import {
    Button,
    TextField,
    Divider,
    Typography,
    Grid,
    FormControl,
    InputLabel,
    Select,
    Input,
    Chip,
    MenuItem
} from '@material-ui/core';
import {Account, MetaDataMain, AdditionalInformation, MetaData} from '@oceanprotocol/squid';
import {asset, assetWithCompute, DataAdditionalInformation} from '../../data/asset';
import {createStyles, makeStyles, Theme, useTheme} from '@material-ui/core/styles';
import {Tags} from '../../data/Tag';

const useStyles = makeStyles((theme : Theme) => createStyles({
    root: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    chip: {
        margin: 2
    },
    noLabel: {
        marginTop: theme.spacing(3)
    }
}),);

function getStyles(name : string, personName : string[], theme : Theme) {
    return {
        fontWeight: personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium
    };
}


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250
        }
    }
};


const CreateAsset = () => {
    const classes = useStyles();
    const theme = useTheme();

    const {instance} = useContext(MyOceanContext);
    const [mainMetaData, setMainMetaData] = useState < MetaDataMain > (asset.main);

    const [additionInformation, setAdditionInformation] = useState < AdditionalInformation > (DataAdditionalInformation)

    const createAsset = async () => {

        const accounts: Account[] | undefined = await instance ?. accounts.list()
        if (accounts !== undefined) {
            console.log('accounts---', accounts)
            console.log('ocean---', instance ?. compute)
            const newAsset: MetaData = {
                main: mainMetaData,
                additionalInformation: additionInformation
            }
            const ddo = await instance ?. assets.create(newAsset, accounts[0])
            console.log('Asset successfully submitted.')
            console.log(ddo)
        } else {
            console.log("No accounts")
        }
    }

    const createAssetWithCompute = async () => {

        const accounts: Account[] | undefined = await instance ?. accounts.list()
        if (accounts !== undefined) {
            const service = await instance ?. compute.createComputeServiceAttributes(accounts[0], '0', '2020-03-10T10:00:00Z')
            if (service !== undefined) {
                const ddoAssetNew = await instance ?. assets.create(assetWithCompute, accounts[0], [service])
                console.log(ddoAssetNew)

            }
            console.log('Asset with compute successfully submitted.')
        } else {
            console.log("No accounts")
        }
    }

    const getFiles = () => {
        return <Grid item>
            {
            mainMetaData.files.map((file) => {

                return <div>
                    <TextField value={
                            file.url
                        }
                        label="File"></TextField>
                </div>
        })
        } </Grid>
    }

    const addFile = () => {}

    const handleSubmit = (event : React.FormEvent < HTMLFormElement >) => {
        event.preventDefault()
        createAsset()
    }

    // const handleChange = (event : React.ChangeEvent) => {
    //     setAdditionInformation((p) => ({
    //         ...p,
    //         event.target.value as string[]
    //     }));
    // };

    const getMetaData = () => {}
    return (
        <div className={
            classes.root
        }>CreateAsset
            <form onSubmit={handleSubmit}>
                <Typography>
                    MetaData
                </Typography>
                <Grid container>

                    <Grid item container
                        spacing={3}>
                        <Grid item>
                            <TextField value={
                                    mainMetaData.name
                                }
                                label="Name"
                                onChange={
                                    (event) => {
                                        const {value} = event.target;
                                        setMainMetaData((prevstate) => ({
                                            ...prevstate,
                                            name: value
                                        }))
                                    }
                            }></TextField>
                    </Grid>
                    <Grid item>
                        <TextField value={
                                mainMetaData.author
                            }
                            label="Author"
                            onChange={
                                (event) => {
                                    const {value} = event.target;
                                    setMainMetaData((prevstate) => ({
                                        ...prevstate,
                                        author: value
                                    }))
                                }
                        }></TextField>
                </Grid>
                <Grid item>
                    <TextField value={
                            mainMetaData.license
                        }
                        label="License"
                        onChange={
                            (event) => {
                                const {value} = event.target;
                                setMainMetaData((prevstate) => ({
                                    ...prevstate,
                                    license: value
                                }))
                            }
                    }></TextField>
            </Grid>
            <Grid item>
                <TextField value={
                        mainMetaData.price
                    }
                    label="Price"
                    onChange={
                        (event) => {
                            const {value} = event.target;
                            setMainMetaData((prevstate) => ({
                                ...prevstate,
                                price: value
                            }))
                        }
                }></TextField>
        </Grid>
    </Grid>
    <Grid item container
        spacing={1}>
        {
        getFiles()
    } </Grid>
    <Grid item>
        <Typography variant="h6">
            Additional info
        </Typography>
    </Grid>
    <Grid item container
        spacing={3}>

        <Grid item>
            <TextField label="Description"
                onChange={
                    (e) => {
                        const {value} = e.target;
                        setAdditionInformation((prevstate) => ({
                            ...prevstate,
                            description: value
                        }))
                    }
            }></TextField>
    </Grid>
    <Grid item>
        <TextField label="CopyrightHolder"
            onChange={
                (e) => {
                    const {value} = e.target;

                    setAdditionInformation((prevstate) => ({
                        ...prevstate,
                        copyrightHolder: value
                    }))
                }
        }></TextField>
</Grid></Grid></Grid><Button type="submit" variant="contained">Create</Button><br/><Button type="submit" variant="contained"
    onClick={createAssetWithCompute}>Create with compute</Button></form></div>

    )
}
export default CreateAsset
