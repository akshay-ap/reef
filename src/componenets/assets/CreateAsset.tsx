import React, { useContext, useState } from "react";
import { MyOceanContext } from "../../OceanContext";
import {
  Button,
  TextField,
  Grid,
  Paper,
  IconButton,
  Card,
  CardHeader,
  CardContent,
  CardActions,
} from "@material-ui/core";
import {
  Account,
  MetaDataMain,
  AdditionalInformation,
  MetaData,
  CreateProgressStep,
  File,
} from "@oceanprotocol/squid";
import { asset, DataAdditionalInformation } from "../../data/asset";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { useSnackbar } from "notistack";
import { SectionHeader } from "../other/SectionHeader";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paperTitle: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.primary,
      backgroundColor: "#c5cae9",
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
    },
    chips: {
      display: "flex",
      flexWrap: "wrap",
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
    cardHeader: {
      backgroundColor: theme.palette.primary.main,
      color: "white",
      textAlign: "center",
    },
  })
);

const CreateAsset = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const { instance } = useContext(MyOceanContext);
  const [mainMetaData, setMainMetaData] = useState<MetaDataMain>(asset.main);

  const [additionInformation, setAdditionInformation] = useState<
    AdditionalInformation
  >(DataAdditionalInformation);

  const createAsset = async () => {
    const accounts: Account[] | undefined = await instance?.accounts.list();
    if (accounts !== undefined) {
      console.log("accounts---", accounts);
      console.log("ocean---", instance?.compute);
      const newAsset: MetaData = {
        main: mainMetaData,
        additionalInformation: additionInformation,
      };
      console.log("new asset", newAsset);
      const p = instance?.assets.create(newAsset, accounts[0]);
      p?.then((d) => {
        console.log("d", d);
      });
      p?.subscribe((p: CreateProgressStep) => {
        enqueueSnackbar(CreateProgressStep[p], { variant: "info" });
      });
    } else {
      console.log("No accounts");
    }
  };

  const getFiles = () => {
    return (
      <Card>
        <CardHeader title="Files" className={classes.cardHeader}></CardHeader>
        <CardContent>
          {mainMetaData.files.map((file, index) => {
            return (
              <div key={file.resourceId}>
                <Grid item container spacing={3}>
                  <Grid item>
                    <TextField
                      value={file.url}
                      label="URL"
                      onChange={(event) => {
                        updateFileURLInfo(file.resourceId, event.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      value={file.contentType}
                      label="ContentType"
                      onChange={(event) => {
                        updateFileContentInfo(
                          file.resourceId,
                          event.target.value
                        );
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      value={file.name}
                      label="Name"
                      onChange={(event) => {
                        updateFileNameInfo(file.resourceId, event.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      value={file.resourceId}
                      InputProps={{ readOnly: true }}
                      label="ResourceId"
                    />
                  </Grid>
                  <Grid item>
                    <IconButton
                      onClick={() => {
                        removeFile(file.resourceId);
                      }}
                    >
                      <DeleteForeverIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </div>
            );
          })}
        </CardContent>
        <CardActions>
          <Button variant="contained" color="secondary" onClick={addFile}>
            Add
          </Button>
        </CardActions>
      </Card>
    );
  };

  const removeFile = (resourceId: string | undefined) => {
    const filesList = mainMetaData.files.filter(
      (f) => f.resourceId !== resourceId
    );
    setMainMetaData((prev) => {
      return {
        ...prev,
        files: filesList,
      };
    });
  };

  const updateFileURLInfo = (resourceId: string | undefined, value: string) => {
    const index = mainMetaData.files.findIndex(
      (f) => f.resourceId === resourceId
    );
    const files: File[] = mainMetaData.files;
    files[index].url = value;
    setMainMetaData((prev) => {
      return {
        ...prev,
        files: files,
      };
    });
  };

  const updateFileContentInfo = (
    resourceId: string | undefined,
    value: string
  ) => {
    const index = mainMetaData.files.findIndex(
      (f) => f.resourceId === resourceId
    );
    const files: File[] = mainMetaData.files;
    files[index].contentType = value;
    setMainMetaData((prev) => {
      return {
        ...prev,
        files: files,
      };
    });
  };

  const updateFileNameInfo = (
    resourceId: string | undefined,
    value: string
  ) => {
    const index = mainMetaData.files.findIndex(
      (f) => f.resourceId === resourceId
    );
    const files: File[] = mainMetaData.files;
    files[index].name = value;
    setMainMetaData((prev) => {
      return {
        ...prev,
        files: files,
      };
    });
  };

  const addFile = () => {
    const resourceId =
      Math.random().toString(36).substring(2, 7) +
      Math.random().toString(36).substring(2, 7);
    console.log(resourceId);
    const filesList = [
      ...mainMetaData.files,
      {
        contentType: "test",
        url: "",
        resourceId: resourceId,
        name: "na",
      },
    ];

    setMainMetaData((prev) => {
      return {
        ...prev,
        files: filesList,
      };
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createAsset();
  };

  const getMetaData = () => {
    return (
      <Card>
        <CardHeader
          title="MetaData"
          className={classes.cardHeader}
        ></CardHeader>
        <CardContent>
          <Grid item container spacing={3}>
            <Grid item>
              <TextField
                value={mainMetaData.name}
                required={true}
                label="Name"
                onChange={(event) => {
                  const { value } = event.target;
                  setMainMetaData((prevstate) => ({
                    ...prevstate,
                    name: value,
                  }));
                }}
              ></TextField>
            </Grid>
            <Grid item>
              <TextField
                value={mainMetaData.author}
                required={true}
                label="Author"
                onChange={(event) => {
                  const { value } = event.target;
                  setMainMetaData((prevstate) => ({
                    ...prevstate,
                    author: value,
                  }));
                }}
              ></TextField>
            </Grid>
            <Grid item>
              <TextField
                value={mainMetaData.license}
                label="License"
                required={true}
                onChange={(event) => {
                  const { value } = event.target;
                  setMainMetaData((prevstate) => ({
                    ...prevstate,
                    license: value,
                  }));
                }}
              ></TextField>
            </Grid>
            <Grid item>
              <TextField
                value={mainMetaData.price}
                label="Price"
                required={true}
                onChange={(event) => {
                  const { value } = event.target;
                  setMainMetaData((prevstate) => ({
                    ...prevstate,
                    price: value,
                  }));
                }}
              ></TextField>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  };

  const getAdditionalInfo = () => {
    return (
      <Card>
        <CardHeader
          title="Additional information"
          className={classes.cardHeader}
        ></CardHeader>
        .
        <CardContent>
          <Grid item container spacing={3}>
            <Grid item>
              <TextField
                label="Description"
                onChange={(e) => {
                  const { value } = e.target;
                  setAdditionInformation((prevstate) => ({
                    ...prevstate,
                    description: value,
                  }));
                }}
              ></TextField>
            </Grid>
            <Grid item>
              <TextField
                label="CopyrightHolder"
                onChange={(e) => {
                  const { value } = e.target;

                  setAdditionInformation((prevstate) => ({
                    ...prevstate,
                    copyrightHolder: value,
                  }));
                }}
              ></TextField>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  };
  return (
    <div className={classes.root}>
      <SectionHeader title="Publish dataset" />
      <br />
      <form onSubmit={handleSubmit}>
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {getMetaData()}
            </Grid>
            <Grid item xs={12}>
              {getAdditionalInfo()}
            </Grid>
            <Grid item xs={12}>
              {getFiles()}
            </Grid>
            <Grid item xs={3}>
              <Button type="submit" variant="contained" color="secondary">
                Create
              </Button>
            </Grid>
          </Grid>
        </div>
      </form>
    </div>
  );
};
export default CreateAsset;
