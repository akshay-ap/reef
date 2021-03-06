import React, { useContext } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { MyOceanContext } from "../OceanContext";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: "primary",
  },
  title: {
    flexGrow: 1,
  },
  status: {
    marginRight: theme.spacing(2),
  },
}));

const TitleAppBar = () => {
  const classes = useStyles();
  const { instance } = useContext(MyOceanContext);
  const getStatus = (): String => {
    if (instance === undefined) return "Not connected";
    return instance?.keeper?.connected ? "Connected" : "Not Connected";
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            className={classes.title}
            align="left"
          >
            AlgoRank
          </Typography>
          <Typography className={classes.status}>
            Status: {getStatus()}{" "}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default TitleAppBar;
