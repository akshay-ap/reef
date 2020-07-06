import React, {useContext, useState} from 'react';
import {MyOceanContext} from '../../OceanContext';
import {
    Button,
    TextField,
    Typography,
    Grid,
    Paper,
    IconButton
} from '@material-ui/core';
import {
    Account,
    MetaDataMain,
    AdditionalInformation,
    MetaData,
    CreateProgressStep,
    File
} from '@oceanprotocol/squid';
import {assetAlgo, DataAdditionalInformation} from '../../data/asset';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {useSnackbar} from 'notistack';

const useStyles = makeStyles((theme : Theme) => createStyles({
    root: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.primary,
        backgroundColor: '#e8eaf6'
    },
    paperTitle: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.primary,
        backgroundColor: '#c5cae9'
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


const CreateAlgorithm = () => {
    const classes = useStyles();
    const {enqueueSnackbar} = useSnackbar();

    const {instance} = useContext(MyOceanContext);
    const [mainMetaData, setMainMetaData] = useState < MetaDataMain > (assetAlgo.main);

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
            const p = instance ?. assets.create(newAsset, accounts[0])
            p ?. then(d => {
                console.log('d', d)
            })
            p ?. subscribe((p : CreateProgressStep) => {
                enqueueSnackbar(CreateProgressStep[p], {variant: 'info'});
            })

        } else {
            console.log("No accounts")
        }
    }

    // const createAssetWithCompute = async () => {

    //     const accounts: Account[] | undefined = await instance ?. accounts.list()
    //     if (accounts !== undefined) {
    //         const service = await instance ?. compute.createComputeServiceAttributes(accounts[0], '0', '2020-03-10T10:00:00Z')
    //         if (service !== undefined) {
    //             const ddoAssetNew = await instance ?. assets.create(assetWithCompute, accounts[0], [service])
    //             console.log(ddoAssetNew)

    //         }
    //         console.log('Asset with compute successfully submitted.')
    //     } else {
    //         console.log("No accounts")
    //     }
    // }

    const getFiles = () => {
        return (<Paper className={
            classes.paper
        }>
            <Typography>
                Files
            </Typography>
            {
            mainMetaData.files.map((file, index) => {
                return <div key={
                    file.resourceId
                }>
                    <Grid item container
                        spacing={3}>
                        <Grid item>
                            <TextField value={
                                    file.url
                                }
                                label="URL"
                                onChange={
                                    (event) => {
                                        updateFileURLInfo(file.resourceId, event.target.value);
                                    }
                                }/>
                        </Grid>
                    <Grid item>
                        <TextField value={
                                file.contentType
                            }
                            label="ContentType"
                            onChange={
                                (event) => {
                                    updateFileContentInfo(file.resourceId, event.target.value);
                                }
                            }/>
                    </Grid>
                <Grid item>
                    <TextField value={
                            file.name
                        }
                        label="Name"
                        onChange={
                            (event) => {
                                updateFileNameInfo(file.resourceId, event.target.value);
                            }
                        }/>
                </Grid>
            <Grid item>
                <TextField value={
                        file.resourceId
                    }
                    InputProps={
                        {readOnly: true}
                    }
                    label="ResourceId"/>
            </Grid>
            <Grid item>
                <IconButton onClick={
                    () => {
                        removeFile(file.resourceId)
                    }
                }><DeleteForeverIcon/></IconButton>
            </Grid>
        </Grid>
    </div>
        })
        }<br/>
            <Button variant="contained" color='primary'
                onClick={addFile}>Add</Button>
        </Paper>)
    };

    const removeFile = (resourceId : string | undefined) => {
        const filesList = mainMetaData.files.filter(f => f.resourceId !== resourceId);
        setMainMetaData((prev) => {
            return {
                ...prev,
                files: filesList
            }
        })
    }

    const addFile = () => {
        const resourceId = Math.random().toString(36).substring(2, 7) + Math.random().toString(36).substring(2, 7);
        console.log(resourceId)
        const filesList = [
            ...mainMetaData.files, {
                contentType: 'test',
                url: '',
                resourceId: resourceId,
                name: 'na'
            }
        ];

        setMainMetaData((prev) => {
            return {
                ...prev,
                files: filesList
            }
        })
    }

    const handleSubmit = (event : React.FormEvent < HTMLFormElement >) => {
        event.preventDefault()
        createAsset()
    }

    const updateFileURLInfo = (resourceId : string | undefined, value : string) => {
        const index = mainMetaData.files.findIndex(f => f.resourceId === resourceId);
        const files: File[] = mainMetaData.files;
        files[index].url = value;
        setMainMetaData((prev) => {
            return {
                ...prev,
                files: files
            }
        });
    };

    const updateFileContentInfo = (resourceId : string | undefined, value : string) => {
        const index = mainMetaData.files.findIndex(f => f.resourceId === resourceId);
        const files: File[] = mainMetaData.files;
        files[index].contentType = value;
        setMainMetaData((prev) => {
            return {
                ...prev,
                files: files
            }
        });
    };

    const updateFileNameInfo = (resourceId : string | undefined, value : string) => {
        const index = mainMetaData.files.findIndex(f => f.resourceId === resourceId);
        const files: File[] = mainMetaData.files;
        files[index].name = value;
        setMainMetaData((prev) => {
            return {
                ...prev,
                files: files
            }
        });
    };

    const getMetaData = () => {
        return (<Paper className={
            classes.paper
        }>
            <Typography>
                MetaData
            </Typography>
            <br/>
            <Grid item container
                spacing={3}>
                <Grid item>
                    <TextField value={
                            mainMetaData.name
                        }
                        label="Name"
                        required={true}
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
                    required={true}
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
                required={true}
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
            required={true}
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
</Grid></Grid></Paper>)
    }

    const getAdditionalInfo = () => {
        return <Paper className={
            classes.paper
        }>
            <Typography>
                Additional information
            </Typography>
            <br/>
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
        </Grid>
    </Grid>
</Paper>
    }
    return (<div className={
        classes.root
    }>
        <Paper className={
            classes.paperTitle
        }>
            <Typography>
                Publish algorithms
            </Typography>
        </Paper>
        <br/>
        <form onSubmit={handleSubmit}> {/* 
               <Button type="submit" variant="contained"
                    onClick={createAssetWithCompute}>Create with compute</Button> */}

            <div className={
                classes.root
            }>
                <Grid container
                    spacing={3}>
                    <Grid item
                        xs={12}> {
                        getMetaData()
                    } </Grid>
                    <Grid item
                        xs={12}> {
                        getAdditionalInfo()
                    } </Grid>
                    <Grid item
                        xs={12}> {
                        getFiles()
                    } </Grid>
                    <Grid item
                        xs={3}>
                        <Button type="submit" variant="contained">Create</Button>
                    </Grid>
                </Grid>
            </div>
        </form>
    </div>)
}
export default CreateAlgorithm
