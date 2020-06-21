import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  List,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";

import {
  ThreeBarsIcon,
  ChevronLeftIcon,
  PackageIcon,
  FileIcon,
  PersonIcon,
  ChecklistIcon,
  CommentDiscussionIcon,
} from "@primer/octicons-react";

const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  list: {
    color: "#150578",
  },
  active: {
    color: "#150578",
    fontWeight: "Bold",
  },
}));

export default function MiniDrawer() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  let activeClass = "inactive";
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const changeActiveState = (component) => {
    //This function will perform the action on click of llist option
  };

  return (
    <div className={classes.root}>
      <Drawer
        onMouseEnter={handleDrawerOpen}
        onMouseLeave={handleDrawerClose}
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton
            onClick={handleDrawerOpen}
            className={clsx({
              [classes.hide]: open,
            })}
          >
            <ThreeBarsIcon size={30} />
          </IconButton>
          <IconButton
            onClick={handleDrawerClose}
            className={clsx({
              [classes.hide]: !open,
            })}
          >
            <ChevronLeftIcon size={38} />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button onClick={changeActiveState("Transaction Assistant")}>
            <ListItemIcon>
              <PackageIcon size={38} />
            </ListItemIcon>
            <ListItemText
              primary={"Transaction Assistant"}
              className={classes.list}
            />
          </ListItem>
        </List>
        <List>
          <ListItem button onClick={changeActiveState("Paperworks")}>
            <ListItemIcon>
              <FileIcon size={38} />
            </ListItemIcon>
            <ListItemText primary={"Paperworks"} className={classes.list} />
          </ListItem>
        </List>
        <List>
          <ListItem button onClick={changeActiveState("People")}>
            <ListItemIcon>
              <PersonIcon size={38} />
            </ListItemIcon>
            <ListItemText primary={"People"} className={classes.list} />
          </ListItem>
        </List>
        <List>
          <ListItem button onClick={changeActiveState("Todo")}>
            <ListItemIcon>
              <ChecklistIcon size={38} />
            </ListItemIcon>
            <ListItemText primary={"Todo"} className={classes.list} />
          </ListItem>
        </List>
        <List>
          <ListItem button onClick={changeActiveState("Chat")}>
            <ListItemIcon>
              <CommentDiscussionIcon size={38} />
            </ListItemIcon>
            <ListItemText primary={"Chat"} className={classes.list} />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}
