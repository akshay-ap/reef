import React from 'react';
import {
    Drawer,
    List,
    ListItemText,
    Divider,
    ListItem,
    makeStyles
} from '@material-ui/core';
import {useHistory} from 'react-router-dom';

const userStyles = makeStyles({
    drawer: {
        width: "200px"
    }
})

const ReefDrawer = () => {
    const history = useHistory()
    const classes = userStyles()
    return (<Drawer variant="permanent" anchor="left"
        className={
            classes.drawer
    }>
        <List>
            <ListItem button>
                <ListItemText primary={"Home"}/>
            </ListItem>
        </List>
        <Divider/>
        <List>
            <ListItem button>
                <ListItemText primary={"View datasets"}
                    onClick={
                        () => history.push('/assets/view')
                    }/>
            </ListItem>
            <ListItem button>
                <ListItemText primary={"Create dataset"}
                    onClick={
                        () => history.push('/assets/create')
                    }/>
            </ListItem>
        </List>
        <Divider/>
        <List>
            <ListItem button>
                <ListItemText primary={"View algorithms"}
                    onClick={
                        () => history.push('/algorithms/view')
                    }/>
            </ListItem>
            <ListItem button>
                <ListItemText primary={"Create algorithm"}
                    onClick={
                        () => history.push('/algorithms/create')
                    }/>
            </ListItem>
        </List>
        <Divider/>
        <List>
            <ListItem button>
                <ListItemText primary={"View compute"}
                    onClick={
                        () => history.push('/compute/view')
                    }/>
            </ListItem>
            <ListItem button>
                <ListItemText primary={"Create compute"}
                    onClick={
                        () => history.push('/compute/create')
                    }/>
            </ListItem>
        </List>
        <Divider/>
        <List>
            <ListItem button>
                <ListItemText primary={"View Jobs"}
                    onClick={
                        () => history.push('/jobs')
                    }/>
            </ListItem>
        </List>
    </Drawer>)
}

export default ReefDrawer
