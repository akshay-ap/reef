import React from 'react';
import {AppBar, Toolbar, Typography, makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex"
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1
    }
}))

const TitleAppBar = () => {
    const classes = useStyles()

    return (
        <div className={
            classes.root
        }>
            <AppBar position="fixed"
                className={
                    classes.appBar
            }>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        Reef
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>

    )
}

export default TitleAppBar
