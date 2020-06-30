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
import {Account, MetaDataMain, AdditionalInformation} from '@oceanprotocol/squid';
import {asset, assetWithCompute} from '../../data/asset';
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

    const createAsset = async () => {

        const accounts: Account[] | undefined = await instance ?. accounts.list()
        if (accounts !== undefined) {
            console.log('accounts---', accounts)
            console.log('ocean---', instance ?. compute)

            const ddo = await instance ?. assets.create(asset, accounts[0])
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


    const handleSubmit = (event : React.FormEvent < HTMLFormElement >) => {}
    const [mainMetaData, setMainMetaData] = useState < MetaDataMain > ({
        name: 'name',
        type: 'dataset',
        dateCreated: '',
        author: 'author',
        license: 'license',
        price: '10',
        files: []
    });
    const [additionInformation, setAdditionInformation] = useState < AdditionalInformation > ({tags: []})

    // const handleChange = (event : React.ChangeEvent) => {
    //     setAdditionInformation((p) => ({
    //         ...p,
    //         event.target.value as string[]
    //     }));
    // };
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
                                    (e) => setMainMetaData((prevstate) => ({
                                        ...prevstate,
                                        name: e.target.value
                                    }))
                            }></TextField>
                        </Grid>
                        <Grid item>
                            <TextField value={
                                    mainMetaData.author
                                }
                                label="Author"
                                onChange={
                                    (e) => setMainMetaData((prevstate) => ({
                                        ...prevstate,
                                        author: e.target.value
                                    }))
                            }></TextField>
                        </Grid>
                        <Grid item>
                            <TextField value={
                                    mainMetaData.license
                                }
                                label="License"
                                onChange={
                                    (e) => setMainMetaData((prevstate) => ({
                                        ...prevstate,
                                        license: e.target.value
                                    }))
                            }></TextField>
                        </Grid>
                        <Grid item>
                            <TextField value={
                                    mainMetaData.price
                                }
                                label="Price"
                                onChange={
                                    (e) => setMainMetaData((prevstate) => ({
                                        ...prevstate,
                                        price: e.target.value
                                    }))
                            }></TextField>
                        </Grid>
                    </Grid>
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
                                    (e) => setAdditionInformation((prevstate) => ({
                                        ...prevstate,
                                        description: e.target.value
                                    }))
                            }></TextField>
                        </Grid>
                        <Grid item>
                            <TextField label="CopyrightHolder"
                                onChange={
                                    (e) => setAdditionInformation((prevstate) => ({
                                        ...prevstate,
                                        copyrightHolder: e.target.value
                                    }))
                            }></TextField>
                        </Grid>
                        <Grid item>
                            <TextField value={
                                    mainMetaData.license
                                }
                                label="License"
                                onChange={
                                    (e) => setMainMetaData((prevstate) => ({
                                        ...prevstate,
                                        license: e.target.value
                                    }))
                            }></TextField>
                        </Grid>
                        <Grid item>
                            <TextField value={
                                    mainMetaData.price
                                }
                                label="Price"
                                onChange={
                                    (e) => setMainMetaData((prevstate) => ({
                                        ...prevstate,
                                        price: e.target.value
                                    }))
                            }></TextField>
                        </Grid>
                    </Grid>
                    {/* <Grid item container>
                        <FormControl className={
                            classes.formControl
                        }>
                            <InputLabel id="demo-mutiple-chip-label">Chip</InputLabel>
                            <Select labelId="demo-mutiple-chip-label" id="demo-mutiple-chip" multiple
                                value={
                                    additionInformation.tags
                                }
                                onChange={handleChange}
                                input={
                                    <Input
                                id="select-multiple-chip"/>
                                }
                                renderValue={
                                    (selected) => (
                                        <div className={
                                            classes.chips
                                        }>
                                            {
                                            (selected as string[]).map((value) => (
                                                <Chip key={value}
                                                    label={value}
                                                    className={
                                                        classes.chip
                                                    }/>
                                            ))
                                        } </div>
                                    )
                                }
                                MenuProps={MenuProps}>
                                {
                                Tags.map((name) => (
                                    <MenuItem key={name}
                                        value={name}
                                        style={
                                            getStyles(name, additionInformation.tags ? additionInformation.tags : [], theme)
                                    }>
                                        {name} </MenuItem>
                                ))
                            } </Select>
                        </FormControl>
                    </Grid> */} </Grid>


                <Button type="submit" variant="contained"
                    onClick={createAsset}>Create</Button>
                <br/>
                <Button type="submit" variant="contained"
                    onClick={createAssetWithCompute}>Create with compute</Button>
            </form>
        </div>

    )
}
export default CreateAsset
