import React from 'react';
import {
    Drawer,
    List,
    ListItemText,
    Divider,
    ListItem,
    Toolbar,
    makeStyles
} from '@material-ui/core';
import {useHistory} from 'react-router-dom';
import StorageIcon from '@material-ui/icons/Storage';

const drawerWidth = '240px';

const userStyles = makeStyles({
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth
    }
})

const AppDrawer = () => {
    const history = useHistory()
    const classes = userStyles()
    return (<Drawer variant="permanent" anchor="left"
        className={
            classes.drawer
        }
        classes={
            {paper: classes.drawerPaper}
    }>
        <Toolbar/>
        <List>
            <ListItem button
                onClick={
                    () => history.push('/')
            }>
                <ListItemText primary={"Home"}/>
            </ListItem>
        </List>
        <Divider/>
        <List>
            <ListItem>
                <StorageIcon/>
            </ListItem>
            <ListItem button
                onClick={
                    () => history.push('/assets/view')
            }>
                <ListItemText primary={"View datasets"}/>
            </ListItem>
            <ListItem button
                onClick={
                    () => history.push('/assets/create')
            }>
                <ListItemText primary={"Create dataset"}/>
            </ListItem>
        </List>
        <Divider/>
        <List>
            <ListItem button
                onClick={
                    () => history.push('/algorithms/view')
            }>
                <ListItemText primary={"View algorithms"}/>
            </ListItem>
            <ListItem button
                onClick={
                    () => history.push('/algorithms/create')
            }>
                <ListItemText primary={"Create algorithm"}/>
            </ListItem>
        </List>
        <Divider/>
        <List>
            <ListItem button
                onClick={
                    () => history.push('/compute/create')
            }>
                <ListItemText primary={"Create compute"}/>
            </ListItem>
            <ListItem button
                onClick={
                    () => history.push('/jobs')
            }>
                <ListItemText primary={"View Jobs"}/>
            </ListItem>
        </List>
        <Divider/>

    </Drawer>)
}

export default AppDrawer
