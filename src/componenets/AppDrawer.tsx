import React from "react";
import {
  Drawer,
  List,
  ListItemText,
  Divider,
  ListItem,
  Toolbar,
  makeStyles,
  createStyles,
  Theme,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

const drawerWidth = "240px";

const userStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    icon: {
      alignContent: "center",
    },
  })
);

const AppDrawer = () => {
  const history = useHistory();
  const classes = userStyles();

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number,
    url: string
  ) => {
    setSelectedIndex(index);
    history.push(url);
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      className={classes.drawer}
      classes={{ paper: classes.drawerPaper }}
    >
      <Toolbar />
      <List>
        <ListItem
          button
          selected={selectedIndex === 0}
          onClick={(e) => handleListItemClick(e, 0, "/")}
        >
          <ListItemText primary={"Home"} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem
          button
          selected={selectedIndex === 1}
          onClick={(e) => handleListItemClick(e, 1, "/assets/view")}
        >
          <ListItemText primary={"Search datasets"} />
        </ListItem>
        <ListItem
          button
          selected={selectedIndex === 2}
          onClick={(e) => handleListItemClick(e, 2, "/assets/create")}
        >
          <ListItemText primary={"Publish dataset"} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem
          button
          selected={selectedIndex === 3}
          onClick={(e) => handleListItemClick(e, 3, "/algorithms/view")}
        >
          <ListItemText primary={"Search algorithms"} />
        </ListItem>
        <ListItem
          button
          selected={selectedIndex === 4}
          onClick={(e) => handleListItemClick(e, 4, "/algorithms/create")}
        >
          <ListItemText primary={"Publish algorithm"} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem
          button
          selected={selectedIndex === 5}
          onClick={(e) => handleListItemClick(e, 5, "/compute/create")}
        >
          <ListItemText primary={"Create compute"} />
        </ListItem>
        <ListItem
          button
          selected={selectedIndex === 6}
          onClick={(e) => handleListItemClick(e, 6, "/compute/view")}
        >
          <ListItemText primary={"View jobs"} />
        </ListItem>
      </List>
      <Divider />
    </Drawer>
  );
};

export default AppDrawer;
