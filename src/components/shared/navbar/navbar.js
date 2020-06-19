import React, { Component } from 'react';
import {
    AppBar,
    Button,
    Toolbar,
    Typography,
    IconButton,
    Avatar,
    Grid,
    Menu,
    Box,
    Divider,
    LinearProgress
} from '@material-ui/core';
import {
    ChecklistIcon,
    BellIcon,
    InboxIcon,
    PencilIcon,
    BriefcaseIcon,
    SignOutIcon,
    ChevronRightIcon
} from '@primer/octicons-react';
import UserAvatar from '../../../assets/user.png';
import ProfileEditDrawer from '../../account/ProfileEditDrawer.js';
import './navbar.css';

class RenderNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userProfileAnchor: null,
            isProfileEditDrawerVisible: false
        };
        this.openUserProfilePopup = this.openUserProfilePopup.bind(this);
        this.closeUserProfilePopup = this.closeUserProfilePopup.bind(this);
        this.toggleProfileEditDrawer = this.toggleProfileEditDrawer.bind(this);
    }

    /* To open the profile popup */
    openUserProfilePopup = (event) => {
        this.setState({
            userProfileAnchor: event.currentTarget
        });
    }

    /* To close the profile popup */
    closeUserProfilePopup = (event) => {
        this.setState({
            userProfileAnchor: null
        });
    }

    /**
     * Toggles visibility of `ProfileEditDrawer`
     */
    toggleProfileEditDrawer() {
        let _isProfileEditDrawerVisible = !this.state.isProfileEditDrawerVisible;
        
        this.setState({
            userProfileAnchor: null,
            isProfileEditDrawerVisible: _isProfileEditDrawerVisible
        })
    }

    render() {
        return (
            <div className="navbar-main">
                <Grid container direction="row" justify="center" alignitems="center">
                    <AppBar className="nav" position="static">
                        <Toolbar>
                            <Typography className="logo" variant="h6">
                                Reallos
                            </Typography>
                            <div className="navbar-btn-group">
                                <IconButton><BellIcon size={20}/></IconButton>
                                <IconButton><InboxIcon size={20}/></IconButton>
                                <IconButton><ChecklistIcon size={20}/></IconButton>
                                <IconButton onClick={this.openUserProfilePopup}><Avatar src={UserAvatar} /></IconButton>
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
                                                    <Grid item><Box component="p" className="profile-subheading-small">Log Out</Box></Grid>
                                                </Grid>
                                            </Button>
                                        </Grid>
                                    </Grid>
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

export default RenderNav;
