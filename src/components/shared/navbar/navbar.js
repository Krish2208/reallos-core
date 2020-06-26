import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import Auth from '../../account/Authenticate';
import { withStyles } from '@material-ui/core/styles';

import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Avatar,
  Grid,
  Menu,
  Box,
  Divider,
  LinearProgress,
  List,
} from "@material-ui/core";

import {
  ChecklistIcon,
  BellIcon,
  InboxIcon,
  PencilIcon,
  BriefcaseIcon,
  SignOutIcon,
  ChevronRightIcon,
} from "@primer/octicons-react";

import UserAvatar from "../../../assets/user.png";
import ProfileEditDrawer from "../../account/ProfileEditDrawer.js";
import NotificationListItem from "./NotificationListItem.js";
import "./navbar.css";

const styles = (theme) => ({
  notificationBadge: {
    backgroundColor: "#01AE4B",
    color: "white",
  },
});

// DUMMY DATA
// @TODO: Change names to User ID

let dummyData = [
  {
    type: "TASK_DUE_SOON",
    task: "Task 2",
    days_passed: 2,
    isRead: false,
  },
  {
    type: "TASK_COMPLETED",
    task: "Task 3",
    completed_by: "John Doe",
    completed_on: 1592658849.414344,
    isRead: true,
  },
  {
    type: "CHAT_MESSAGE",
    from: "John Doe",
    message: "Will get it done by Friday",
    isRead: false,
  },
  {
    type: "TASK_OVERDUE",
    task: "Task 1",
    due_date: 1592658849.414344,
    isRead: false,
  },
  {
    type: "DOC_UPLOADED",
    transaction: "Transaction 1",
    doc_name: "Document 8",
    isRead: true,
  },
];

class RenderNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userProfileAnchor: null,
            notificationAnchor: null,
            isProfileEditDrawerVisible: false,
            authenticated: Auth.getAuth()
        };
        this.openUserProfilePopup = this.openUserProfilePopup.bind(this);
        this.closeUserProfilePopup = this.closeUserProfilePopup.bind(this);
        this.openNotification = this.openNotification.bind(this);
        this.closeNotification = this.closeNotification.bind(this);
        this.toggleProfileEditDrawer = this.toggleProfileEditDrawer.bind(this);
        this.signOut = this.signOut.bind(this);
    }

  /* To open the profile popup */
  openUserProfilePopup = (event) => {
    this.setState({
      userProfileAnchor: event.currentTarget,
    });
  };

  /* To close the profile popup */
  closeUserProfilePopup = (event) => {
    this.setState({
      userProfileAnchor: null,
    });
  };

  /**
   * Toggles visibility of `ProfileEditDrawer`
   */
  toggleProfileEditDrawer() {
    let _isProfileEditDrawerVisible = !this.state.isProfileEditDrawerVisible;

    this.setState({
      userProfileAnchor: null,
      isProfileEditDrawerVisible: _isProfileEditDrawerVisible,
    });
  }

  openNotification = (event) => {
    this.setState({
      notificationAnchor: event.currentTarget,
    });
  };

  closeNotification = (event) => {
    this.setState({
      notificationAnchor: null,
    });
  };

  /**
   * Computes number of unread notifications from
   * notification data.
   */
  get getUnreadNotificationsCount() {
    return dummyData.filter((data) => !data.isRead).length;
  }

    signOut(){
        Auth.signout(); // Signing out of the application
        this.setState({
            authenticated: Auth.getAuth()
        })
    }

    render() {
        let { classes } = this.props;
        if(this.state.authenticated === false){
            return(
                <Redirect to="/" />
            );
        }
        else{
            return (
                <div className="navbar-main">
                    <Grid container direction="row" justify="center" alignitems="center">
                        <AppBar className="nav" position="static">
                            <Toolbar>
                                <Typography className="logo" variant="h6">
                                    Reallos
                                </Typography>
                                <div className="navbar-btn-group">
                                    <IconButton onClick={this.openNotification}>
                                        <Badge
                                            variant="dot"
                                            classes={(this.getUnreadNotificationsCount) ? {
                                                badge: classes.notificationBadge
                                            } : null}
                                        >
                                            <BellIcon size={20}/>
                                        </Badge>
                                    </IconButton>
                                    <IconButton>
                                        <InboxIcon size={20}/>
                                    </IconButton>
                                    <IconButton>
                                        <ChecklistIcon size={20}/>
                                    </IconButton>
                                    <IconButton onClick={this.openUserProfilePopup}>
                                        <Avatar src={UserAvatar} />
                                    </IconButton>
                                </div>

                                <Menu
                                    className="navbar-profile-menu-popup"
                                    anchorEl={this.state.userProfileAnchor}
                                    keepMounted
                                    open={Boolean(this.state.userProfileAnchor)}
                                    onClose={this.closeUserProfilePopup}
                                    getContentAnchorEl={null}
                                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                                    transformOrigin={{ vertical: "top", horizontal: "center" }}
                                    PaperProps={{
                                        style: {
                                            borderRadius: 10
                                        }
                                    }}
                                >
                                    <Grid container direction="column" justify="center" alignItems="center" className="menu-design">
                                        <Grid item style={{width: '100%', paddingLeft: 20, marginTop: 10}}>
                                            <Grid container className="profile-popup-info" direction="row" alignItems="center" spacing={2}>
                                                <Grid item>
                                                    <Box component="div" ml={2}>
                                                        <Avatar src={UserAvatar} className="avatar-large"/>
                                                    </Box>
                                                </Grid>
                                                <Grid item justify="center" className="profile-padding">
                                                    <Box component="h2" className="profile-heading">
                                                        Joy Joseph
                                                    </Box>
                                                    <Box component="p" mt={-2.5} mr={2} className="profile-subheading">
                                                        joy_joseph@example.com
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item style={{width: '90%', paddingLeft: 20}}>
                                            <LinearProgress
                                                variant="determinate"
                                                value={50}
                                                className="profile-progress-bar"
                                            />

                                            <a
                                                className="profile-subheading-small profile-progress-link"
                                                href=""
                                            >
                                                <Box component="p" mt={1}>
                                                    50% profile completed
                                                    <ChevronRightIcon />
                                                </Box>
                                            </a>
                                        </Grid>
                                        <Grid item>
                                            <Divider className="divider-profile"/>
                                        </Grid>
                                        <Grid container className="profile-popup-action-group" direction="row" alignItems="flex-end" justify="space-evenly">
                                            <Grid item>
                                                <Button onClick={this.toggleProfileEditDrawer}>
                                                    <Grid  container direction="column" justify="center" alignItems="center">
                                                        <Grid item><PencilIcon /></Grid>
                                                        <Grid item><Box component="p" className="profile-subheading-small">Edit Profile</Box></Grid>
                                                    </Grid>
                                                </Button>
                                            </Grid>
                                            <Grid item>
                                                <Button>
                                                    <Grid container direction="column" justify="center" alignItems="center">
                                                        <Grid item><BriefcaseIcon /></Grid>
                                                        <Grid item><Box component="p" className="profile-subheading-small">Add Resources</Box></Grid>
                                                    </Grid>
                                                </Button>
                                            </Grid>
                                            <Grid item>
                                                <Button>
                                                    <Grid container direction="column" justify="center" alignItems="center">
                                                        <Grid item><SignOutIcon /></Grid>
                                                        <Grid item><Box component="p" className="profile-subheading-small" onClick={this.signOut}>Log Out</Box></Grid>
                                                    </Grid>
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Menu>
                                <Menu
                                    className="navbar-notification-popup"
                                    anchorEl={this.state.notificationAnchor}
                                    keepMounted
                                    open={Boolean(this.state.notificationAnchor)}
                                    onClose={this.closeNotification}
                                    getContentAnchorEl={null}
                                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                                    transformOrigin={{ vertical: "top", horizontal: "center" }}
                                    PaperProps={{
                                        style: {
                                            borderRadius: 10
                                        }
                                    }}
                                >
                                    <Grid direction="column" alignContent="center" className="notification-menu">
                                        <Grid item className="notification-popup-header" justify="center">
                                            <Box component="p" style={{justifyContent: "center"}}>
                                                You have
                                            </Box>
                                            <Box component="h3" mt={-1.5} style={{justifyContent: "center"}}>
                                                {(this.getUnreadNotificationsCount)
                                                    ? `${this.getUnreadNotificationsCount} Unread Notifications`
                                                    : "No Unread Notifications"
                                                }
                                            </Box>
                                        </Grid>
                                        <List className="notification-list">
                                            {dummyData.map(data => (
                                                <NotificationListItem notificationData={data} />
                                            ))}
                                        </List>
                                    </Grid>
                                </Menu>
                            </Toolbar>
                        </AppBar>
                    </Grid>

                    <ProfileEditDrawer
                        dismissCallback={this.toggleProfileEditDrawer}
                        visible={this.state.isProfileEditDrawerVisible}
                    />
                </div>
            );
        }
    }
}

export default withStyles(styles)(RenderNav);
