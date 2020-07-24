import React from "react";
import { Grid, Paper, Typography, makeStyles } from "@material-ui/core";
import ErrorIcon from "@material-ui/icons/Error";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
  },
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.primary,
    backgroundColor: "#ff8a80",
  },
}));

export const NotConnectedToOceanNetwork = () => {
  const classes = useStyles();

  return (
    <div>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <ErrorIcon />
            <Typography>Not connected to ocean network...</Typography>
            <Typography variant="caption" display="block" gutterBottom>
              Hint: Please check of wallet (Metamask) is connected to ocean
              network
            </Typography>
            <Typography>
              <a
                href="https://docs.oceanprotocol.com/tutorials/connect-to-networks/#connect-to-the-nile-testnet"
                target="_blank"
              >
                Click here to connect to Ocean network
              </a>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};
