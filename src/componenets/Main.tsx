import React from 'react';
import Compute from './compute/Compute';
import Button from '@material-ui/core/Button';
import {Drawer, Divider, List, ListItem} from '@material-ui/core';

export const Main = () => {
    return (<div>
        <Drawer variant="permanent" anchor="left">
            <List>
                <ListItem>
                    <div>Reef</div>
                </ListItem>
            </List>
            <Divider/>
            <List>
                <ListItem>
                    <div>View datasets</div>
                </ListItem>
                <ListItem>
                    <div>Create dataset</div>
                </ListItem>
            </List>
            <Divider/>
            <List>
                <ListItem>
                    <div>View algorithms</div>
                </ListItem>
                <ListItem>
                    <div>Create algorithm</div>
                </ListItem>
            </List>
            <Divider/>
            <List>
                <ListItem>
                    <div>View compute</div>
                </ListItem>
                <ListItem>
                    <div>Create compute</div>
                </ListItem>
            </List>
            <Divider/>
            <List>
                <ListItem>
                    <div>View Jobs</div>
                </ListItem>
            </List>
        </Drawer>
        <div>Main</div>
        <Button color="primary" variant="contained">Button</Button>
        <Compute></Compute>
    </div>)
}
