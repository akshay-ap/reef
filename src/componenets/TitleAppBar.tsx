import React from 'react';
import {AppBar, Toolbar, Typography, makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex"
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1
    },
    title: {
        flexGrow: 1
    },
    status: {
        marginRight: theme.spacing(2)
    }
}))

const TitleAppBar = () => {
    const classes = useStyles();

    const getStatus = () : String => {
        return 'Loaded'
    }

    return (
        <div className={
            classes.root
        }>
            <AppBar position="fixed"
                className={
                    classes.appBar
            }>
                <Toolbar>
                    <Typography variant="h6" noWrap
                        className={
                            classes.title
                    }>
                        Reef
                    </Typography>
                    <Typography className={
                        classes.status
                    }>
                        Status: {
                        getStatus()
                    } </Typography>
                </Toolbar>
            </AppBar>
        </div>

    )
}

export default TitleAppBar
