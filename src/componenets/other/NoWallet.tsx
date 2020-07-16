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

export const NoWallet = () => {
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
            <Typography> No Wallet</Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};
