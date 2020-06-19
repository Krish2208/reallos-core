import React from 'react';
import PropTypes from 'prop-types';
import './ProfileEditDrawer.css';
import SideDrawer from '../shared/drawer/SideDrawer';
import UserAvatar from '../../assets/user.png';
import { PencilIcon } from '@primer/octicons-react';

import {
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Grid,
    Avatar,
    Badge,
    Fab,
    Button
} from '@material-ui/core';

/**
 * Display a "Profile Edit" Side Drawer
 * @augments {React.Component<Props>}
 */
class ProfileEditDrawer extends React.Component {
    static propTypes = {
        /**
         * Set visibility of "Profile Edit" Side Drawer
         */
        visible: PropTypes.bool,

        /**
         * Callback function to dismiss the Side Drawer
         * when clicked outside the drawer
         */
        dismissCallback: PropTypes.func
    }

    render() {
        let {
            visible,
            dismissCallback
        } = this.props;

        return (
            <div className="profile-edit-drawer">
                <SideDrawer
                    title="Edit Profile"
                    visible={visible}
                    dismissCallback={dismissCallback}
                    side="right"
                >
                    <Grid className="profile-edit-avatar" container justify="center">
                        <Badge
                            overlap="circle"
                            badgeContent={
                                <Fab
                                    size="small"
                                    style={{
                                        background: '#ffffff'
                                    }}
                                >
                                    <PencilIcon />
                                </Fab>
                            }
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right"
                            }}
                        >
                            <Avatar
                                alt="Joy Joseph"
                                src={UserAvatar}
                                style={{width: 150, height: 150}}
                            />
                        </Badge>
                    </Grid>
                    <ListItem>
                        <ListItemText
                            primary="Name"
                            secondary="Joy Joseph"
                        />

                        <ListItemSecondaryAction>
                            <IconButton>
                                <PencilIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Role"
                            secondary="Seller"
                        />

                        <ListItemSecondaryAction>
                            <IconButton>
                                <PencilIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Email"
                            secondary="joy_joseph@example.com"
                        />

                        <ListItemSecondaryAction>
                            <IconButton>
                                <PencilIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Phone Number"
                            secondary="+91 9999999999"
                        />

                        <ListItemSecondaryAction>
                            <IconButton>
                                <PencilIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <div className="profile-edit-footer-action-group">
                        <Button variant="outlined" color="primary">
                            Cancel
                        </Button>
                        <Button variant="contained" color="primary">
                            Save
                        </Button>
                    </div>
                </SideDrawer>
            </div>
        )
    }
}

export default ProfileEditDrawer;
