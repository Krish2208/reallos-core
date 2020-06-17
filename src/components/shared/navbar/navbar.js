import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem'; 
import { ChecklistIcon, BellIcon, InboxIcon } from '@primer/octicons-react';
import UserAvatar from '../../../assets/user.png';
import './navbar.css';

class RenderNav extends Component {
    constructor(props){
        super(props);
        this.state = {
            userProfileAnchor: null
        };
        this.openUserProfile = this.openUserProfile.bind(this);
        this.closeUserProfile = this.closeUserProfile.bind(this);
    }

    openUserProfile = (event)=>{
        this.setState({
            userProfileAnchor: event.currentTarget
        });
    }

    closeUserProfile = (event)=>{
        this.setState({
            userProfileAnchor: null
        });
    }

    render(){
        return (
            <div className="main">
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
                                <IconButton onClick={this.openUserProfile}><Avatar src={UserAvatar} /></IconButton>
                                <Menu
                                    anchorEl ={this.state.userProfileAnchor}
                                    keepMounted
                                    open={Boolean(this.state.userProfileAnchor)}
                                    onClose={this.closeUserProfile}
                                    getContentAnchorEl={null}
                                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                                    transformOrigin={{ vertical: "top", horizontal: "center" }}
                                >

                                    <MenuItem onClick={this.closeUserProfile}>Edit Profile</MenuItem>
                                    <MenuItem onClick={this.closeUserProfile}>Add Resources</MenuItem>
                                    <MenuItem onClick={this.closeUserProfile}>Logout</MenuItem>
                                </Menu>
                            </div>
                        </Toolbar>
                    </AppBar>
                </Grid>
            </div>
        );
    }
}

export default RenderNav;
