import React from "react";
import { Paper, Typography, makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  paperTitle: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: "white",
    backgroundColor: theme.palette.primary.main,
  },
}));

export const SectionHeader = ({ title }: { title: string }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.paperTitle}>
      <Typography variant="h4">{title}</Typography>
    </Paper>
  );
};
